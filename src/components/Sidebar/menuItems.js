import React from "react";
import { HomeFilled, PlusOutlined, UnorderedListOutlined, UploadOutlined } from "@ant-design/icons";
import { AdminIcon, GpsIcon } from "../Icons";

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
    icon: <UploadOutlined />,
    name: 'Upload report file',
  },
  {
    key: 'adminPanel',
    icon: <AdminIcon />,
    role: 'ADMIN',
    name: 'Admin panel',
    subMenu: [
      {
        key: 'create',
        linkTo: '/create',
        name: 'Create new',
        icon: <PlusOutlined />,
      },
      {
        key: 'list',
        linkTo: '/list',
        name: 'List',
        icon: <UnorderedListOutlined />,
      },
    ],
  },
]
