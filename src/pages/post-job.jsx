import { addNewJob } from "@/api/apiApplications";
import { getCompanies } from "@/api/apiCompanies";
import AddCompanyDrawer from "@/components/add-company-drawer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import useFetch from "@/hooks/use-fetch";
import { useUser } from "@clerk/clerk-react";
import { zodResolver } from "@hookform/resolvers/zod";
import MDEditor from "@uiw/react-md-editor";
import { City, State } from "country-state-city";
import { useEffect } from "react";
import { Controller, useForm } from "react-hook-form";
import { Navigate, useNavigate } from "react-router-dom";
import { BarLoader } from "react-spinners";
import z from "zod";

const schema = z.object({
    title: z.string().min(1, "Title is required"),
    description: z.string().min(1, "Description is required"),
    state: z.string().min(1, "Select a state"),
    city: z.string().min(1, "Select a city"),
    company_id: z.string().min(1, "Select or add a company"),
    requirements: z.string().min(1, "Requirements are required"),
});

const PostJob = () => {
    const { isLoaded, user } = useUser();
    const navigate = useNavigate();

    const {
        register,
        control,
        handleSubmit,
        watch,
        setValue,
        formState: { errors },
    } = useForm({
        resolver: zodResolver(schema),
        defaultValues: { state: "", city: "", company_id: "", requirements: "" },
    });

    const { fn: fnCompanies, data: companies, loading: loadingCompanies } = useFetch(getCompanies);

    useEffect(() => {
        if (isLoaded) fnCompanies();
    }, [isLoaded]);

    const { fn: fnCreateJob, loading: loadingCreateJob, error: errorCreateJob, data: dataCreateJob } = useFetch(addNewJob);

    const onSubmit = (data) => {
        const fullLocation = `${data.city}, ${State.getStateByCodeAndCountry(data.state, "IN")?.name}`;
        fnCreateJob({
            title: data.title,
            description: data.description,
            location: fullLocation,
            company_id: data.company_id,
            requirements: data.requirements,
            recruiter: user.id,
            isOpen: true,
        });
    };

    useEffect(() => {
        if (dataCreateJob?.length > 0) navigate("/jobs");
    }, [dataCreateJob]);

    if (!isLoaded || loadingCompanies) return <BarLoader width="100%" color="#36d7b7" />;

    if (user?.unsafeMetadata?.role !== "recruiter") return <Navigate to="/jobs" />;

    return (
        <div>
            <h1 className="gradient-title font-extrabold text-5xl sm:text-7xl text-center pb-8">Post a Job</h1>
            <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4 p-4 pb-0">
                <Input placeholder="Job Title" {...register("title")} />
                {errors.title && <p className="text-red-500">{errors.title.message}</p>}

                <Input placeholder="Job Description" {...register("description")} />
                {errors.description && <p className="text-red-500">{errors.description.message}</p>}

                <div className="flex flex-wrap gap-4 items-center">
                    {/* State */}
                    <Controller
                        name="state"
                        control={control}
                        render={({ field }) => (
                            <Select
                                value={field.value}
                                onValueChange={(val) => {
                                    field.onChange(val);
                                    setValue("city", ""); // reset city when state changes
                                }}
                            >
                                <SelectTrigger className="w-40 sm:w-56">
                                    <SelectValue placeholder="Select State" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectGroup>
                                        {State.getStatesOfCountry("IN").map(({ isoCode, name }) => (
                                            <SelectItem key={isoCode} value={isoCode}>
                                                {name}
                                            </SelectItem>
                                        ))}
                                    </SelectGroup>
                                </SelectContent>
                            </Select>
                        )}
                    />
                    {errors.state && <p className="text-red-500">{errors.state.message}</p>}

                    {/* City - only show if a state is selected */}
                    {watch("state") && (
                        <Controller
                            name="city"
                            control={control}
                            render={({ field }) => (
                                <Select value={field.value} onValueChange={field.onChange}>
                                    <SelectTrigger className="w-40 sm:w-56">
                                        <SelectValue placeholder="Select City" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectGroup>
                                            {City.getCitiesOfState("IN", watch("state")).map(({ name }) => (
                                                <SelectItem key={name} value={name}>
                                                    {name}
                                                </SelectItem>
                                            ))}
                                        </SelectGroup>
                                    </SelectContent>
                                </Select>
                            )}
                        />
                    )}
                    {errors.city && <p className="text-red-500">{errors.city.message}</p>}

                    {/* Company */}
                    <Controller
                        name="company_id"
                        control={control}
                        render={({ field }) => (
                            <Select value={field.value} onValueChange={field.onChange}>
                                <SelectTrigger className="w-40 sm:w-56">
                                    <SelectValue placeholder="Select Company">
                                        {field.value
                                            ? companies?.find((c) => c.id === Number(field.value))?.name
                                            : "Company"}
                                    </SelectValue>
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectGroup>
                                        {companies?.map(({ name, id }) => (
                                            <SelectItem key={id} value={id.toString()}>
                                                {name}
                                            </SelectItem>
                                        ))}
                                    </SelectGroup>
                                </SelectContent>
                            </Select>
                        )}
                    />
                    {errors.company_id && <p className="text-red-500">{errors.company_id.message}</p>}

                    <AddCompanyDrawer fetchCompany={fnCompanies} />
                </div>


                {/* Requirements */}
                <Controller
                    name="requirements"
                    control={control}
                    render={({ field }) => (
                        <div className="w-full border rounded-md p-2 bg-black">
                            <MDEditor
                                textareaProps={{ placeholder: "Enter requirements..." }}
                                height={250}
                                visibleDragbar={false}
                                value={field.value ?? ""}
                                onChange={(val) => field.onChange(val ?? "")}
                            />
                        </div>
                    )}
                />
                {errors.requirements && <p className="text-red-500">{errors.requirements.message}</p>}

                {errorCreateJob?.message && <p className="text-red-500">{errorCreateJob.message}</p>}
                {loadingCreateJob && <BarLoader className="mb-4" width="100%" color="#36d7b7" />}

                <Button type="submit" variant="blue" size="lg" className="mt-2 w-full">
                    Submit
                </Button>
            </form>
        </div>
    );
};

export default PostJob;
