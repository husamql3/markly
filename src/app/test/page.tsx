"use client";

import { authClient } from "@/auth/client";
import { useState } from "react";

export default function TestAuth() {
  const [email, setEmail] = useState("");
  const [user, setUser] = useState(null);

  const sendMagicLink = async () => {
    try {
      await authClient.signIn.magicLink({ email });
      alert("Magic link sent! Check your email.");
    } catch (error) {
      console.error("Error sending magic link:", error);
    }
  };

  const checkSession = async () => {
    try {
      const session = await authClient.getSession();
      setUser(session.data);
      console.log("Session:", session.data);
    } catch (error) {
      console.error("Error getting session:", error);
    }
  };

  return (
    <div className="p-8">
      <h1>Test Authentication</h1>

      <div className="space-y-4">
        <div>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter email"
            className="border p-2"
          />
          <button
            onClick={sendMagicLink}
            className="ml-2 bg-blue-500 p-2 text-white"
          >
            Send Magic Link
          </button>
        </div>

        <button onClick={checkSession} className="bg-green-500 p-2 text-white">
          Check Current Session
        </button>

        {user && (
          <div className="bg-zinc-900 p-4">
            <h3>Current User:</h3>
            <pre>{JSON.stringify(user, null, 2)}</pre>
          </div>
        )}
      </div>
    </div>
  );
}
