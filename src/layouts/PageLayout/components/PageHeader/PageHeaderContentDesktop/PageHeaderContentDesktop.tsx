import { Time } from "./components/Time/Time";
import { OpenToWork } from "./components/OpenToWork/OpenToWork";
import { Logo } from "../PageHeaderContentMobile/components/Logo/Logo";
import { NavMenu } from "./components/NavMenu/NavMenu";

export const PageHeaderContentDesktop = () => {
  return (
    <>
      <div>
        <Time />
        <OpenToWork />
      </div>
      <Logo />
      <NavMenu />
    </>
  );
};
