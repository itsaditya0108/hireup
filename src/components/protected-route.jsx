import { useUser } from '@clerk/clerk-react';
import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';

const ProtectedRoute = ({ children }) => {
    const { isSignedIn, user, isLoaded } = useUser();
    const { pathname } = useLocation();

    // 1. Wait until Clerk finishes loading
    if (!isLoaded) {
        return <div>Loading...</div>; // optional spinner
    }

    // 2. If not signed in, redirect to sign-in page
    if (!isSignedIn) {
        return <Navigate to="/?sign-in=true" />;
    }

    // 3. If user is signed in but has no role yet, redirect to onboarding
    if (!user?.unsafeMetadata?.role && pathname !== '/onboarding') {
        return <Navigate to="/onboarding" />;
    }

    // 4. Otherwise, allow access
    return children;
};

export default ProtectedRoute;
