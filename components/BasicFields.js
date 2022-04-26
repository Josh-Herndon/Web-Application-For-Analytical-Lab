import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';

export default function BasicFields({ rlw, setRlw, basicActiveBenchFields, fieldUnits }) {
    function handleBasicChange(e) {
        const field = e.target.parentElement.previousSibling.firstChild.nodeValue;

        setRlw((prevProps) => (
            {...prevProps, samples: {
                ...prevProps.samples, [`${prevProps.samples.num}`]: {
                    ...prevProps.samples[prevProps.samples.num], sampleBenchFields: {
                        ...prevProps.samples[prevProps.samples.num].sampleBenchFields, [field]: e.target.value
                    }
                }
            }
        }));
    }

    return (
        <Row className='mb-3 ms-1 me-1' sm='2'>
            {basicActiveBenchFields.map((ele, i) => (
                <Form.Group key={i} as={Col} controlId={`field_${ele}`} className='mb-3'>
                    <Form.Label>{ele}</Form.Label>
                    <InputGroup>
                        <Form.Control 
                            type='number'
                            value={rlw.samples[rlw.samples.num].sampleBenchFields[ele]}
                            onChange={handleBasicChange}
                        />
                        <InputGroup.Text id={`addon_${ele}`}>{fieldUnits[ele]}</InputGroup.Text>
                    </InputGroup>
                </Form.Group>
            ))}
        </Row>
    );
}