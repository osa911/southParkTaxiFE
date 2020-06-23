import React from 'react'
import { HomeFilled, PlusOutlined, UnorderedListOutlined, UploadOutlined } from '@ant-design/icons'
import { AdminIcon, GpsIcon } from '../Icons'
import { ADMIN_ROLE } from '../../constants'

export const menuItems = [
  {
    key: 'home',
    linkTo: '/',
    icon: <HomeFilled />,
    name: 'Главная',
  },
  {
    key: 'tracker',
    linkTo: '/tracker',
    icon: <GpsIcon />,
    name: 'Трекер',
  },
  {
    key: 'adminPanel',
    icon: <AdminIcon />,
    role: ADMIN_ROLE,
    name: 'Панель администратора',
    subMenu: [
      {
        key: 'create',
        linkTo: '/create',
        name: 'Формы создания',
        icon: <PlusOutlined />,
      },
      {
        key: 'upload',
        linkTo: '/upload',
        role: ADMIN_ROLE,
        icon: <UploadOutlined />,
        name: 'Загрузка отчета',
      },
      {
        key: 'user_list',
        linkTo: '/user-list',
        name: 'Список пользователе',
        icon: <UnorderedListOutlined />,
      },
      {
        key: 'car_list',
        linkTo: '/car-list',
        name: 'Список машин',
        icon: <UnorderedListOutlined />,
      },
      {
        key: 'reports_list',
        linkTo: '/reports-list',
        name: 'Список отчетов',
        icon: <UnorderedListOutlined />,
      },
    ],
  },
]
