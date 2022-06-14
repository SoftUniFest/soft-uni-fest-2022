import { Redirect } from "react-router";
import { useAuth } from "../contexts/AuthCtx";

const isAdmin = (WrappedComponent) => {

    const ComponentWrapper = (props) => {
        const { userRole } = useAuth();

        return (
            <>

                {userRole !== 'admin'
                    ?
                    <Redirect to="/" />
                    :
                    <WrappedComponent {...props} />
                }
            </>
        )
    }

    return ComponentWrapper;
}

export default isAdmin;