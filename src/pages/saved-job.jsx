import { getSavedJob } from "@/api/apiCompanies"
import JobCard from "@/components/job-card";
import useFetch from "@/hooks/use-fetch"
import { useUser } from "@clerk/clerk-react"
import { useEffect } from "react";
import { BarLoader } from "react-spinners";

const SaveJob = () => {

    const { isLoaded } = useUser();


    const {
        loading: loadingSavedJobs,
        data: savedJobs,
        fn: fnSavedJobs,
    } = useFetch(getSavedJob)

    useEffect(() => {
        if (isLoaded) fnSavedJobs();
    }, [isLoaded])

    if (!isLoaded || loadingSavedJobs) {
        return <BarLoader className="mb-4" width="100%" color="#36d7b7" />;
    }

    return (
        <div>
            <h1 className="gradient-title font-extrabold text-6xl sm:text-7xl text-center pb-8">Saved Jobs</h1>
            {!loadingSavedJobs && (
                <>
                    {savedJobs?.length > 0 ? (
                        <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                            {savedJobs.map((saved) => (
                                <JobCard
                                    key={saved.id}
                                    job={saved.job}
                                    savedInit={true}
                                    onJobSaved={fnSavedJobs}
                                />
                            ))}
                        </div>
                    ) : (
                        <div className="mt-10 text-center w-full text-gray-300 text-lg">
                            No Saved Jobs Found 😢
                        </div>
                    )}
                </>
            )}

        </div>
    )
}

export default SaveJob
