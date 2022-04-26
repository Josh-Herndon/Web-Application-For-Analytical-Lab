import { useState } from 'react';
import { useRouter } from 'next/router';
import Form from 'react-bootstrap/Form';
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';
import Header from '../components/Header';
import Footer from '../components/Footer';
import EssentialRlwInfo from '../components/EssentialRlwInfo';
import InitialTests from '../components/InitialTests';
import AddRlwAlert from '../components/AddRlwAlert';

const API_KEY = process.env.TS_API_KEY;

export default function Add({ test_names, rlwArray }) {
    const [validated, setValidated] = useState(false);
    const [rlw, setRLW] = useState('');
    const [numberOfSamples, setNumberOfSamples] = useState('');
    const [industry, setIndustry] = useState('water');
    const [tests, setTests] = useState([]);
    const [statusCode, setStatusCode] = useState(0);
    const [formError, setFormError] = useState(true);
    const router = useRouter();

    function handleSubmit(e) {
        e.preventDefault();
        const form = e.currentTarget;
        const isValid = form.checkValidity();

        if (isValid === false) {
            e.stopPropagation();
        } else {
            setFormError(false);
        }
        
        setValidated(true);

        if (isValid) {
            const data = { rlw, numberOfSamples, industry, tests };
            return (
                fetch('/api/postRlw', {
                    method: 'POST',
                    body: JSON.stringify(data),
                    headers: {
                        'Content-Type': 'application/json'
                    }
                })
                  .then((res) => {
                    setStatusCode(res.status);
                    setTimeout(() => {
                        if (res.status === 200) {
                          router.push(`/rlw/${rlw}`);
                        }
                    }, 3000);
                  })
            );
        }
    }

    return (
        <div>
            <div className='content-wrap'>
                <Header rlwArray={rlwArray} />
                <Container className='mt-5 mb-5'>
                    <Form noValidate validated={validated} onSubmit={handleSubmit}>
                        <EssentialRlwInfo 
                            rlw={rlw}
                            setRLW={setRLW}
                            numberOfSamples={numberOfSamples}
                            setNumberOfSamples={setNumberOfSamples}
                            setIndustry={setIndustry}
                        />
                        <InitialTests 
                            test_names={test_names}
                            tests={tests}
                            setTests={setTests}
                        />
                        <div className={tests.length === 0 ? 'd-none': 'd-flex mt-3 mb-3'}>
                            <Button type='submit' variant='primary' className='ms-auto' size='lg'>Submit</Button>
                        </div>
                        <AddRlwAlert
                            formError={formError}
                            statusCode={statusCode}
                            validated={validated}
                        />
                    </Form>
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
        "collection": "test_names",
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
    const test_names = documents;

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
            test_names,
            rlwArray
        }
    }
}