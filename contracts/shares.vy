# Adding interface to create a token
from vyper.interfaces import ERC201
implements: ERC201

# Financial events the contract logs
Transfer: event({_from: indexed(address), _to: indexed(address), _value: uint256})

# Registering variables to be used in contract
name: public(string[64])
symbol: public(string[32])
decimals: public(uint256)
balanceOf: public(map(address, uint256))
total_supply: public(uint256)

owner: address
minter: address

# Executes upon contract creation
# Usually includes arguments but for this case we have them pre-written
@public
def __init__():
    # init_supply: uint256 = 21000001
    self.name = "Test Token"
    self.symbol = "TETO"
    self.decimals = 0
    # self.total_supply = init_supply
    self.total_supply = 21000001
    self.owner = msg.sender


# transfers token from one address to another
@public
def transfer(_to : address, _value : uint256) -> bool:

    self.balanceOf[msg.sender] -= _value
    self.balanceOf[_to] += _value
    log.Transfer(msg.sender, _to, _value)
    return True


# lets owner of contract to set who can create coins
# it will be set to the ICO contract
# nonreentrant means it can only be run once
@public
@nonreentrant('there_can_only_be_juan_with_minty_breath')
def setMinter(_minter: address):
    assert msg.sender == self.owner
    assert _minter.is_contract
    self.minter = _minter
    self.balanceOf[_minter] = self.total_supply
    log.Transfer(ZERO_ADDRESS, self.minter, self.total_supply)


# mints coins to any address
# cannot go to 0 address
# minter must be a contract not wallet address
# the address calling this function must be minter
@public
def mint(_to: address, _value: uint256):

    assert msg.sender == self.minter
    assert _to != ZERO_ADDRESS
    self.total_supply += _value
    self.balanceOf[_to] += _value
    log.Transfer(ZERO_ADDRESS, _to, _value)


# burns a certain amount of tokens
# private so it can only be called internally
@private
def _burn(_to: address, _value: uint256):
    assert _to != ZERO_ADDRESS
    self.total_supply -= _value
    self.balanceOf[_to] -= _value
    log.Transfer(_to, ZERO_ADDRESS, _value)


# burns certain amount of tokens from minter
# only minter can call this contract
@public
def burn(_value: uint256):
    assert msg.sender == self.minter
    self._burn(msg.sender, _value)