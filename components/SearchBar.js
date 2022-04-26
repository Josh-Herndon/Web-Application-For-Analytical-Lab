import { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import Overlay from 'react-bootstrap/Overlay';
import Tooltip from 'react-bootstrap/Tooltip';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import LoadingBar from './LoadingBar';

export default function SearchBar({ rlwArray }) {
    const [searchText, setSearchText] = useState('');
    const [show, setShow] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const target = useRef(null);
    const router = useRouter();

    useEffect(() => {
        if (router.query.rlw === searchText) {
            setShowModal(false);
        }
    }, [router.query])

    function handleChange(e) {
        e.preventDefault();
        setSearchText(e.target.value);
        setShow(false);
    }

    return (
        <Form className='d-flex mx-auto'>
            <Form.Control
                type='search'
                placeholder='Search'
                className='me-2'
                value={searchText}
                onChange={handleChange}
                onKeyDown={(e) => e.key === 'Enter' && e.preventDefault()}
            />
            {rlwArray.includes(searchText) ? 
            <>
                <Link href={`/rlw/${searchText}`}>
                    <Button type='button' variant='outline-success' onClick={() => setShowModal(true)}>
                        Search
                    </Button>
                </Link>
                <Modal show={showModal} size='lg' centered>
                    <Modal.Title className='m-3'>
                        Redirecting...
                    </Modal.Title>
                    <hr className='mt-0' />
                    <Modal.Body>
                        <LoadingBar />
                    </Modal.Body>
                </Modal>
            </>
            :
            <>
                <Button type='button' variant='outline-success' ref={target} onClick={() => setShow(true)}>
                    Search
                </Button>
                <Overlay target={target.current} show={show} placement='right'>
                    {(props) => (
                        <Tooltip id='invalid-search' {...props}>
                            No RLW found.
                        </Tooltip>
                    )}
                </Overlay>
            </>
            }
        </Form>
    );
}