export type Attributes = Record<string, number>;


export interface ConsumerPopulation {
    name: string;
    population: number;
    scores: Attributes;
    favoriteProductId?: number;
    level: number;
    fans: number;
    discovered: number;
}

export const createConsumerPopulation = (
    name: string,
    initialPopulation: number,
    scores: Attributes,
): ConsumerPopulation => {
    return {
        name,
        population: initialPopulation,
        scores,
        level: 1,
        fans: 0,
        discovered: 0,
    };
};



