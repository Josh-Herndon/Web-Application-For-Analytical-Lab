import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Table from 'react-bootstrap/Table';
import Form from 'react-bootstrap/Form';

export default function TableFields({ rlw, setRlw, tableActiveBenchFields }) {
    function handleTableChange(e, sample, index, data, format) {
        switch(format) {
            case 'Table':
                sample = String(sample);
                let fieldToUpdate = JSON.parse(JSON.stringify(rlw.samples[sample].sampleBenchFields[format][index]));
                const field = String(e.target.attributes.id.nodeValue);
                fieldToUpdate[Object.keys(data)[0]][field] = e.target.value;
                
                setRlw((prevProps) => (
                    {...prevProps, samples: {
                        ...prevProps.samples, [sample]: {
                            ...prevProps.samples[sample], sampleBenchFields: {
                                ...prevProps.samples[sample].sampleBenchFields, [format]: [...prevProps.samples[sample].sampleBenchFields[format].slice(0, index), fieldToUpdate, ...prevProps.samples[sample].sampleBenchFields[format].slice(index + 1)]
                            }
                        }
                    }
                }));

                break;
        }
    }

    function formatTable(table) {
        const format = Object.keys(table)[0];
        const tableData = table[format];

        switch(format) {
            case 'Table':
                return (
                    <Table striped bordered hover>
                        <thead>
                            <tr>
                                <th rowSpan='2' className='text-center align-middle'>
                                    Sample Identification
                                </th>
                                {tableData.map((data, idx) => (
                                    <th key={idx} colSpan='2' className='text-center align-middle'>
                                        {Object.keys(data)[0]}
                                    </th>
                                ))}
                            </tr>
                            <tr>
                                {tableData.map((data) => (
                                    <>
                                        <th className='text-center align-middle'>
                                            {Object.keys(data[Object.keys(data)[0]])[0]}
                                        </th>
                                        <th className='text-center align-middle'>
                                            {Object.keys(data[Object.keys(data)[0]])[1]}
                                        </th>
                                    </>
                                ))}
                            </tr>
                        </thead>
                        <tbody>
                            {rlw.sampleList.map((sample, idx) => (
                                <tr key={idx}>
                                    <td className='text-center align-middle'>
                                        {sample}
                                    </td>
                                    {tableData.map((data, i) => (
                                        <>
                                            <td className='text-center align-middle'>
                                                <Form.Control 
                                                    id='Field 1'
                                                    className='text-center'
                                                    type='text'
                                                    value={rlw.samples[String(sample)].sampleBenchFields[format]?.[i][Object.keys(data)[0]]['Field 1']}
                                                    onChange={(e) => handleTableChange(e, sample, i, data, format)}
                                                />
                                            </td>
                                            <td className='text-center align-middle'>
                                                <Form.Control 
                                                    id='Field 2'
                                                    className='text-center'
                                                    type='text'
                                                    value={rlw.samples[String(sample)].sampleBenchFields[format]?.[i][Object.keys(data)[0]]['Field 2']}
                                                    onChange={(e) => handleTableChange(e, sample, i, data, format)}
                                                />
                                            </td>
                                        </>
                                    ))}
                                </tr>
                            ))}
                        </tbody>
                    </Table>
                );
        }
    }

    return (
        <>
            {tableActiveBenchFields.map((ele, i) => (
                <div key={i}>
                    <hr className='ms-1 me-1' />
                    <p className='ms-3 fs-4 fw-bolder text-decoration-underline'>
                        {Object.keys(ele)[0]}
                    </p>
                    <Container className='mt-4'>
                        <Row className='justify-content-center mb-3 ms-1 me-1'>
                            {formatTable(ele)}
                        </Row>
                    </Container>
                </div>
            ))}
        </>
    );
}