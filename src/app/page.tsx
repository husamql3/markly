"use client";

import { authClient } from "@/auth/client";
import { Button } from "@/ui/button";
import React, { useEffect, useState } from "react";

const Page = () => {
  const [sessionData, setSessionData] = useState<any | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [bookmarks, setBookmarks] = useState<any | null>(null);
  const [loadingBookmarks, setLoadingBookmarks] = useState(false);
  const [debugInfo, setDebugInfo] = useState<any | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchSession = async () => {
      try {
        const { data } = await authClient.getSession();
        setSessionData(data);
      } catch (error) {
        console.error("Failed to fetch session:", error);
        setSessionData(null);
      } finally {
        setIsLoading(false);
      }
    };
    fetchSession();
  }, []);

  const fetchDebugInfo = async () => {
    try {
      const response = await fetch("/api/twitter/debug");
      if (!response.ok) {
        throw new Error("Failed to fetch debug info");
      }
      const data = await response.json();
      setDebugInfo(data);
    } catch (error) {
      console.error("Error fetching debug info:", error);
    }
  };

  const fetchBookmarks = async () => {
    setLoadingBookmarks(true);
    setError(null);
    try {
      const response = await fetch("/api/twitter/bookmarks");
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to fetch bookmarks");
      }
      const data = await response.json();
      setBookmarks(data);
    } catch (error) {
      console.error("Error fetching bookmarks:", error);
      setError(error instanceof Error ? error.message : "Unknown error");
    } finally {
      setLoadingBookmarks(false);
    }
  };

  useEffect(() => {
    if (sessionData) {
      fetchDebugInfo();
    }
  }, [sessionData]);

  if (isLoading) {
    return (
      <div className="flex h-svh flex-col items-center justify-center">
        <p>Loading session...</p>
      </div>
    );
  }

  return (
    <div className="flex h-svh flex-col items-center justify-center p-8">
      {sessionData ? (
        <div className="w-full max-w-4xl">
          <div className="mb-8">
            <h1 className="text-2xl font-bold mb-4">Welcome!</h1>
            <p className="mb-4">Email: {sessionData.user.email}</p>
            
            {debugInfo && (
              <div className="mb-4 p-4 bg-blue-50 rounded-lg">
                <h3 className="font-semibold mb-2">Debug Info:</h3>
                <p>Has Twitter Account: {debugInfo.hasAccount ? "✅" : "❌"}</p>
                <p>Has Access Token: {debugInfo.hasAccessToken ? "✅" : "❌"}</p>
                <p>Has Refresh Token: {debugInfo.hasRefreshToken ? "✅" : "❌"}</p>
                <p>Scope: {debugInfo.scope || "None"}</p>
              </div>
            )}

            <div className="flex gap-4">
              <Button onClick={() => authClient.signOut()}>Sign out</Button>
              <Button onClick={fetchBookmarks} disabled={loadingBookmarks}>
                {loadingBookmarks ? "Loading..." : "Fetch Bookmarks"}
              </Button>
              <Button onClick={fetchDebugInfo}>Refresh Debug Info</Button>
            </div>

            {error && (
              <div className="mt-4 p-4 bg-red-50 border border-red-200 rounded-lg">
                <p className="text-red-700">Error: {error}</p>
              </div>
            )}
          </div>

          {bookmarks && (
            <div className="mt-8">
              <h2 className="text-xl font-semibold mb-4">Your Twitter Bookmarks</h2>
              <div className="bg-gray-100 p-4 rounded-lg overflow-auto max-h-96">
                <pre className="text-sm">
                  {JSON.stringify(bookmarks, null, 2)}
                </pre>
              </div>
            </div>
          )}
        </div>
      ) : (
        <Button
          onClick={() => {
            authClient.signIn.social({
              provider: "twitter",
              callbackURL: "/",
            });
          }}
        >
          Sign in with Twitter
        </Button>
      )}
    </div>
  );
};

export default Page;
