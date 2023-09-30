import { nftUpdate } from "../../lib/api/nftUpdate";

export default async function handler(req: any, res: any) {
  try {
    const heroes = await nftUpdate.get('/v2/GetCounts/ab9ebe10-673b-43cb-a568-b2f54438dc48');
    const royals = await nftUpdate.get('/v2/GetCounts/528af4d0-868a-4442-b5e2-caedd3979813');

    const maryhill = heroes.data.free + royals.data.free;
    
    res.status(200).json(maryhill);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
}