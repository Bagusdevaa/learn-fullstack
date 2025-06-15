import { Container, Button } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import React from 'react'
import '../index.css';

const NotFound = () => {
    return (
        <div className='pageNotFound'>
            <Container>
                <div className='vh-100 d-flex align-items-center justify-content-center flex-column text-white'>
                    <div className=''>
                        <h1 className='me-auto'>404😔</h1>
                        <h2>Oops. Halaman ini tidak ada.</h2>
                        <p className='my-3'>Kamu mungkin salah ketik alamat web atau halaman sudah dipindahkan.</p>
                        <Link to='/'>
                            <Button className='btn-outline-light mt-2'>Halaman Utama</Button>
                        </Link>
                    </div>
                </div>
            </Container>

        </div>
    )
}

export default NotFound