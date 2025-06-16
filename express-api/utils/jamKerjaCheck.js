// Helper function untuk validasi jam kerja
const isWorkingHours = () => {
    const now = new Date();
    const hour = now.getHours();
    const day = now.getDay(); // 0 = Sunday, 1 = Monday, ..., 6 = Saturday
    
    // Validasi hari kerja (Senin-Jumat)
    if (day === 0 || day === 6) {
        return { valid: false, message: "Hari ini bukan hari kerja" };
    }
    
    // Validasi jam kerja (08:00 - 17:00)
    if (hour < 8 || hour >= 17) {
        return { valid: false, message: "Di luar jam kerja (08:00 - 17:00)" };
    }
    
    return { valid: true };
};

module.exports = isWorkingHours