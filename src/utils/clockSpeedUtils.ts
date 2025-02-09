import { ResearchProject } from "@/store/resaearchSlice";
import { RootState } from "@/store/store";
import { isResearchDone } from "./researchUtils";

export const getMaxCpuLevelForPlayer = (startedResearch: ResearchProject[]): number => {
    if (isResearchDone(startedResearch, 106)) {
        return 40; // Najwyższy poziom
    }
    if (isResearchDone(startedResearch, 105)) {
        return 39;
    }
    if (isResearchDone(startedResearch, 104)) {
        return 38;
    }
    if (isResearchDone(startedResearch, 103)) {
        return 37;
    }
    if (isResearchDone(startedResearch, 102)) {
        return 36;
    }
    if (isResearchDone(startedResearch, 101)) {
        return 35;
    }
    if (isResearchDone(startedResearch, 100)) {
        return 34;
    }
    if (isResearchDone(startedResearch, 82)) {
        return 33;
    }
    if (isResearchDone(startedResearch, 79)) {
        return 32;
    }
    if (isResearchDone(startedResearch, 76)) {
        return 31;
    }
    if (isResearchDone(startedResearch, 75)) {
        return 30;
    }
    if (isResearchDone(startedResearch, 74)) {
        return 29;
    }
    if (isResearchDone(startedResearch, 71)) {
        return 28;
    }
    if (isResearchDone(startedResearch, 70)) {
        return 27;
    }
    if (isResearchDone(startedResearch, 68)) {
        return 26;
    }
    if (isResearchDone(startedResearch, 66)) {
        return 25;
    }
    if (isResearchDone(startedResearch, 65)) {
        return 24;
    }
    if (isResearchDone(startedResearch, 64)) {
        return 23;
    }
    if (isResearchDone(startedResearch, 60)) {
        return 22;
    }
    if (isResearchDone(startedResearch, 59)) {
        return 21;
    }
    if (isResearchDone(startedResearch, 57)) {
        return 20;
    }
    if (isResearchDone(startedResearch, 56)) {
        return 19;
    }
    if (isResearchDone(startedResearch, 55)) {
        return 18;
    }
    if (isResearchDone(startedResearch, 53)) {
        return 17;
    }
    if (isResearchDone(startedResearch, 51)) {
        return 16;
    }
    if (isResearchDone(startedResearch, 49)) {
        return 15;
    }
    if (isResearchDone(startedResearch, 48)) {
        return 14;
    }
    if (isResearchDone(startedResearch, 46)) {
        return 13;
    }
    if (isResearchDone(startedResearch, 43)) {
        return 12;
    }
    if (isResearchDone(startedResearch, 41)) {
        return 11;
    }
    if (isResearchDone(startedResearch, 36)) {
        return 10;
    }
    if (isResearchDone(startedResearch, 30)) {
        return 9;
    }
    if (isResearchDone(startedResearch, 24)) {
        return 8;
    }
    if (isResearchDone(startedResearch, 22)) {
        return 7;
    }
    if (isResearchDone(startedResearch, 18)) {
        return 6;
    }
    if (isResearchDone(startedResearch, 16)) {
        return 5;
    }
    if (isResearchDone(startedResearch, 11)) {
        return 4;
    }
    if (isResearchDone(startedResearch, 8)) {
        return 3;
    }
    if (isResearchDone(startedResearch, 7)) {
        return 2;
    }
    if (isResearchDone(startedResearch, 4)) {
        return 1;
    }
    return 0; // Poziom początkowy
};

export const getMaxCpuLevel = (researchState: RootState['research']): number => {
    return getMaxCpuLevelForPlayer(researchState.completedResearch);
};
