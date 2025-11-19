import supabaseClient, { supabaseUrl } from "@/utils/supabase";

export async function getCompanies(token) {
    const supabase = await supabaseClient(token);

    const { data, error } = await supabase
        .from("companies")
        .select("*");

    if (error) {
        console.error("Error fetching companies:", error);
        return null;
    }

    return data;
}

export async function addNewCompany(token, companyData) {
    const supabase = supabaseClient(token);

    const fileExtension = companyData.logo.name.split(".").pop();
    const random = Math.floor(Math.random() * 90000);
    const fileName = `logo-${random}-${companyData.name}.${fileExtension}`;

    const { error: storageError } = await supabase
        .storage
        .from("company-logo")
        .upload(fileName, companyData.logo);

    if (storageError) {
        throw new Error(`Error uploading company logo: ${storageError.message}`);
    }

    const logo_url = `${supabaseUrl}/storage/v1/object/public/company-logo/${fileName}`;

    const { data, error } = await supabase
        .from("companies")
        .insert({
            name: companyData.name,
            logo_url,
        })
        .select();

    if (error) {
        console.error("Error submitting company:", error);
        throw error;
    }

    return data;
}



export async function getSavedJob(token) {
    const supabase = await supabaseClient(token);

    const { data, error } = await supabase
        .from("saved_jobs")
        .select("*, job:jobs(*,company:companies(name,logo_url))");

    if (error) {
        console.error("Error Fetching Saved Job:", error);
        return null;
    }

    return data;
}

