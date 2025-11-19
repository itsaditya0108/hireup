import { getApplications } from "@/api/apiApplications"
import useFetch from "@/hooks/use-fetch"
import { useUser } from "@clerk/clerk-react"
import { useEffect } from "react"
import { BarLoader } from "react-spinners"
import ApplicationCard from "./application-card"

const CreatedApplications = () => {

    const { user } = useUser();

    const {
        loading: loadingApplcations,
        data: applications,
        fn: fnApplications,
    } = useFetch(getApplications);

    useEffect(() => {
        if (user?.id) {
            fnApplications({ user_id: user.id });  // ✅ FIXED
        }
    }, [user]);

    if (loadingApplcations) {
        return <BarLoader className="mb-4" width="100%" color="#36d7b7" />;
    }

    if (!applications || applications.length === 0) {
        return <div>No Applications Found 😢</div>;
    }

    return (
        <div className="flex flex-col gap-2">
            {applications.map((application) => (
                <ApplicationCard key={application.id} application={application} isCandidate />
            ))}
        </div>
    )
}

export default CreatedApplications;
