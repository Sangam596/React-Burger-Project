import React, { Component } from 'react'
import Aux from '../Auxillary/Auxillary';
import SideDrawer from '../../Components/Navigation/SideDrawer/SideDrawer';
import Toolbar from '../../Components/Navigation/Toolbar/Toolbar';
import classes from "./Layout.module.css";

class Layout extends Component {
    state = {
        showSideDrawer:false
    }
        SideDrawerClosedHandler = () => {
            this.setState({showSideDrawer:false})
        }
        SideDrawerToggleHandler = () => {
            this.setState((prevState)=>{
                return  {showSideDrawer:!prevState.showSideDrawer};
            })
        }
       
    render() {
        return (
            <Aux>
            <Toolbar DrawerToggleClicked={this.SideDrawerToggleHandler} />
            <SideDrawer open={this.state.showSideDrawer}  
            closed={this.SideDrawerClosedHandler}/>
            <main className={classes.Content} >
                {this.props.children}
            </main>
        </Aux>
        )
    }
}


export default Layout;