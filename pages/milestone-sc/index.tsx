// pages/minting.tsx
import { useEffect, useState } from 'react';
import axios from 'axios';
import Head from 'next/head';
import * as L from 'lucid-cardano';

const acceptanceTokenPolicyID = "a1deebd26b685e6799218f60e2cad0a80928c4145d12f1bf49aebab5";

async function loadCardano(): Promise<L.Lucid | null> {
  const eternl = (window as any).cardano?.eternl;
  if (!eternl) {
    // Retry after a short delay if Eternl is not available yet
    return new Promise((resolve) => setTimeout(() => resolve(loadCardano()), 200));
  } else {
    const api = await eternl.enable();
    console.log('Eternl enabled');
    const lucid = await L.Lucid.new(
      new L.Blockfrost(
        "https://cardano-preprod.blockfrost.io/api/v0",
        "preprodkVTexzRSG7nvhxXWegyOulGyNmSJyhx5"
      ),
      "Preprod"
    );
    console.log('Lucid active');
    lucid.selectWallet(api);
    return lucid;
  }
}

// Define the acceptanceToken plutus script
const acceptanceTokenScript: L.MintingPolicy = {
  type: "PlutusV2",
  script: "590a37590a340100003323322332232323232323232323232323232332232323232323232323232222323253353232323233355300b120013233500d223335003220020020013500122001123300122533500210011028027235001223225335333573466e20005200002b02a102b15335333573466e24005200002a02b1533553353235001222222222222533533355301d12001501c25335333573466e3c0700040e40e04d40a00045409c010840e440dd401c40ac4cd5ce2481196e6f74207369676e656420627920696e737469747574696f6e0002a153355335533533355301012001500f25335333573466e24c8c8c8c00400cc8004d540bc88cd400520002235002225335333573466e3c00801c0d00cc4c02c0044c01800d4020d4004888800d200002b02c13501b0011501a35500722222222222200a21353500122220042233500223501e0012501d1501921333573466e3c0100040b00ac40a840ac4cd5ce24811a6d7573742073656e6420746f2073706563696669656420706b680002a102a102a3200135502a223350014800088d4008894cd4ccd5cd19b8f00200702f02e10011300600333355300d120012253353500222232333573466e3c0100040b00ad40184cd409400800440054090c8cc0894094004d540088888888888880204d4cccd4d40088800498848c004008989880044d400488008cccd5cd19b8735573aa0069000119910919800801801191919191919191919191919191999ab9a3370e6aae754031200023333333333332222222222221233333333333300100d00c00b00a00900800700600500400300233501a01b35742a01866a0340366ae85402ccd4068070d5d0a805199aa80f3ae501d35742a012666aa03ceb94074d5d0a80419a80d0129aba150073335501e02675a6ae854018c8c8c8cccd5cd19b8735573aa004900011991091980080180118061aba150023005357426ae8940088c98c8050cd5ce00a80a00909aab9e5001137540026ae854014ccd54021d728039aba150033232323333573466e1cd55cea8012400046644246600200600466a060eb4d5d0a80118189aba135744a004464c6406666ae700d00cc0c44d55cf280089baa001357426ae8940088c98c80bccd5ce01801781689aab9e5001137540024646464646666ae68cdc39aab9d5004480008cccc888848cccc00401401000c008c8c8c8cccd5cd19b8735573aa0049000119910919800801801180a9aba1500233500d014357426ae8940088c98c8064cd5ce00d00c80b89aab9e5001137540026ae854010ccd54021d728039aba150033232323333573466e1d4005200423212223002004357426aae79400c8cccd5cd19b875002480088c848888c004014c01cd5d09aab9e500323333573466e1d400920042321222230020053009357426aae7940108cccd5cd19b875003480088c848888c004014c01cd5d09aab9e500523333573466e1d40112000232122223003005375c6ae84d55cf280311931900819ab9c01101000e00d00c00b135573aa00226ea80048c8c8cccd5cd19b8735573aa004900011991091980080180118029aba15002375a6ae84d5d1280111931900619ab9c00d00c00a135573ca00226ea80048c8cccd5cd19b8735573aa002900011bae357426aae7940088c98c8028cd5ce00580500409baa001232323232323333573466e1d4005200c21222222200323333573466e1d4009200a21222222200423333573466e1d400d2008233221222222233001009008375c6ae854014dd69aba135744a00a46666ae68cdc3a8022400c4664424444444660040120106eb8d5d0a8039bae357426ae89401c8cccd5cd19b875005480108cc8848888888cc018024020c030d5d0a8049bae357426ae8940248cccd5cd19b875006480088c848888888c01c020c034d5d09aab9e500b23333573466e1d401d2000232122222223005008300e357426aae7940308c98c804ccd5ce00a00980880800780700680600589aab9d5004135573ca00626aae7940084d55cf280089baa0012323232323333573466e1d400520022333222122333001005004003375a6ae854010dd69aba15003375a6ae84d5d1280191999ab9a3370ea0049000119091180100198041aba135573ca00c464c6401866ae700340300280244d55cea80189aba25001135573ca00226ea80048c8c8cccd5cd19b875001480088c8488c00400cdd71aba135573ca00646666ae68cdc3a8012400046424460040066eb8d5d09aab9e500423263200933573801401200e00c26aae7540044dd500089119191999ab9a3370ea00290021091100091999ab9a3370ea00490011190911180180218031aba135573ca00846666ae68cdc3a801a400042444004464c6401466ae7002c02802001c0184d55cea80089baa0012323333573466e1d40052002200c23333573466e1d40092000200c23263200633573800e00c00800626aae74dd5000a4c240029201035054310032001355006222533500110022213500222330073330080020060010033200135500522225335001100222135002225335333573466e1c005200000c00b1333008007006003133300800733500912333001008003002006003112200212212233001004003122002122001112323001001223300330020020014891c85d9efa7117df5a2c8acf8152fa74904344e022f06a3f26d48b0280e0001",
};

/**
 * Mints an acceptance token, sending it directly to the student. Can only be successfully called by the authority.
 * 
 * @param details The cardano address details of the student that the token is sent to
 * @returns The txHash of the submitted transaction. This can be checked against a blockchain explorer.
 */
async function mintAcceptanceToken(details: L.AddressDetails): Promise<L.TxHash> {
  const PKH: string = details.paymentCredential.hash;
  const address: L.Address = details.address.bech32;
  const unit: L.Unit = acceptanceTokenPolicyID + PKH;

  const tx = await L.Lucid
    .newTx()
    .mintAssets({ [unit]: 1n }, L.Data.void())
    .validTo(Date.now() + 100000)
    .attachMintingPolicy(acceptanceTokenScript)
    .payToAddress(address, { [unit]: 1n })
    .addSignerKey(PKH)
    .complete();

  const signedTx = await tx.sign().complete();

  const txHash = await signedTx.submit();

  return txHash;
}

async function getWalletBalance(api: L.Lucid): Promise<string> {
  try {
    const walletAddress = await api.wallet.address();
    const addressDetails = L.getAddressDetails(walletAddress);
    const response = await axios.get(`https://cardano-preprod.blockfrost.io/api/v0/addresses/${addressDetails.paymentCredential.hash}/total`, {
      headers: {
        'project_id': 'preprodkVTexzRSG7nvhxXWegyOulGyNmSJyhx5',
      },
    });
    return response.data?.staking_balance || '0';
  } catch (error) {
    console.error('Error fetching balance:', error);
    return '0';
  }
}

export default function MintingPage(): JSX.Element {
  const [result, setResult] = useState<string | null>(null);
  const [balance, setBalance] = useState<string | null>(null);
  const [publicKeyHash, setPublicKeyHash] = useState<string | null>(null);

  async function handleClick(): Promise<void> {
    try {
      const lucid = await loadCardano();
      if (!lucid) {
        setResult("Failed to load Cardano using Eternl extension.");
        return;
      }

      const addr0: L.Address = await lucid.wallet.address();
      setPublicKeyHash(L.getAddressDetails(addr0).paymentCredential.hash);
      setResult("Address for wallet 0 (Authority): " + addr0);

      const balance = await getWalletBalance(lucid);
      setBalance(balance);
      setResult("Transaction Hash: " + TxHash);
    } catch (error) {
      setResult("An error occurred: " + error);
    }
  }

  useEffect(() => {
    handleClick();
  }, []);

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white shadow-lg rounded-lg">
      <Head>
        <title>Cardano Acceptance Token Minting</title>
      </Head>
      <h1 className="text-2xl font-bold mb-4">Cardano Acceptance Token Minting</h1>
      <button onClick={handleClick} className="bg-green-500 hover:bg-green-600 text-white font-semibold py-2 px-4 rounded">
        Mint Acceptance Token
      </button>
      {result && <div className="mt-4 text-lg font-semibold">{result}</div>}
      {balance && <div className="mt-2">Balance: {balance} ADA</div>}
      {publicKeyHash && <div className="mt-2">Public Key Hash: {publicKeyHash}</div>}
    </div>
  );
}
