import { Navigate, useLocation } from "react-router-dom";
import { useUser } from "@clerk/clerk-react";

const ProtectedRoute = ({ children }) => {
    const { isSignedIn, isLoaded, user } = useUser();
    const { pathname } = useLocation();

    if (!isLoaded) {
        return null;
    }

    if (!isSignedIn) {
        return <Navigate to="/?sign-in=true" replace />;
    }

    if (user && !user.publicMetadata?.role && pathname !== "/onboarding") {
        return <Navigate to="/onboarding" replace />;
    }

    return children;
};

export default ProtectedRoute;
