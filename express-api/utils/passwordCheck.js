const bcrypt = require('bcrypt')
const UsersModel = require('../models/users')

const passwordCheck = async (nip, password) => {
    try {
        const userData = await UsersModel.findOne({where: {nip:nip}})
        
        if (!userData) {
            return {compare: false, userData: null}
        }

        const compare = await bcrypt.compare(password, userData.password)
        return {compare, userData}
    } catch (error) {
        console.error('Password check error:', error)
        return {compare: false, userData: null}
    }
}

module.exports = passwordCheck