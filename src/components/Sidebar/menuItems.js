import React from "react";
import { HomeFilled, PlusOutlined, UnorderedListOutlined, UploadOutlined } from "@ant-design/icons";
import { AdminIcon, GpsIcon } from "../Icons";
import { ADMIN_ROLE } from "../../constants";

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
    key: 'upload',
    linkTo: '/upload',
    role: ADMIN_ROLE,
    icon: <UploadOutlined />,
    name: 'Upload report file',
  },
  {
    key: 'adminPanel',
    icon: <AdminIcon />,
    role: ADMIN_ROLE,
    name: 'Admin panel',
    subMenu: [
      {
        key: 'create',
        linkTo: '/create',
        name: 'Create new',
        icon: <PlusOutlined />,
      },
      {
        key: 'user_list',
        linkTo: '/user-list',
        name: 'User list',
        icon: <UnorderedListOutlined />,
      },
      {
        key: 'car_list',
        linkTo: '/car-list',
        name: 'Car list',
        icon: <UnorderedListOutlined />,
      },
    ],
  },
]
