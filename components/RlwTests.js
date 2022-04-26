import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

export default function RlwTests({ rlw, setRlw, benchFields, setBasicActiveBenchFields, setTableActiveBenchFields, test_names }) {
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
            if (!rlw.samples[rlw.samples.num].tests.includes(name)) {
                setRlw((prevProps) => (
                    {...prevProps, samples: {
                        ...prevProps.samples, [`${prevProps.samples.num}`]: {
                            ...prevProps.samples[prevProps.samples.num], tests: [...prevProps.samples[prevProps.samples.num].tests, name]
                            }
                        }
                    })
                );
            }
        });
    }

    function removeTest(e) {
        const testToRemove = e.target.parentElement.firstChild.nodeValue;
        setRlw((prevProps) => (
            {...prevProps, samples: {
                ...prevProps.samples, [`${prevProps.samples.num}`]: {
                    ...prevProps.samples[prevProps.samples.num], tests: prevProps.samples[prevProps.samples.num]['tests'].filter((test) => test !== testToRemove)
                    }
                }
            })
        );

        for (let i = 0; i < benchFields.length; i++) {
            let fields = benchFields[i][testToRemove];
            if (fields !== undefined) {
                setBasicActiveBenchFields((prevProps) => prevProps.filter((field) => !fields.includes(field)));
                setTableActiveBenchFields((prevProps) => prevProps.filter((table) => String(table[testToRemove]) !== String(fields)));

                let otherProps = JSON.parse(JSON.stringify(rlw.samples[rlw.samples.num].sampleBenchFields));
                for (let j = 0; j < fields.length; j++) {
                    let field = fields[j];
                    let { [field]: _, ...fieldsToKeep} = otherProps;
                    otherProps = fieldsToKeep;
                }
                setRlw((prevProps) => (
                    {...prevProps, samples: {
                        ...prevProps.samples, [`${prevProps.samples.num}`]: {
                            ...prevProps.samples[prevProps.samples.num], sampleBenchFields: {
                                ...otherProps
                            }
                        }
                    }
                }));

                break;
            }
        }
    }

    return (
        <>
            <Row className='d-flex flex-wrap mb-4 ms-1 me-1'>
                <p className='fs-4 fw-bolder text-decoration-underline'>Tests</p>
                <Form.Group as={Col} sm='4' controlId='rlwTests'>
                    <Form.Label>Test Groups</Form.Label>
                    <Form.Select onChange={addTest}>
                        <option>Choose...</option>
                        <option value='Test Group 1'>Test Group 1</option>
                    </Form.Select>
                    <Form.Text muted>Add test groups.</Form.Text>
                </Form.Group>
            </Row>
            <Row className='d-flex flex-wrap mb-3 ms-1 me-1'>
                {rlw.samples[rlw.samples.num]?.tests.map((test, i) => (
                    <Col key={i} sm='auto' className='mb-4'>
                        <div className='d-flex align-items-center fs-5'>
                            {test} <Button key={i} type='button' size='sm' className='ms-3' variant='outline-danger' onClick={removeTest}>X</Button>
                        </div>
                    </Col>
                ))}
                <hr />
            </Row>
        </>
    );
}