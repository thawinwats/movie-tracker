import { supabase } from "@/lib/supabase";
import { createFileRoute, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/_app/episodes")({
	loader: async () => {
		const {
			data: { user },
		} = await supabase.auth.getUser();

		if (!user) {
			throw redirect({ to: "/login" });
		}

		return { user };
	},
	component: RouteComponent,
});

function RouteComponent() {
	const { user } = Route.useLoaderData();

	return (
		<>
			<div>Welcome, {user.email}</div>
			<div>✅ You are authenticated!</div>
		</>
	);
}
