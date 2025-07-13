export const sendMagicLink = async (email: string): Promise<void> => {
	const response = await fetch(`http://localhost:3000/api/auth/magic-link`, {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify({ email }),
	});

	if (!response.ok) {
		throw new Error("Failed to send magic link");
	}
};
