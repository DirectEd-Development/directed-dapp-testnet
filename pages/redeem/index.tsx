import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useWallet, useWalletList } from '@meshsdk/react'

import { Button, Layout } from '../../components';
import type { NextPage } from "next";

/*
Connect wallet
Get utxos from connected wallet
*/

interface Wallet {
	name: string
	icon: string
}

const Redeem: NextPage = () => {
	const { connected, wallet } = useWallet()
    //get utxos
    const [utxos, setUtxos] = useState<any>([])
    const [wallets, setWallets] = useState<Wallet[]>([])

    const walletList = useWalletList()

    useEffect(() => {
        if (walletList) {
            setWallets(walletList)
        }
        console.log("wallets: ", wallets)
    }
    , [walletList])



    const getUtxos = async () => {
        if (connected && wallet) {
            const utxos = await wallet.getUtxos()
            setUtxos(utxos)
        }
    }

    useEffect(() => {
        getUtxos()
        console.log("utxos: ", utxos)
    }
    , [connected, wallet])




  

    return (
        <Layout>
            <div className='redeem-page'>
                <h1>Redeem Djed</h1>
                <p>This page is currently under construction. It will be available soon.</p>
                <Link href="/">
                    <Button>Back to Home</Button>
                </Link>
            </div>
        </Layout>
    );
};

export default Redeem;
