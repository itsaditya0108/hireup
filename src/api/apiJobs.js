import supabaseClient from "@/utils/supabase";

export async function getJobs(token, { location, company_id, searchQuery }) {
    const supabase = await supabaseClient(token);

    let query = supabase
        .from("jobs")
        .select("*, company:companies(name,logo_url), saved:saved_jobs(id)");

    if (location) {
        query = query.ilike("location", `%${location}%`);
    }

    if (company_id) {
        query = query.eq("company_id", company_id);
    }

    if (searchQuery) {
        query = query.ilike("title", `%${searchQuery}%`);
    }

    const { data, error } = await query;

    if (error) {
        console.error("Error fetching Jobs:", error);
        return null;
    }

    return data;
}

export async function saveJob(token, { alreadySaved, ...saveData }) {
    const supabase = await supabaseClient(token);

    if (alreadySaved) {
        const { data, error } = await supabase
            .from("saved_jobs")
            .delete()
            .eq("job_id", saveData.job_id)
            .eq("user_id", saveData.user_id);

        if (error) {
            console.error("Delete Error:", error);
            return null;
        }
        return data;
    }

    const { data, error } = await supabase
        .from("saved_jobs")
        .insert([saveData])
        .select();

    if (error) {
        console.error("Insert Error:", error);
        return null;
    }

    return data;
}

export async function getSingleJob(token, { job_id }) {
    if (!job_id) {
        console.error("Job ID is required");
        return null;
    }

    const supabase = await supabaseClient(token);

    const { data, error } = await supabase
        .from("jobs")
        .select(`
            *,
            company:companies(name,logo_url),
            applications:applications(*)
        `)
        .eq("id", job_id)
        .single();

    if (error) {
        console.error("Error fetching job:", error.message);
        return null;
    }

    return data;
}

export async function updateHiringStatus(token, { job_id, isOpen }) {
    if (!job_id) {
        console.error("Job ID is required");
        return null;
    }

    const supabase = await supabaseClient(token);

    const { data, error } = await supabase
        .from("jobs")
        .update({ isOpen })
        .eq("id", job_id)
        .select();

    if (error) {
        console.error("Error updating job:", error.message);
        return null;
    }

    return data;
}

export async function getMyJobs(token, { recruiter_id }) {
    const supabase = await supabaseClient(token);

    const { data, error } = await supabase
        .from("jobs")
        .select("*, company: companies(name,logo_url)")
        .eq("recruiter", recruiter_id);

    if (error) {
        console.error("Error fetching Jobs:", error);
        return null;
    }

    return data;
}


export async function deleteJob(token, { job_id }) {
    const supabase = await supabaseClient(token);

    const { data, error } = await supabase
        .from("jobs")
        .delete()
        .eq("id", job_id)
        .select();

    if (error) {
        console.error("Error Deleting Job:", error);
        return null;
    }

    return data;
}