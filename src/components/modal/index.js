import { Modal } from "antd";

const ModalComponent = ({ children, className, isVisible }) => {
  return (
    <Modal
      visible={isVisible}
      wrapClassName={className}
      centered
      closable={false}
      footer={false}
    >
      {children}
    </Modal>
  );
};
export default ModalComponent;
