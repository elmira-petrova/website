import React from "react";

type UseToggleParams = {
  initialValue?: boolean;
};
export const useToggle = (params: UseToggleParams = {}) => {
  const { initialValue = false } = params;

  const [isOn, setIsOn] = React.useState(initialValue);

  const turnOn = React.useCallback(() => setIsOn(true), []);
  const turnOff = React.useCallback(() => setIsOn(false), []);
  const toggle = React.useCallback(
    () => setIsOn((prevState) => !prevState),
    [],
  );

  return {
    isOn,
    turnOn,
    turnOff,
    toggle,
  };
};
