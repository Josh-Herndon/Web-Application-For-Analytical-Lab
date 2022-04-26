import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import RlwHeading from '../../components/RlwHeading';
import SubmissionAlert from '../../components/SubmissionAlert';
import BasicFields from '../../components/BasicFields';
import TableFields from '../../components/TableFields';
import RlwTests from '../../components/RlwTests';
import ResultsTable from '../../components/ResultsTable';
import SampleSelect from '../../components/SampleSelect';

const API_KEY = process.env.TS_API_KEY;

export default function RLW({ rlwObj, test_names, benchFields, units, rlwArray }) {
    const router = useRouter();
    const [rlw, setRlw] = useState({
        rlwNum: rlwObj.rlwNum,
        sampleList: [],
        samples: {
            num: '1'
        }
    });
    const [basicActiveBenchFields, setBasicActiveBenchFields] = useState([]);
    const [tableActiveBenchFields, setTableActiveBenchFields] = useState([]);
    const [fieldUnits, setFieldUnits] = useState({});
    const [submitted, setSubmitted] = useState(false);
    const [statusCode, setStatusCode] = useState(0);
    const [currentRlw, dummy] = useState(rlwObj.rlwNum);

    useEffect(() => {
        if (router.query['rlw'] !== currentRlw) {
            window.location.reload(true);
        }
    }, [router.query['rlw']])

    useEffect(() => {
        if (rlwObj.samples === undefined) {
            setRlw((prevProps) => (
                {...prevProps, sampleList: []}
            ));

            for (let i = 1; i <= rlwObj.numberOfSamples; i++) {
                setRlw((prevProps) => (
                    {...prevProps, sampleList: [...prevProps.sampleList, i], samples: {...prevProps.samples, [String(i)]: {tests: rlwObj.availableTests, sampleBenchFields: {}}}
                    }));
            }
        } else {
            setRlw(rlwObj);
            setRlw((prevProps) => (
            {...prevProps, samples: {
                ...prevProps.samples, num: '1'
                }
            }));
        }

        setFieldUnits({});

        for (let j = 0; j < units.length; j++) {
            let key = Object.keys(units[j])[0] !== '_id' ? Object.keys(units[j])[0]: Object.keys(units[j])[1];
            let value = Object.values(units[j])[0].length < 10 ? Object.values(units[j])[0]: Object.values(units[j])[1]
            setFieldUnits((prevProps) => ({...prevProps, [key]: value}));
        }
    }, []);

    useEffect(() => {
        const tests = rlw.samples[rlw.samples.num]?.tests;
        const seen = [];

        if (tests) {
            for (let i = 0; i < benchFields.length; i++) {
                for (let j = 0; j < tests.length; j++) {
                    let fields = benchFields[i][tests[j]];
                    let repr_type = benchFields[i].repr_type;

                    if (fields !== undefined && repr_type === 'basic') {
                        fields.map((field) => {
                            if (!seen.includes(field) && !basicActiveBenchFields.includes(field)) {
                                seen.push(field);
                                setBasicActiveBenchFields((prevProps) => [...prevProps, field]);
                            }

                            if (!Object.keys(rlw.samples[rlw.samples.num].sampleBenchFields).includes(field)) {
                                setRlw((prevProps) => (
                                    {...prevProps, samples: {
                                        ...prevProps.samples, [`${prevProps.samples.num}`]: {
                                            ...prevProps.samples[prevProps.samples.num], sampleBenchFields: {
                                                ...prevProps.samples[prevProps.samples.num].sampleBenchFields, [field]: ''
                                            }
                                        }
                                    }
                                }));
                            }
                        });
                        break;
                    }

                    if (fields !== undefined && repr_type === 'table') {
                        let isPresent = false;
                        for (let k = 0; k < tableActiveBenchFields.length; k++) {
                            if (tableActiveBenchFields[k][tests[j]] !== undefined) {
                                isPresent = true;
                                break
                            }
                        }

                        if (!isPresent) {
                            for (let l = 0; l < rlw.sampleList.length; l++) {
                                if (rlw.samples[String(l + 1)].sampleBenchFields[tests[j]] === undefined) {
                                    setRlw((prevProps) => (
                                        {...prevProps, samples: {
                                            ...prevProps.samples, [`${l + 1}`]: {
                                                ...prevProps.samples[`${l + 1}`], sampleBenchFields: {
                                                    ...prevProps.samples[`${l + 1}`].sampleBenchFields, [tests[j]]: fields
                                                }
                                            }
                                        }
                                    }));
                                }
                            }

                            setTableActiveBenchFields((prevProps) => [...prevProps, {[tests[j]]: fields}]);
                        }

                        break;
                    }

                }
            }
        }
    }, [rlw.samples])


    function handleSubmit(e) {
        e.preventDefault();
        setSubmitted(true);

        return (
            fetch('/api/updateRLW', {
                method: 'POST',
                body: JSON.stringify(rlw),
                headers: {
                    'Content-Type': 'application/json'
                }
            })
              .then((res) => {
                setStatusCode(res.status);
                setTimeout(() => {
                    if (res.status === 200) {
                      setSubmitted(false);
                      setStatusCode(0);
                    }
                }, 5000);
              })
        );
    }
    
    return (
        <div>
            <div className='content-wrap'>
                <Header rlwArray={rlwArray} />
                <Container className='mb-4'>
                    <RlwHeading rlwNum={rlwObj.rlwNum} industry={rlwObj.industry} />
                    <Form noValidate onSubmit={handleSubmit}>
                        <SampleSelect rlw={rlw} setRlw={setRlw} />
                        <RlwTests 
                            rlw={rlw} 
                            setRlw={setRlw} 
                            setBasicActiveBenchFields={setBasicActiveBenchFields} 
                            setTableActiveBenchFields={setTableActiveBenchFields}
                            test_names={test_names} 
                            benchFields={benchFields}
                        />
                        <p className='fs-4 fw-bolder text-decoration-underline ms-3'>Bench Data</p>
                        <BasicFields 
                            rlw={rlw} 
                            setRlw={setRlw} 
                            basicActiveBenchFields={basicActiveBenchFields} 
                            fieldUnits={fieldUnits} 
                        />
                        <TableFields 
                            rlw={rlw} 
                            setRlw={setRlw} 
                            tableActiveBenchFields={tableActiveBenchFields} 
                        />
                        <ResultsTable rlw={rlw} />
                        <div className='d-flex mb-3 mt-4'>
                            <Button type='submit' variant='primary' size='lg' className='ms-auto'>Save</Button>
                        </div>
                        <SubmissionAlert submitted={submitted} statusCode={statusCode} />
                    </Form>
                </Container>
            </div>
            <Footer />
        </div>
    );
}

export async function getStaticPaths() {
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

    let { documents } = await res.json();

    const rlwArray = documents.map(({ rlwNum }) => rlwNum)

    const paths = rlwArray.map((rlwNum) => ({
        params: { rlw: rlwNum }
    }));

    return {
        paths,
        fallback: 'blocking'
    }
}

export async function getStaticProps({ params }) {
    const rData = {
        "dataSource": "Cluster0",
        "database": "testdb",
        "collection": "fakerlws",
        "filter": {
            "rlwNum": params.rlw
        }
    };

    const rRes = await fetch('https://data.mongodb-api.com/app/data-vuavu/endpoint/data/beta/action/findOne', {
        method: 'POST',
        body: JSON.stringify(rData),
        headers: {
            'Content-Type': 'application/json',
            'Access-Control-Request-Headers': '*',
            'api-key': API_KEY
        }
    });

    var { document } = await rRes.json();
    const rlwObj = document;

    const bData = {
        "dataSource": "Cluster0",
        "database": "testdb",
        "collection": "bench_fields"
    };

    const bRes = await fetch('https://data.mongodb-api.com/app/data-vuavu/endpoint/data/beta/action/find', {
        method: 'POST',
        body: JSON.stringify(bData),
        headers: {
            'Content-Type': 'application/json',
            'Access-Control-Request-Headers': '*',
            'api-key': API_KEY
        }
    });

    var { documents } = await bRes.json();
    const benchFields = documents;

    const uData = {
        "dataSource": "Cluster0",
        "database": "testdb",
        "collection": "units"
    };

    const uRes = await fetch('https://data.mongodb-api.com/app/data-vuavu/endpoint/data/beta/action/find', {
        method: 'POST',
        body: JSON.stringify(uData),
        headers: {
            'Content-Type': 'application/json',
            'Access-Control-Request-Headers': '*',
            'api-key': API_KEY
        }
    });

    var { documents } = await uRes.json();
    const units = documents;

    const tData = {
        "dataSource": "Cluster0",
        "database": "testdb",
        "collection": "test_names",
    };

    const tRes = await fetch('https://data.mongodb-api.com/app/data-vuavu/endpoint/data/beta/action/find', {
        method: 'POST',
        body: JSON.stringify(tData),
        headers: {
            'Content-Type': 'application/json',
            'Access-Control-Request-Headers': '*',
            'api-key': API_KEY
        }
    });

    var { documents } = await tRes.json();
    const test_names = documents;

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

    var { documents } = await res.json();
    const rlwArray = documents.map(({ rlwNum }) => rlwNum)

    return {
        props: {
            rlwObj,
            test_names,
            benchFields,
            units,
            rlwArray
        },
        revalidate: 10
    }
}