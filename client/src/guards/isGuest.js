import { Redirect } from 'react-router';
import { useAuth } from '../contexts/AuthCtx';

const isGuest = (WrappedComponent) => {
    const ComponentWrapper = (props) => {
        const { currentUser, isRegistrationCompleted } = useAuth();

        if (currentUser != null && isRegistrationCompleted) {
            return <Redirect to="/profile/dashboard" />;
        }

        return <WrappedComponent {...props} />;
    };

    return ComponentWrapper;
};

export default isGuest;
