function toHexString(byteArray) {
    return Array.prototype.map.call(byteArray, function (byte) {
        return ('0' + (byte & 0xFF).toString(16)).slice(-2);
    }).join('');
}

var myEther;

try {

    console.log("web3.version", web3.version)
    web3.eth.defaultAccount = web3.eth.accounts[0];

} catch (error) {
    console.log(error);
    document.getElementById("mask").style.display = "block";
}

$(document).ready(function () {
    $(".ether").change(function () {
        
        try {
            console.log("0x" + toHexString(bech32.decode($(".ether").val()).data));
        }
        catch (err) {
            $(".ether").val(err);
        }

    });


    $(".token").change(function () {

        try {

            if ($(".token").val() < 0.01000001) {
                $(".token").val("must be >= 0.01000001");
            } else if ($(".token").val() >= 0.01000001){
                console.log($(".token").val() * 10 ** 18);
            } else {
                throw "must be a uint number";
            }

        }
        catch (err) {
            console.log(err);
            $(".token").val(err);
        }

    });

});

web3.eth.defaultAccount = web3.eth.accounts[0];

var tokenHub =
    web3.eth.contract([
        {
            "type": "constructor",
            "stateMutability": "nonpayable",
            "inputs": []
        },
        {
            "type": "event",
            "name": "paramChange",
            "inputs": [
                {
                    "type": "string",
                    "name": "key",
                    "internalType": "string",
                    "indexed": false
                },
                {
                    "type": "bytes",
                    "name": "value",
                    "internalType": "bytes",
                    "indexed": false
                }
            ],
            "anonymous": false
        },
        {
            "type": "event",
            "name": "receiveDeposit",
            "inputs": [
                {
                    "type": "address",
                    "name": "from",
                    "internalType": "address",
                    "indexed": false
                },
                {
                    "type": "uint256",
                    "name": "amount",
                    "internalType": "uint256",
                    "indexed": false
                }
            ],
            "anonymous": false
        },
        {
            "type": "event",
            "name": "refundFailure",
            "inputs": [
                {
                    "type": "address",
                    "name": "bep2eAddr",
                    "internalType": "address",
                    "indexed": false
                },
                {
                    "type": "address",
                    "name": "refundAddr",
                    "internalType": "address",
                    "indexed": false
                },
                {
                    "type": "uint256",
                    "name": "amount",
                    "internalType": "uint256",
                    "indexed": false
                },
                {
                    "type": "uint32",
                    "name": "status",
                    "internalType": "uint32",
                    "indexed": false
                }
            ],
            "anonymous": false
        },
        {
            "type": "event",
            "name": "refundSuccess",
            "inputs": [
                {
                    "type": "address",
                    "name": "bep2eAddr",
                    "internalType": "address",
                    "indexed": false
                },
                {
                    "type": "address",
                    "name": "refundAddr",
                    "internalType": "address",
                    "indexed": false
                },
                {
                    "type": "uint256",
                    "name": "amount",
                    "internalType": "uint256",
                    "indexed": false
                },
                {
                    "type": "uint32",
                    "name": "status",
                    "internalType": "uint32",
                    "indexed": false
                }
            ],
            "anonymous": false
        },
        {
            "type": "event",
            "name": "rewardTo",
            "inputs": [
                {
                    "type": "address",
                    "name": "to",
                    "internalType": "address",
                    "indexed": false
                },
                {
                    "type": "uint256",
                    "name": "amount",
                    "internalType": "uint256",
                    "indexed": false
                }
            ],
            "anonymous": false
        },
        {
            "type": "event",
            "name": "transferInSuccess",
            "inputs": [
                {
                    "type": "address",
                    "name": "bep2eAddr",
                    "internalType": "address",
                    "indexed": false
                },
                {
                    "type": "address",
                    "name": "refundAddr",
                    "internalType": "address",
                    "indexed": false
                },
                {
                    "type": "uint256",
                    "name": "amount",
                    "internalType": "uint256",
                    "indexed": false
                }
            ],
            "anonymous": false
        },
        {
            "type": "event",
            "name": "transferOutSuccess",
            "inputs": [
                {
                    "type": "address",
                    "name": "bep2eAddr",
                    "internalType": "address",
                    "indexed": false
                },
                {
                    "type": "address",
                    "name": "senderAddr",
                    "internalType": "address",
                    "indexed": false
                },
                {
                    "type": "uint256",
                    "name": "amount",
                    "internalType": "uint256",
                    "indexed": false
                },
                {
                    "type": "uint256",
                    "name": "relayFee",
                    "internalType": "uint256",
                    "indexed": false
                }
            ],
            "anonymous": false
        },
        {
            "type": "event",
            "name": "unexpectedPackage",
            "inputs": [
                {
                    "type": "uint8",
                    "name": "channelId",
                    "internalType": "uint8",
                    "indexed": false
                },
                {
                    "type": "bytes",
                    "name": "msgBytes",
                    "internalType": "bytes",
                    "indexed": false
                }
            ],
            "anonymous": false
        },
        {
            "type": "function",
            "stateMutability": "view",
            "outputs": [
                {
                    "type": "uint8",
                    "name": "",
                    "internalType": "uint8"
                }
            ],
            "name": "BEP2_TOKEN_DECIMALS",
            "inputs": []
        },
        {
            "type": "function",
            "stateMutability": "view",
            "outputs": [
                {
                    "type": "bytes32",
                    "name": "",
                    "internalType": "bytes32"
                }
            ],
            "name": "BEP2_TOKEN_SYMBOL_FOR_BNB",
            "inputs": []
        },
        {
            "type": "function",
            "stateMutability": "view",
            "outputs": [
                {
                    "type": "uint8",
                    "name": "",
                    "internalType": "uint8"
                }
            ],
            "name": "BIND_CHANNELID",
            "inputs": []
        },
        {
            "type": "function",
            "stateMutability": "view",
            "outputs": [
                {
                    "type": "uint32",
                    "name": "",
                    "internalType": "uint32"
                }
            ],
            "name": "CODE_OK",
            "inputs": []
        },
        {
            "type": "function",
            "stateMutability": "view",
            "outputs": [
                {
                    "type": "address",
                    "name": "",
                    "internalType": "address"
                }
            ],
            "name": "CROSS_CHAIN_CONTRACT_ADDR",
            "inputs": []
        },
        {
            "type": "function",
            "stateMutability": "view",
            "outputs": [
                {
                    "type": "uint32",
                    "name": "",
                    "internalType": "uint32"
                }
            ],
            "name": "ERROR_FAIL_DECODE",
            "inputs": []
        },
        {
            "type": "function",
            "stateMutability": "view",
            "outputs": [
                {
                    "type": "uint8",
                    "name": "",
                    "internalType": "uint8"
                }
            ],
            "name": "GOV_CHANNELID",
            "inputs": []
        },
        {
            "type": "function",
            "stateMutability": "view",
            "outputs": [
                {
                    "type": "address",
                    "name": "",
                    "internalType": "address"
                }
            ],
            "name": "GOV_HUB_ADDR",
            "inputs": []
        },
        {
            "type": "function",
            "stateMutability": "view",
            "outputs": [
                {
                    "type": "address",
                    "name": "",
                    "internalType": "address"
                }
            ],
            "name": "INCENTIVIZE_ADDR",
            "inputs": []
        },
        {
            "type": "function",
            "stateMutability": "view",
            "outputs": [
                {
                    "type": "uint256",
                    "name": "",
                    "internalType": "uint256"
                }
            ],
            "name": "INIT_MINIMUM_RELAY_FEE",
            "inputs": []
        },
        {
            "type": "function",
            "stateMutability": "view",
            "outputs": [
                {
                    "type": "address",
                    "name": "",
                    "internalType": "address"
                }
            ],
            "name": "LIGHT_CLIENT_ADDR",
            "inputs": []
        },
        {
            "type": "function",
            "stateMutability": "view",
            "outputs": [
                {
                    "type": "uint8",
                    "name": "",
                    "internalType": "uint8"
                }
            ],
            "name": "MAXIMUM_BEP2E_SYMBOL_LEN",
            "inputs": []
        },
        {
            "type": "function",
            "stateMutability": "view",
            "outputs": [
                {
                    "type": "uint256",
                    "name": "",
                    "internalType": "uint256"
                }
            ],
            "name": "MAX_BEP2_TOTAL_SUPPLY",
            "inputs": []
        },
        {
            "type": "function",
            "stateMutability": "view",
            "outputs": [
                {
                    "type": "uint256",
                    "name": "",
                    "internalType": "uint256"
                }
            ],
            "name": "MAX_GAS_FOR_CALLING_BEP2E",
            "inputs": []
        },
        {
            "type": "function",
            "stateMutability": "view",
            "outputs": [
                {
                    "type": "uint8",
                    "name": "",
                    "internalType": "uint8"
                }
            ],
            "name": "MINIMUM_BEP2E_SYMBOL_LEN",
            "inputs": []
        },
        {
            "type": "function",
            "stateMutability": "view",
            "outputs": [
                {
                    "type": "address",
                    "name": "",
                    "internalType": "address"
                }
            ],
            "name": "RELAYERHUB_CONTRACT_ADDR",
            "inputs": []
        },
        {
            "type": "function",
            "stateMutability": "view",
            "outputs": [
                {
                    "type": "uint8",
                    "name": "",
                    "internalType": "uint8"
                }
            ],
            "name": "SLASH_CHANNELID",
            "inputs": []
        },
        {
            "type": "function",
            "stateMutability": "view",
            "outputs": [
                {
                    "type": "address",
                    "name": "",
                    "internalType": "address"
                }
            ],
            "name": "SLASH_CONTRACT_ADDR",
            "inputs": []
        },
        {
            "type": "function",
            "stateMutability": "view",
            "outputs": [
                {
                    "type": "uint8",
                    "name": "",
                    "internalType": "uint8"
                }
            ],
            "name": "STAKING_CHANNELID",
            "inputs": []
        },
        {
            "type": "function",
            "stateMutability": "view",
            "outputs": [
                {
                    "type": "address",
                    "name": "",
                    "internalType": "address"
                }
            ],
            "name": "SYSTEM_REWARD_ADDR",
            "inputs": []
        },
        {
            "type": "function",
            "stateMutability": "view",
            "outputs": [
                {
                    "type": "address",
                    "name": "",
                    "internalType": "address"
                }
            ],
            "name": "TOKEN_HUB_ADDR",
            "inputs": []
        },
        {
            "type": "function",
            "stateMutability": "view",
            "outputs": [
                {
                    "type": "address",
                    "name": "",
                    "internalType": "address"
                }
            ],
            "name": "TOKEN_MANAGER_ADDR",
            "inputs": []
        },
        {
            "type": "function",
            "stateMutability": "view",
            "outputs": [
                {
                    "type": "uint8",
                    "name": "",
                    "internalType": "uint8"
                }
            ],
            "name": "TRANSFER_IN_CHANNELID",
            "inputs": []
        },
        {
            "type": "function",
            "stateMutability": "view",
            "outputs": [
                {
                    "type": "uint8",
                    "name": "",
                    "internalType": "uint8"
                }
            ],
            "name": "TRANSFER_IN_FAILURE_INSUFFICIENT_BALANCE",
            "inputs": []
        },
        {
            "type": "function",
            "stateMutability": "view",
            "outputs": [
                {
                    "type": "uint8",
                    "name": "",
                    "internalType": "uint8"
                }
            ],
            "name": "TRANSFER_IN_FAILURE_NON_PAYABLE_RECIPIENT",
            "inputs": []
        },
        {
            "type": "function",
            "stateMutability": "view",
            "outputs": [
                {
                    "type": "uint8",
                    "name": "",
                    "internalType": "uint8"
                }
            ],
            "name": "TRANSFER_IN_FAILURE_TIMEOUT",
            "inputs": []
        },
        {
            "type": "function",
            "stateMutability": "view",
            "outputs": [
                {
                    "type": "uint8",
                    "name": "",
                    "internalType": "uint8"
                }
            ],
            "name": "TRANSFER_IN_FAILURE_UNBOUND_TOKEN",
            "inputs": []
        },
        {
            "type": "function",
            "stateMutability": "view",
            "outputs": [
                {
                    "type": "uint8",
                    "name": "",
                    "internalType": "uint8"
                }
            ],
            "name": "TRANSFER_IN_FAILURE_UNKNOWN",
            "inputs": []
        },
        {
            "type": "function",
            "stateMutability": "view",
            "outputs": [
                {
                    "type": "uint8",
                    "name": "",
                    "internalType": "uint8"
                }
            ],
            "name": "TRANSFER_IN_SUCCESS",
            "inputs": []
        },
        {
            "type": "function",
            "stateMutability": "view",
            "outputs": [
                {
                    "type": "uint8",
                    "name": "",
                    "internalType": "uint8"
                }
            ],
            "name": "TRANSFER_OUT_CHANNELID",
            "inputs": []
        },
        {
            "type": "function",
            "stateMutability": "view",
            "outputs": [
                {
                    "type": "address",
                    "name": "",
                    "internalType": "address"
                }
            ],
            "name": "VALIDATOR_CONTRACT_ADDR",
            "inputs": []
        },
        {
            "type": "function",
            "stateMutability": "view",
            "outputs": [
                {
                    "type": "bool",
                    "name": "",
                    "internalType": "bool"
                }
            ],
            "name": "alreadyInit",
            "inputs": []
        },
        {
            "type": "function",
            "stateMutability": "payable",
            "outputs": [
                {
                    "type": "bool",
                    "name": "",
                    "internalType": "bool"
                }
            ],
            "name": "batchTransferOutBNB",
            "inputs": [
                {
                    "type": "address[]",
                    "name": "recipientAddrs",
                    "internalType": "address[]"
                },
                {
                    "type": "uint256[]",
                    "name": "amounts",
                    "internalType": "uint256[]"
                },
                {
                    "type": "address[]",
                    "name": "refundAddrs",
                    "internalType": "address[]"
                },
                {
                    "type": "uint64",
                    "name": "expireTime",
                    "internalType": "uint64"
                }
            ]
        },
        {
            "type": "function",
            "stateMutability": "view",
            "outputs": [
                {
                    "type": "uint256",
                    "name": "",
                    "internalType": "uint256"
                }
            ],
            "name": "bep2eContractDecimals",
            "inputs": [
                {
                    "type": "address",
                    "name": "",
                    "internalType": "address"
                }
            ]
        },
        {
            "type": "function",
            "stateMutability": "nonpayable",
            "outputs": [],
            "name": "bindToken",
            "inputs": [
                {
                    "type": "bytes32",
                    "name": "bep2Symbol",
                    "internalType": "bytes32"
                },
                {
                    "type": "address",
                    "name": "contractAddr",
                    "internalType": "address"
                },
                {
                    "type": "uint256",
                    "name": "decimals",
                    "internalType": "uint256"
                }
            ]
        },
        {
            "type": "function",
            "stateMutability": "view",
            "outputs": [
                {
                    "type": "uint16",
                    "name": "",
                    "internalType": "uint16"
                }
            ],
            "name": "bscChainID",
            "inputs": []
        },
        {
            "type": "function",
            "stateMutability": "nonpayable",
            "outputs": [
                {
                    "type": "uint256",
                    "name": "",
                    "internalType": "uint256"
                }
            ],
            "name": "claimRewards",
            "inputs": [
                {
                    "type": "address",
                    "name": "to",
                    "internalType": "address payable"
                },
                {
                    "type": "uint256",
                    "name": "amount",
                    "internalType": "uint256"
                }
            ]
        },
        {
            "type": "function",
            "stateMutability": "view",
            "outputs": [
                {
                    "type": "bytes32",
                    "name": "",
                    "internalType": "bytes32"
                }
            ],
            "name": "getBep2SymbolByContractAddr",
            "inputs": [
                {
                    "type": "address",
                    "name": "contractAddr",
                    "internalType": "address"
                }
            ]
        },
        {
            "type": "function",
            "stateMutability": "view",
            "outputs": [
                {
                    "type": "string",
                    "name": "",
                    "internalType": "string"
                }
            ],
            "name": "getBoundBep2Symbol",
            "inputs": [
                {
                    "type": "address",
                    "name": "contractAddr",
                    "internalType": "address"
                }
            ]
        },
        {
            "type": "function",
            "stateMutability": "view",
            "outputs": [
                {
                    "type": "address",
                    "name": "",
                    "internalType": "address"
                }
            ],
            "name": "getBoundContract",
            "inputs": [
                {
                    "type": "string",
                    "name": "bep2Symbol",
                    "internalType": "string"
                }
            ]
        },
        {
            "type": "function",
            "stateMutability": "view",
            "outputs": [
                {
                    "type": "address",
                    "name": "",
                    "internalType": "address"
                }
            ],
            "name": "getContractAddrByBEP2Symbol",
            "inputs": [
                {
                    "type": "bytes32",
                    "name": "bep2Symbol",
                    "internalType": "bytes32"
                }
            ]
        },
        {
            "type": "function",
            "stateMutability": "view",
            "outputs": [
                {
                    "type": "uint256",
                    "name": "",
                    "internalType": "uint256"
                }
            ],
            "name": "getMiniRelayFee",
            "inputs": []
        },
        {
            "type": "function",
            "stateMutability": "nonpayable",
            "outputs": [],
            "name": "handleAckPackage",
            "inputs": [
                {
                    "type": "uint8",
                    "name": "channelId",
                    "internalType": "uint8"
                },
                {
                    "type": "bytes",
                    "name": "msgBytes",
                    "internalType": "bytes"
                }
            ]
        },
        {
            "type": "function",
            "stateMutability": "nonpayable",
            "outputs": [],
            "name": "handleFailAckPackage",
            "inputs": [
                {
                    "type": "uint8",
                    "name": "channelId",
                    "internalType": "uint8"
                },
                {
                    "type": "bytes",
                    "name": "msgBytes",
                    "internalType": "bytes"
                }
            ]
        },
        {
            "type": "function",
            "stateMutability": "nonpayable",
            "outputs": [
                {
                    "type": "bytes",
                    "name": "",
                    "internalType": "bytes"
                }
            ],
            "name": "handleSynPackage",
            "inputs": [
                {
                    "type": "uint8",
                    "name": "channelId",
                    "internalType": "uint8"
                },
                {
                    "type": "bytes",
                    "name": "msgBytes",
                    "internalType": "bytes"
                }
            ]
        },
        {
            "type": "function",
            "stateMutability": "nonpayable",
            "outputs": [],
            "name": "init",
            "inputs": []
        },
        {
            "type": "function",
            "stateMutability": "view",
            "outputs": [
                {
                    "type": "uint256",
                    "name": "",
                    "internalType": "uint256"
                }
            ],
            "name": "relayFee",
            "inputs": []
        },
        {
            "type": "function",
            "stateMutability": "payable",
            "outputs": [
                {
                    "type": "bool",
                    "name": "",
                    "internalType": "bool"
                }
            ],
            "name": "transferOut",
            "inputs": [
                {
                    "type": "address",
                    "name": "contractAddr",
                    "internalType": "address"
                },
                {
                    "type": "address",
                    "name": "recipient",
                    "internalType": "address"
                },
                {
                    "type": "uint256",
                    "name": "amount",
                    "internalType": "uint256"
                },
                {
                    "type": "uint64",
                    "name": "expireTime",
                    "internalType": "uint64"
                }
            ]
        },
        {
            "type": "function",
            "stateMutability": "nonpayable",
            "outputs": [],
            "name": "unbindToken",
            "inputs": [
                {
                    "type": "bytes32",
                    "name": "bep2Symbol",
                    "internalType": "bytes32"
                },
                {
                    "type": "address",
                    "name": "contractAddr",
                    "internalType": "address"
                }
            ]
        },
        {
            "type": "function",
            "stateMutability": "nonpayable",
            "outputs": [],
            "name": "updateParam",
            "inputs": [
                {
                    "type": "string",
                    "name": "key",
                    "internalType": "string"
                },
                {
                    "type": "bytes",
                    "name": "value",
                    "internalType": "bytes"
                }
            ]
        },
        {
            "type": "receive",
            "stateMutability": "payable"
        }
    ]).at('0x0000000000000000000000000000000000001004');
console.log("TokenHub", tokenHub);

const transferButton = document.getElementById('transfer');

transferButton.addEventListener('click', () => {
    try {
        ethereum.enable();
    } catch (error) {
        console.log(error)
    }
    tokenHub.transferOut.sendTransaction({
        contractAddr: "0x0000000000000000000000000000000000000000",
        recipient: "0x" + toHexString(bech32.decode($(".ether").val()).data),
        amount: 1,
        expireTime: 1
    }, function (error, result) { //get callback from function which is your transaction key
        if (!error) {
            console.log("result", result);

        } else {
            console.log("error", error);
        }
    });

});

const balanceButton = document.getElementById('balance');

balanceButton.addEventListener('click', () => {
    try {
        ethereum.enable();
    } catch (error) {
        console.log(error)
    }
    tokenHub.getHolding.call(web3.eth.accounts[0], {
        from: web3.eth.accounts[0],
    }, function (error, result) { //get callback from function which is your transaction key
        if (!error) {
            console.log("result", result);
            document.getElementById("tokens").innerHTML = "you own " + result.c[0] + " tokens!";
        } else {
            console.log("error", error);
        }
    });

});