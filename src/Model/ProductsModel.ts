export interface ProductsModel {
    id?: number;
    name: string;
    description: string;
    qyt: number;
    price: number;
    available: boolean;
}

export interface shoppingCart extends ProductsModel {
    purchased: number
}