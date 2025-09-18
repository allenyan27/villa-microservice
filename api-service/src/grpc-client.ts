import * as grpc from '@grpc/grpc-js';
import * as protoLoader from '@grpc/proto-loader';
import path from 'path';

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

// gRPC Client Configuration
const GRPC_HOST = process.env.VILLA_GRPC_HOST || 'localhost';
const GRPC_PORT = process.env.VILLA_GRPC_PORT || '50051';

class VillaGrpcClient {
    private client: any;

    constructor() {
        this.client = new villaProto.VillaService(
            `${GRPC_HOST}:${GRPC_PORT}`,
            grpc.credentials.createInsecure()
        );
    }

    async getVilla(id: string): Promise<any> {
        return new Promise((resolve, reject) => {
            this.client.getVilla({ id }, (error: any, response: any) => {
                if (error) {
                    reject(error);
                } else {
                    resolve(response);
                }
            });
        });
    }

    async getAllVillas(page: number = 1, limit: number = 10): Promise<any> {
        return new Promise((resolve, reject) => {
            this.client.getAllVillas({ page, limit }, (error: any, response: any) => {
                if (error) {
                    reject(error);
                } else {
                    resolve(response);
                }
            });
        });
    }

    async createVilla(villaData: any): Promise<any> {
        return new Promise((resolve, reject) => {
            this.client.createVilla(villaData, (error: any, response: any) => {
                if (error) {
                    reject(error);
                } else {
                    resolve(response);
                }
            });
        });
    }

    async updateVilla(updateData: any): Promise<any> {
        return new Promise((resolve, reject) => {
            this.client.updateVilla(updateData, (error: any, response: any) => {
                if (error) {
                    reject(error);
                } else {
                    resolve(response);
                }
            });
        });
    }

    async deleteVilla(id: string): Promise<any> {
        return new Promise((resolve, reject) => {
            this.client.deleteVilla({ id }, (error: any, response: any) => {
                if (error) {
                    reject(error);
                } else {
                    resolve(response);
                }
            });
        });
    }
}

export default VillaGrpcClient;