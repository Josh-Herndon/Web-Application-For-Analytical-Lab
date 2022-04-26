import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Alert from 'react-bootstrap/Alert';
import LoadingBar from './LoadingBar';

export default function SubmissionAlert({ submitted, statusCode }) {

    return (
        <Row className='justify-content-center'>
            <Col sm='10'>
                <Alert className='mt-3' show={submitted && statusCode === 0} variant='info'>
                    <Alert.Heading>Loading...</Alert.Heading>
                    <hr />
                    <LoadingBar />
                </Alert>
                <Alert className='mt-3' show={submitted && statusCode === 200} variant='success'>
                    <Alert.Heading>Success!</Alert.Heading>
                    <hr />
                    <p>Successfully saved the data.</p>
                </Alert>
                <Alert className='mt-3' show={submitted && statusCode !== 0 && statusCode !== 200} variant='danger'>
                    <Alert.Heading>Error</Alert.Heading>
                    <hr />
                    <p>Something went wrong. Please try again.</p>
                </Alert>
            </Col>
        </Row>
    );
}