import clientPromise from '../../database/mongodbConfig';

export default async function handler(req, res) {
    const client = await clientPromise;
    const db = client.db('testdb');

    const rlw = req.body;

    try {
        for (const field in rlw) {
            if (field === '_id') {
                continue;
            }
            const val = rlw[field];
            db.collection('fakerlws').updateOne({rlwNum: rlw.rlwNum}, {'$set': {[field]: val}}, {upsert: true});
        }

        res.status(200).send('success');
        
    } catch (err) {
        res.status(500).send(err);
    }

}