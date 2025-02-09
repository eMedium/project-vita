import productData from '../data/product_data.json';
import { Product, createProduct, ProductAttributes, ProductScores } from '../models/Product';

// Interface for raw product data
interface ProductDataRaw {
    id: number;
    name: string;
    company: string;
    releaseDate: {
        month: number;
        year: number;
    };
    clockSpeed: number; // In Mhz
    attributes: ProductAttributes;
    scores: ProductScores; // Mark scores as optional
}

// Function to load products data
export const loadProductsData = (): Product[] => {
    return productData.map(product => {
        return createProduct(
            product.name,
            product.releaseDate,
            product.clockSpeed,  // In Mhz
            product.attributes,
            product.scores
        );
    });
};


