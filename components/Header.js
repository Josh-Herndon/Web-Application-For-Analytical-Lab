import Link from 'next/link';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import Container from 'react-bootstrap/Container';
import SearchBar from './SearchBar';

export default function Header({ rlwArray }) {
    return (
        <Navbar className='p-3 mb-2' style={{backgroundColor: '#e0e0e0'}} expand='lg'>
            <Container>
                <Navbar.Brand>
                    <Link href='/'>Your Lab Group Name</Link>
                </Navbar.Brand>
                <Navbar.Collapse id='mainNavbar'>
                    <SearchBar rlwArray={rlwArray} />
                    <Nav style={{fontSize: 30, fontWeight: 'bold'}}>
                        <Link href='/add'>
                            <a>+</a>
                        </Link>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}