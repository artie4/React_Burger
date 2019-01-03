import React from 'react';

import Modal from '../../components/UI/Modal/Modal';
import Aux from '../_Aux/_Aux';

const withErrorHandler = (WrappedComponent, axios) => {
    return class extends React.Component {
        state = {
            error: null
        }

        // componentDidMount -> componentWillMount because 
        // cDM called after all child compenents render methods
        componentWillMount() {
            this.requestInterceptor = axios.interceptors.request.use(req => {
                this.setState({ error: null })
                return req;
            });
            this.responseInterceptor = axios.interceptors.response.use(res => res, error => {
                this.setState({ error: error })
            });
        }

        componentWillUnmount () {
            console.log('Will Unmount', this.responseInterceptor, this.requestInterceptor);
            axios.interceptors.request.eject(this.responseInterceptor);
            axios.interceptors.response.eject(this.requestInterceptor);
        }

        errorConfirmedHandler = () => {
            this.setState({ error: null })
        }   

        render() {
            return (
                <Aux>
                    <Modal
                        show={this.state.error}
                        modalClosed={this.errorConfirmedHandler}
                        >
                        {this.state.error ? this.state.error.message : null}
                    </Modal>
                    <WrappedComponent {...this.props} />
                </Aux>
            );
        }
    }
}

export default withErrorHandler;