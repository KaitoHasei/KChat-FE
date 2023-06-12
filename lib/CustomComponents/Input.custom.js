import { inputAnatomy } from "@chakra-ui/anatomy";
import { createMultiStyleConfigHelpers, defineStyle } from "@chakra-ui/react";

const { definePartsStyle, defineMultiStyleConfig } =
  createMultiStyleConfigHelpers(inputAnatomy.keys);

const md = defineStyle({
  borderRadius: "15px",
});

const sizes = {
  md: definePartsStyle({
    field: md,
  }),
};

export const InputTheme = defineMultiStyleConfig({
  sizes,
});
