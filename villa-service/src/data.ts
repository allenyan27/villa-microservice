
import { v4 as uuidv4 } from 'uuid';
import { Villa } from './models/villa.model';

// Simulasi database in-memory
let villas: Villa[] = [
    {
        id: uuidv4(),
        name: "Villa Paradise",
        location: "Bali, Indonesia",
        price: 1500000,
        rooms: 4,
        available: true,
        description: "Beautiful villa with ocean view"
    },
    {
        id: uuidv4(),
        name: "Villa Sunset",
        location: "Lombok, Indonesia",
        price: 1200000,
        rooms: 3,
        available: true,
        description: "Cozy villa perfect for family vacation"
    },
    {
        id: uuidv4(),
        name: "Villa Mountain View",
        location: "Bandung, Indonesia",
        price: 800000,
        rooms: 2,
        available: false,
        description: "Villa with stunning mountain scenery"
    }
];

export class VillaData {
    static getAllVillas(page: number = 1, limit: number = 10): { villas: Villa[], total: number } {
        const startIndex = (page - 1) * limit;
        const endIndex = startIndex + limit;
        
        return {
            villas: villas.slice(startIndex, endIndex),
            total: villas.length
        };
    }

    static getVillaById(id: string): Villa | null {
        return villas.find(villa => villa.id === id) || null;
    }

    static createVilla(villaData: Omit<Villa, 'id'>): Villa {
        const newVilla: Villa = {
            id: uuidv4(),
            ...villaData
        };
        
        villas.push(newVilla);
        return newVilla;
    }

    static updateVilla(id: string, updateData: Partial<Villa>): Villa | null {
        const villaIndex = villas.findIndex(villa => villa.id === id);
        
        if (villaIndex === -1) {
            return null;
        }

        villas[villaIndex] = {
            ...villas[villaIndex],
            ...updateData,
            id // Ensure ID doesn't change
        };

        return villas[villaIndex];
    }

    static deleteVilla(id: string): boolean {
        const villaIndex = villas.findIndex(villa => villa.id === id);
        
        if (villaIndex === -1) {
            return false;
        }

        villas.splice(villaIndex, 1);
        return true;
    }
}