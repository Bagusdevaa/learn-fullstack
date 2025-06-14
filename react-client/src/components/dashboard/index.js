import { useEffect, useState } from 'react'
import { Container, Button, ButtonGroup, ButtonToolbar, Badge } from 'react-bootstrap'
import axios from 'axios'
import Edit from "./edit"
import { Logout } from './logout'

const Dashboard = ({ title }) => {
    const [absensiList, setAbsensiList] = useState([])
    const [absenNotif, setAbsenNotif] = useState(false)

    useEffect(() => {
        if (!localStorage.getItem("nama") && !localStorage.getItem('nip')) {
            console.log('user belum login!')
            window.location.replace("/login")
        }
        axios({
            method: "GET",
            url: "http://localhost:3200/absensi"
        }).then((result) => setAbsensiList(result.data.absensi))
    }, [absenNotif])

    const Absen = (params) => {
        const requestingData = {
            nip: localStorage.getItem('nip')
        }
        axios({
            method: "POST",
            url: `http://localhost:3200/absensi/${params}`,
            data: requestingData
        }).then((result) => {
            setAbsenNotif(!absenNotif)
        })
    }

    return (
        <Container>
            <main className="col-md-9 ms-sm-auto col-lg-12 px-md-4">
                <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
                    <h1 className="h2">{localStorage.getItem('nama')}</h1>

                    <ButtonToolbar className="mb-2 mb-md-0">
                        <ButtonGroup className="me-2" size="sm">
                            <Button variant="outline-secondary">Share</Button>
                            <Button variant="outline-secondary">Export</Button>
                        </ButtonGroup>
                        <Button variant="outline-secondary" size="sm">This week</Button>
                        <Button onClick={() => Logout()} className='mx-2' variant="outline-danger" size="sm">Logout</Button>
                    </ButtonToolbar>
                </div>
                <Edit />

                <h2>{title}</h2>
                <div className="table-responsive small">
                    <table className="table table-striped table-sm">
                        <thead>
                            <tr>
                                <th scope="col">No.</th>
                                <th scope="col">NIP</th>
                                <th scope="col">Status</th>
                                <th scope="col">Tanggal</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                absensiList.map((absensi, i) => {
                                    const { users_nip, status, createdAt } = absensi
                                    return (
                                        <tr key={i}>
                                            <td>{i + 1}</td>
                                            <td>{users_nip}</td>
                                            <td>{status}</td>
                                            <td>{createdAt}</td>
                                        </tr>
                                    )

                                })
                            }
                        </tbody>
                    </table>
                </div>
                <div className='d-flex justify-content-center gap-2'>
                    <Badge pill bg='primary' style={{ cursor: 'pointer' }} onClick={() => Absen("checkin")}>
                        checkin
                    </Badge>
                    <Badge pill bg='danger' style={{ cursor: 'pointer' }} onClick={() => Absen("checkout")}>
                        checkout
                    </Badge>
                </div>
            </main>
        </Container>
    )
}

export default Dashboard