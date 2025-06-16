import { Container, Form, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom'
import { useState, useEffect } from "react"
import axios from "axios";

const Login = () => {
    const [NIP, setNIP] = useState("")
    const [password, setPassword] = useState("")

    useEffect(() => {
        const nip = localStorage.getItem('nip');
        const nama = localStorage.getItem('nama');

        // Jika sudah ada data login, redirect ke dashboard
        if (nip && nama) {
            console.log('User already logged in, redirecting...');
            window.location.replace('/dashboard');
        }
    }, [])

    const handleNIP = (inputNIP) => {
        setNIP(inputNIP)
    }
    const handlePassword = (inputPassword) => {
        setPassword(inputPassword)
    }    
    const userLogin = async () => {
        try {
            const requestingData = {
                nip: NIP,
                password: password
            }
            const result = await axios({
                method: 'POST',
                url: 'http://localhost:3200/users/login',
                data: requestingData
            })
            localStorage.setItem('nip', result.data.users.nip)
            localStorage.setItem('nama', result.data.users.nama)
            window.location.replace('/dashboard')
        } catch (error) {
            console.error('Login error:', error)
            alert('Login gagal! Periksa NIP dan password Anda.')
        }
    }

    return (
        <div className='login-page'>
            <Container>
                <div className='vh-100 d-flex flex-column justify-content-center'>
                    <div className='login-border col-7 m-auto p-5 bg-light rounded'>
                        <Link to='/' className='text-decoration-none'>
                            <h1 className="fw-bold h3 text-center">
                                MASUK AKUN
                            </h1>
                        </Link>
                        <form className="m-auto">
                            <Form.Group>
                                <Form.Label className='form-title fw-bold'>NIP</Form.Label>
                                <Form.Control type='number' placeholder='NIP Anda' required onChange={(event) => handleNIP(event.target.value)} />
                            </Form.Group>
                            <Form.Group>
                                <Form.Label className='form-title fw-bold'>Password</Form.Label>
                                <Form.Control type='password' placeholder='Password Anda' required onChange={(event) => handlePassword(event.target.value)} />
                            </Form.Group>
                            <Button className="mt-4 w-100 btn-light" onClick={() => userLogin()}>Login Sekarang</Button>
                            <p className='pt-4 text-center'>
                                Belum punya akun?
                                <Link to='/register' className='register-direct text-decoration-none'> Daftar di sini</Link>
                            </p>
                        </form>
                    </div>
                </div>
            </Container>
        </div>
    )
}

export default Login