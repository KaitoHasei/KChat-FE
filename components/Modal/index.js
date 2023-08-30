import {
  Modal as ModalChakra,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  Button,
} from "@chakra-ui/react";
import PropTypes from "prop-types";

const Modal = ({
  title,
  footer,
  isOpen,
  closeButton,
  onClose,
  children,
  ...props
}) => {
  const handleCloseModal = () => {
    onClose();
  };

  return (
    <>
      <ModalChakra isOpen={isOpen} onClose={handleCloseModal} {...props}>
        <ModalOverlay />
        <ModalContent>
          {title && <ModalHeader>{title}</ModalHeader>}
          <ModalCloseButton />
          <ModalBody>{children}</ModalBody>

          <ModalFooter>
            {closeButton && <Button onClick={onClose}>Close</Button>}
            {footer}
          </ModalFooter>
        </ModalContent>
      </ModalChakra>
    </>
  );
};

export default Modal;

Modal.propTypes = {
  title: PropTypes.string,
  footer: PropTypes.element,
  isOpen: PropTypes.bool,
  closeButton: PropTypes.bool,
  onClose: PropTypes.func,
  children: PropTypes.node,
};

Modal.defaultProps = {
  title: "",
  footer: <></>,
  isOpen: false,
  closeButton: false,
  onClose: () => {},
  children: <></>,
};
