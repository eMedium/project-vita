import { ScriptData } from '@/store/scriptManagerSlice';
import scriptData from '../data/scripts_data.json';

// Interface for raw script data
interface ScriptDataRaw {
    id: string;
    name: string;
    version: string;
    path: string;
    hash: string;
    data: Record<string, any>;
}

// Function to load scripts data
export const loadScriptsData = (): ScriptData[] => {
    const data: ScriptDataRaw[] = scriptData as ScriptDataRaw[];
    return data.map(script => {
        return {
            id: script.id,
            name: script.name,
            version: script.version,
            path: script.path,
            hash: script.hash || '', // Jeśli hash jest opcjonalny
            data: script.data,
            initialized: false
        };
    });
};
