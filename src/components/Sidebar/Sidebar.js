import React, { useMemo } from "react";
import { Link, useLocation } from "react-router-dom";
import { Layout, Menu } from "antd";
import styles from "./Sidebar.module.scss";
import { menuItems } from "./menuItems";

const { Sider } = Layout
const { Item: MenuItem, SubMenu } = Menu

const Sidebar = () => {
  const { pathname = '' } = useLocation()
  const homeMenuItem = useMemo(() => menuItems[0] || {}, [])

  const selectedMenuItemKey = useMemo(() => {
    const findSelectedMenuItemKey = (menuItemsList) => {
      if (pathname === homeMenuItem.linkTo) {
        return homeMenuItem.key
      }
      for (let i = 0; i < menuItemsList.length; i++) {
        if (menuItemsList[i].linkTo !== '/' && pathname.startsWith(menuItemsList[i].linkTo)) {
          return menuItemsList[i].key
        }
        if (menuItemsList[i].subMenu) {
          let key = findSelectedMenuItemKey(menuItemsList[i].subMenu)
          if (key) {
            return key
          }
        }
      }
    }
    return findSelectedMenuItemKey(menuItems)
  }, [homeMenuItem, pathname])

  const createMenuItem = (menuItem) =>
    menuItem.subMenu ? (
      <SubMenu key={menuItem.key} title={menuItem.name} icon={menuItem.icon}>
        {menuItem.subMenu.map(createMenuItem)}
      </SubMenu>
    ) : (
      <MenuItem key={menuItem.key} icon={menuItem.icon}>
        <Link to={menuItem.linkTo}>{menuItem.name}</Link>
      </MenuItem>
    )

  return (
    <Sider className={styles.sidebar}>
      <div className={styles.logo} />
      <Menu theme="dark" mode="inline" defaultOpenKeys={['adminPanel']} selectedKeys={selectedMenuItemKey} >
        {menuItems.map(createMenuItem)}
      </Menu>
    </Sider>
  )
}

export default Sidebar
