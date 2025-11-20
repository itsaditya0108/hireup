import { Button } from "@/components/ui/button";
import { useUser } from "@clerk/clerk-react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { BarLoader } from "react-spinners";

const Onboarding = () => {
  const { user, isLoaded } = useUser();
  const navigate = useNavigate();
  const [updatingRole, setUpdatingRole] = useState(false);

  const handleRoleSelection = async (role) => {
    try {
      setUpdatingRole(true);
      await user.update({ publicMetadata: { role } });

      // Wait for session to update before navigating
      setTimeout(() => {
        navigate(role === "recruiter" ? "/post-job" : "/jobs", { replace: true });
      }, 1000);
    } catch (err) {
      console.error("Error updating role:", err);
      setUpdatingRole(false);
    }
  };

  useEffect(() => {
    if (isLoaded && user?.publicMetadata?.role) {
      const role = user.publicMetadata.role;
      navigate(role === "recruiter" ? "/post-job" : "/jobs", { replace: true });
    }
  }, [isLoaded, user?.publicMetadata?.role, navigate]);

  if (!isLoaded || updatingRole) {
    return <BarLoader className="mb-4" width={"100%"} color="#36d7b7" />;
  }

  if (user?.publicMetadata?.role) {
    return null;
  }

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
          disabled={updatingRole}
        >
          Candidate
        </Button>
        <Button
          variant="destructive"
          className="h-36 text-2xl"
          onClick={() => handleRoleSelection("recruiter")}
          disabled={updatingRole}
        >
          Recruiter
        </Button>
      </div>
    </div>
  );
};

export default Onboarding;