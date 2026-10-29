const floatPrecision = 3;
const transformPrecision = 5;

export const addMissingViewBox = () => {
  return {
    element: {
      enter: (node) => {
        if (node.name !== "svg") return;
        if (node.attributes.viewBox != null) return;
        if (
          node.attributes.width === null ||
          node.attributes.height === null ||
          Number.isNaN(Number(node.attributes.width)) !== false ||
          Number.isNaN(Number(node.attributes.height)) !== false
        )
          return;

        const width = Number(node.attributes.width);
        const height = Number(node.attributes.height);
        node.attributes.viewBox = `0 0 ${width} ${height}`;
      },
    },
  };
};

export default {
  multipass: true,
  plugins: [
    {
      name: "preset-default",
      params: {
        overrides: {
          cleanupNumericValues: {
            floatPrecision,
          },
          convertPathData: {
            floatPrecision,
            transformPrecision,
          },
          convertShapeToPath: {
            floatPrecision,
          },
          convertTransform: {
            floatPrecision,
            transformPrecision,
          },
          mergePaths: {
            floatPrecision,
          },
        },
      },
    },
    "convertStyleToAttrs",
    "removeRasterImages",
    {
      name: "cleanupListOfValues",
      params: {
        floatPrecision,
      },
    },
    "reusePaths",
    "removeStyleElement",
    "removeScripts",
    "removeOffCanvasPaths",
    "convertOneStopGradients",
    "removeDeprecatedAttrs",
    "removeXlink",
    {
      name: "addMissingViewBox",
      description:
        "Adds viewBox attribute if it's missing. Uses width and height attribute values (0 0 <width> <height>)",
      fn: addMissingViewBox,
    },
  ],
};
