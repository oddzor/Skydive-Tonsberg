"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function AdministrasjonPage() {
  const router = useRouter();

  useEffect(() => {
    // Redirect to new CMS dashboard location
    router.replace("/cmsdashboard");
  }, [router]);

  return (
    <div className="min-h-screen flex items-center justify-center">
      <p className="text-xl">Redirecting to CMS Dashboard...</p>
    </div>
  );
}
