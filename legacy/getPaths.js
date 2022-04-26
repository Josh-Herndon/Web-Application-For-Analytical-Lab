import clientPromise from '../../util/mongodbConfig';

export default async function handler(req, res) {
    const client = await clientPromise;
    const db = client.db('testdb');

    try {
        const rlwArray = [];
        await db.collection('rlws').find().forEach(({ rlwNum }) => {
            rlwArray.push(rlwNum);
        });
        res.status(200).json({ rlwArray });

    } catch (err) {
        res.status(500).json({error: 'something went wrong.'})
    }
}