import * as grpc from '@grpc/grpc-js';
import * as protoLoader from '@grpc/proto-loader';
import path from 'path';
import { VillaData } from './data';

// Load proto file
const PROTO_PATH = path.join(__dirname, '../../proto/villa.proto');
const packageDefinition = protoLoader.loadSync(PROTO_PATH, {
    keepCase: true,
    longs: String,
    enums: String,
    defaults: true,
    oneofs: true,
});

const villaProto = grpc.loadPackageDefinition(packageDefinition).villa as any;

// gRPC Service Implementation
const villaService = {
    getVilla: (call: any, callback: any) => {
        try {
            const { id } = call.request;
            const villa = VillaData.getVillaById(id);
            
            if (!villa) {
                return callback({
                    code: grpc.status.NOT_FOUND,
                    message: 'Villa not found'
                });
            }
            
            callback(null, villa);
        } catch (error) {
            callback({
                code: grpc.status.INTERNAL,
                message: 'Internal server error'
            });
        }
    },

    getAllVillas: (call: any, callback: any) => {
        try {
            const { page = 1, limit = 10 } = call.request;
            const result = VillaData.getAllVillas(page, limit);
            
            callback(null, {
                villas: result.villas,
                total: result.total
            });
        } catch (error) {
            callback({
                code: grpc.status.INTERNAL,
                message: 'Internal server error'
            });
        }
    },

    createVilla: (call: any, callback: any) => {
        try {
            const villaData = call.request;
            const newVilla = VillaData.createVilla({
                ...villaData,
                available: true // Default to available
            });
            
            callback(null, newVilla);
        } catch (error) {
            callback({
                code: grpc.status.INTERNAL,
                message: 'Failed to create villa'
            });
        }
    },

    updateVilla: (call: any, callback: any) => {
        try {
            const updateData = call.request;
            const updatedVilla = VillaData.updateVilla(updateData.id, updateData);
            
            if (!updatedVilla) {
                return callback({
                    code: grpc.status.NOT_FOUND,
                    message: 'Villa not found'
                });
            }
            
            callback(null, updatedVilla);
        } catch (error) {
            callback({
                code: grpc.status.INTERNAL,
                message: 'Failed to update villa'
            });
        }
    },

    deleteVilla: (call: any, callback: any) => {
        try {
            const { id } = call.request;
            const success = VillaData.deleteVilla(id);
            
            if (!success) {
                return callback({
                    code: grpc.status.NOT_FOUND,
                    message: 'Villa not found'
                });
            }
            
            callback(null, {
                success: true,
                message: 'Villa deleted successfully'
            });
        } catch (error) {
            callback({
                code: grpc.status.INTERNAL,
                message: 'Failed to delete villa'
            });
        }
    }
};

// Create gRPC Server
const server = new grpc.Server();

server.addService(villaProto.VillaService.service, villaService);

const PORT = process.env.GRPC_PORT || '50051';

server.bindAsync(
    `0.0.0.0:${PORT}`,
    grpc.ServerCredentials.createInsecure(),
    (error: Error | null, port: number) => {
        if (error) {
            console.error('Failed to start gRPC server:', error);
            return;
        }
        
        console.log(`Villa gRPC Server running on port ${port}`);
        // server.start() is no longer necessary in newer versions
    }
);