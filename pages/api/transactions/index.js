import dbConnect from "../../../utils/mongo";
import Transaction from "../../../utils/Transaction";
import {updateNftMetadata, getAllNfts} from "../updateMetadata";

export default async function handler (req, res) {
    const {method} = req;

    await dbConnect();

    if(method === "POST") {
       try {
        const result = await getAllNfts(req.body);
        res.status(200).json(result);
       }catch(err) {
        console.log(err);
       }
    }

    if(method === "GET") {
    //    try {
    //     const transaction = await Transaction.create(req.body);
    //     res.status(200).json(transaction);
    //    }catch(err) {
    //     res.status(500).json(err);
    //    }
    }
    if(method === "PUT") {
        try{
        //    const result = await updateNftMetadata(req.body);
        //    res.status(200).json(result);
        }catch(err) {
            console.log(err);
        }
    }
}