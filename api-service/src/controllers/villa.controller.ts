import { Request, Response } from 'express';
import VillaGrpcClient from '../grpc-client';

const villaClient = new VillaGrpcClient();

export class VillaController {
    static async getVilla(req: Request, res: Response): Promise<void> {
        try {
            const { id } = req.params;
            
            if (!id) {
                res.status(400).json({
                    success: false,
                    message: 'Villa ID is required'
                });
                return;
            }

            const villa = await villaClient.getVilla(id);
            
            res.status(200).json({
                success: true,
                data: villa
            });
        } catch (error: any) {
            console.error('Error getting villa:', error);
            
            if (error.code === 5) { // NOT_FOUND
                res.status(404).json({
                    success: false,
                    message: 'Villa not found'
                });
                return;
            }
            
            res.status(500).json({
                success: false,
                message: 'Internal server error'
            });
        }
    }

    static async getAllVillas(req: Request, res: Response): Promise<void> {
        try {
            const page = parseInt(req.query.page as string) || 1;
            const limit = parseInt(req.query.limit as string) || 10;

            const result = await villaClient.getAllVillas(page, limit);
            
            res.status(200).json({
                success: true,
                data: result.villas,
                pagination: {
                    page,
                    limit,
                    total: result.total,
                    totalPages: Math.ceil(result.total / limit)
                }
            });
        } catch (error: any) {
            console.error('Error getting villas:', error);
            
            res.status(500).json({
                success: false,
                message: 'Internal server error'
            });
        }
    }

    static async createVilla(req: Request, res: Response): Promise<void> {
        try {
            const { name, location, price, rooms, description } = req.body;
            
            // Validation
            if (!name || !location || !price || !rooms) {
                res.status(400).json({
                    success: false,
                    message: 'Name, location, price, and rooms are required'
                });
                return;
            }

            const newVilla = await villaClient.createVilla({
                name,
                location,
                price: parseInt(price),
                rooms: parseInt(rooms),
                description: description || ''
            });
            
            res.status(201).json({
                success: true,
                data: newVilla,
                message: 'Villa created successfully'
            });
        } catch (error: any) {
            console.error('Error creating villa:', error);
            
            res.status(500).json({
                success: false,
                message: 'Failed to create villa'
            });
        }
    }

    static async updateVilla(req: Request, res: Response): Promise<void> {
        try {
            const { id } = req.params;
            const updateData = req.body;
            
            if (!id) {
                res.status(400).json({
                    success: false,
                    message: 'Villa ID is required'
                });
                return;
            }

            // Convert price and rooms to numbers if provided
            if (updateData.price) updateData.price = parseInt(updateData.price);
            if (updateData.rooms) updateData.rooms = parseInt(updateData.rooms);

            const updatedVilla = await villaClient.updateVilla({
                id,
                ...updateData
            });
            
            res.status(200).json({
                success: true,
                data: updatedVilla,
                message: 'Villa updated successfully'
            });
        } catch (error: any) {
            console.error('Error updating villa:', error);
            
            if (error.code === 5) { // NOT_FOUND
                res.status(404).json({
                    success: false,
                    message: 'Villa not found'
                });
                return;
            }
            
            res.status(500).json({
                success: false,
                message: 'Failed to update villa'
            });
        }
    }

    static async deleteVilla(req: Request, res: Response): Promise<void> {
        try {
            const { id } = req.params;
            
            if (!id) {
                res.status(400).json({
                    success: false,
                    message: 'Villa ID is required'
                });
                return;
            }

            const result = await villaClient.deleteVilla(id);
            
            res.status(200).json({
                success: true,
                message: result.message
            });
        } catch (error: any) {
            console.error('Error deleting villa:', error);
            
            if (error.code === 5) { // NOT_FOUND
                res.status(404).json({
                    success: false,
                    message: 'Villa not found'
                });
                return;
            }
            
            res.status(500).json({
                success: false,
                message: 'Failed to delete villa'
            });
        }
    }
}