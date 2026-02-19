import mongoose from 'mongoose';

const adminProfileSchema = new mongoose.Schema({
    name: {
        type: String,
        default: 'Not Set'
    },
    dob: {
        type: String, // Storing as string to match frontend 'Not Set' capability easily, or Date if preferred
        default: 'Not Set'
    },
    email: {
        type: String,
        default: 'Not Set'
    },
    contact: {
        type: String,
        default: 'Not Set'
    },
    username: {
        type: String,
        default: 'admin',
        unique: true
    },
    userId: {
        type: String,
        default: 'ADMIN001'
    }
}, {
    timestamps: true
});

const AdminProfile = mongoose.model('AdminProfile', adminProfileSchema);

export default AdminProfile;
