// Environment configuration helper
// Centralized access to environment variables with type safety

interface EnvironmentConfig {
  googleDriveFolderId: string;
  googleSheetsId: string;
  googleApiKey: string;
  apiBaseUrl: string;
  isDevelopment: boolean;
  isProduction: boolean;
}

class Config {
  private static instance: Config;
  private config: EnvironmentConfig;

  private constructor() {
    // Auto-detect API URL: use environment variable or auto-detect based on domain
    const getApiBaseUrl = () => {
      if (import.meta.env.VITE_API_BASE_URL) {
        return import.meta.env.VITE_API_BASE_URL;
      }

      // In production (on Vercel), use the same domain with /api
      if (import.meta.env.PROD) {
        return `${window.location.origin}/api`;
      }

      // In development, use localhost
      return "http://localhost:3001/api";
    };

    this.config = {
      googleDriveFolderId: import.meta.env.VITE_GOOGLE_DRIVE_FOLDER_ID || "",
      googleSheetsId:
        import.meta.env.VITE_GOOGLE_SHEETS_ID ||
        "1Zvq4LzomnEwRCS_qOyMPGhzeKglHTXAWwmdJoFdNzqg",
      googleApiKey: import.meta.env.VITE_GOOGLE_API_KEY || "",
      apiBaseUrl: getApiBaseUrl(),
      isDevelopment: import.meta.env.DEV,
      isProduction: import.meta.env.PROD,
    };
  }

  public static getInstance(): Config {
    if (!Config.instance) {
      Config.instance = new Config();
    }
    return Config.instance;
  }

  public get<K extends keyof EnvironmentConfig>(key: K): EnvironmentConfig[K] {
    return this.config[key];
  }

  public getAll(): Readonly<EnvironmentConfig> {
    return Object.freeze({ ...this.config });
  }

  public isConfigured(keys: (keyof EnvironmentConfig)[]): boolean {
    return keys.every((key) => {
      const value = this.config[key];
      return value !== "" && value !== undefined && value !== null;
    });
  }

  public logConfig(): void {
    if (this.config.isDevelopment) {
      console.log("Environment Configuration:", {
        ...this.config,
        googleApiKey: this.config.googleApiKey ? "***" : "not set",
      });
    }
  }
}

// Export singleton instance
export const config = Config.getInstance();

// Convenience exports
export const {
  googleDriveFolderId,
  googleSheetsId,
  googleApiKey,
  apiBaseUrl,
  isDevelopment,
  isProduction,
} = config.getAll();
