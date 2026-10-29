// eslint-disable-next-line @typescript-eslint/no-require-imports
const { ESLint } = require("eslint");
// eslint-disable-next-line @typescript-eslint/no-require-imports
const packageJson = require("./package.json");

const removeIgnoredFiles = async (files) => {
  const eslint = new ESLint();
  const isIgnored = await Promise.all(
    files.map((file) => {
      return eslint.isPathIgnored(file);
    }),
  );
  const filteredFiles = files.filter((_, i) => !isIgnored[i]);
  return filteredFiles.join(" ");
};

const jsGlob = packageJson.scripts["lint:eslint:CI"]
  .split(" ")
  .at(-1)
  .slice(1, -1);

const stylesGlob = packageJson.scripts["lint:stylelint:CI"]
  .split(" ")
  .at(-1)
  .slice(1, -1);

const svgIconsGlob = `${packageJson.scripts["optimize_svg_icons:all"]
  .split(" ")
  .at(-1)}/*.svg`;

const prettier = "npx -y yarn lint:prettier --write";

module.exports = {
  [jsGlob]: async (files) => {
    const filesToLint = await removeIgnoredFiles(files);
    const filesToPrettier = files.join(" ");
    return [
      `npx -y yarn lint:eslint --fix ${filesToLint}`,
      `${prettier} ${filesToPrettier}`,
    ];
  },
  [stylesGlob]: ["stylelint --fix", prettier],
  [`!((${jsGlob})|(${stylesGlob}))`]: [prettier],
  [svgIconsGlob]: ["npx -y yarn optimize_svg_icons -i"],
};
