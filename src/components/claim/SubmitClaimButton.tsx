"use client";

import { useSession } from "@/context/SessionContext";
import { useRouter } from "next/navigation";
import Button from "@/components/ui/Button";
import { useState } from "react";

export default function SubmitClaimButton({ href, reason }: { href: string; reason: string }) {
  const { dispatch } = useSession();
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = () => {
    setIsSubmitting(true);
    // Simulate network delay
    setTimeout(() => {
      dispatch({ type: "SUBMIT_CLAIM", payload: { formType: "Form 31 (Advance)", amount: 50000 } });
      router.push(href);
    }, 1000);
  };

  return (
    <Button size="lg" className="w-full" onClick={handleSubmit} disabled={isSubmitting}>
      {isSubmitting ? "Submitting..." : "Submit claim"}
    </Button>
  );
}
