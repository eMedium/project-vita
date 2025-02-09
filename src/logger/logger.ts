import pino from "pino";

// Konfiguracja dla środowiska produkcyjnego i deweloperskiego
const logger = pino({
  level: process.env.NODE_ENV === 'production' ? 'info' : 'trace',
  transport:
    process.env.NODE_ENV !== 'production'
      ? {
          target: 'pino-pretty', // Pretty-print logs in development
          options: { colorize: true }
        }
      : undefined
});

export default logger;
