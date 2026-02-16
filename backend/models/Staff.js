import mongoose from 'mongoose';

const staffSchema = new mongoose.Schema({
    name: {
        first: { type: String, required: true },
        middle: { type: String },
        last: { type: String, required: true }
    },
    role: { type: String, enum: ['Nurse', 'Receptionist', 'Pharmacist', 'Lab Technician', 'Admin', 'Doctor', 'Business', 'Other'], default: 'Nurse' },
    department: { type: String },
    staff_id: { type: String, unique: true },
    contact_info: {
        email: { type: String, match: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/ },
        phone: { type: String },
        mobile: { type: String },
        alternate_phone: { type: String },
        address: {
            street: { type: String },
            street2: { type: String },
            city: { type: String },
            postal_code: { type: String },
            district: { type: String },
            state: { type: String },
            country: { type: String }
        }
    },
    status: {
        type: String,
        enum: ['Active', 'On Leave', 'Inactive'],
        default: 'Active'
    },
    shift: {
        type: String,
        enum: ['Day', 'Night', 'Rotating', 'Full-time', 'Part-time'],
        default: 'Day'
    },
    img: { file_id: { type: mongoose.Schema.Types.ObjectId }, data: { type: String } },
    // demographic and identity fields
    date_of_birth: { type: String },
    marital_status: { type: String },
    gender: { type: String },
    blood_group: { type: String },
    nationality: { type: String },
    category: { type: String },
    aadhaar: { type: String },
    pan: { type: String },
    occupation: { type: String },
    // professional / employment
    designation: { type: String },
    previousEmployer: { type: String },
    reasonForLeaving: { type: String },
    position: { type: String },
    employment_type: { type: String },
    joining_date: { type: String },
    shift_type: { type: String },
    shift_start: { type: String },
    shift_end: { type: String },
    experience_years: { type: Number, default: 0 },
    // qualification details
    license_no: { type: String },
    license_expiry: { type: String },
    // emergency contact
    emergency_contact: { name: String, relation: String, phone: String, email: String },
    // insurance
    insurance: {
        primary: {
            company_name: { type: String },
            policy_number: { type: String },
            group_number: { type: String },
            plan_type: { type: String },
            effective_start: { type: String },
            effective_end: { type: String }
        },
        secondary: {
            company_name: { type: String },
            policy_number: { type: String },
            group_number: { type: String },
            plan_type: { type: String },
            effective_start: { type: String },
            effective_end: { type: String }
        },
        insurance_contact_number: { type: String }
    },
    // flat form aliases to match frontend keys
    primaryContact: { type: String },
    alternateContact: { type: String },
    preferredContact: { type: String },
    preferred_contact: [{ type: String }],
    address1: { type: String },
    address2: { type: String },
    city: { type: String },
    postalCode: { type: String },
    district: { type: String },
    state: { type: String },
    country: { type: String },
    emergencyContactName: { type: String },
    emergencyContactRelation: { type: String },
    emergencyContactNo: { type: String },
    emergencyContactEmail: { type: String },
    yearsOfExperience: { type: String },
    licenseNo: { type: String },
    licenseExpiryDate: { type: String },
    qualification: { type: String },
    specialization: { type: String },
    yearOfPassing: { type: String },
    specialization2: { type: String },
    sub_specialization: { type: String },
    certifications: { type: String },
    universityName: { type: String },
    primaryInsuranceCompany: { type: String },
    primaryPolicyNumber: { type: String },
    primaryGroupNumber: { type: String },
    primaryStartDate: { type: String },
    primaryEndDate: { type: String },
    secondaryInsuranceCompany: { type: String },
    secondaryPolicyNumber: { type: String },
    secondaryGroupNumber: { type: String },
    secondaryStartDate: { type: String },
    secondaryEndDate: { type: String },
    insuranceContactNumber: { type: String },
    insuranceCardImage: { type: String },
    insurance_card_image: { type: String },
    photo: { type: String },
    createdAt: {
        type: Date,
        default: Date.now
    }
}, {
    timestamps: true
});

const Staff = mongoose.models.Staff || mongoose.model('Staff', staffSchema);
export default Staff;
