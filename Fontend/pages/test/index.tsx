import { chain, client, CONTRACT } from "@/utils/constant";
import React from "react";
import { ConnectButton, lightTheme, useActiveAccount } from "thirdweb/react";
import {
  useDisconnect,
  useActiveWallet,
  TransactionButton,
} from "thirdweb/react";
import { createThirdwebClient, prepareContractCall } from "thirdweb";
import { createWallet, injectedProvider } from "thirdweb/wallets";
const Test = () => {
  const clientConnect = createThirdwebClient({
    clientId: client.clientId,
  });
  const metamask = createWallet("io.metamask");
  const account = useActiveAccount();
  const { disconnect } = useDisconnect();
  const wallet = useActiveWallet();
  console.log("wallet", wallet);
  console.log("wallet address", account?.address);
  const handleConnect = async () => {
    alert("connect");
    if (injectedProvider("io.metamask")) {
      await metamask.connect({ client });
    }
  };
  // const { data, isLoading } = useReadContract({
  //   contract: CONTRACT,
  //   method: "getCampaigns",
  // });

  // how i use Create Campaign
  const customTheme = lightTheme({
    colors: {
      modalBg: "red",
    },
  });
  return (
    <>
      {/* <ConnectButton client={client} /> */}
      <button>
        <ConnectButton
          client={client}
          // i wanna theme opacity 0
          theme={customTheme}
        />
      </button>
      {/* <div>
      <button
        onClick={() => handleConnect()}
        className="bg-blue-500 text-white p-2 rounded-md"
      >
        Connect
      </button>
      <TransactionButton
        transaction={() =>
          prepareContractCall({
            contract: CONTRACT,
            method: "createCampaign",
            params: ["0x", "test", "test", BigInt(100), BigInt(100), "test"],
          })
        }
        onTransactionSent={(tx) => console.log(tx)}
      >
        Create Campaign
      </TransactionButton>
    </div> */}
    </>
  );
};

export default Test;
