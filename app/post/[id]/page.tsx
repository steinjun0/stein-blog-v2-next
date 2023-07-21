import { redirect } from "next/navigation";

export default async function RedirectPage({ params }: { params: { id: string; }; }) {
  redirect(`/posts/${params.id}`);
}