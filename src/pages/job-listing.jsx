import { getCompanies } from "@/api/apiCompanies";
import { getJobs } from "@/api/apiJobs";
import JobCard from "@/components/job-card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import useFetch from "@/hooks/use-fetch";
import { useUser } from "@clerk/clerk-react";
import { SelectGroup } from "@radix-ui/react-select";
import { State, City } from "country-state-city";
import { useEffect, useState } from "react";
import { BarLoader } from "react-spinners";

const JobListing = () => {
    const [searchQuery, setSearchQuery] = useState("");
    const [state, setState] = useState("");
    const [city, setCity] = useState("");
    const [company_id, setCompany_id] = useState("");

    const { isLoaded, user } = useUser();

    const { fn: fnJobs, data: jobs, loading: loadingJobs } = useFetch(getJobs);
    const { fn: fnCompanies, data: companies } = useFetch(getCompanies);

    const clearFilters = () => {
        setState("");
        setCity("");
        setCompany_id("");
        setSearchQuery("");
    };

    // Fetch companies on load
    useEffect(() => {
        if (isLoaded) fnCompanies();
    }, [isLoaded]);

    // Fetch jobs when filters change
    useEffect(() => {
        if (!isLoaded) return;

        let filterLocation = "";
        if (city) {
            // city + state for filtering
            const stateName = State.getStateByCodeAndCountry(state, "IN")?.name;
            filterLocation = `${city}, ${stateName}`;
        } else if (state) {
            // only state for filtering
            filterLocation = State.getStateByCodeAndCountry(state, "IN")?.name;
        }

        fnJobs({ location: filterLocation, company_id, searchQuery });
    }, [isLoaded, state, city, company_id, searchQuery]);

    const handleSearch = (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);
        const query = formData.get("search-query") || "";
        setSearchQuery(query);
    };

    if (!isLoaded) return <BarLoader className="mb-4" width="100%" color="#36d7b7" />;

    return (
        <div>
            <h1 className="gradient-title font-extrabold text-6xl sm:text-7xl text-center pb-8">Latest Jobs</h1>

            {/* Search */}
            <form onSubmit={handleSearch} className="h-12 flex w-full gap-1 items-center mb-2">
                <Input
                    type="text"
                    placeholder="Search Jobs by Title .."
                    name="search-query"
                    className="h-full flex-1 px-4 text-md"
                />
                <Button type="submit" className="h-full sm:w-28" variant="blue">
                    Search
                </Button>
            </form>

            {/* Filters */}
            <div className="flex flex-col sm:flex-row gap-2 mb-4">
                {/* State */}
                <div className="flex-1">
                    <Select value={state} onValueChange={(val) => { setState(val); setCity(""); }}>
                        <SelectTrigger className="w-full">
                            <SelectValue placeholder="Filter by State" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectGroup>
                                {State.getStatesOfCountry("IN").map(({ isoCode, name }) => (
                                    <SelectItem key={isoCode} value={isoCode}>{name}</SelectItem>
                                ))}
                            </SelectGroup>
                        </SelectContent>
                    </Select>
                </div>

                {/* City - only show if state selected */}
                {state && (
                    <div className="flex-1">
                        <Select value={city} onValueChange={setCity}>
                            <SelectTrigger className="w-full">
                                <SelectValue placeholder="Filter by City" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectGroup>
                                    {City.getCitiesOfState("IN", state).map(({ name }) => (
                                        <SelectItem key={name} value={name}>{name}</SelectItem>
                                    ))}
                                </SelectGroup>
                            </SelectContent>
                        </Select>
                    </div>
                )}

                {/* Company */}
                <div className="flex-1">
                    <Select value={company_id} onValueChange={setCompany_id}>
                        <SelectTrigger className="w-full">
                            <SelectValue placeholder="Filter by Company" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectGroup>
                                {companies?.map(({ name, id }) => (
                                    <SelectItem key={id} value={id.toString()}>{name}</SelectItem>
                                ))}
                            </SelectGroup>
                        </SelectContent>
                    </Select>
                </div>

                <div className="sm:w-auto w-full">
                    <Button onClick={clearFilters} variant="destructive" className="w-full sm:w-auto">
                        Clear Filters
                    </Button>
                </div>
            </div>

            {/* Jobs */}
            {loadingJobs && <BarLoader className="mt-4" width="100%" color="#36d7b7" />}

            {!loadingJobs && (
                <div className="mt-8 grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {jobs?.length ? jobs.map((job) => (
                        <JobCard key={job.id} job={job} savedInit={job?.saved?.length > 0} />
                    )) : (
                        <div>No Jobs Found 😢</div>
                    )}
                </div>
            )}
        </div>
    );
};

export default JobListing;
