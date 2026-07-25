"use server";

import { createClient } from "@/utils/supabase/server";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function addTool(formData: FormData) {
  const supabase = await createClient();

  const is_paid = formData.get("is_paid") === "true";

  const newTool = {
    name: formData.get("name") as string,
    description: formData.get("description") as string,
    url: formData.get("url") as string,
    icon: formData.get("icon") as string,
    color: formData.get("color") as string,
    login_email: (formData.get("login_email") as string) || null,
    login_password: (formData.get("login_password") as string) || null,
    is_paid,
    subscription_status: is_paid ? (formData.get("subscription_status") as string) || null : null,
  };

  const { error } = await supabase.from("tools").insert(newTool);

  if (error) {
    throw new Error(error.message);
  }

  revalidatePath("/tools");
  redirect("/tools");
}

export async function updateTool(id: string, formData: FormData) {
  const supabase = await createClient();

  const is_paid = formData.get("is_paid") === "true";

  const updatedTool = {
    name: formData.get("name") as string,
    description: formData.get("description") as string,
    url: formData.get("url") as string,
    icon: formData.get("icon") as string,
    color: formData.get("color") as string,
    login_email: (formData.get("login_email") as string) || null,
    login_password: (formData.get("login_password") as string) || null,
    is_paid,
    subscription_status: is_paid ? (formData.get("subscription_status") as string) || null : null,
  };

  const { error } = await supabase.from("tools").update(updatedTool).eq("id", id);

  if (error) {
    throw new Error(error.message);
  }

  revalidatePath("/tools");
  redirect("/tools");
}

export async function deleteTool(id: string) {
  const supabase = await createClient();

  const { error } = await supabase.from("tools").delete().eq("id", id);

  if (error) {
    throw new Error(error.message);
  }

  revalidatePath("/tools");
}
