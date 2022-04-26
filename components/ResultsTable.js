import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Table from 'react-bootstrap/Table';

export default function ResultsTable({ rlw }) {
    function resultsTable() {
        return (
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th className='text-center align-middle'>
                            Sample Identification
                        </th>
                        {rlw.samples[rlw.samples.num].results.map((result, i) => (
                            <th key={i} id={i} className='text-center align-middle'>
                                {Object.keys(result)[0]}
                            </th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {rlw.sampleList.map((sampleNum, i) => (
                        <tr key={i} id={i}>
                            <td className='text-center align-middle'>
                                {sampleNum}
                            </td>
                            {rlw.samples[String(sampleNum)].results.map((result, i) => (
                                <td key={i} id={i} className='text-center align-middle'>
                                    {Object.values(result)[0]}
                                </td>
                            ))}
                        </tr>
                    ))}
                </tbody>
            </Table>
        );
    }

    return (
        <div className={rlw.samples[rlw.samples.num]?.results === undefined ? 'd-none': 'mt-4'}>
            <hr className='ms-1 me-1' />
            <p className='ms-3 fs-4 fw-bolder text-decoration-underline'>
                Results
            </p>
            <Container className='mt-4'>
                <Row className='justify-content-center mb-3 ms-1 me-1'>
                    {rlw.samples[rlw.samples.num]?.results !== undefined ? resultsTable(): <></>}
                </Row>
            </Container>
        </div>
    );
}