import clientPromise from '../../util/mongodbConfig';

export default async function handler(req, res) {
    const client = await clientPromise;
    const db = client.db('testdb');

    try {
        const { industry } = req.body;
        const rlwObjArray = await db.collection('rlws').find({ industry }).toArray();
        res.status(200).json({ rlwObjArray });
        
    } catch (err) {
        res.status(500).json({ err });
    }
}