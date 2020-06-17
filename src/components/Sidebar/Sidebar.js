import React, { useContext, useMemo } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { Layout, Menu } from 'antd'
import styles from './Sidebar.module.scss'
import { menuItems } from './menuItems'
import { UserInfoContext } from '../../routes'
import { ADMIN_ROLE } from '../../constants'

const { Sider } = Layout
const { Item: MenuItem, SubMenu } = Menu

const Sidebar = ({ collapsed = false, isMobile }) => {
  const { pathname = '' } = useLocation()
  const { role: userRole } = useContext(UserInfoContext)
  const authorizedMenuItems = useMemo(
    () =>
      menuItems.filter((menu) => {
        if (userRole === ADMIN_ROLE) return true
        return menu.role !== ADMIN_ROLE
      }),
    [userRole]
  )
  const homeMenuItem = useMemo(() => authorizedMenuItems[0] || {}, [authorizedMenuItems])

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
    return findSelectedMenuItemKey(authorizedMenuItems)
  }, [authorizedMenuItems, homeMenuItem.key, homeMenuItem.linkTo, pathname])

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

  const props = useMemo(
    () =>
      isMobile
        ? { width: 256, className: styles.sidebar }
        : {
            className: styles.sidebar,
            trigger: null,
            collapsible: true,
            collapsed,
          },
    [collapsed, isMobile]
  )

  return (
    <Sider {...props}>
      <div className={styles.logo} />
      <Menu
        theme="dark"
        mode="inline"
        defaultOpenKeys={['adminPanel']}
        selectedKeys={selectedMenuItemKey}
      >
        {authorizedMenuItems.map(createMenuItem)}
      </Menu>
    </Sider>
  )
}

export default Sidebar
