import commonCss from "../../styles/common.module.scss";
// eslint-disable-next-line no-restricted-imports
import { default as cn } from "classnames";
import { mergeWith } from "../functions/functions";
export { commonCss, cn };

export const mergePropClasses = <Classes extends Record<string, string>>(
  props: { classes: Classes | undefined } | object | undefined,
  classes: Classes,
) => {
  if (
    props === undefined ||
    !("classes" in props) ||
    props.classes === undefined
  )
    return classes;

  return mergeWith({}, props.classes, classes, (objValue, srcValue) =>
    cn(srcValue, objValue),
  );
};
