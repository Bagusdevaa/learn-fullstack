import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Button, Card, Badge, Navbar, Nav } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import Typewriter from 'typewriter-effect';
import AOS from 'aos'
import 'aos/dist/aos.css'
import '../index.css';

const Home = () => {
    const [scrolled, setScrolled] = useState(false);

    // Inisialisasi AOS saat komponen dimuat
    useEffect(() => {
        AOS.init({
            duration: 1000,
            once: true,    
            mirror: false,
        });
        AOS.refresh(); // Refresh AOS jika ada perubahan DOM
    }, []);

    // Efek samping untuk menambahkan dan menghapus event listener
    useEffect(() => {
        const handleScroll = () => {
            // Jika posisi scroll lebih besar dari 50px
            if (window.scrollY > 50) {
                setScrolled(true); // Atur state menjadi true
            } else {
                setScrolled(false); // Atur state menjadi false
            }
        };

        window.addEventListener('scroll', handleScroll);

        // Cleanup function: hapus event listener saat komponen unmount
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []); // Array dependensi kosong agar efek hanya berjalan sekali saat mount

    return (
        <div className='home-page'>
            {/* Navbar Section */}
            <Navbar expand="lg" fixed="top" className={`custom-navbar ${scrolled ? 'scrolled-navbar' : ''}`}>
                <Container>
                    <Navbar.Brand as={Link} to="/">Absensi Digital</Navbar.Brand>

                    <Navbar.Toggle aria-controls="basic-navbar-nav" />

                    <Navbar.Collapse id="basic-navbar-nav" className="justify-content-end">
                        <Nav.Link as={Link} to="/login" className="d-none d-lg-block me-2">
                            <Button className='btn-outline-light'>Masuk</Button>
                        </Nav.Link>
                        <Nav.Link as={Link} to="/register" className="d-none d-lg-block">
                            <Button className='btn-light'>Daftar</Button>
                        </Nav.Link>

                        {/* Untuk mobile, tampilkan tombol di dalam Nav ketika Navbar.Collapse terbuka */}
                        <Nav className="d-lg-none mt-3">
                            <Nav.Item>
                                <Nav.Link as={Link} to="/login">
                                    <Button className='btn-outline-light w-100 mb-2'>Masuk</Button>
                                </Nav.Link>
                            </Nav.Item>
                            <Nav.Item>
                                <Nav.Link as={Link} to="/register">
                                    <Button className='btn-light w-100'>Daftar</Button>
                                </Nav.Link>
                            </Nav.Item>
                        </Nav>

                    </Navbar.Collapse>
                </Container>
            </Navbar>

            {/* Hero Section */}
            <section className='hero-section text-white py-5 vh-100 d-flex align-items-center mb-6'>
                <Container>
                    <Row className='align-items-center'>
                        <Col lg={7} md={12} className='mb-4 mb-lg-0'>
                            <div className="hero-content">
                                <h1 className="display-6 fw-bold mb-4" data-aos="fade-up">
                                    <Typewriter
                                        options={{
                                            strings: [
                                                'Sistem Absensi Digital',
                                                'Kelola Kehadiran Mudah',
                                                'Attendance Management'
                                            ],
                                            autoStart: true,
                                            loop: true,
                                            delay: 75,
                                            deleteSpeed: 50,
                                        }}
                                    />
                                </h1>
                                <p className="mb-4" data-aos="fade-up" data-aos-delay="200" data-aos-duration="1000">
                                    Platform digital untuk mengelola absensi karyawan dengan mudah,
                                    cepat, dan akurat. Pantau kehadiran real-time dan kelola data
                                    attendance dalam satu dashboard.
                                </p>
                                <div className="hero-buttons d-grid d-lg-flex mb-3 mb-lg-0" data-aos="fade-up" data-aos-delay="400" data-aos-duration="1000">
                                    <Link to="/login" className="text-decoration-none">
                                        <Button size="lg" className="btn-light mb-2 mb-lg-0 me-lg-3">
                                            Masuk Sekarang
                                        </Button>
                                    </Link>
                                    <Link to="/register" className="text-decoration-none">
                                        <Button className='btn-outline-light' size="lg">
                                            Daftar Baru
                                        </Button>
                                    </Link>
                                </div>
                            </div>
                        </Col>
                        <Col lg={5} md={12} className="text-center" data-aos="fade-in" data-aos-delay="600" data-aos-duration="1000">
                            <div className="hero-image">
                                <div className="dashboard-preview bg-white rounded shadow-lg p-4">
                                    <div className="d-flex justify-content-between align-items-center mb-3">
                                        <h6 className="text-dark mb-0">Dashboard Preview</h6>
                                        <Badge bg="success">Live</Badge>
                                    </div>
                                    <div className="mini-stats row g-2">
                                        <div className="col-6">
                                            <div className="stat-card bg-light p-3 rounded text-center">
                                                <h5 className="text-primary mb-1">24</h5>
                                                <small className="text-muted">Hari Hadir</small>
                                            </div>
                                        </div>
                                        <div className="col-6">
                                            <div className="stat-card bg-light p-3 rounded text-center">
                                                <h5 className="text-success mb-1">95%</h5>
                                                <small className="text-muted">Kehadiran</small>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </Col>
                    </Row>
                </Container>
            </section>

            {/* How It Works Section */}
            <section className="how-it-works-section bg-light py-5 mb-5 d-flex align-items-center">
                <Container>
                    <Row className="text-center mb-5">
                        <Col data-aos="fade-up" data-aos-duration="1000">
                            <h2 className="display-6 fw-bold">Cara Kerja</h2>
                            <p className="lead text-muted">
                                Tiga langkah mudah untuk memulai
                            </p>
                        </Col>
                    </Row>
                    <Row className="g-4">
                        <Col lg={4} md={6} className="text-center" data-aos="fade-up" data-aos-delay="100" data-aos-duration="1000">
                            <Card>
                                <Card.Body>
                                    <div className="step-number text-white rounded-circle d-inline-flex align-items-center justify-content-center mb-3">
                                        <span className="fw-bold">1</span>
                                    </div>
                                    <h5>Daftar & Login</h5>
                                    <p className="text-muted">
                                        Buat akun dengan NIP dan data diri,
                                        lalu login ke dashboard personal Anda.
                                    </p>
                                </Card.Body>
                            </Card>
                        </Col>
                        <Col lg={4} md={6} className="text-center" data-aos="fade-up" data-aos-delay="200" data-aos-duration="1000">
                            <Card>
                                <Card.Body>
                                    <div className="step-number text-white rounded-circle d-inline-flex align-items-center justify-content-center mb-3">
                                        <span className="fw-bold">2</span>
                                    </div>
                                    <h5>Check-in Harian</h5>
                                    <p className="text-muted">
                                        Lakukan absensi check-in saat tiba di kantor
                                        dan check-out saat pulang kerja.
                                    </p>
                                </Card.Body>
                            </Card>
                        </Col>
                        <Col lg={4} md={6} className="text-center" data-aos="fade-up" data-aos-delay="300" data-aos-duration="1000">
                            <Card>
                                <Card.Body>
                                    <div className="step-number text-white rounded-circle d-inline-flex align-items-center justify-content-center mb-3">
                                        <span className="fw-bold">3</span>
                                    </div>
                                    <h5>Pantau Progress</h5>
                                    <p className="text-muted">
                                        Lihat riwayat kehadiran dan statistik
                                        absensi Anda dalam dashboard.
                                    </p>
                                </Card.Body>
                            </Card>
                        </Col>
                    </Row>
                </Container>
            </section>

            {/* Call to Action Section */}
            <section className="cta-section bg-gradient py-5">
                <Container>
                    <Row className="text-center">
                        <Col>
                            <h2 className="display-6 fw-bold mb-3" data-aos="fade-in" data-aos-duration="1000">Siap Memulai?</h2>
                            <p className="lead mb-4" data-aos="fade-up" data-aos-delay="200" data-aos-duration="1000">
                                Bergabunglah dengan sistem absensi digital yang mudah dan efisien
                            </p>
                            <Link to="/register" className="text-decoration-none" data-aos="fade-up" data-aos-delay="300" data-aos-duration="1000">
                                <Button size="lg" className="btn-light me-3">
                                    <i className="bi bi-person-plus me-2"></i>
                                    Daftar Gratis
                                </Button>
                            </Link>
                        </Col>
                    </Row>
                </Container>
            </section>

            {/* Footer */}
            <footer className="text-white py-4">
                <Container>
                    <Row>
                        <Col md={6}>
                            <h6 className="fw-bold">Sistem Absensi Digital</h6>
                            <p className="text-muted small mb-0">
                                Platform modern untuk mengelola kehadiran karyawan
                            </p>
                        </Col>
                        <Col md={6} className="text-md-end mt-4">
                            <p className="text-muted small mb-0">
                                © 2025 Absensi App. Built with ❤️ using React & Express
                            </p>
                        </Col>
                    </Row>
                </Container>
            </footer>
        </div>
    );
};

export default Home;
