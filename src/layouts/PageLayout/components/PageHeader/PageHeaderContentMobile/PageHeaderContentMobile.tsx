import { useModal } from "../../../../../components/ui/modals/Modal/useModal";
import { Logo } from "./components/Logo/Logo";
import { Menu } from "./components/Menu/Menu";

export const PageHeaderContentMobile = () => {
  const menuModal = useModal();

  return (
    <>
      <Logo onClick={menuModal.closeModal} />

      <Menu
        isOpen={menuModal.open}
        onOpen={menuModal.openModal}
        onClose={menuModal.closeModal}
      />
    </>
  );
};
