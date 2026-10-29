import { useToggle } from "../../../../utils/hooks/useToggle/useToggle";

type UseModalParams = {
  initialOpen?: boolean;
};
export const useModal = (params: UseModalParams = {}) => {
  const { initialOpen = false } = params;

  const toggle = useToggle({ initialValue: initialOpen });

  return {
    open: toggle.isOn,
    openModal: toggle.turnOn,
    closeModal: toggle.turnOff,
    toggleModal: toggle.toggle,
  };
};
