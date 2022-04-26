import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

export default function RlwHeading({ rlwNum, industry }) {

    return (
        <Row className='mx-auto mt-5 ms-1 me-1 mb-3'>
            <Col sm='4' className='ms-1'>
                <p className='fs-1 fw-bold'>
                    Request #{rlwNum}
                </p>
            </Col>
            <Col sm='4' className='ms-auto me-1'>
                <p className='text-capitalize fs-1 fst-italic float-end'>
                    {industry} Industry
                </p>
            </Col>
            <hr />
        </Row>
    );
}