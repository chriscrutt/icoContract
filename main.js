window.addEventListener("load", function () {
    if (typeof window.ethereum === "undefined") {
        document.querySelector("#connect").innerHTML = "Requires MetaMask";
        document.querySelector("#connect").style.background = "yellow";
        document.querySelector("#mask").style.display = "block";
        console.log("nooooo");
    }
});

function colorStuff() {
    if (typeof window.ethereum !== "undefined") {
        console.log("MetaMask is installed!");
        if (ethereum.selectedAddress === null) {
            document.querySelector("#connect").style.background = "";
            document.querySelector("#connect").innerHTML =
                "Connect to MetaMask";
        } else {
            document.querySelector("#connect").style.background = "lightgreen";
            document.querySelector("#connect").innerHTML =
                "Connected to MetaMask!";
        }
    }
}

ethereum.on("accountsChanged", function (accounts) {
    colorStuff();
});

const ethereumButton = document.querySelector("#connect");

ethereumButton.addEventListener("click", () => {
    ethereum.request({ method: "eth_requestAccounts" });
});

////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////

const sendEthButton = document.querySelector("#sendEthButton");

//Sending Ethereum to an address
sendEthButton.addEventListener("click", () => {
    ethereum
        .request({
            method: "eth_sendTransaction",
            params: [
                {
                    from: ethereum.selectedAddress,
                    to: ethereum.selectedAddress,
                    //   value: '0x29a2241af62c0000',
                    //   gasPrice: '0x09184e72a000',
                    //   gas: '0x2710',
                    data: "0x646179756d6d6d207768617427732075703f",
                },
            ],
        })
        .then((txHash) => console.log(txHash))
        .catch((error) => console.error);
});