import React from 'react';
import Logo from '../../Logo/Logo';
import NavigationItems from '../NavigationItems/NavigationItems';
import DrawerToggle from '../SideDrawer/DrawerToggle/DrawerToggle';
import classes from "./Toolbar.module.css";

 const Toolbar = props => (
     <header className={classes.Toolbar} >
         <DrawerToggle clicked={props.DrawerToggleClicked}/>
         <Logo />
          <nav className={classes.DesktopOnly}>
          <NavigationItems/>
          </nav >
     </header>
 )
export default Toolbar;