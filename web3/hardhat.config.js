/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: {
    version: "0.8.9",
    defaultNetwork: "sepolia", // Đổi mạng mặc định thành 'sepolia'
    networks: {
      hardhat: {},
      sepolia: {
        // Đặt tên mạng mới là 'sepolia'
        url: "https://rpc.ankr.com/eth_sepolia", // Đổi URL RPC
        // accounts: [`0x5676c7b6794e6c38b1e9c009b761403a1a24cafecda9a9dc12bfbfe15e3a46f4`]
        accounts: [
          `0b9a78d63bb6187f30afad1abfc3f3d685df6f2ba9a46922bb48769cafe0c21d`,
        ],
      },
    },
    settings: {
      optimizer: {
        enabled: true,
        runs: 200,
      },
    },
  },
};
