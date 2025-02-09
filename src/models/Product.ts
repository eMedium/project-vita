// models/Product.ts
export type ProductAttributes = {
    powerConsumption: number;
    unitPrice: number;
    quality: number;
    techAdvenced: number;
    utilities: number; // How useful the product is for the different usage
};

export type ProductAttributeKey = keyof ProductAttributes;

export type ProductScores = {
    performance: number;
    durability: number;
    stability: number;
    complexity: number;
    powerEfficiency: number;
    universality: number;
    expandability: number;
};

export type ProductScoresKey = keyof ProductScores;

export interface Product {
    id: number;
    name: string;
    releaseDate: {
        month: number;
        year: number;
    };
    clockSpeed: number; // In Mhz
    attributes: ProductAttributes;
    scores: ProductScores;
}

export const createProduct = (
    name: string,
    releaseDate: { month: number; year: number },
    clockSpeed: number, // In Mhz
    attributes: ProductAttributes,
    scores: ProductScores
): Product => {
    return {
        id: Date.now(), // Unique identifier
        name,
        releaseDate,
        clockSpeed,
        attributes,
        scores,
    };
};
