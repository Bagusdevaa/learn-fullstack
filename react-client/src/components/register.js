import { Container, Form, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useState } from "react"
import axios from "axios";

const Register = () => {
    const [NIP, setNIP] = useState("")
    const [nama, setNama] = useState("")
    const [password, setPassword] = useState("")

    const handleNIP = (inputNIP) => {
        setNIP(inputNIP)
    }
    const handleNama = (inputNama) => {
        setNama(inputNama)
    }
    const handlePassword = (inputPassword) => {
        setPassword(inputPassword)
    }
    const userRegister = () => {
        const requestingData = {
            nip: NIP,
            nama: nama,
            password: password
        }
        axios({
            method: 'POST',
            url: 'http://localhost:3200/users',
            data: requestingData
        }).then((result) => {
            console.log(result.data)
            if (result.data.registered) {
                alert("Registration Success")
                window.location.replace('/login')
            } else {
                alert("Registration Failed")
            }
        })
    }

    return (
        <div className='register-page'>
            <Container>
                <div className='d-flex flex-column justify-content-center vh-100'>
                    <div className='col-7 m-auto p-5 h-75 bg-light rounded'>
                        <Link to='/' className='text-decoration-none'>
                            <h1 className="fw-bold h3 text-center">
                                DAFTAR AKUN
                            </h1>
                        </Link>
                        <form className="m-auto">
                            <Form.Group>
                                <Form.Label className='form-title fw-bold'>NIP</Form.Label>
                                <Form.Control type='number' placeholder='NIP Anda' required onChange={(event) => handleNIP(event.target.value)} />
                            </Form.Group>
                            <Form.Group>
                                <Form.Label className='form-title fw-bold'>Nama</Form.Label>
                                <Form.Control type='text' placeholder='Nama Anda' required onChange={(event) => handleNama(event.target.value)} />
                            </Form.Group>
                            <Form.Group>
                                <Form.Label className='form-title fw-bold'>Password</Form.Label>
                                <Form.Control type='password' placeholder='Password Anda' required onChange={(event) => handlePassword(event.target.value)} />
                            </Form.Group>
                            <Button className="mt-4 w-100 btn-light" onClick={() => userRegister()}>Daftar Sekarang</Button>
                            <p className='pt-4 text-center'>
                                Sudah punya akun?
                                <Link to='/login' className='login-direct text-decoration-none'> Masuk di sini</Link>
                            </p>
                        </form>
                    </div>
                </div>
            </Container>
        </div>
    )
}

export default Register