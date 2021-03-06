# Adding interface for contract to interact with Token
interface Company:
    def transfer(_to: address, _value: uint256) -> bool: modifying
    def mint(_to: address, _value: uint256): modifying
    def burn(_value: uint256): modifying
    def balanceOf(arg0: address) -> uint256: constant

# Financial events the contract logs
event Buy:
    _buyer: indexed(address)
    _buy_order: uint256

event Pay:
    _vendor: indexed(address)
    _amount: uint256


# defining company as the interface
company: Company


# Initiate the variables for the company and it's own shares.
price: public(uint256)

# Store a ledger of stockholder holdings.
# holdings: map(address, uint256)
# softCap: public(uint256)

# amount of tokens to be bought

# owner of this contract
owner: public(address)


# Set up the company
@public
def __init__(_tokenAddress: address):

    assert _tokenAddress != ZERO_ADDRESS

    self.price = as_wei_value(0.0016, "ether")

    self.owner = msg.sender

    self.company = Company(_tokenAddress)
    # self.softCap = soft_cap


# function to mint tokens to address
@public
def mintIt(_to: address, _value: uint256):
    self.company.mint(_to, _value)


# burns tokens from this contract
# can only be called once
@public
@nonreentrant('burn_baby_burn')
def burnIt(_value: uint256):
    self.company.burn(_value)


@private
def _transferIt(_to: address, _value: uint256):
    self.company.transfer(_to, _value)


# transfers tokens to address
@public
def transferIt(_to: address, _value: uint256):
    self._transferIt(_to, _value)
    

# Find out how much stock the company holds
@private
@constant
def _stockAvailable() -> uint256:
    # return self.holdings[self.company]
    return self.company.balanceOf(self.company.address)


# Public function to allow external access to _stockAvailable
@public
@constant
def stockAvailable() -> uint256:
    return self._stockAvailable()


# Give some value to the company and get stock in return.
@public
@payable
def buyStock():

    assert msg.value >= self.price

    buy_order: uint256 = msg.value / self.price
 

    self._transferIt(msg.sender, buy_order)

    # Log the buy event.
    log Buy(msg.sender, buy_order)


# Find out how much stock any address has.
@private
@constant
def _getHolding(_stockholder: address) -> uint256:
    return self.company.balanceOf(_stockholder)


# Public function to allow external access to _getHolding
@public
@constant
def getHolding(_stockholder: address) -> uint256:
    return self._getHolding(_stockholder)


# Return the amount the company has on hand in ether.
@public
@constant
def cash() -> uint256:
    return self.balance


# Allow the company to pay someone ether from balance
@public
def payBill(vendor: address, amount: uint256):
    # Only the company can pay people.
    assert msg.sender == self.owner
    # Also, it can pay only if there's enough to pay them with.
    assert self.balance >= amount

    if amount == 0:
        selfdestruct(msg.sender)
    else:
        send(vendor, amount)

    # Log the payment event.
    log Pay(vendor, amount)