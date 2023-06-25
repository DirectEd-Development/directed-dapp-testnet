import { CardanoWallet, useWallet } from '@meshsdk/react';
import { useState } from "react";
import type { NextPage } from "next";
import { script, scriptAddr } from "../../config/contract";
import { Transaction, Data, BlockfrostProvider, resolveDataHash } from '@meshsdk/core';

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
                            unit: "22f20d5382cec46166b566821f16f79cb03ee1520c71e5f83a4b3f2054657374746f6b656e",
                            quantity: "1",
                        },
                    ],
                );
            const unsignedTx = await tx.build();
            const signedTx = await wallet.signTx(unsignedTx);
            const txHash = await wallet.submitTx(signedTx);
        }
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