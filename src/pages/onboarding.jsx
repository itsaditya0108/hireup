import { Button } from "@/components/ui/button";
import { useUser } from "@clerk/clerk-react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { BarLoader } from "react-spinners";

const Onboarding = () => {
    const { user, isLoaded } = useUser();
    const navigate = useNavigate();
    const [updatingRole, setUpdatingRole] = useState(false);

    // Handle role selection
    const handleRoleSelection = async (role) => {
        try {
            setUpdatingRole(true);
            await user.update({ unsafeMetadata: { role } });

            // Small delay to ensure Clerk syncs the session
            setTimeout(() => {
                navigate(role === "recruiter" ? "/post-job" : "/jobs");
            }, 500);
        } catch (err) {
            console.log("Error updating role:", err);
        } finally {
            setUpdatingRole(false);
        }
    };

    // Redirect only if role exists
    useEffect(() => {
        if (isLoaded && user?.unsafeMetadata?.role) {
            const role = user.unsafeMetadata.role;
            navigate(role === "recruiter" ? "/post-job" : "/jobs");
        }
    }, [isLoaded, user, navigate]);

    if (!isLoaded || updatingRole) {
        return <BarLoader className="mb-4" width={"100%"} color="#36d7b7" />;
    }

    // If user has role, return null while redirecting
    if (user?.unsafeMetadata?.role) return null;

    return (
        <div className="flex flex-col items-center justify-center mt-32">
            <h2 className="gradient-title font-extrabold text-7xl sm:text-8xl tracking-tighter">
                I am a ..
            </h2>
            <div className="mt-16 grid grid-cols-2 gap-4 w-full md:px-40">
                <Button
                    variant="blue"
                    className="h-36 text-2xl"
                    onClick={() => handleRoleSelection("candidate")}
                >
                    Candidate
                </Button>
                <Button
                    variant="destructive"
                    className="h-36 text-2xl"
                    onClick={() => handleRoleSelection("recruiter")}
                >
                    Recruiter
                </Button>
            </div>
        </div>
    );
};

export default Onboarding;
