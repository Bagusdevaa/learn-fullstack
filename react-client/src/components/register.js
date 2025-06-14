import Typewriter from 'typewriter-effect';
import { Container, Form, Button } from 'react-bootstrap';
import { useState } from "react"
import axios from "axios";

const Register = ( {title, description} ) => {
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
        }).then((result)=> {
            console.log(result.data)
            if(result.data.registered){
                alert("Registration Success")
                window.location.replace('/login')
            }else{
                alert("Registration Failed")
            }
        })
    }

    return (
        <Container>
            <div className="d-flex justify-content-center fw-bold h3 my-4">
                <Typewriter
                    options={{
                        strings: [title, description],
                        autoStart: true,
                        loop: true,
                        delay: 100,
                        deleteSpeed: 50,
                    }}
                />
            </div>
            <form className="w-50 mx-auto">
                <Form.Group>
                    <Form.Label className='fw-bold'>NIP</Form.Label>
                    <Form.Control type='number' placeholder='NIP Anda' required onChange={(event) => handleNIP(event.target.value)} />
                </Form.Group>
                <Form.Group>
                    <Form.Label className='fw-bold'>Nama</Form.Label>
                    <Form.Control type='text' placeholder='Nama Anda' required onChange={(event) => handleNama(event.target.value)} />
                </Form.Group>
                <Form.Group>
                    <Form.Label className='fw-bold'>Password</Form.Label>
                    <Form.Control type='password' placeholder='Password Anda' required onChange={(event) => handlePassword(event.target.value)} />
                </Form.Group>
                <Button className="mt-4 w-100" onClick={() => userRegister()}>Daftar Sekarang</Button>
            </form>
        </Container>
    )
}

export default Register