import { calculateLikelihood } from '@/utils/consumerUtils';
import store from '../store/store';

class ConsumerService {
    private static instance: ConsumerService;

    private constructor() { }

    public static getInstance(): ConsumerService {
        if (!ConsumerService.instance) {
            ConsumerService.instance = new ConsumerService();
        }
        return ConsumerService.instance;
    }

    dispatch(action: any) {
        store.dispatch(action);
    }

    getState() {
        return store.getState();
    }

    calculatePurchaseLikelihood(consumerId: number, productId: number): number | null {
        const state = this.getState();
        const consumer = state.consumers.populations[consumerId];
        const product = state.product.products[productId];

        if (consumer && product) {
            return calculateLikelihood(consumer, product);
        }

        return null; // Return null if the consumer or product is not found
    }

}

export { ConsumerService };

