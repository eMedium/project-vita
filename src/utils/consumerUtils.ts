import logger from "@/logger/logger";
import { ConsumerPopulation } from "@/models/ConsumerPopulation";
import { MarketEntry } from "@/models/Market";
import { Product } from "@/models/Product";
import icon_customer_boy1 from '@/assets/customersIcon/icon_customer_boy1.png';
import icon_customer_gamer from '@/assets/customersIcon/icon_customer_gamer.png';
import icon_customer_gamer1 from '@/assets/customersIcon/icon_customer_gamer1.png';
import icon_customer_girl1 from '@/assets/customersIcon/icon_customer_girl1.png';
import icon_customer_hospital from '@/assets/customersIcon/icon_customer_hospital.png';
import icon_customer_military from '@/assets/customersIcon/icon_customer_military.png';
import icon_customer_police from '@/assets/customersIcon/icon_customer_police.png';
import icon_customer_buisness from '@/assets/customersIcon/icon_customer_buisness.png';
import icon_customer_cardealer from '@/assets/customersIcon/icon_customer_cardealer.png';
import icon_customer_shops from '@/assets/customersIcon/icon_customer_shops.png';


/**
 * 
 * @param consumer 
 * @param product 
 * @param marketEntry 
 * @returns return likelihood of consumer buying the product as a number between 0 and infinity; 1 - mean its average. The higher the likelihood, the more likely the consumer will buy the product.
 */
export const calculateLikelihood = (consumer: ConsumerPopulation, product: Product): number => {
    let score = 0;
    let totalWeight = 0;
    let usedScoreCategory = 0;


    for (let key in consumer.scores) {
        if (product.scores.hasOwnProperty(key)) {
            const scoresKey = key as keyof typeof product.scores;
            const productScore = product.scores[scoresKey];
            const requiredScore = consumer.scores[scoresKey];
            if (productScore < requiredScore) {
                logger.debug(`{Score for} Consumer ${consumer.name} requires ${requiredScore} for ${scoresKey} but product has ${productScore}`);
                return 0;
            }
            score += productScore;
            totalWeight += productScore;
            usedScoreCategory++;
        }
    }

    score = score / usedScoreCategory;
    logger.debug(`{Score for} Calculating likelihood for consumer ${consumer.name} and product ${product.name} is ${score}`, consumer, product, score);
    return score;
};

export const getImageSrcByName = (name: string): string => {
    switch (name) {
        case "generalPublic":
            return icon_customer_boy1;
        case "brandFan":
            return icon_customer_gamer1;
        case "performanceManiac":
            return icon_customer_cardealer;
        case "specialInstitution":
            return icon_customer_military;
        case "industry":
            return icon_customer_buisness;
        case "priceSensitive":
            return icon_customer_boy1; // Brak wyraźnej sugestii, użyłem domyślnego
        case "smallBusiness":
            return icon_customer_girl1;
        case "governmentAgency":
            return icon_customer_police;
        case "techEnthusiast":
            return icon_customer_gamer1;
        case "educationalInstitution":
            return icon_customer_shops;
        case "largeEnterprise":
            return icon_customer_buisness;
        default:
            return icon_customer_boy1; // Domyślny obrazek
    }
};

export interface ConsumerDetails {
    nextLevelDiscoveredRequired: number;
    nextLevelStoryRequired: Record<string, number>;
}

/**
 * Oblicza dodatkowe szczegóły konsumenta.
 * @param consumer - Obiekt konsumenta.
 * @returns Obiekt ConsumerDetails zawierający wymagania dla następnego poziomu.
 */
export const calculateConsumerDetails = (consumer: ConsumerPopulation): ConsumerDetails => {
    const { level, population, scores } = consumer;

    // Oblicz wymagania dla odkrycia następnego poziomu
    const nextLevelDiscoveredRequired = Math.pow(level, 2) * population;

    // Oblicz wymagania dla historii oparte na atrybutach
    const storyBase = 2;
    const nextLevelStoryRequired: Record<string, number> = {};

    for (const [attribute, value] of Object.entries(scores)) {
        nextLevelStoryRequired[attribute] = storyBase * Math.pow(level, 2) * (value || 1);
    }

    return {
        nextLevelDiscoveredRequired,
        nextLevelStoryRequired,
    };
};

export const canConsumerLevelUp = (
    consumer: ConsumerPopulation,
    products: Product[],
    playerCash: number
): { canLevelUp: boolean; reason?: string; bestProduct?: Product } => {
    const consumerDetails = calculateConsumerDetails(consumer);
    const nextLevelCost = consumer.level * 10000;

    // Check discovery requirement
    if (consumer.discovered < consumer.population) {
        return {
            canLevelUp: false,
            reason: 'Not enough discoveries'
        };
    }

    // Check cash requirement
    if (playerCash < nextLevelCost) {
        return {
            canLevelUp: false,
            reason: 'Not enough cash'
        };
    }

    // Find best matching product
    const bestProduct = findBestMatchingProduct(products, consumerDetails);

    if (!bestProduct) {
        return {
            canLevelUp: false,
            reason: 'No product meets requirements'
        };
    }

    return {
        canLevelUp: true,
        bestProduct
    };
};

export function findBestMatchingProduct(products: Product[], consumerDetails: ConsumerDetails): Product | null {
    return products.reduce((best, current) => {
        const currentMatches = Object.entries(consumerDetails.nextLevelStoryRequired)
            .every(([attr, required]) => current.scores[attr as keyof typeof current.scores] >= required);

        if (!best && currentMatches) return current;

        if (best && currentMatches) {
            // If both match requirements, pick the one with better overall scores
            const currentTotal = Object.values(current.scores).reduce((sum, score) => sum + score, 0);
            const bestTotal = Object.values(best.scores).reduce((sum, score) => sum + score, 0);
            return currentTotal > bestTotal ? current : best;
        }

        return best;
    }, null as Product | null);
}