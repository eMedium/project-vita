// utils/researchUtils.ts

import { ResearchProject } from "../store/resaearchSlice";



export const isResearchDone = (completedResearch: ResearchProject[], projectId: number): boolean => {
    return completedResearch.some(research => research.ID === projectId);
};