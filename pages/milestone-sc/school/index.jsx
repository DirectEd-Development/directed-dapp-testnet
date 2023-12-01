import { useState } from "react";
import { useRouter } from "next/router";
import * as L from "lucid-cardano";
import { Button, Layout, Meta } from "../../../components";
import { checkSchoolCredentials } from "../../api/lucid/pkh";
import { mintStudentToken } from "../../api/lucid/functions";

const school = () => {
  // const router = useRouter();
  const [address, setAddress] = useState("");

  const handleWalletAddress = (event) => {
    setAddress(event.target.value);
  };

  const handleLucid = async () => {
    try {
      console.log(`User ${address} tokens`);

      const lucid = await L.Lucid.new(
        new L.Blockfrost(
          "https://cardano-preprod.blockfrost.io/api/v0",
          "preprodkVTexzRSG7nvhxXWegyOulGyNmSJyhx5"
        ),
        "Preprod"
      );
      
      const api = await window.cardano.eternl.enable();
      lucid.selectWallet(api);
      const authaddress = await lucid.wallet.address();
      const details = await lucid.utils.getAddressDetails(authaddress);
      const pkh = details.paymentCredential.hash;
      console.log(details);
      const isTrue = checkSchoolCredentials(pkh);
      console.log(isTrue);

      const utxos = await lucid.wallet.getUtxos();
      console.log("UTxOs in the wallet:", utxos);

      if (isTrue) {
        const tx = await mintStudentToken(lucid, address);
        if (tx) {
          console.log("Token minted successfully!");
          // Redirect or perform other actions as needed.
        } else {
          console.error("Error minting token. Check console logs for details.");
        }
      } else {
        console.error("Invalid school credentials.");
      }
    } catch (error) {
      console.error("An error occurred:", error);
    }
  };

  return (
    <Layout>
      <Meta
        title="School Page"
        description="Welcome, Authority! Enter the authority address below to mint the required token."
      />
      <div className="school-page">
        <h1>Welcome, School!</h1>
        <p>Mint the required tokens by entering the School address below:</p>
        <input
          type="text"
          placeholder="Enter student address"
          value={address}
          onChange={handleWalletAddress}
        />
        <div className="school-page__buttons">
          <Button variant="primary" onClick={handleLucid} disabled={!address}>
            Mint Tokens
          </Button>
        </div>
      </div>
    </Layout>
  );
};

export default school;
