import clientPromise from '../../util/mongodbConfig';

export default async function handler(req, res) {
    const client = await clientPromise;
    const db = client.db('testdb');

    try {
        const result = await db.collection('test_names').find({}).toArray();
        res.status(200).json({ test_names: result });
    } catch (err) {
        res.status(500).json({error: 'there was an error'})
    }
}