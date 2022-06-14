import { Redirect } from 'react-router';
import { useAuth } from '../contexts/AuthCtx';

const isAuth = (WrappedComponent) => {
    const ComponentWrapper = (props) => {
        const { currentUser } = useAuth();

        if (currentUser == null) {
            return <Redirect to="/" />;
        }

        // if (!currentUser.emailVerified) {
        //     console.log('Please verify your email!');
        //     return <Redirect to="/" />;
        // }

        return <WrappedComponent {...props} />;
    };

    return ComponentWrapper;
};

export default isAuth;
