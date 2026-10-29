import { ReactComponent as BeeImage } from "../../../../assets/images/home/bee.svg?react";

import css from "./Bee.module.scss";

export const Bee = () => {
  return (
    <div className={css.container}>
      <figure className={css.wrapper}>
        <BeeImage className={css.bee} />
      </figure>
    </div>
  );
};
