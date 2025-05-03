"use client";
import { Button } from "@/components/ui/button";
import { ChevronLeft } from "lucide-react";
import { useRouter } from "next/navigation";

const ReturnButton = () => {
  const router = useRouter();

  return (
    <Button variant="ghost" size="icon" onClick={() => router.back()}>
      <ChevronLeft className="h-5 w-5" />
    </Button>
  );
};

export default ReturnButton;
