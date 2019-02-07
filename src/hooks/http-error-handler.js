import React from "react";
import { useState, useEffect } from 'react';


const httpClient = axios => {

    const [error, setError] = useState(null);

    const requestInterceptor = axios.interceptors.request.use(req => {
        setError(null);
        return req;
    });

    const responseInterceptor = axios.interceptors.response.use(res => res, err => {
        setError(err);
    });


    useEffect(() => {
        return () => {
            axios.interceptors.request.eject(requestInterceptor);
            axios.interceptors.response.eject(responseInterceptor);
        }
    }, [requestInterceptor, responseInterceptor]);

    const errorConfirmedHandler = () => {
        setError(null);
    };

    return [error, errorConfirmedHandler];

}

export default httpClient;