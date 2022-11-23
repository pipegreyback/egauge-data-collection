import dotenv from "dotenv";
import path from "path";

dotenv.config({
  path: path.resolve("./env/.shared.env"),
});

interface ENV {
  BASE_URL: string | undefined;
  API_KEY: string | undefined;
}

interface Config {
  BASE_URL: string;
  API_KEY: string;
}

const getConfig = (): ENV => {
  return {
    BASE_URL: process.env.BASE_URL,
    API_KEY: process.env.API_KEY,
  };
};

const getSanitizedConfig = (config: ENV): Config => {
  for (const [key, value] of Object.entries(config)) {
    if (value === undefined) {
      throw new Error(`Missing key ${key} in env file`);
    }
  }
  return config as Config;
};

const config = getConfig();
const sanitizedConfig = getSanitizedConfig(config);
export default sanitizedConfig;
