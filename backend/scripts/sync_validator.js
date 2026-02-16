import mongoose from 'mongoose';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({ path: path.join(__dirname, '../.env') });

const syncValidator = async () => {
    try {
        console.log('Connecting to MongoDB...');
        await mongoose.connect(process.env.MONGO_URI, {
            dbName: 'emrdb'
        });
        console.log('Connected.');

        const db = mongoose.connection.db;

        console.log('Applying validator to "patients" collection...');

        await db.command({
            collMod: 'patients',
            validator: {
                $jsonSchema: {
                    bsonType: "object",
                    required: ["name", "date_of_birth", "gender", "blood_group", "address", "aadhaar", "contact_info", "insurance"],
                    properties: {
                        "name": {
                            bsonType: "object",
                            required: ["first", "last"],
                            properties: {
                                "first": { bsonType: "string" },
                                "middle": { bsonType: "string" },
                                "last": { bsonType: "string" }
                            }
                        },
                        "date_of_birth": {
                            bsonType: "string",
                            pattern: "^(0[1-9]|1[0-2])-(0[1-9]|[12][0-9]|3[01])-\\d{4}$"
                        },
                        "gender": {
                            enum: ["Male", "Female", "Other"]
                        },
                        "marital_status": {
                            enum: ["Single", "Married", "Divorced", "Widowed"]
                        },
                        "nationality": {
                            enum: ["Indian", "American", "Other"]
                        },
                        "category": {
                            enum: ["General", "OBC", "SC", "ST"]
                        },
                        "blood_group": {
                            enum: [
                                "A Positive (A⁺)", "A Negative (A⁻)",
                                "B Positive (B⁺)", "B Negative (B⁻)",
                                "AB Positive (AB⁺)", "AB Negative (AB⁻)",
                                "O Positive (O⁺)", "O Negative (O⁻)",
                                "None"
                            ]
                        },
                        "address": {
                            bsonType: "object",
                            required: ["city", "postal_code", "district", "state", "country"],
                            properties: {
                                "street": { bsonType: "string" },
                                "street2": { bsonType: "string" },
                                "city": { bsonType: "string" },
                                "postal_code": { bsonType: "string" },
                                "district": { bsonType: "string" },
                                "state": { bsonType: "string" },
                                "country": { bsonType: "string" }
                            }
                        },
                        "occupation": {
                            enum: [
                                "Unemployed", "Employed", "Student",
                                "Business", "Services", "Retired",
                                "Government /civil service", "Other"
                            ]
                        },
                        "aadhaar": {
                            bsonType: "string",
                            pattern: "^$|^[0-9]{12}$"
                        },
                        "pan": {
                            bsonType: "string",
                            pattern: "^$|^[A-Z]{5}[0-9]{4}[A-Z]{1}$"
                        },
                        "photo": {
                            bsonType: "string"
                        },
                        "img": {
                            bsonType: "object",
                            properties: {
                                "file_id": { bsonType: "objectId" }
                            }
                        }
                    }
                }
            },
            validationLevel: "strict",
            validationAction: "error"
        });

        console.log('Validator updated successfully.');
        process.exit(0);
    } catch (error) {
        console.error('Error syncing validator:', error);
        process.exit(1);
    }
};

syncValidator();
