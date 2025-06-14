const express = require('express')
const router = express.Router()
const UsersModel = require('../models/users')
const bcrypt = require('bcrypt')
const passwordCheck = require('../utils/passwordCheck')

// routing endpoint users utama
router.get('/', async (req, res) => {
    const users = await UsersModel.findAll()
    res.status(200).json({
        data: users,
        metadata: "course backend 1"
    })
})

router.post('/', async (req, res) => {
    const { nip, nama, password } = req.body

    const encryptedPassword = await bcrypt.hash(password, 10)
    const users = await UsersModel.create({
        nip, nama, password: encryptedPassword
    })
    res.status(200).json({
        registered: users,
        metadata: "test post user endpoint"
    })
})

router.put('/', async (req, res) => {
    const { nip, nama, password, passwordBaru } = req.body

    const check = await passwordCheck(nip, password)

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
            error: "data invalid"
        })
    }

})

router.post('/login', async (req, res) => {
    const { nip, password } = req.body
    const check = await passwordCheck(nip, password)

    try {
        if (check.compare === true) {
            res.status(200).json({
                users: check.userData,
                metadata: "login success!"
            })
        }
    } catch (e) {
        res.status(400).json({
            error: "login failed!"
        })
    }
})

module.exports = router;