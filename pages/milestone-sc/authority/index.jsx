import { useState } from 'react';
import { useRouter } from 'next/router';
import { Button, Layout, Meta } from '../../../components';

const authority = () => {
  const router = useRouter();
  const [tokenAmount, setTokenAmount] = useState('');

  const handleTokenAmountChange = (event) => {
    setTokenAmount(event.target.value);
  };

  const handleMintTokens = () => {
    // Perform the token minting logic here
    // You can use the `tokenAmount` state to determine the amount to mint
    // You can also add validation and other logic as needed
    console.log(`Minting ${tokenAmount} tokens`);

    // Redirect to another page after minting (e.g., a success page)
    router.push('/mint-success');
  };

  return (
    <Layout>
      <Meta
        title="Authority Page"
        description="Welcome, Authority! Enter the authority address below to mint the required token."
      />
      <div className="authority-page">
        <h1>Welcome, Authority!</h1>
        <p>Mint tokens by entering the address below below:</p>
        <input
          type="text"
          placeholder="Enter authority address"
          value={tokenAmount}
          onChange={handleTokenAmountChange}
        />
        <div className="authority-page__buttons">
          <Button variant="primary" onClick={handleMintTokens} disabled={!tokenAmount}>
            Mint Tokens
          </Button>
        </div>
      </div>
    </Layout>
  );
};

export default authority;
