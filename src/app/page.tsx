import { UserManager } from "@/components/custom/custom-users";

export default function Home() {
  return (
    <div>
      <h1 className="text-3xl font-bold underline">
        Template with Nextjs + Neon + Tailwind + Shadcn UI + SWR for client
        fetching
      </h1>
      <hr />
      <UserManager />
    </div>
  );
}
