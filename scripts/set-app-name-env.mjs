import packageJson from "../package.json" with { type: "json" };

const envName = "NEXT_PUBLIC_APP_NAME";

export const setAppNameEnv = () => {
  process.env[envName] = packageJson.name.toString().trim();

  console.log(`Set ${envName}=${process.env[envName]}`);
};
