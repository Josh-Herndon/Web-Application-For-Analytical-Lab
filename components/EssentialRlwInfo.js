import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';

export default function EssentialRlwInfo({ rlw, setRLW, numberOfSamples, setNumberOfSamples, setIndustry }) {

    return (
        <Row className='mb-3 justify-content-center me-1 ms-1'>
            <Form.Group as={Col} sm='4' controlId='rlwNumber'>
                <Form.Label>Request #</Form.Label>
                <Form.Control 
                    required
                    type='number'
                    placeholder='12345'
                    value={rlw}
                    onChange={(e) => setRLW(e.target.value)}
                />
                <Form.Text muted>Enter the request number.</Form.Text>
                <Form.Control.Feedback type='invalid'>
                    Please enter a request number.
                </Form.Control.Feedback>
            </Form.Group>
            <Form.Group as={Col} sm='4' controlId='rlwNumberOfSamples'>
                <Form.Label>Number of Samples</Form.Label>
                <Form.Control 
                    required
                    type='number'
                    placeholder={10}
                    value={numberOfSamples}
                    onChange={(e) => setNumberOfSamples(e.target.value)}
                />
                <Form.Text muted>Enter the number of samples.</Form.Text>
                <Form.Control.Feedback type='invalid'>
                    Please enter the number of samples.
                </Form.Control.Feedback>
            </Form.Group>
            <Form.Group as={Col} sm='4' controlId='rlwIndustry'>
                <Form.Label>Industry</Form.Label>
                <Form.Select onChange={(e) => setIndustry(e.target.value)}>
                    <option value='water'>Water</option>
                    <option value='paper'>Paper</option>
                    <option value='leather'>Leather</option>
                    <option value='p-chem'>P Chem</option>
                </Form.Select>
                <Form.Text muted>Select the industry.</Form.Text>
                <Form.Control.Feedback type='invalid'>
                    Please select an industry.
                </Form.Control.Feedback>
            </Form.Group>
        </Row>
    );
}