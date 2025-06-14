import { Form, Button } from 'react-bootstrap'
import { useState } from 'react'
import axios from 'axios'
import { Logout } from './logout'

const Edit = () => {
    const [nama, setNama] = useState(localStorage.getItem('nama'))
    const [password, setPassword] = useState("")
    const [passwordBaru, setPasswordBaru] = useState("")

    const updateProfile = () => {
        const requestingData = {
            nip: localStorage.getItem('nip'),
            passwordBaru: passwordBaru,
            password: password,
            nama: nama
        }

        axios({
            method: "PUT",
            url: "http://localhost:3200/users",
            data: requestingData
        }).then((result) => {
            alert("Anda akan keluar dari sistem, silahkan login kembali!")
            Logout()
        })
    }

    return (
        <Form className='my-4'>
            <Form.Group>
                <Form.Label>Nama</Form.Label>
                <Form.Control onChange={(event) => setNama(event.target.value)} defaultValue={localStorage.getItem('nama')} />
            </Form.Group>
            <Form.Group>
                <Form.Label>Password Lama</Form.Label>
                <Form.Control onChange={(event) => setPassword(event.target.value)} />
            </Form.Group>
            <hr />
            <Form.Group>
                <Form.Label>Password Baru</Form.Label>
                <Form.Control onChange={(event) => setPasswordBaru(event.target.value)} />
                <Form.Text className='text-muted'>Masukkan password baru anda, harus berbeda dengan yang lama!</Form.Text>
            </Form.Group>
            <Button className='w-100' onClick={() => updateProfile()}>Update Profile</Button>
        </Form>
    )
}

export default Edit