import { createThirdwebClient, defineChain } from "thirdweb";
import { getContract } from "thirdweb";
import { sepolia } from "thirdweb/chains";
export const configs = {
    // baseURL: "https://subenbackend.onrender.com/"
    baseURL: "http://localhost:5000",
    // baseURL : "https://server-iccq.onrender.com"
}

export const colors = {
    main: "#1877F2"
}

export const GIFJSON = {
    Welcome: require("../asset/Json/welcome.json"),
    Typing : require("../asset/Json/typing.json")
}

export  const client = createThirdwebClient({
    clientId: "7ac3942a502316c71119e590615197d5",
});

export const chain = defineChain(sepolia);

const contractAddress = "0x29FEcd38fe927F1715EE208e66ED53Db3F4E15d1"
const contractABI = [
    {
      "type": "function",
      "name": "campaigns",
      "inputs": [
        {
          "type": "uint256",
          "name": "",
          "internalType": "uint256"
        }
      ],
      "outputs": [
        {
          "type": "address",
          "name": "owner",
          "internalType": "address"
        },
        {
          "type": "string",
          "name": "title",
          "internalType": "string"
        },
        {
          "type": "string",
          "name": "description",
          "internalType": "string"
        },
        {
          "type": "uint256",
          "name": "target",
          "internalType": "uint256"
        },
        {
          "type": "uint256",
          "name": "deadline",
          "internalType": "uint256"
        },
        {
          "type": "uint256",
          "name": "amountCollected",
          "internalType": "uint256"
        },
        {
          "type": "string",
          "name": "image",
          "internalType": "string"
        }
      ],
      "stateMutability": "view"
    },
    {
      "type": "function",
      "name": "createCampaign",
      "inputs": [
        {
          "type": "address",
          "name": "_owner",
          "internalType": "address"
        },
        {
          "type": "string",
          "name": "_title",
          "internalType": "string"
        },
        {
          "type": "string",
          "name": "_description",
          "internalType": "string"
        },
        {
          "type": "uint256",
          "name": "_target",
          "internalType": "uint256"
        },
        {
          "type": "uint256",
          "name": "_deadline",
          "internalType": "uint256"
        },
        {
          "type": "string",
          "name": "_image",
          "internalType": "string"
        }
      ],
      "outputs": [
        {
          "type": "uint256",
          "name": "",
          "internalType": "uint256"
        }
      ],
      "stateMutability": "nonpayable"
    },
    {
      "type": "function",
      "name": "donateToCampaign",
      "inputs": [
        {
          "type": "uint256",
          "name": "_id",
          "internalType": "uint256"
        }
      ],
      "outputs": [],
      "stateMutability": "payable"
    },
    {
      "type": "function",
      "name": "getAllCampaignsUser",
      "inputs": [
        {
          "type": "address",
          "name": "_owner",
          "internalType": "address"
        }
      ],
      "outputs": [
        {
          "type": "tuple[]",
          "name": "",
          "components": [
            {
              "type": "address",
              "name": "owner",
              "internalType": "address"
            },
            {
              "type": "string",
              "name": "title",
              "internalType": "string"
            },
            {
              "type": "string",
              "name": "description",
              "internalType": "string"
            },
            {
              "type": "uint256",
              "name": "target",
              "internalType": "uint256"
            },
            {
              "type": "uint256",
              "name": "deadline",
              "internalType": "uint256"
            },
            {
              "type": "uint256",
              "name": "amountCollected",
              "internalType": "uint256"
            },
            {
              "type": "string",
              "name": "image",
              "internalType": "string"
            },
            {
              "type": "address[]",
              "name": "donators",
              "internalType": "address[]"
            },
            {
              "type": "uint256[]",
              "name": "donations",
              "internalType": "uint256[]"
            }
          ],
          "internalType": "struct SocialMedia.Campaign[]"
        }
      ],
      "stateMutability": "view"
    },
    {
      "type": "function",
      "name": "getCampaigns",
      "inputs": [],
      "outputs": [
        {
          "type": "tuple[]",
          "name": "",
          "components": [
            {
              "type": "address",
              "name": "owner",
              "internalType": "address"
            },
            {
              "type": "string",
              "name": "title",
              "internalType": "string"
            },
            {
              "type": "string",
              "name": "description",
              "internalType": "string"
            },
            {
              "type": "uint256",
              "name": "target",
              "internalType": "uint256"
            },
            {
              "type": "uint256",
              "name": "deadline",
              "internalType": "uint256"
            },
            {
              "type": "uint256",
              "name": "amountCollected",
              "internalType": "uint256"
            },
            {
              "type": "string",
              "name": "image",
              "internalType": "string"
            },
            {
              "type": "address[]",
              "name": "donators",
              "internalType": "address[]"
            },
            {
              "type": "uint256[]",
              "name": "donations",
              "internalType": "uint256[]"
            }
          ],
          "internalType": "struct SocialMedia.Campaign[]"
        }
      ],
      "stateMutability": "view"
    },
    {
      "type": "function",
      "name": "getDonators",
      "inputs": [
        {
          "type": "uint256",
          "name": "_id",
          "internalType": "uint256"
        }
      ],
      "outputs": [
        {
          "type": "address[]",
          "name": "",
          "internalType": "address[]"
        },
        {
          "type": "uint256[]",
          "name": "",
          "internalType": "uint256[]"
        }
      ],
      "stateMutability": "view"
    },
    {
      "type": "function",
      "name": "numberOfCampaigns",
      "inputs": [],
      "outputs": [
        {
          "type": "uint256",
          "name": "",
          "internalType": "uint256"
        }
      ],
      "stateMutability": "view"
    }
  ] as const;

export const CONTRACT = getContract({
    client,
    chain,
    address: contractAddress,
    abi: contractABI,
})
