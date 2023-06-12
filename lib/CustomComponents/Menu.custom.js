import { menuAnatomy } from "@chakra-ui/anatomy";
import { createMultiStyleConfigHelpers } from "@chakra-ui/react";

const { definePartsStyle, defineMultiStyleConfig } =
  createMultiStyleConfigHelpers(menuAnatomy.keys);

const baseStyle = definePartsStyle({
  button: {
    _hover: { cursor: "pointer", bg: "blackAlpha.300" },
  },
  list: {
    bg: "#3A3F4A",
    border: "none",
  },
  item: {
    bg: "transparent",
    _hover: { cursor: "pointer", bg: "blackAlpha.300" },
  },
});

export const MenuTheme = defineMultiStyleConfig({ baseStyle });
