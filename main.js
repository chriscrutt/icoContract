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
        $(".token").val(Math.round($(".ether").val() * 625));
        $(".ether").val($(".token").val() / 625);
        myEther = $(".ether").val();
    });
    $(".token").change(function () {
        $(".ether").val($(".token").val() / 625);
        myEther = $(".ether").val();
    });
});

web3.eth.defaultAccount = web3.eth.accounts[0];

var icoContract =
    web3.eth.contract([{
        "name": "Buy",
        "inputs": [{
            "type": "address",
            "name": "_buyer",
            "indexed": true
        }, {
            "type": "uint256",
            "name": "_buy_order",
            "indexed": false
        }],
        "anonymous": false,
        "type": "event"
    }, {
        "name": "Pay",
        "inputs": [{
            "type": "address",
            "name": "_vendor",
            "indexed": true
        }, {
            "type": "uint256",
            "name": "_amount",
            "indexed": false
        }],
        "anonymous": false,
        "type": "event"
    }, {
        "outputs": [],
        "inputs": [{
            "type": "address",
            "name": "_tokenAddress"
        }],
        "constant": false,
        "payable": false,
        "type": "constructor"
    }, {
        "name": "mintIt",
        "outputs": [],
        "inputs": [{
            "type": "address",
            "name": "_to"
        }, {
            "type": "uint256",
            "name": "_value"
        }],
        "constant": false,
        "payable": false,
        "type": "function",
        "gas": 4509
    }, {
        "name": "burnIt",
        "outputs": [],
        "inputs": [{
            "type": "uint256",
            "name": "_value"
        }],
        "constant": false,
        "payable": false,
        "type": "function",
        "gas": 60388
    }, {
        "name": "transferIt",
        "outputs": [],
        "inputs": [{
            "type": "address",
            "name": "_to"
        }, {
            "type": "uint256",
            "name": "_value"
        }],
        "constant": false,
        "payable": false,
        "type": "function",
        "gas": 5132
    }, {
        "name": "stockAvailable",
        "outputs": [{
            "type": "uint256",
            "name": ""
        }],
        "inputs": [],
        "constant": true,
        "payable": false,
        "type": "function",
        "gas": 5322
    }, {
        "name": "buyStock",
        "outputs": [],
        "inputs": [],
        "constant": false,
        "payable": true,
        "type": "function",
        "gas": 8629
    }, {
        "name": "getHolding",
        "outputs": [{
            "type": "uint256",
            "name": ""
        }],
        "inputs": [{
            "type": "address",
            "name": "_stockholder"
        }],
        "constant": true,
        "payable": false,
        "type": "function",
        "gas": 4852
    }, {
        "name": "cash",
        "outputs": [{
            "type": "uint256",
            "name": ""
        }],
        "inputs": [],
        "constant": true,
        "payable": false,
        "type": "function",
        "gas": 623
    }, {
        "name": "payBill",
        "outputs": [],
        "inputs": [{
            "type": "address",
            "name": "vendor"
        }, {
            "type": "uint256",
            "name": "amount"
        }],
        "constant": false,
        "payable": false,
        "type": "function",
        "gas": 38231
    }, {
        "name": "price",
        "outputs": [{
            "type": "uint256",
            "name": ""
        }],
        "inputs": [],
        "constant": true,
        "payable": false,
        "type": "function",
        "gas": 1481
    }, {
        "name": "owner",
        "outputs": [{
            "type": "address",
            "name": ""
        }],
        "inputs": [],
        "constant": true,
        "payable": false,
        "type": "function",
        "gas": 1511
    }]).at('0xb2a6e559558f817d81503968e62ec7e4c6afe694');
console.log("icoContract", icoContract);

const buyButton = document.getElementById('buy');

buyButton.addEventListener('click', () => {
    try {
        ethereum.enable();
    } catch (error) {
        console.log(error)
    }
    icoContract.buyStock.sendTransaction({
        from: web3.eth.accounts[0],
        value: myEther * 10 ** 18,
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
    icoContract.getHolding.call(web3.eth.accounts[0], {
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