import { CampaignType } from "@/store/marketingSlice";

export function getHypeInDaysByCampaignType(campaignType: CampaignType): number {
    const hypeValues: Record<CampaignType, number> = {
        [CampaignType.Flyers]: 100,
        [CampaignType.Posters]: 200,
        [CampaignType.Magazines]: 400,
        // [CampaignType.Billboards]: 800,
        [CampaignType.Radio]: 1000,
        [CampaignType.TV]: 1500,
        [CampaignType.Internet]: 2000,
    };

    return hypeValues[campaignType] || 0; // Domyślnie zwraca 0, jeśli typ kampanii nie jest zdefiniowany
}

export function getDefaultCostByCampaignType(campaignType: CampaignType): number {
    const hypeValues: Record<CampaignType, number> = {
        [CampaignType.Flyers]: 1000,
        [CampaignType.Posters]: 2000,
        [CampaignType.Magazines]: 4000,
        // [CampaignType.Billboards]: 8000,
        [CampaignType.Radio]: 10000,
        [CampaignType.TV]: 15000,
        [CampaignType.Internet]: 20000,
    };

    if (!(campaignType in hypeValues)) {
        const errorMessage = `Undefined campaign type: ${campaignType}`;
        console.error(errorMessage); // Wyświetl błąd w konsoli
        throw new Error(errorMessage); // Rzuć wyjątek
    }

    return hypeValues[campaignType];
}
