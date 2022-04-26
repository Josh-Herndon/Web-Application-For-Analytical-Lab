import Link from 'next/link';
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import RlwCard from '../../components/RlwCard';

const API_KEY = process.env.TS_API_KEY;

export default function List({ rlwObjArray, rlwArray }) {
    
    return (
        <div>
            <div className='content-wrap'>
                <Header rlwArray={rlwArray} />
                <Container className='mt-5 mb-5'>
                    <p className='mb-2 fs-2 fw-bolder'>
                        Requests
                    </p>
                    <hr className='mt-0 mb-4' />
                    <Link href='/add'>
                        <Button variant='primary' className='mb-4'>
                            Add New Request
                        </Button>
                    </Link>
                    <RlwCard rlwObjArray={rlwObjArray} />
                    <div className='d-flex mt-3'>
                        <Button type='button' variant='outline-secondary' className='ms-auto' size='lg' onClick={() => window.location.reload()}>
                            Refresh
                        </Button>
                    </div>
                </Container>
            </div>
            <Footer />
        </div>
    );
}

export async function getStaticPaths() {
    const industries = ['water', 'paper', 'leather', 'p-chem']

    const paths = industries.map((industry) => ({
        params: { industry }
    }));

    return {
        paths,
        fallback: 'blocking'
    }
}

export async function getStaticProps({ params }) {
    const data = {
        "dataSource": "Cluster0",
        "database": "testdb",
        "collection": "fakerlws",
        "filter": {
            "industry": params.industry
        }
    };

    const res = await fetch('https://data.mongodb-api.com/app/data-vuavu/endpoint/data/beta/action/find', {
        method: 'POST',
        body: JSON.stringify(data),
        headers: {
            'Content-Type': 'application/json',
            'Access-Control-Request-Headers': '*',
            'api-key': API_KEY
        }
    });

    var { documents } = await res.json();
    const rlwObjArray = documents;

    const data2 = {
        "dataSource": "Cluster0",
        "database": "testdb",
        "collection": "fakerlws",
      };
    
      const res2 = await fetch('https://data.mongodb-api.com/app/data-vuavu/endpoint/data/beta/action/find', {
          method: 'POST',
          body: JSON.stringify(data2),
          headers: {
              'Content-Type': 'application/json',
              'Access-Control-Request-Headers': '*',
              'api-key': API_KEY
          }
      });
    
      var { documents } = await res2.json();
      const rlwArray = documents.map(({ rlwNum }) => rlwNum);

    return {
        props: {
            rlwObjArray,
            rlwArray
        },
        revalidate: 10
    }
}