import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';

export default function SampleSelect({ rlw, setRlw }) {
    function updateCurrent(e) {
        setRlw((prevProps) => (
            {...prevProps, samples: {
                ...prevProps.samples, num: e.target.value
            }})
        );
    }

    return (
        <>
            <Row className='mb-3 justify-content-start ms-1'>
                <Form.Group as={Col} sm='3' className='ms-1' controlId='sampleSelect'>
                    <Form.Label>Sample #</Form.Label>
                    <Form.Select onChange={updateCurrent}>
                        {rlw.sampleList.map((num, i) => (
                            <option key={i} value={num}>{num}</option>
                            )
                        )}
                    </Form.Select>
                </Form.Group>
            </Row>
            <Row className='mb-3'>
                <p className='fs-2 fw-bolder text-center'>
                    Sample {rlw.samples.num}
                </p>
            </Row>
        </>
    );
}