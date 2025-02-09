import consumerData from '../data/consumer_data.json';
import { Attributes, ConsumerPopulation, createConsumerPopulation } from '../models/ConsumerPopulation';

interface ConsumerDataRaw {
    class: string;
    initialPopulation: number;
    scores: Attributes;
}

export const loadConsumerPopulations = (): ConsumerPopulation[] => {
    const data: ConsumerDataRaw[] = consumerData as unknown as ConsumerDataRaw[];
    return data.map(consumer => createConsumerPopulation(
        consumer.class,
        consumer.initialPopulation,
        consumer.scores
    ));
};
