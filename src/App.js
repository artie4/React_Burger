import React, {useEffect, Suspense} from 'react';
import {connect} from 'react-redux';
import {Route, Switch, withRouter, Redirect} from 'react-router-dom';
import Layout from './hoc/Layout/Layout'
import BurgerBuilder from './containers/BurgerBuilder/BurgerBuilder';
import Logout from './containers/Auth/Logout/Logout';
import * as actions from './store/actions/index';

const Checkout = React.lazy(() => {
    return import('./containers/Checkout/Checkout');
});

const Orders = React.lazy(() => {
    return import('./containers/Orders/Orders');
});

const Auth = React.lazy(() => {
    return import('./containers/Auth/Auth');
});

const app = props => {

    useEffect(() => {
        return props.onTryAutoSignup();
    }, []);

    let routes = (
        <Switch>
            <Route path="/auth"
                // component={asyncAuth}
                   render={props => <Auth {...props}/>}
            />
            <Route path="/" exact component={BurgerBuilder}/>
            <Redirect to="/"/>
        </Switch>
    );

    if (props.isAuthenticated) {
        routes = (
            <Switch>
                <Route
                    path="/checkout"
                    // component={asycCheckout}
                    render={props => <Checkout {...props} /> }
                />
                <Route
                    path="/orders"
                    // component={asyncOrders}
                    render={props => <Orders {...props} /> }
                />
                <Route path="/logout" component={Logout}/>
                <Route path="/" exact component={BurgerBuilder}/>
            </Switch>
        );
    }

    return (
        <React.Fragment>
            <Layout>
                <Suspense fallback={<p>Loading...</p>}>{routes}</Suspense>
            </Layout>
        </React.Fragment>
    );
};


const mapStateToProps = state => {
    return {
        isAuthenticated: state.authen.token !== null
    }
};

const mapDispatchToProps = dispatch => {
    return {
        onTryAutoSignup: () => dispatch(actions.authCheckState())
    };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(app));
