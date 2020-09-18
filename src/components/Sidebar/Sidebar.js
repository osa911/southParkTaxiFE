import React, { useCallback, useContext, useEffect, useMemo, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { Layout, Menu } from 'antd'
import { SaveOutlined } from '@ant-design/icons'
import styles from './Sidebar.module.scss'
import { menuItems } from './menuItems'
import { UserInfoContext } from '../../routes'
import { ADMIN_ROLE } from '../../constants'

const { Sider } = Layout
const { Item: MenuItem, SubMenu } = Menu

let deferredPrompt
const Sidebar = ({ collapsed = false, isMobile, hideDrawer }) => {
  const { pathname = '' } = useLocation()
  const [isShowInstallButton, setIsShowInstallButton] = useState(false)
  const { role: userRole } = useContext(UserInfoContext)
  const authorizedMenuItems = useMemo(
    () =>
      menuItems.filter((menu) => {
        if (userRole === ADMIN_ROLE) return true
        return menu.role !== ADMIN_ROLE
      }),
    [userRole]
  )

  useEffect(() => {
    window.addEventListener('beforeinstallprompt', (e) => {
      // Prevent the mini-infobar from appearing on mobile
      e.preventDefault();
      // Stash the event so it can be triggered later.
      deferredPrompt = e;
      // Update UI notify the user they can install the PWA
      setIsShowInstallButton(true);
    });

    window.addEventListener('appinstalled', (evt) => {
      // Log install to analytics
      console.log('INSTALL: Success');
    });
  }, [])

  const handleInstallButton = () => {
    setIsShowInstallButton(false);
    // Show the install prompt
    deferredPrompt.prompt();
    // Wait for the user to respond to the prompt
    deferredPrompt.userChoice.then((choiceResult) => {
      if (choiceResult.outcome === 'accepted') {
        console.log('User accepted the install prompt');
      } else {
        console.log('User dismissed the install prompt');
      }
      deferredPrompt = null;
    });
  }

  const handleMenuClick = useCallback(() => {
    if (isMobile) {
      hideDrawer(true)
    }
  }, [hideDrawer, isMobile])

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
        <Link to={menuItem.linkTo} onClick={handleMenuClick}>
          {menuItem.name}
        </Link>
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
        defaultOpenKeys={collapsed ? [] : ['adminPanel']}
        selectedKeys={selectedMenuItemKey}
      >
        {authorizedMenuItems.map(createMenuItem)}
        {isShowInstallButton && (
          <MenuItem key="install-button" icon={<SaveOutlined />}>
            <span onClick={handleInstallButton}>Install This App</span>
          </MenuItem>
        )}
      </Menu>
    </Sider>
  )
}

export default Sidebar
