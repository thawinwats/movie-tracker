import { supabase } from "@/lib/supabase";
import { createFileRoute, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/_app/_layout")({
	loader: async () => {
		const {
			data: { user },
		} = await supabase.auth.getUser();

		if (!user) {
			throw redirect({ to: "/login" });
		}

		return { user };
	},

	component: ({ children }) => children,
});
