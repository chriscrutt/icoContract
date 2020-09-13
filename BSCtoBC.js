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

                throw "must be a uint number";

            }

        }
        catch (err) {
            $(".token").val(err);
        }

    });

    // try {
    //     ethereum.enable();
    // } catch (error) {
    //     console.log(error)
    // }

});

web3.eth.defaultAccount = web3.eth.accounts[0];
web3.eth.contract.defaultAccount = web3.eth.accounts[0];

// console.log("TokenHub", tokenHub);

const transferButton = document.getElementById('transfer');

transferButton.addEventListener('click', () => {

    console.log("transfer button clicked");

    try {
        ethereum.enable();
    } catch (error) {
        console.log(error)
    }

    // tokenHub.transferOut.sendTransaction({
    //     contractAddr: "0x0000000000000000000000000000000000000000",
    //     recipient: "0x" + toHexString(bech32.decode($(".ether").val()).data),
    //     amount: $(".token").val() * 10 ** 18,
    //     expireTime: Date.now() + 210
    // }, function (error, result) { //get callback from function which is your transaction key
    //     if (!error) {
    //         console.log("result", result);

    //     } else {
    //         console.log("error", error);
    //     }
    // });

    tokenHub.transferOut.sendTransaction({
        contractAddr: "0x0000000000000000000000000000000000000000",
        recipient: "0x116be72273692a2c2ac04e35846f4360445eaaad",
        amount: 100000000000000000,
        expireTime: 1599965869
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