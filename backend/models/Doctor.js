import mongoose from 'mongoose';

const doctorSchema = new mongoose.Schema({
    name: {
        first: { type: String, required: true },
        middle: { type: String },
        last: { type: String, required: true }
    },
    specialization: { type: String, trim: true },
    qualifications: { type: String },
    experience_years: { type: Number, default: 0 },
    // flexible contact information - accept phone/email/mobile
    contact_info: {
        email: { type: String, match: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/ },
        phone: { type: String },
        mobile: {
            code: { type: String },
            number: { type: String }
        },
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

    img: {
        file_id: { type: mongoose.Schema.Types.ObjectId },
        data: { type: String } // store base64 or URL
    },
    // demographic and identity fields
    date_of_birth: { type: String },
    marital_status: { type: String },
    license_no: { type: String },
    license_expiry: { type: Date },
    gender: { type: String },
    blood_group: { type: String },
    nationality: { type: String },
    category: { type: String },
    aadhaar: { type: String },
    pan: { type: String },
    occupation: { type: String },
    // emergency contact
    emergency_contact: {
        name: { type: String },
        relation: { type: String },
        phone: { type: String },
        email: { type: String }
    },
    // professional / employment
    designation: { type: String },
    previousEmployer: { type: String },
    reasonForLeaving: { type: String },
    position: { type: String },
    department: { type: String },
    joining_date: { type: String },
    shift_type: { type: String },
    shift_start: { type: String },
    shift_end: { type: String },
    // qualification details
    yearOfPassing: { type: String },
    sub_specialization: { type: String },
    certifications: { type: String },
    universityName: { type: String },
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
    // flat form fields (accepted from frontend payloads)
    // contact aliases
    primaryContact: { type: String },
    alternateContact: { type: String },
    preferredContact: { type: String },
    preferred_contact: [{ type: String }],  // array for multiple contact methods
    // address aliases
    address1: { type: String },
    address2: { type: String },
    city: { type: String },
    postalCode: { type: String },
    district: { type: String },
    state: { type: String },
    country: { type: String },
    // emergency flat fields
    emergencyContactName: { type: String },
    emergencyContactRelation: { type: String },
    emergencyContactNo: { type: String },
    emergencyContactEmail: { type: String },
    // professional flat fields
    yearsOfExperience: { type: String },
    qualification: { type: String },
    yearOfPassing: { type: String },
    specialization2: { type: String },
    certifications: { type: String },
    universityName: { type: String },
    employeeType: { type: String },
    shiftStart: { type: String },
    shiftEnd: { type: String },
    shift_start: { type: String },
    shift_end: { type: String },
    // insurance flat fields
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
    insuranceCardImage: { type: String },  // base64 image data
    insurance_card_image: { type: String },  // base64 image data
    // photo (base64) field used by frontend
    photo: { type: String },
    createdAt: {
        type: Date,
        default: Date.now
    }
}, {
    timestamps: true
});

const Doctor = mongoose.models.Doctor || mongoose.model('Doctor', doctorSchema);
export default Doctor;
