/** @type {import('stylelint').Config} */
export default {
  extends: ["stylelint-config-standard-scss", "stylelint-config-recess-order"],
  rules: {
    "color-hex-length": "long",
    "alpha-value-notation": null,
    "selector-class-pattern": null,
    "custom-property-pattern": null,
    "selector-id-pattern": null,
    "value-keyword-case": [
      "lower",
      {
        camelCaseSvgKeywords: true,
      },
    ],
    "selector-pseudo-class-no-unknown": [
      true,
      {
        ignorePseudoClasses: ["export", "global"],
      },
    ],
  },
};
