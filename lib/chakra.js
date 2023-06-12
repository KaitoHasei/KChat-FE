import { extendTheme } from "@chakra-ui/react";

import { ButtonTheme } from "./CustomComponents/Button.custom";
import { InputTheme } from "./CustomComponents/Input.custom";
import { ModalTheme } from "./CustomComponents/Modal.custom";
import { MenuTheme } from "./CustomComponents/Menu.custom";

export const theme = extendTheme({
  styles: {
    global: {
      body: {
        bg: "gray.600",
        color: "white",
      },
    },
  },
  components: {
    Button: ButtonTheme,
    Input: InputTheme,
    Modal: ModalTheme,
    Menu: MenuTheme,
  },
});
