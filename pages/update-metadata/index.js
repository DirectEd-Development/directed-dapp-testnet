import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { projectUid, nftUid } from "../../components/Config/Config"
import { nftUpdate } from "../../lib/api/nftUpdate";
import UpdateMetadata from "../../components/UpdateMetadata/UpdateMetadata";
import axios from "axios";

export default function NftUpdate() {
    const [nft, setNft] = useState({});
    const router = useRouter();
    const uid = router.asPath.split("?")[1];

    useEffect(() => {
      const getNftDetails = async() => {
        try {
          const res = await axios.get(`http://localhost:3000/api/transactions/${uid}`);
          setNft(res.data)
        }catch(err) {
          console.log(err);
        }
      }
      getNftDetails();
    },[]);
  
    return (
        <UpdateMetadata keyword={nft.name} metadata={nft.metadata} data={nft}/>
    );
}
