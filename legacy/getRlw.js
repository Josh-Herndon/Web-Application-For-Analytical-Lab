import clientPromise from '../../util/mongodbConfig';

export default async function handler(req, res) {
    const client = await clientPromise;
    const db = client.db('testdb');

    try {
        const { rlwNum } = req.body;
        const rlwObj = await db.collection('rlws').find({ rlwNum }).next();
        const benchFields = await db.collection('bench_fields').find().toArray();
        const units = await db.collection('units').find().toArray();
        res.status(200).json({ rlwObj, benchFields, units });
        
    } catch (err) {
        res.status(500).json({error: 'something went wrong.'});
    }
}