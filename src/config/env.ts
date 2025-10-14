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
    this.config = {
      googleDriveFolderId: import.meta.env.VITE_GOOGLE_DRIVE_FOLDER_ID || "",
      googleSheetsId:
        import.meta.env.VITE_GOOGLE_SHEETS_ID ||
        "1Zvq4LzomnEwRCS_qOyMPGhzeKglHTXAWwmdJoFdNzqg",
      googleApiKey: import.meta.env.VITE_GOOGLE_API_KEY || "",
      apiBaseUrl:
        import.meta.env.VITE_API_BASE_URL || "http://localhost:3001/api",
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
