const AbsensiModel = require('../models/absensi')
const { Op } = require('sequelize');

// Helper function untuk cek absensi hari ini
const checkTodayAttendance = async (nip, status) => {
    const today = new Date();
    const startOfDay = new Date(today.setHours(0, 0, 0, 0));
    const endOfDay = new Date(today.setHours(23, 59, 59, 999));

    const existingAttendance = await AbsensiModel.findOne({
        where: {
            users_nip: nip,
            status: status,
            createdAt: {
                [Op.between]: [startOfDay, endOfDay]
            }
        }
    });
    
    return existingAttendance;
};

module.exports = checkTodayAttendance