import React, {useState} from 'react';
import {connect} from 'react-redux';
import Aux from '../_Aux/_Aux';
import classes from './Layout.css';
import Toolbar from '../../components/Navigation/Toolbar/Toolbar';
import SideDrawer from '../../components/Navigation/SideDrawer/SideDrawer';


const layout = props => {

    const [isSideDrawerVisible, setSideDrawerVisible] = useState(false);

    const sideDrawerClossedHandler = () => {
        setSideDrawerVisible(false);
    };

    const sideDrawerToggleHandler = () => {
        setSideDrawerVisible(!isSideDrawerVisible);
    };

    return (
        <Aux>
            <Toolbar
                isAuth={props.isAuthenticated}
                drawerToggleClicked={sideDrawerToggleHandler}/>
            <SideDrawer
                isAuth={props.isAuthenticated}
                open={isSideDrawerVisible}
                closed={sideDrawerClossedHandler}
            />
            <main className={classes.Content}>
                {props.children}
            </main>
        </Aux>
    )
}

const mapStateToProps = state => {
    return {
        isAuthenticated: state.authen.token !== null
    };
};


export default connect(mapStateToProps)(layout);