import dbConnect from "../../../utils/mongo";
import Transaction from "../../../utils/Transaction";
import { getNftDetailsById, updateNftMetadata } from "../updateMetadata";

export default async function handler (req, res) {
    const {
        method,
        query: { id },
        cookies
      } = req;
    await dbConnect();

    if(method === "POST") {
      try{
        const result = await updateNftMetadata(req.body);
        res.status(200).json(result)
      }catch(err) {
        console.log(err);
      }
    }
    
    if(method === "GET") {

      try{
        const result = await getNftDetailsById(id);
        console.log(result)
        res.status(200).json(result);
       }catch(err) {
        console.log(err)
        res.status(500).json(err);
       } 
      }
      if(method === "PUT") {
        console.log(id)      
    }
}