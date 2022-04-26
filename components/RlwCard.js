import Link from 'next/link';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Card from 'react-bootstrap/Card';

export default function RlwCard({ rlwObjArray }) {
    return (
        <>
            {rlwObjArray.map((rlw, idx) => (
                <Row key={idx}>
                    <Col xs='12'>
                        <Link href={`/rlw/${rlw.rlwNum}`}>
                            <a>
                                <Card border='dark' className='mb-4'>
                                    <Card.Header>
                                        {rlw.industry === 'p-chem' ? 'P Chem': rlw.industry.slice(0, 1).toUpperCase() + rlw.industry.slice(1)}
                                    </Card.Header>
                                    <Card.Body>
                                        <Card.Title>
                                            Request #{rlw.rlwNum}
                                        </Card.Title>
                                        <hr />
                                        <Row xs='6' className='d-flex justify-content-start'>
                                            {rlw.sampleList?.map((num, i) => (
                                                <Col key={i} className='mb-3'>
                                                    {rlw.samples[String(num)].results === undefined ? 
                                                    <div id={i}>
                                                        <p className='mb-1 fs-6 fw-bolder'>
                                                            Sample {num}
                                                        </p>
                                                        <Card.Text className='text-muted'>
                                                            Results pending.
                                                        </Card.Text>
                                                    </div>
                                                    : <></>
                                                    }
                                                </Col>
                                            ))}
                                        </Row>
                                        {rlw.sampleList?.slice(0, 3).map((num, i) => (
                                            <div key={i}>
                                                {rlw.samples[String(num)].results !== undefined ?
                                                <div>
                                                    <p className='mb-2 fs-6 fw-bolder'>
                                                        Sample {num}
                                                    </p>
                                                    <Row id={i} xs='8' className='d-flex justify-content-start mb-3'>
                                                        {rlw.samples[String(num)].results.map((result, i) => (
                                                            <Col key={i}>
                                                                <p className='fst-italic fs-6 mb-0'>
                                                                    {Object.keys(result)[0]}
                                                                </p>
                                                                <hr className='mt-0 mb-2' />
                                                                <p>
                                                                    {Object.values(result)[0]}
                                                                </p>
                                                            </Col>
                                                        ))}
                                                    </Row>
                                                </div>
                                                : <></>
                                                }
                                            </div>
                                        ))}
                                    </Card.Body>
                                </Card>
                            </a>
                        </Link>
                    </Col>
                </Row>
            ))}
        </>
    );
}