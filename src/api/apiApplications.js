import supabaseClient, { supabaseUrl } from "@/utils/supabase";

export async function applyToJob(token, jobData) {

    if (!jobData.job_id) {
        throw new Error("Job ID is required");
    }

    if (!jobData.candidate_id || !jobData.name || !jobData.resume) {
        throw new Error("Candidate ID, name, and resume are required");
    }

    const supabase = supabaseClient(token);

    const random = Math.floor(Math.random() * 90000);
    const fileName = `resume-${random}-${jobData.candidate_id}`;

    const { error: storageError } = await supabase
        .storage
        .from("resume")
        .upload(fileName, jobData.resume);

    if (storageError) {
        throw new Error(`Error uploading resume: ${storageError.message}`);
    }

    const resumeUrl = `${supabaseUrl}/storage/v1/object/public/resume/${fileName}`;

    const { data, error: insertError } = await supabase
        .from("applications")
        .insert([{
            job_id: jobData.job_id,
            candidate_id: jobData.candidate_id,
            name: jobData.name,
            status: jobData.status || "applied",
            experience: jobData.experience || "",
            skills: jobData.skills || "",
            education: jobData.education || "",
            resume: resumeUrl,
        }])
        .select();

    if (insertError) {
        throw new Error(`Error submitting application: ${insertError.message}`);
    }

    return data;
}

export async function updateApplicationStatus(token, { job_id, status }) {
    const supabase = supabaseClient(token);

    const { data, error } = await supabase
        .from("applications")
        .update({ status })
        .eq("job_id", job_id)
        .select();

    if (error) {
        console.error("Error updating application:", error);
        return null;
    }


    if (!data || data.length === 0) {
        console.warn("No application found with id:", application_id);
        return null;
    }

    return data;
}

export async function addNewJob(token, jobData) {
    const supabase = supabaseClient(token);

    const { data, error } = await supabase
        .from("jobs")
        .insert(jobData)
        .select();

    if (error) {
        console.error("Error creating job:", error);
        throw error;
    }

    return data;
}

export async function getApplications(token, { user_id }) {
    const supabase = supabaseClient(token);

    const { data, error } = await supabase
        .from("applications")
        .select("*, job:jobs(title, company:companies(name))")
        .eq("candidate_id", user_id); // FIXED

    if (error) {
        console.error("Error fetching applications:", error);
        return null;
    }

    return data;
}
