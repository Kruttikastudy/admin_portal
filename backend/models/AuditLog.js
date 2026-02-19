import mongoose from 'mongoose';

const auditLogSchema = new mongoose.Schema({
    action: {
        type: String,
        enum: ['Created', 'Updated', 'Deleted'],
        required: true
    },
    entity_type: {
        type: String,
        enum: ['Doctor', 'Staff', 'Patient'],
        required: true
    },
    entity_id: {
        type: String,
        required: true
    },
    entity_name: {
        type: String,
        default: ''
    },
    performed_by: {
        type: String,
        default: 'admin'
    },
    changes: [{
        field: { type: String },
        oldValue: { type: mongoose.Schema.Types.Mixed },
        newValue: { type: mongoose.Schema.Types.Mixed }
    }],
    read: {
        type: Boolean,
        default: false
    }
}, {
    timestamps: true
});

// Index for fast querying by time and read status
auditLogSchema.index({ createdAt: -1 });
auditLogSchema.index({ read: 1 });

const AuditLog = mongoose.models.AuditLog || mongoose.model('AuditLog', auditLogSchema);
export default AuditLog;
