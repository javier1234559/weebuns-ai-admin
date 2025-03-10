export const globalConfig = {
  APP_NAME: import.meta.env.VITE_APP_NAME || "Weebuns Admin",
  API_URL: import.meta.env.VITE_APP_API || "http://localhost:8080",
  UPLOADTHING_TOKEN: import.meta.env.VITE_UPLOADTHING_TOKEN,
  DEEPGRAM_API_KEY: import.meta.env.VITE_DEEPGRAM_API_KEY,
  AI_API_KEY: import.meta.env.VITE_AI_API_KEY,
  GIPHY_API_KEY: import.meta.env.VITE_GIPHY_API_KEY,
  APP_ENV: import.meta.env.VITE_APP_ENV,
};
