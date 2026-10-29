import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";
import prettier from "eslint-config-prettier/flat";
import jest from "eslint-plugin-jest";
import jestDom from "eslint-plugin-jest-dom";
import testingLibrary from "eslint-plugin-testing-library";
import noOnlyTests from "eslint-plugin-no-only-tests";
import handleErrors from "eslint-plugin-handle-errors";
import importPlugin from "eslint-plugin-import";
import { reactRefresh } from "eslint-plugin-react-refresh";

const commonTestConfig = {
  files: ["**/__tests__/**/*.[jt]s?(x)", "**/?(*.)+(spec|test).[jt]s?(x)"],
};

const { plugins: _, ...importPluginRecommendedConfig } =
  importPlugin.flatConfigs.recommended;

const { plugins: __, ...importPluginTSConfig } =
  importPlugin.flatConfigs.typescript;

const eslintConfig = defineConfig([
  ...nextVitals,
  ...nextTs,
  importPluginRecommendedConfig,
  importPluginTSConfig,
  reactRefresh.configs.next(),
  {
    ...handleErrors.configs.recommended,
    settings: {
      handleErrors: {
        loggerFunctions: ["console.error"],
      },
    },
  },
  {
    ...commonTestConfig,
    ...jest.configs["flat/recommended"],
    ...jest.configs["flat/style"],
  },
  {
    ...commonTestConfig,
    plugins: {
      "no-only-tests": noOnlyTests,
    },
    rules: {
      "no-only-tests/no-only-tests": "error",
    },
  },
  {
    ...commonTestConfig,
    ...jestDom.configs["flat/recommended"],
  },
  {
    ...commonTestConfig,
    ...testingLibrary.configs["flat/dom"],
  },
  {
    ...commonTestConfig,
    ...testingLibrary.configs["flat/react"],
  },
  {
    rules: {
      "@typescript-eslint/no-unused-vars": [
        "error",
        {
          ignoreRestSiblings: true,
          argsIgnorePattern: "^_",
          caughtErrorsIgnorePattern: "^_",
        },
      ],
      "import/no-anonymous-default-export": [
        "warn",
        {
          allowObject: true,
        },
      ],
      "react-hooks/set-state-in-effect": "off",
      "react-hooks/refs": "off",
      "react/no-children-prop": "off",
      "no-restricted-imports": [
        "error",
        {
          paths: [
            {
              name: "next/router",
              importNames: ["useRouter"],
              message:
                "Please use hooks from src/features/navigation/hooks instead.",
            },
            {
              name: "next/navigation",
              importNames: ["useParams", "useSearchParams"],
              message:
                "Please use hooks from src/features/navigation/hooks instead.",
            },
            {
              name: "classnames",
              message: "Please use cn from src/utils/styles/styles.ts instead.",
            },
            {
              name: "next/link",
              message: "Please use src/components/ui/links instead.",
            },
            {
              name: "next/image",
              importNames: ["default"],
              message: "Please use src/components/ui/Image/Image.tsx instead.",
            },
            {
              name: "react-error-boundary",
              message:
                "Please use src/features/navigation/components/ErrorBoundary/ErrorBoundary.tsx instead.",
            },
            {
              name: "type-fest",
              message: "Please use src/utils/types/types.ts instead.",
            },
            {
              name: "type-testing",
              message: "Please use src/utils/types/types.ts instead.",
            },
            {
              name: "@sindresorhus/is",
              message: "Please use src/utils/types/types.ts instead.",
            },
          ],
          patterns: [
            {
              group: ["date-fns*"],
              message:
                "Please use functions from src/utils/dates/dates.ts instead.",
            },
            {
              group: ["lodash*"],
              message:
                "Please use functions from src/utils/functions/functions.ts instead.",
            },
            {
              group: ["swiper/*"],
              message:
                "Please use src/components/ui/Swiper/Swiper.tsx instead.",
            },
          ],
        },
      ],
      "import/no-useless-path-segments": [
        "error",
        {
          noUselessIndex: true,
        },
      ],
      "react-refresh/only-export-components": [
        "error",
        {
          allowExportNames: [
            ...reactRefresh.configs.next().rules[
              "react-refresh/only-export-components"
            ][1]["allowExportNames"],
            "getStaticProps",
            "getStaticPaths",
            "getServerSideProps",
          ],
        },
      ],
    },
  },

  prettier,

  globalIgnores([
    ".next/**",
    "out/**",
    "build/**",
    "next-env.d.ts",
    "public/mockServiceWorker.js",
  ]),
]);

export default eslintConfig;
