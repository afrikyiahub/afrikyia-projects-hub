"use server";

import { createClient } from "@/utils/supabase/server";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { ProjectStatus } from "@/types";

export async function addProject(formData: FormData) {
  const supabase = await createClient();

  const name = formData.get("name") as string;
  const description = formData.get("description") as string;
  const category = formData.get("category") as string;
  const status = formData.get("status") as ProjectStatus;
  const logo = formData.get("logo") as string;
  const client = formData.get("client") as string;
  
  // URLs
  const productionUrl = formData.get("productionUrl") as string;
  const adminUrl = formData.get("adminUrl") as string;
  const previewUrl = formData.get("previewUrl") as string;
  const githubUrl = formData.get("githubUrl") as string;
  const vercelUrl = formData.get("vercelUrl") as string;
  const supabaseUrl = formData.get("supabaseUrl") as string;
  
  // Dates
  const startDate = formData.get("startDate") as string;
  const deliveryDate = formData.get("deliveryDate") as string;
  
  const notes = formData.get("notes") as string;
  const technologiesStr = formData.get("technologies") as string;
  
  const technologies = technologiesStr 
    ? technologiesStr.split(",").map(t => t.trim()).filter(Boolean)
    : [];

  // Generate a simple slug from name if not provided
  let slug = formData.get("slug") as string;
  if (!slug) {
    slug = name.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '') + '-' + Math.floor(Math.random() * 1000);
  }

  const { error } = await supabase.from("projects").insert({
    name,
    slug,
    description,
    category,
    status,
    logo: logo || "📁",
    client,
    productionUrl,
    adminUrl,
    previewUrl,
    githubUrl,
    vercelUrl,
    supabaseUrl,
    startDate: startDate || null,
    deliveryDate: deliveryDate || null,
    notes,
    technologies,
  });

  if (error) {
    console.error("Error adding project:", error);
    throw new Error(error.message);
  }

  revalidatePath("/");
  redirect("/");
}

export async function updateProject(id: string, formData: FormData) {
  const supabase = await createClient();

  const name = formData.get("name") as string;
  const description = formData.get("description") as string;
  const category = formData.get("category") as string;
  const status = formData.get("status") as ProjectStatus;
  const logo = formData.get("logo") as string;
  const client = formData.get("client") as string;
  
  // URLs
  const productionUrl = formData.get("productionUrl") as string;
  const adminUrl = formData.get("adminUrl") as string;
  const previewUrl = formData.get("previewUrl") as string;
  const githubUrl = formData.get("githubUrl") as string;
  const vercelUrl = formData.get("vercelUrl") as string;
  const supabaseUrl = formData.get("supabaseUrl") as string;
  
  // Dates
  const startDate = formData.get("startDate") as string;
  const deliveryDate = formData.get("deliveryDate") as string;
  
  const notes = formData.get("notes") as string;
  const technologiesStr = formData.get("technologies") as string;
  
  const technologies = technologiesStr 
    ? technologiesStr.split(",").map(t => t.trim()).filter(Boolean)
    : [];

  const { error } = await supabase.from("projects").update({
    name,
    description,
    category,
    status,
    logo,
    client,
    productionUrl,
    adminUrl,
    previewUrl,
    githubUrl,
    vercelUrl,
    supabaseUrl,
    startDate: startDate || null,
    deliveryDate: deliveryDate || null,
    notes,
    technologies,
    lastUpdate: new Date().toISOString(),
  }).eq("id", id);

  if (error) {
    console.error("Error updating project:", error);
    throw new Error(error.message);
  }

  revalidatePath("/");
  redirect("/");
}

export async function deleteProject(id: string) {
  const supabase = await createClient();

  const { error } = await supabase.from("projects").delete().eq("id", id);

  if (error) {
    console.error("Error deleting project:", error);
    throw new Error(error.message);
  }

  revalidatePath("/");
  redirect("/");
}
