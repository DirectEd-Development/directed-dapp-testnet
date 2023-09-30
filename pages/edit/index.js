import { useState, useEffect } from 'react';
import { useWallet, useAssets } from '@meshsdk/react';
import { AssetCard, Meta } from '../../components';
import { data } from '../../data/royal';
import Image from 'next/image';
import axios from 'axios';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { getNftDetailsById } from '../../lib/api/nftUpdate';

export default function Home() {
  const [nfts, setNfts] = useState([]);
  const [hasPolicyIdAssetsChecked, setHasPolicyIdAssetsChecked] = useState(false);

  const { connected, wallet } = useWallet();
  const assets = useAssets();
  const router = useRouter();
  const params = router.asPath.split('/')[3];

  useEffect(() => {
    const getNfts = async () => {
      try {
        let nftDetails = [];
        if (params === 'royals') {
          await Promise.all(
            data.royals.map(async (item) => {
              try {
                const res = await getNftDetailsById(item);
                nftDetails.push(res);
              } catch (err) {
                console.log(err);
              }
            })
          );
        } else if (params === 'hero') {
          await Promise.all(
            data.heroes.map(async (item) => {
              try {
                const res = await getNftDetailsById(item);
                nftDetails.push(res);
              } catch (err) {
                console.log(err);
              }
            })
          );
        }
        setNfts(nftDetails);
      } catch (err) {
        console.log(err);
      }
    };

    getNfts();
  }, [params]);

  return (
    <>
      <Meta title='Heroes NFTS' description='DirectEd Heroes NFTs' />
      <main className='nft-assets'>
        <div className='nft-assets'></div>
        <>
          <h3>Pick which Hero you’d like</h3>
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
        </>
      </main>
    </>
  );
}
