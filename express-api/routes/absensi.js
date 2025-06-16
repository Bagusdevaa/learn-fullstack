const express = require('express')
const router = express.Router()
const AbsensiModel = require('../models/absensi')
const isWorkingHours = require('../utils/jamKerjaCheck')
const checkTodayAttendance = require('../utils/kehadiranCheck')

// routing endpoint absensi
router.get('/', async (req, res) => {
    try {
        const absensi = await AbsensiModel.findAll()
        res.status(200).json({
            absensi,
            metadata: "test absensi endpoint"
        })
    } catch (error) {
        console.error('Error fetching absensi:', error)
        res.status(500).json({
            error: "Failed to fetch absensi data"
        })
    }
})

router.post('/checkin', async (req, res) => {
    const { nip } = req.body

    try {
        // Basic validation
        if (!nip) {
            return res.status(400).json({
                error: "NIP harus diisi"
            })
        }

        // Validasi jam kerja
        const workingHours = isWorkingHours();
        if (!workingHours.valid) {
            return res.status(400).json({
                error: workingHours.message
            });
        }

        // Cek apakah sudah checkin hari ini
        const existingCheckin = await checkTodayAttendance(nip, 'in')
        if (existingCheckin) {
            return res.status(400).json({
                error: 'Anda sudah checkin hari ini!'
            })
        }
        const absensi = await AbsensiModel.create({
            users_nip: nip, status: 'in'
        })

        res.status(200).json({
            data: absensi,
            metadata: "checkin berhasil!"
        })
    } catch (error) {
        console.error('Checkin error:', error)
        res.status(500).json({
            error: 'Gagal melakukan checkin'
        })
    }

})

router.post('/checkout', async (req, res) => {
    const { nip } = req.body

    try {
        // Basic validation
        if (!nip) {
            return res.status(400).json({
                error: "NIP harus diisi"
            })
        }

        // Validasi jam kerja
        const workingHours = isWorkingHours();
        if (!workingHours.valid) {
            return res.status(400).json({
                error: workingHours.message
            });
        }

        // Cek apakah sudah checkin hari ini
        const existingCheckin = await checkTodayAttendance(nip, 'in');
        if (!existingCheckin) {
            return res.status(400).json({
                error: "Anda belum check-in hari ini"
            });
        }

        // Cek apakah sudah checkout hari ini  
        const existingCheckout = await checkTodayAttendance(nip, 'out');
        if (existingCheckout) {
            return res.status(400).json({
                error: "Anda sudah check-out hari ini"
            });
        }
        const absensi = await AbsensiModel.create({
            users_nip: nip, status: 'out'
        })

        res.status(200).json({
            data: absensi,
            metadata: "checkout berhasil!"
        })
    } catch (error) {
        console.error('Checkout error:', error)
        res.status(500).json({
            error: "Gagal melakukan checkout"
        })
    }

})

router.get('/user/:nip', async (req, res) => {
    const { nip } = req.params;

    try {
        // Validasi NIP
        if (!nip) {
            return res.status(400).json({ error: "NIP required" });
        }

        const userAbsensi = await AbsensiModel.findAll({
            where: { users_nip: nip },
            order: [['createdAt', 'DESC']],
            limit: 50  // Limit untuk performance
        });

        res.status(200).json({
            absensi: userAbsensi,
            count: userAbsensi.length,
            metadata: `Absensi data for user ${nip}`
        });
    } catch (error) {
        console.error('Error fetching user absensi:', error);
        res.status(500).json({
            error: "Failed to fetch absensi data",
            details: error.message
        });
    }
});

module.exports = router