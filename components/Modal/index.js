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
  footerContent,
  isOpen,
  isCloseButton,
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
            {isCloseButton && <Button onClick={onClose}>Close</Button>}
            {footerContent}
          </ModalFooter>
        </ModalContent>
      </ModalChakra>
    </>
  );
};

export default Modal;

Modal.propTypes = {
  title: PropTypes.string,
  footerContent: PropTypes.element,
  isOpen: PropTypes.bool,
  isCloseButton: PropTypes.bool,
  onClose: PropTypes.func,
  children: PropTypes.node,
};

Modal.defaultProps = {
  title: "",
  footerContent: <></>,
  isOpen: false,
  isCloseButton: false,
  onClose: () => {},
  children: <></>,
};
