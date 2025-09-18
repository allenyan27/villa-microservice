export interface Villa {
    id: string;
    name: string;
    location: string;
    price: number;
    rooms: number;
    available: boolean;
    description: string;
}

export interface CreateVillaData {
    name: string;
    location: string;
    price: number;
    rooms: number;
    description: string;
}

export interface UpdateVillaData {
    id: string;
    name?: string;
    location?: string;
    price?: number;
    rooms?: number;
    available?: boolean;
    description?: string;
}