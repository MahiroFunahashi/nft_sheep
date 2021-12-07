import { Contract, providers, utils, BigNumber } from "ethers";
const ADDRESS = "0xae05b31e679a3b352d8493c09dcce739da5b2070";
const ABI = [
  { inputs: [], stateMutability: "nonpayable", type: "constructor" },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "previousOwner",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "newOwner",
        type: "address",
      },
    ],
    name: "OwnershipTransferred",
    type: "event",
  },
  {
    inputs: [{ internalType: "uint256", name: "tokenId", type: "uint256" }],
    name: "compileAttributes",
    outputs: [{ internalType: "string", name: "", type: "string" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [{ internalType: "uint256", name: "tokenId", type: "uint256" }],
    name: "drawSVG",
    outputs: [{ internalType: "string", name: "", type: "string" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "owner",
    outputs: [{ internalType: "address", name: "", type: "address" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "renounceOwnership",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [{ internalType: "address", name: "_woolf", type: "address" }],
    name: "setWoolf",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [{ internalType: "uint256", name: "tokenId", type: "uint256" }],
    name: "tokenURI",
    outputs: [{ internalType: "string", name: "", type: "string" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      { internalType: "uint8", name: "", type: "uint8" },
      { internalType: "uint8", name: "", type: "uint8" },
    ],
    name: "traitData",
    outputs: [
      { internalType: "string", name: "name", type: "string" },
      { internalType: "string", name: "png", type: "string" },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [{ internalType: "address", name: "newOwner", type: "address" }],
    name: "transferOwnership",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      { internalType: "uint8", name: "traitType", type: "uint8" },
      { internalType: "uint8[]", name: "traitIds", type: "uint8[]" },
      {
        components: [
          { internalType: "string", name: "name", type: "string" },
          { internalType: "string", name: "png", type: "string" },
        ],
        internalType: "struct Traits.Trait[]",
        name: "traits",
        type: "tuple[]",
      },
    ],
    name: "uploadTraits",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "woolf",
    outputs: [{ internalType: "contract IWoolf", name: "", type: "address" }],
    stateMutability: "view",
    type: "function",
  },
];

const values = [
  [15, 50, 200, 250, 255],
  [
    190, 215, 240, 100, 110, 135, 160, 185, 80, 210, 235, 240, 80, 80, 100, 100,
    100, 245, 250, 255,
  ],
  [255, 30, 60, 60, 150, 156],
  [
    221, 100, 181, 140, 224, 147, 84, 228, 140, 224, 250, 160, 241, 207, 173,
    84, 254, 220, 196, 140, 168, 252, 140, 183, 236, 252, 224, 255,
  ],
  [175, 100, 40, 250, 115, 100, 185, 175, 180, 255],
  [80, 225, 227, 228, 112, 240, 64, 160, 167, 217, 171, 64, 240, 126, 80, 255],
  [255],
  [
    243, 189, 133, 133, 57, 95, 152, 135, 133, 57, 222, 168, 57, 57, 38, 114,
    114, 114, 255,
  ],
  [255],
  [210, 90, 9, 9, 9, 150, 9, 255, 9],
  [255],
  [255],
  // [
  //   135, 177, 219, 141, 183, 225, 147, 189, 231, 135, 135, 135, 135, 246, 150,
  //   150, 156, 165, 171, 180, 186, 195, 201, 210, 243, 252, 255,
  // ],
  // [255],
  // [239, 244, 249, 234, 234, 234, 234, 234, 234, 234, 130, 255, 247],
  // [75, 180, 165, 120, 60, 150, 105, 195, 45, 225, 75, 45, 195, 120, 255],
  // [255],
  // [8, 160, 73, 255],
];

export const _isMetaMaskInstalled = () => {
  if (typeof window === "undefined") return;
  const { ethereum } = window;
  return Boolean(ethereum && ethereum.isMetaMask);
};

export const _getProvider = () => {
  if (!_isMetaMaskInstalled()) return null;
  return new providers.Web3Provider(window.ethereum);
};

export const getStatus = async () => {
  const provider = _getProvider();
  if (!provider) throw new Error("Unable to connect to wallet");

  const signer = provider.getSigner();
  const contract = new Contract(ADDRESS, ABI, signer);

  let res={};
  for (let i = 0; i < values.length; i++) {
    const element = values[i];
    console.log('#####  ',i)
    let res1={}
    for (let j = 0; j < element.length; j++) {
      let pub = await contract.traitData(i+12,j);
    // console.log(' ',i,',',j);
    // console.log(pub);
      res1[j] = pub;
      
    }
    console.log(res1)
  }
  console.log(res)
};
