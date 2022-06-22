window.addEventListener("load", function () {
    if (typeof window.ethereum === "undefined") {
        document.querySelector("#connect").innerHTML = "Requires MetaMask";
        document.querySelector("#connect").style.background = "yellow";
        document.querySelector("#mask").style.display = "block";
        console.log("nooooo");
    } else {
        colorStuff();
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

// A Web3Provider wraps a standard Web3 provider, which is
// what MetaMask injects as window.ethereum into each page
const provider = new ethers.providers.Web3Provider(window.ethereum);

ethereumButton.addEventListener("click", () => {
    // ethereum.request({ method: "eth_requestAccounts" });
    provider.send("eth_requestAccounts", []);
});

const signer = provider.getSigner();

////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////

const etherBalanceButton = document.querySelector("#etherBalanceButton");

etherBalanceButton.addEventListener("click", async () => {
    balance = await provider.getBalance(signer.getAddress());
    document.querySelector("#etherBalance").innerHTML =
        ethers.utils.formatEther(balance) + " Ether";
    document.querySelector("#etherBalance").style.display = "block";
});

////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////

function hexify(utf) {
    let yo = utf
        .split("")
        .map((c) => c.charCodeAt(0).toString(16).padStart(2, "0"))
        .join("");

    return "0x" + yo;
}

const sendEthButton = document.querySelector("#sendEthButton");

//Sending Ethereum to an address
sendEthButton.addEventListener("click", async () => {
    const tx = signer
        .sendTransaction({
            to: await provider.resolveName(document.querySelector("#to").value),
            value: ethers.utils.parseEther(
                document.querySelector("#ether").value
            ),
            data: hexify(document.querySelector("#message").value),
        })
        .then((txHash) => {
            document.querySelector("#sendEth").innerHTML = txHash.hash;
            document.querySelector("#sendEth").style.display = "block";
            document.querySelector("#sendEth").href += txHash.hash;
        })
        .catch((error) => console.error);
});

////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////

// A Human-Readable ABI; for interacting with the contract, we
// must include any fragment we wish to use
const abi = [
    // Read-Only Functions
    "function balanceOf(address owner) view returns (uint256)",
    "function decimals() view returns (uint8)",
    "function symbol() view returns (string)",

    // Authenticated Functions
    "function transfer(address to, uint amount) returns (bool)",

    // Events
    "event Transfer(address indexed from, address indexed to, uint amount)",
];

// This can be an address or an ENS name
const address = "0x04DF6e4121c27713ED22341E7c7Df330F56f289B";

// Read-Only; By connecting to a Provider, allows:
// - Any constant function
// - Querying Filters
// - Populating Unsigned Transactions for non-constant methods
// - Estimating Gas for non-constant (as an anonymous sender)
// - Static Calling non-constant methods (as anonymous sender)
const erc20 = new ethers.Contract(address, abi, provider);

// Read-Write; By connecting to a Signer, allows:
// - Everything from Read-Only (except as Signer, not anonymous)
// - Sending transactions for non-constant functions
const erc20_rw = new ethers.Contract(address, abi, signer);

const daiBalanceButton = document.querySelector("#daiBalanceButton");

daiBalanceButton.addEventListener("click", async () => {
    const num = erc20
        .balanceOf(signer.getAddress())
        .then(async (p) => {
            yo = await p;
            document.querySelector("#daiBalance").innerHTML = 
                ethers.utils.formatUnits(p._hex, await erc20.decimals()) + " DAI";
            document.querySelector("#daiBalance").style.display = "block";
        })
        .catch((error) => console.error);
});