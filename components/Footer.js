import Container from 'react-bootstrap/Container';

export default function Footer() {
    return (
        <Container className='justify-content-center' style={{height: '100px'}} fluid>
            <hr />
            <div className='p-2 mt-1'>
                <p className='text-center fs-4 mb-1'>Your Company Name</p>
                <p className='text-center fst-italic mt-0'>Your Company's Slogan</p>
            </div>
        </Container>
    );
}