import Spinner from 'react-bootstrap/Spinner';

export default function LoadingBar() {
    return (
        <div className='d-flex justify-content-evenly'>
            <Spinner animation='grow' variant='primary' />
            <Spinner animation='grow' variant='secondary' />
            <Spinner animation='grow' variant='primary' />
            <Spinner animation='grow' variant='secondary' />
            <Spinner animation='grow' variant='primary' />
            <Spinner animation='grow' variant='secondary' />
            <Spinner animation='grow' variant='primary' />
            <Spinner animation='grow' variant='secondary' />
        </div>
    );
}