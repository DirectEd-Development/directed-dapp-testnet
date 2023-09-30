import { useState, useEffect } from 'react'
import { useWallet, useAssets } from '@meshsdk/react'
import { AssetCard, Meta } from '../../components'
import { data } from '../../data/hero'
import Image from 'next/image'
import Button from '../../components/Button/Button'
import Link from 'next/link'
import axios, { AxiosResponse } from 'axios';
import { useRouter } from 'next/router'

const heroes: string[] = ['ab9ebe10-673b-43cb-a568-b2f54438dc48', '528af4d0-868a-4442-b5e2-caedd3979813'];

interface NFTDetails {
	id: string;
	uid: string;
	ipfsLink: string;
	title: string;
}

export default function Home() {
	const [nfts, setNfts] = useState<NFTDetails[]>([]);
	const [hasPolicyIdAssetsChecked, setHasPolicyIdAssetsChecked] = useState(false);
	const [error, setError] = useState<string | null>(null);
	const { connected, wallet } = useWallet();
	const assets = useAssets();
	const router = useRouter();
	const params = router.asPath.split('/')[3];

	useEffect(() => {
		const getNfts = async () => {
			try {
				let nftDetails: NFTDetails[] = [];

				if (params === 'hero') {
					await Promise.all(
						heroes.map(async (item) => {
							try {
								const res: AxiosResponse<NFTDetails> = await axios.get(`https://studio-api.nmkr.io/v2/GetNfts/${item}/all/10/1`, {
									headers: {
										authorization: 'a499c5007f104a73836d73be34648a1a',
									},
								});
								console.log('API Response:', res.data); // Log the response
								nftDetails.push(res.data);
							} catch (err) {
								console.error('API Error:', err);
								setError('An error occurred while fetching NFT details.'); // Set a user-friendly error message
							}

						})
					);
				}

				setNfts(nftDetails);
			} catch (err) {
				console.error(err);
				setError('An error occurred while fetching NFT details.');
			}
		};

		getNfts();

	}, [params]);

	useEffect(() => {
		const getNfts = async () => {
		  console.log("All nfts")
		  try {
			const res = await axios.post("http://localhost:3000/api/transactions")
			// const res = await getAllNfts()
			console.log(res)
			// setNfts({res.id, res.uid, res.ipfsLink, res.title})
			// setNfts({res.id, res.uid, res.ipfsLink, res.displayName});
		  } catch (err) {
			console.error(err);
			setError('An error occurred while fetching NFT details.');
		  }
		};
	
		getNfts();
	  }, []);

	return (
		<>
			<Meta title="NFT's Portal" description="Directed Ed NFT's portal page" />
			<main className='nft-assets'>
				<div className='nft-assets'></div>
				<>
					<h3>Pick which nft you’d like</h3>
					{error ? (
						<div style={{ color: 'red' }}>{error}</div>
					) : (
						<div className='nft-assets__singlenfts'>
							{nfts.length > 0 &&
								nfts.map((item) => (
									
									<Link
										target='_blank'
										key={item.id}
										href={{
											pathname: `/update-metadata`,
											query: item.uid,
										}}
									>
										<img
											src={`https://ipfs.io/ipfs/${item.ipfsLink.split('/')[2]}`}
											alt={item.title}
											width={200}
											height={200}
										/>
									</Link>
								))}
						</div>
					)}
				</>
			</main>
		</>
	);
}
