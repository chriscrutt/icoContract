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

function hexify(utf) {
    let yo = utf
        .split("")
        .map((c) => c.charCodeAt(0).toString(16).padStart(2, "0"))
        .join("");

    if (yo != "") {
        return "0x" + yo;
    } else {
        return "";
    }
}

const sendEthButton = document.querySelector("#sendEthButton");

//Sending Ethereum to an address
sendEthButton.addEventListener("click", () => {
    ethereum
        .request({
            method: "eth_sendTransaction",
            params: [
                {
                    from: ethereum.selectedAddress,
                    to: document.querySelector("#to").value,
                    value:
                        "0x" +
                        (
                            document.querySelector("#ether").value *
                            10 ** 18
                        ).toString(16),
                    // gasPrice: '0x09184e72a000',
                    gas: "0x33450",
                    data: hexify(document.querySelector("#message").value),
                },
            ],
        })
        .then((txHash) => console.log(txHash))
        .catch((error) => console.error);
});
