import { CardanoWallet, useWallet } from '@meshsdk/react';
import { useState } from "react";
import type { NextPage } from "next";
import { script, scriptAddr } from "../../config/contract";
import { Transaction, Data, BlockfrostProvider, resolveDataHash } from '@meshsdk/core';
import { Layout } from '../../components';
import { GetServerSideProps } from 'next';

export const getServerSideProps: GetServerSideProps = async ({ req }) => {
	// Redirect all users unconditionally
	return {
		redirect: {
			destination: '/', // Redirect to DirectEd Homepage
			permanent: false,
		},
	};
};

const minttokens: NextPage = () => {
    const { wallet, connected, connecting } = useWallet();
    const [loading, setLoading] = useState<boolean>(false);

    async function lockFunds() {
        if (wallet) {
            const addr = (await wallet.getUsedAddresses())[0];
            const d: Data = {
                alternative: 0,
                fields: [42],
            };
            const tx = new Transaction({ initiator: wallet })
                .sendAssets(
                    {
                        address: scriptAddr,
                        datum: {
                            value: d,
                        },
                    },
                    [
                        {
                            unit: "a1deebd26b685e6799218f60e2cad0a80928c4145d12f1bf49aebab554657374546f6b656e",
                            quantity: "1",
                        },
                    ],
                );
            const unsignedTx = await tx.build();
            const signedTx = await wallet.signTx(unsignedTx);
            const txHash = await wallet.submitTx(signedTx);
        }
    };

    async function _getAssetUtxo({ scriptAddress, asset, datum }: {
        scriptAddress: string,
        asset: string,
        datum: any
    }) {
        const blockfrostProvider = new BlockfrostProvider(
            '<blockfrostApiKey>',
        );
        const utxos = await blockfrostProvider.fetchAddressUTxOs(
            scriptAddress,
            asset
        );
        const dataHash = resolveDataHash(datum);
        let utxo = utxos.find((utxo: any) => {
            return utxo.output.dataHash == dataHash;
        });
        return utxo;
    };

    return (
        
            <div>
                <h1>Connect Wallet</h1>
                <CardanoWallet />
                {connected && (
                    <>
                        <h1>Lock funds in your Contract</h1>

                        <button
                            type="button"
                            onClick={() => lockFunds()}
                            disabled={connecting || loading}
                            style={{
                                margin: "8px",
                                backgroundColor: connecting || loading ? "orange" : "grey",
                            }}
                        >
                            Lock funds
                        </button>

                    </>
                )}
            </div>
    );
};

export default minttokens;