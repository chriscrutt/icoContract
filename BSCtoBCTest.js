function toHexString(byteArray) {
    return Array.prototype.map.call(byteArray, function (byte) {
        return ('0' + (byte & 0xFF).toString(16)).slice(-2);
    }).join('');
}

var myEther;

$(window).load(function () {

    if (web3.currentProvider) {
        console.log(web3.currentProvider);
    } else {
        document.getElementById("mask").style.display = "block";
    }

    if (!web3.eth.accounts[0]) {
        document.getElementById('transfer').innerHTML = "connect to web3"
    } else if (web3.version.network == 56) {
        alert("seems you're on the main network! Switching pages");
        window.location.replace("./BSCtoBC.html");
    } else {
        document.getElementById('transfer').innerHTML = "transfer"
    }

    $(".ether").change(function () {

        try {
            // tbnb1z947wgnndy4zc2kqfc6cgm6rvpz9a24d445ecp
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

            } else if ($(".token").val() >= 0.01000001) {

                console.log($(".token").val() * 10 ** 18);

            } else {

                throw "must be a number";

            }

        }
        catch (err) {
            $(".token").val(err);
        }

    });

});

var tokenHub = web3.eth.contract(abi).at(contract_address);

// console.log("TokenHub", tokenHub);

const transferButton = document.getElementById('transfer');

transferButton.addEventListener('click', () => {

    console.log("transfer button clicked");

    try {

        async function checkEth() {
            await ethereum.enable();

            if (web3.version.network == 56) {
                alert("seems you're on the main network! Switching pages");
                window.location.replace("./BSCtoBC.html");
                throw "not on testnet";
            } else if (web.version.network != 97) {
                alert("seems you're not on Binance's test or main net! here's more details");
                window.open("https://docs.binance.org/smart-chain/wallet/metamask.html");
                throw "not on test or main";
            }

            web3.eth.defaultAccount = web3.eth.accounts[0];
            web3.eth.contract.defaultAccount = web3.eth.accounts[0];

            if (web3.eth.accounts[0]) {
                document.getElementById('transfer').innerHTML = "transfer"
            }

        }

        checkEth();

    } catch (error) {
        return console.log(error);
    }

    tokenHub.transferOut.sendTransaction(
        /*contractAddr: */"0x0000000000000000000000000000000000000000",
        /*recipient: */"0x" + toHexString(bech32.decode($(".ether").val()).data),
        /*amount: */$(".token").val() * 10 ** 18 - 10 ** 16,
        /*expireTime: */Date.now() + 210,
        { value: $(".token").val() * 10 ** 18 },
        function (error, result) { //get callback from function which is your transaction key
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

        async function checkEth() {
            await ethereum.enable();
            web3.eth.defaultAccount = web3.eth.accounts[0];
            web3.eth.contract.defaultAccount = web3.eth.accounts[0];

            if (web3.eth.accounts[0]) {
                document.getElementById('transfer').innerHTML = "transfer"
            }

        }

        checkEth();

    } catch (error) {
        console.log(error)
    }

    web3.eth.getBalance(web3.eth.defaultAccount, function (error, wei) {
        if (!error) {
            var balance = web3.fromWei(wei, 'ether');
            document.getElementById("tokens").innerHTML = "you own " + balance + " BNB!";
        } else {
            console.log("error", error);
        }
    });

});