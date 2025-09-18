import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import { VillaController } from './controllers/villa.controller';

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(helmet());
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Health check endpoint
app.get('/health', (req, res) => {
    res.status(200).json({
        success: true,
        message: 'API Service is running',
        timestamp: new Date().toISOString()
    });
});

// Villa routes
app.get('/api/villas', VillaController.getAllVillas);
app.get('/api/villas/:id', VillaController.getVilla);
app.post('/api/villas', VillaController.createVilla);
app.put('/api/villas/:id', VillaController.updateVilla);
app.delete('/api/villas/:id', VillaController.deleteVilla);

// 404 handler
app.use('*', (req, res) => {
    res.status(404).json({
        success: false,
        message: 'Endpoint not found'
    });
});

// Error handler
app.use((err: any, req: express.Request, res: express.Response, next: express.NextFunction) => {
    console.error('Unhandled error:', err);
    
    res.status(500).json({
        success: false,
        message: 'Internal server error'
    });
});

app.listen(PORT, () => {
    console.log(`API Server running on port ${PORT}`);
    console.log(`Health check: http://localhost:${PORT}/health`);
});