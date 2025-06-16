import { Form, Button, Container } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { useState } from 'react'
import axios from 'axios'
import { Logout } from './logout'

const Edit = () => {
    const [nama, setNama] = useState(localStorage.getItem('nama'))
    const [password, setPassword] = useState("")
    const [passwordBaru, setPasswordBaru] = useState("")    
    const updateProfile = async () => {
        try {
            const requestingData = {
                nip: localStorage.getItem('nip'),
                passwordBaru: passwordBaru,
                password: password,
                nama: nama
            }

            const result = await axios({
                method: "PUT",
                url: "http://localhost:3200/users",
                data: requestingData
            })
            alert("Anda akan keluar dari sistem, silahkan login kembali!")
            Logout()
        } catch (error) {
            console.error('Update profile error:', error)
            alert('Gagal memperbarui profil! Periksa password lama Anda.')
        }
    }

    return (
        <div className='edit-page'>
            <Container>
                <div className='vh-100 d-flex flex-column justify-content-center'>
                    <div className='col-7 m-auto p-5 h-75 bg-light rounded'>
                        <Link to='/' className='text-decoration-none'>
                            <h1 className="fw-bold h3 text-center">
                                PERBARUI AKUN
                            </h1>
                        </Link>
                        <Form className=''>
                            <Form.Group>
                                <Form.Label className='form-title'>Nama</Form.Label>
                                <Form.Control onChange={(event) => setNama(event.target.value)} defaultValue={localStorage.getItem('nama')} />
                            </Form.Group>
                            <Form.Group>
                                <Form.Label className='form-title'>Password Lama</Form.Label>
                                <Form.Control placeholder='Password anda sekarang' onChange={(event) => setPassword(event.target.value)} />
                            </Form.Group>
                            <Form.Group className='mt-3'>
                                <Form.Label className='form-title'>Password Baru</Form.Label>
                                <Form.Control placeholder='Password baru anda' onChange={(event) => setPasswordBaru(event.target.value)} />
                                {/* <Form.Text className='text-muted'>Masukkan password baru anda, harus berbeda dengan yang lama!</Form.Text> */}
                            </Form.Group>
                            <Button className='w-100 btn-light mt-3' onClick={() => updateProfile()}>Update Profile</Button>
                            <p className='pt-4 text-center mb-5'>
                                Tidak jadi?
                                <Link to='/dashboard' className='dashboard-direct text-decoration-none'> Kembali ke dashboard</Link>
                            </p>

                        </Form>
                    </div>
                </div>
            </Container>
        </div>
    )
}

export default Edit