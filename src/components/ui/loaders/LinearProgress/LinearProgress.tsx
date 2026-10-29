import LinearProgressMUI, {
  LinearProgressProps as LinearProgressPropsMUI,
} from "@mui/material/LinearProgress";
import { cn } from "../../../../utils/styles/styles";

import css from "./LinearProgress.module.scss";

type LinearProgressProps = {} & LinearProgressPropsMUI;

export const LinearProgress = (props: LinearProgressProps) => {
  const classes: LinearProgressProps["classes"] = {
    ...props.classes,
    root: cn(css.container, props.classes?.root),
    bar1: cn(css.bar1, props.classes?.bar1),
    bar2: cn(css.bar2, props.classes?.bar2),
  };

  return <LinearProgressMUI {...props} classes={classes} />;
};
