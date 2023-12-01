import { useState } from "react";
import { useRouter } from "next/router";
import * as L from "lucid-cardano";
import { Button, Layout, Meta } from "../../../components";
import { checkTutorCredentials } from "../../api/lucid/pkh";
import { mintAcceptanceToken } from "../../api/lucid/functions";

const examiner = () => {
  const router = useRouter();
  const [address, setAddress] = useState("");

  const handleWalletAddress = (event) => {
    setAddress(event.target.value);
  };

  const handleLucid = async () => {
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
    const isTrue = checkTutorCredentials(pkh);
    console.log(isTrue);
    if (isTrue) {
      const tx = await mintAcceptanceToken(lucid, address);
      console.log(tx);
    }
    // Redirect to another page after minting (e.g., a success page)
    // router.push('/mint-success');
  };

  return (
    <Layout>
      <Meta
        title="Examiner Page"
        description="Welcome, Examiner! Enter the Examiner address below to mint the required token."
      />
      <div className="school-page">
        <h1>Welcome, Examiner!</h1>
        <p>Mint the required tokens by entering the Examiner address below:</p>
        <input
          type="text"
          placeholder="Enter student address"
          value={address}
          onChange={handleWalletAddress}
        />
        <div className="examiner-page__buttons">
          <Button variant="primary" onClick={handleLucid} disabled={!address}>
            Mint Tokens
          </Button>
        </div>
      </div>
    </Layout>
  );
};

export default examiner;
