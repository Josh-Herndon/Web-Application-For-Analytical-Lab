import Head from 'next/head'
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Header from '../components/Header';
import Footer from '../components/Footer';
import IndustryCard from '../components/IndustryCard';

const API_KEY = process.env.TS_API_KEY;

export default function Home({ rlwArray }) {
  const industries = ['water', 'paper', 'leather', 'p-chem'];

  return (
    <div>
      <div className='content-wrap'>
        <Header rlwArray={rlwArray} />
        <Container className='mt-5 mb-5 justify-content-center'>
          <Head>
            <title>Lab App</title>
            <meta name="description" content="Welcome to the Lab App" />
          </Head>

          <Row xs='1' sm='2' className='g-4'>
            {industries.map((industry, i) => <IndustryCard key={i} industry={industry} />)}
          </Row>
        </Container>
      </div>
      <Footer />
    </div>
  );
}

export async function getStaticProps() {
  const data = {
    "dataSource": "Cluster0",
    "database": "testdb",
    "collection": "fakerlws",
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

  const { documents } = await res.json();
  const rlwArray = documents.map(({ rlwNum }) => rlwNum);

  return {
    props: {
        rlwArray
    },
    revalidate: 10
  }
}