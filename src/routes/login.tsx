import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { supabase } from "@/lib/supabase";
import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";

export const Route = createFileRoute("/login")({
	component: LoginPage,
});

export default function LoginPage() {
	const [email, setEmail] = useState("");
	const [sent, setSent] = useState(false);
	const [loading, setLoading] = useState(false);

	const handleLogin = async () => {
		setLoading(true);
		const { error } = await supabase.auth.signInWithOtp({ email });
		setLoading(false);

		if (error) {
			alert(error.message);
		} else {
			setSent(true);
		}
	};

	return (
		<div className="flex justify-center items-center h-screen">
			<Card className="w-full max-w-md p-6">
				<CardContent className="space-y-4">
					<h1 className="text-xl font-semibold">Login</h1>

					{sent ? (
						<p className="text-sm">Check your email for a login link.</p>
					) : (
						<>
							<div className="space-y-2">
								<Label htmlFor="email">Email</Label>
								<Input
									id="email"
									type="email"
									placeholder="you@example.com"
									value={email}
									onChange={(e) => setEmail(e.target.value)}
									required
								/>
							</div>
							<Button
								onClick={handleLogin}
								disabled={loading}
								className="w-full"
							>
								{loading ? "Sending..." : "Send Magic Link"}
							</Button>
						</>
					)}
				</CardContent>
			</Card>
		</div>
	);
}
