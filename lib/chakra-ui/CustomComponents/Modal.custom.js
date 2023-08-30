import { modalAnatomy } from "@chakra-ui/anatomy";
import { createMultiStyleConfigHelpers } from "@chakra-ui/react";

const { definePartsStyle, defineMultiStyleConfig } =
  createMultiStyleConfigHelpers(modalAnatomy.keys);

const baseStyle = definePartsStyle({
  dialog: {
    bg: "gray.600",
  },
  footer: {
    display: "block",
  },
});

export const ModalTheme = defineMultiStyleConfig({
  baseStyle,
});
