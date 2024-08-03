import React from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

function withAuthRedirect(WrappedComponent: any) {
    return function(props: any) {
        const navigate = useNavigate();
        const { token } = useSelector((state: any) => state.user);

        React.useEffect(() => {
            console.log('token withAuthRedirect',token)
            if (token) {
                navigate('/');
            }
        }, [navigate, token]);

        return <WrappedComponent {...props} />;
    };
}

export default withAuthRedirect;
