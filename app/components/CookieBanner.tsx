"use client";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import Image from "next/image";
import { useEffect, useState } from "react";

export default function CookieBanner() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem("cookie_consent");
    if (!consent) setVisible(true);
  }, []);

  const accept = () => {
    localStorage.setItem("cookie_consent", "accepted");
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <Card className="fixed bottom-0 w-full p-6 flex flex-row justify-around items-center gap-4">
      <Image src="/cookie.png" alt="Cookie" width={32} height={32} />
      <p>
        Tento web používá pouze nezbytné cookies pro správné fungování aplikace.
      </p>
      <Button onClick={accept}>Rozumím</Button>
    </Card>
  );
}
