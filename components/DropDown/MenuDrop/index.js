import { Menu, MenuButton, MenuItem, MenuList } from "@chakra-ui/react";
import PropTypes from "prop-types";
import { isEmpty } from "lodash";

const MenuDrop = ({ buttonProps, items, onSelect, children }) => {
  const handleSelectItem = (item) => {
    return onSelect(item);
  };

  return (
    <Menu>
      <MenuButton {...buttonProps}>{children}</MenuButton>
      <MenuList>
        {items.map((item, index) => {
          if (isEmpty(item)) return;

          return (
            <MenuItem
              key={index}
              onClick={() => handleSelectItem(item)}
              {...item?.props}
            >
              {item?.render}
            </MenuItem>
          );
        })}
      </MenuList>
    </Menu>
  );
};

export default MenuDrop;

MenuDrop.propTypes = {
  buttonProps: PropTypes.objectOf(PropTypes.any),
  items: PropTypes.arrayOf(
    PropTypes.shape({
      props: PropTypes.objectOf(PropTypes.any),
      render: PropTypes.node,
      action: PropTypes.func,
    })
  ),
  onSelect: PropTypes.func,
  children: PropTypes.node,
};

MenuDrop.defaultProps = {
  buttonProps: {},
  items: [],
  onSelect: () => {},
  children: <></>,
};
