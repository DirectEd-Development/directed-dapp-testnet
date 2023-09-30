import { nftUpdate } from "../../lib/api/nftUpdate";
const heroes = ['c24e5983-90e0-4721-9937-c246e91913e6', '2c4da26b-40ea-44b9-bb87-6e6d36bd73f3'];
const royals = ['ea9722c8-d748-408b-ae1c-96e2bdfad811', '92c94c93-c92d-45a7-b80f-aedf4f61f339'];

export async function updateNftMetadata(data) {
    
    try{
        // assume metadata is sent in the request body
        const res = await nftUpdate.post(`https://studio-api.nmkr.io/v2/UpdateMetadata/${data.policyid}/${data.uid}`, data.metadata);
        return res
    } catch (error) {
        console.error(error)
    }
}
export async function getNftDetailsById(uid) {
    try{
        // get nft details by id
        const res = await nftUpdate.get(`https://studio-api.nmkr.io/v2/GetNftDetailsById/${uid}`);
        return res.data;
    } catch (error) {
        console.error(error)
    }
}

export async function getAllNfts() {
    let nfts = [];
    await Promise.all(
        heroes.map(async(item) => {
            try{
            const res = await nftUpdate.get(`https://studio-api.nmkr.io/v2/GetNfts/${item}/all/10/1`);
            return  nfts.push(res.data);
            }catch(err) {
            console.log(err);
            }
        })
    )
    return nfts;
}
// export async function getAllNfts(params) {
//     let nfts = [];
//     if(params.params == "royals"){
//         await Promise.all(
//             royals.map(async(item) => {
//                try{
//                 const res = await nftUpdate.get(`https://studio-api.nmkr.io/v2/GetNfts/${item}/all/10/1`);
//                 return  nfts.push(res.data);
//                }catch(err) {
//                 console.log(err);
//                }
//             })
//         )

//     } else if (params.params == 'hero') {
//         await Promise.all(
//             heroes.map(async(item) => {
//                try{
//                 const res = await nftUpdate.get(`https://studio-api.nmkr.io/v2/GetNfts/${item}/all/10/1`);
//                 return  nfts.push(res.data);
//                }catch(err) {
//                 console.log(err);
//                }
//             })
//         )
//     }
//     return nfts;
// }