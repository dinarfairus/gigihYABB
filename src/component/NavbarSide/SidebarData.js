import React from 'react'
import * as AiIcons from "react-icons/ai";
import * as SiIcons from "react-icons/si";
import * as BsIcons from "react-icons/bs";
import * as BicIcons from "react-icons/bi";

export const SidebarData = [
    {
        title: 'Home',
        path: '/',
        icon: <AiIcons.AiFillHome/>,
        cName: 'nav-text'  
    },
    {
        title: 'Search',
        path: '/search',
        icon: <BsIcons.BsSearch/>,
        cName: 'nav-text'  
    },
    {
        title: 'Library',
        path: '/library',
        icon: <BicIcons.BiLibrary/>,
        cName: 'nav-text'  
    },
    {
        title: 'AddPlaylist',
        path: '/add',
        icon: <SiIcons.SiAddthis/>,
        cName: 'nav-text'  
    }
];