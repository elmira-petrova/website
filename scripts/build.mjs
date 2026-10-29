import { execa } from "execa";
import { setRevisionEnv } from "./set-revision-env.mjs";
import { setAppNameEnv } from "./set-app-name-env.mjs";

setRevisionEnv();
setAppNameEnv();

await execa("npx", ["-y", "yarn", "__build"].concat(process.argv.slice(2)), {
  stdio: "inherit",
});
