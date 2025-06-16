const express = require('express')
const router = express.Router()
const UsersModel = require('../models/users')
const bcrypt = require('bcrypt')
const passwordCheck = require('../utils/passwordCheck')

// routing endpoint users utama
router.get('/', async (req, res) => {
    try {
        const users = await UsersModel.findAll()
        res.status(200).json({
            data: users,
            metadata: "course backend 1"
        })
    } catch (error) {
        console.error('Error fetching users:', error)
        res.status(500).json({
            error: "Failed to fetch users"
        })
    }
})

router.post('/', async (req, res) => {
    try {
        const { nip, nama, password } = req.body

        // Basic validation
        if (!nip || !nama || !password) {
            return res.status(400).json({
                error: "NIP, nama, dan password harus diisi"
            })
        }

        const encryptedPassword = await bcrypt.hash(password, 10)
        const users = await UsersModel.create({
            nip, nama, password: encryptedPassword
        })
        res.status(200).json({
            registered: users,
            metadata: "test post user endpoint"
        })
    } catch (error) {
        console.error('Registration error:', error)
        if (error.name === 'SequelizeUniqueConstraintError') {
            res.status(400).json({
                error: "NIP sudah terdaftar"
            })
        } else {
            res.status(500).json({
                error: "Gagal mendaftarkan user"
            })
        }
    }
})

router.put('/', async (req, res) => {
    try {
        const { nip, nama, password, passwordBaru } = req.body

        // Basic validation
        if (!nip || !nama || !password || !passwordBaru) {
            return res.status(400).json({
                error: "Semua field harus diisi"
            })
        }

        const check = await passwordCheck(nip, password)

        if (!check.userData) {
            return res.status(404).json({
                error: "User tidak ditemukan"
            })
        }

        const encryptedPasswordBaru = await bcrypt.hash(passwordBaru, 10)

        if (check.compare === true) {
            const users = await UsersModel.update({
                nama, password: encryptedPasswordBaru
            }, { where: { nip: nip } })

            res.status(200).json({
                users: { updated: users[0] },
                metadata: "user updated!"
            })
        } else {
            res.status(400).json({
                error: "Password lama tidak sesuai"
            })
        }
    } catch (error) {
        console.error('Update profile error:', error)
        res.status(500).json({
            error: "Gagal memperbarui profil"
        })
    }
})

router.post('/login', async (req, res) => {
    try {
        const { nip, password } = req.body

        // Basic validation
        if (!nip || !password) {
            return res.status(400).json({
                error: "NIP dan password harus diisi"
            })
        }

        const check = await passwordCheck(nip, password)

        if (!check.userData) {
            return res.status(404).json({
                error: "User tidak ditemukan"
            })
        }

        if (check.compare === true) {
            res.status(200).json({
                users: check.userData,
                metadata: "login success!"
            })
        } else {
            res.status(400).json({
                error: "Password salah"
            })
        }
    } catch (error) {
        console.error('Login error:', error)
        res.status(500).json({
            error: "Login failed!"
        })
    }
})

module.exports = router;