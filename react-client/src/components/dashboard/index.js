import { useEffect, useState } from 'react'
import { Container, Button, ButtonToolbar, Dropdown, DropdownToggle } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { Logout } from './logout'
import formatDateTime from '../utils/formatDate'
import axios from 'axios'

const Dashboard = () => {
    const [absensiList, setAbsensiList] = useState([])
    const [absenNotif, setAbsenNotif] = useState(false)
    const [todayStatus, setTodayStatus] = useState({
        hasCheckedIn: false,
        hasCheckedOut: false,
        loading: true
    });
    const [error, setError] = useState('');

    // Check today's attendance status
    const checkTodayStatus = async () => {
        try {
            const currentUserNIP = localStorage.getItem('nip');
            const today = new Date().toISOString().split('T')[0]; // YYYY-MM-DD

            const response = await axios.get(
                `http://localhost:3200/absensi/user/${currentUserNIP}`
            );

            const todayRecords = response.data.absensi.filter(record => {
                const recordDate = new Date(record.createdAt).toISOString().split('T')[0];
                return recordDate === today;
            });

            const hasCheckedIn = todayRecords.some(record => record.status === 'in');
            const hasCheckedOut = todayRecords.some(record => record.status === 'out');

            setTodayStatus({
                hasCheckedIn,
                hasCheckedOut,
                loading: false
            });

        } catch (error) {
            console.error('Error checking today status:', error);
            setTodayStatus(prev => ({ ...prev, loading: false }));
        }
    };    useEffect(() => {
        if (!localStorage.getItem("nama") && !localStorage.getItem('nip')) {
            window.location.replace("/login");
            return;
        }

        const fetchData = async () => {
            try {
                const currentUserNIP = localStorage.getItem('nip');

                // Fetch absensi data
                const result = await axios.get(`http://localhost:3200/absensi/user/${currentUserNIP}`);
                setAbsensiList(result.data.absensi);

                // Check today's status
                await checkTodayStatus();
            } catch (error) {
                console.error('Error fetching data:', error);
                setError('Gagal memuat data absensi');
            }
        };

        fetchData();
    }, [absenNotif]);

    // Enhanced Absen function with error handling
    const Absen = async (params) => {
        try {
            setError(''); // Clear previous errors

            const requestingData = {
                nip: localStorage.getItem('nip')
            };

            const response = await axios({
                method: "POST",
                url: `http://localhost:3200/absensi/${params}`,
                data: requestingData
            });

            // Success - refresh data
            setAbsenNotif(!absenNotif);

            // Show success message (optional)
            alert(response.data.metadata || `${params} berhasil!`);

        } catch (error) {
            // Handle validation errors
            const errorMessage = error.response?.data?.error || 'Terjadi kesalahan';
            setError(errorMessage);
            alert(errorMessage);
        }
    };

    // Check if it's working hours
    const isWorkingHours = () => {
        const now = new Date();
        const hour = now.getHours();
        const day = now.getDay();

        return day >= 1 && day <= 5 && hour >= 8 && hour < 17;
    };

    return (
        <div className='dashboard-page'>
            <div className="border-bottom pt-3 pb-2 mb-3">
                <Container>
                    <div className='d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center'>
                        <Link to='/' className='text-decoration-none'>
                            <h6 className='text-dark'>Absensi Digital</h6>
                        </Link>
                        <ButtonToolbar className="mb-2 mb-md-0 ms-auto">
                            <Button onClick={() => Logout()} className='mx-2 d-none d-lg-block' variant="outline-danger" size="sm">Logout</Button>
                            <Dropdown>
                                <DropdownToggle className="profile-dashboard bg-transparent border-0 d-flex align-items-center">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="26" height="26" fill="currentColor" class="bi bi-person-circle" viewBox="0 0 16 16">
                                        <path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0" />
                                        <path fill-rule="evenodd" d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8m8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1" />
                                    </svg>
                                </DropdownToggle>
                                <Dropdown.Menu>
                                    <Dropdown.Item href="/dashboard/profile">Profile</Dropdown.Item>
                                    <Dropdown.Item href="/dashboard/stat">Statistik</Dropdown.Item>
                                    <Dropdown.Divider />
                                    <Dropdown.Item onClick={() => Logout()} className='text-danger'>Logout</Dropdown.Item>
                                </Dropdown.Menu>
                            </Dropdown>
                        </ButtonToolbar>
                    </div>
                </Container>
            </div>

            <section>
                <Container>
                    <div className="d-flex flex-wrap">
                        <h2 className="text-dark me-2 mb-0">Selamat datang kembali!</h2>
                        <h2 className="dashboard-page-name h2">{localStorage.getItem('nama')}</h2>
                    </div>
                    {/* Working hours indicator */}
                    <div className="alert alert-info mt-3">
                        <strong>Jam Kerja:</strong> Senin - Jumat, 08:00 - 17:00 WIB
                        {!isWorkingHours() && (
                            <div className="text-warning">
                                ⚠️ Saat ini di luar jam kerja
                            </div>
                        )}
                    </div>
                    <div className='d-grid d-lg-flex gap-2 mt-5 justify-content-lg-center'>
                        <Button className='btn-light' style={{ cursor: 'pointer' }} onClick={() => Absen("checkin")}>
                            checkin
                        </Button>
                        <Button className='btn-outline-light' style={{ cursor: 'pointer' }} onClick={() => Absen("checkout")}>
                            checkout
                        </Button>
                    </div>
                    <div className="table-responsive small mt-2">
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
                                                <td className='no-tabel'>{i + 1}</td>
                                                <td>{users_nip}</td>
                                                <td>{status}</td>
                                                <td>{formatDateTime(createdAt)}</td>
                                            </tr>
                                        )

                                    })
                                }
                            </tbody>
                        </table>
                    </div>

                </Container>

            </section>
        </div>
    )
}

export default Dashboard