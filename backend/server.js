import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import { connectDB } from './config/db.js';

import doctorRoutes from './routes/doctorRoutes.js';
import staffRoutes from './routes/staffRoutes.js';
import patientRoutes from './routes/patientRoutes.js';

dotenv.config();

const app = express();

// Middleware (increase limit for requests with base64 images - 50MB)
app.use(cors({
    origin: [process.env.FRONTEND_URL, 'http://localhost:5173', 'http://localhost:5174'].filter(Boolean),
    credentials: true
}));
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb', extended: true }));

// Routes
app.use('/api/doctors', doctorRoutes);
app.use('/api/staff', staffRoutes);
app.use('/api/patients', patientRoutes);

app.get('/', (req, res) => {
    res.send('API is running...');
});

// Handle payload too large so client gets JSON instead of HTML
app.use((err, req, res, next) => {
    if (err.type === 'entity.too.large') {
        return res.status(413).json({ message: 'Request body too large. Try uploading smaller images.' });
    }
    next(err);
});

const PORT = process.env.PORT || 5002;

// Connect to DB and start server
connectDB().then(() => {
    app.listen(PORT, () => {
        console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`);
    });
});
