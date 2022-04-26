import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import ListGroup from 'react-bootstrap/ListGroup';
import Button from 'react-bootstrap/Button';

export default function InitialTests({ test_names, tests, setTests }) {
    function addTest(e) {
        if (e.target.value === 'Choose...') {
            return
        }
        
        for (let i = 0; i < test_names.length; i++) {
            const t_names = test_names[i][e.target.value];
            if (t_names) {
                break
            }
        }
        
        t_names?.map((name) => {
            if (!tests.includes(name)) {
                setTests((prevProps) => [...prevProps, name])
            }
        });
    }

    function removeTest(e) {
        const t = e.target.parentElement.firstChild.nodeValue;
        setTests((prevProps) => prevProps.filter((test) => test !== t))
    }

    return (
        <>
            <Row className='mb-3 ms-1 me-1 mt-3'>
                <Form.Group controlId='rlwTests'>
                    <Form.Label>Test Groups</Form.Label>
                    <Form.Select onChange={addTest}>
                        <option>Choose...</option>
                        <option value='Test Group 1'>Test Group 1</option>
                    </Form.Select>
                    <Form.Text muted>Select the required test groups.</Form.Text>
                    <Form.Control.Feedback type='invalid'>
                        Please select test groups.
                    </Form.Control.Feedback>
                </Form.Group>
            </Row>
            <Row className={tests.length === 0 ? 'd-none': 'mb-3 ms-1 me-1'}>
                <ListGroup as={Col} sm='4' variant='flush'>
                    {tests.map((test, i) => (
                    <ListGroup.Item key={i} className='d-flex align-items-center fs-5'>
                        {test} <Button key={i} type='button' size='sm' className='ms-auto' variant='outline-danger' onClick={(e) => removeTest(e)}>X</Button>
                    </ListGroup.Item>)
                    )}
                </ListGroup>
            </Row>
        </>
    );
}