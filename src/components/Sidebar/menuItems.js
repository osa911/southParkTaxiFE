import React from 'react'
import { HomeFilled, UnorderedListOutlined, UserAddOutlined, UserOutlined } from '@ant-design/icons'
import { GpsIcon } from '../Icons'

export const menuItems = [
  {
    key: 'home',
    linkTo: '/',
    icon: <HomeFilled />,
    name: 'Home',
  },
  {
    key: 'tracker',
    linkTo: '/tracker',
    icon: <GpsIcon />,
    name: 'Tracker',
  },
  {
    key: 'users',
    icon: <UserOutlined />,
    role: 'ADMIN',
    name: 'Users',
    subMenu: [
      {
        key: 'addNewUser',
        linkTo: '/add-new-user',
        name: 'Add new user',
        icon: <UserAddOutlined />,
      },
      {
        key: 'usersList',
        linkTo: '/users-list',
        name: 'Users List',
        icon: <UnorderedListOutlined />
      },
    ],
  },
]
