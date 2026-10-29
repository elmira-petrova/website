import { execSync } from "child_process";

const getCommitHash = () =>
  execSync("git rev-parse --short HEAD").toString().trim();

const envName = "NEXT_PUBLIC_APP_REVISION";

export const setRevisionEnv = () => {
  process.env[envName] = process.env.CI_COMMIT_SHORT_SHA || getCommitHash();

  console.log(`Set ${envName}=${process.env[envName]}`);
};
