import React from 'react';
import * as bsIcons from 'react-icons/bs';
import * as biIcons from 'react-icons/bi';

export const NavbarData= [
  {
    title: 'Dashboard',
    path: '/',
    // icon: <AiIcons.AiFillHome />,
    icon: <biIcons.BiSolidDashboard/>,
    cName: 'nav-text'
  },
  // {
  //   title: 'Account',
  //   path: '/account',
  //   icon: <AiIcons.AiOutlineUser />,
  //   cName: 'nav-text'
  // },
  // {
  //   title: 'Chart',
  //   path: '/chart',
  //   icon: <FaIcons.FaChartLine />,
  //   cName: 'nav-text'
  // },
  // {
  //   title: 'News',
  //   path: '/news',
  //   icon: <bsIcons.BsNewspaper/>,
  //   cName: 'nav-text'
  // },
  {
    title: 'Settings',
    path: '/settings',
    icon: <bsIcons.BsFillGearFill/>,
    cName: 'nav-text'
  },

];