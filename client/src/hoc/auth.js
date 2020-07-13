import React, { useEffect } from 'react';
import Axios from 'axios';
import { useDispatch } from 'react-redux';
import { auth } from '../_actions/User_action';

export default function (SpecificComponent, option, adminRoute = null){

    // null : any people
    // ture : login user
    // false : No login

    function AuthenticationCheck(props){

        const dispatch = useDispatch();

        useEffect(() => {
            
            dispatch(auth()).then(response => {
                console.log(response)

                if(!response.payload.isAuth){
                    // No Login
                    if(option){
                        props.history.push('/login');
                    }
                } else{
                    // Login
                    if(adminRoute && !response.payload.isAdmin){
                        props.history.push('/');
                    } else {
                        // option : false
                        props.history.push('/');
                    }
                }
            })
        }, [])
        return (
            <SpecificComponent />
        )
    }
    return AuthenticationCheck
}