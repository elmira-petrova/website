import React from "react";
import { TZDate, tzName } from "@date-fns/tz";
import { NoSsr } from "@mui/material";
import {
  addMinutes,
  formatDate,
  startOfMinute,
} from "../../../../../../../utils/dates/dates";

import css from "./Time.module.scss";

const TZ = "Europe/Sofia";

const getTimeBGTime = () => TZDate.tz(TZ);
const getBGTzShortName = (date: Date) => tzName(TZ, date, "short");

export const Time = () => {
  const [time, setTime] = React.useState(getTimeBGTime);

  React.useEffect(() => {
    const nextTime = startOfMinute(addMinutes(time, 1));
    if (!nextTime) return;
    const diff = nextTime.getTime() - getTimeBGTime().getTime();

    const timerId = setTimeout(() => setTime(getTimeBGTime), diff);
    return () => clearTimeout(timerId);
  }, [time]);

  return (
    <p className={css.time}>
      <NoSsr fallback="​">
        Bulgaria ({getBGTzShortName(time)}) {formatDate(time, "HH")}
        <span className={css.tick}>:</span>
        {formatDate(time, "mm")}
      </NoSsr>
    </p>
  );
};
