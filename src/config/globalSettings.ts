// src/config/globalSettings.ts

import { version } from "react";

export function getGlobalSettings() {
    const developmentBuild: boolean = false; // Ustawienie ręczne trybu development

    return {
        version: "0.3.2", // Wersja gry
        developmentBuild,
        unlockAll: true, // Domyślnie włączone w trybie developerskim
        devModDefault: true, // Domyślnie ustawiony tryb developerski
        inDevMode(): boolean {
            return this.developmentBuild && this.devModDefault;
        }
    };
}
