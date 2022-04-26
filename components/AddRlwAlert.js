import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Alert from 'react-bootstrap/Alert';
import LoadingBar from './LoadingBar';

export default function AddRlwAlert({ formError, statusCode, validated }) {

    return (
        <Row className='justify-content-center'>
            <Col sm='10'>
                <Alert className='mt-3' show={!formError && statusCode === 0 && validated} variant='info'>
                    <Alert.Heading>Loading...</Alert.Heading>
                    <hr />
                    <LoadingBar />
                </Alert>
                <Alert className='mt-3' show={validated && statusCode === 200} variant='success'>
                    <Alert.Heading>Success! Leaving page...</Alert.Heading>
                    <hr />
                    <p className='mb-3'>Successfully submitted the data.</p>
                    <LoadingBar />
                </Alert>
                <Alert className='mt-3' show={validated && statusCode !== 0 && statusCode !== 200} variant='danger'>
                    <Alert.Heading>Error</Alert.Heading>
                    <hr />
                    <p>Something went wrong. Please try again.</p>
                </Alert>
            </Col>
        </Row>
    );
}