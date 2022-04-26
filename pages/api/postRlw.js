import clientPromise from '../../database/mongodbConfig';

export default async function handler(req, res) {
    const client = await clientPromise;
    const db = client.db('testdb');

    const { rlw, numberOfSamples, industry, tests } = req.body;

    try {
        db.collection('fakerlws').insertOne({ rlwNum: rlw, numberOfSamples, industry, availableTests: tests });
        res.status(200).send('success');
        
    } catch (err) {
        res.status(500).send('error');
    }

}