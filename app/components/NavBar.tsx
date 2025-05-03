"use client";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import {
  SignedIn,
  SignedOut,
  SignInButton,
  UserButton
} from "@clerk/nextjs";
import { BookOpen, Home, List, Play } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ThemeToggle } from "./ThemeToggle";

export function NavBar() {
  const pathname = usePathname();

  const routes = [
    {
      href: "/",
      label: "Menu",
      icon: Home,
      active: pathname === "/",
    },
    {
      href: "/albums",
      label: "Alba",
      icon: BookOpen,
      active: pathname.includes("/albums"),
    },
    {
      href: "/flashcards",
      label: "Kartičky",
      icon: Play,
      active: pathname.includes("/flashcards"),
    },
    {
      href: "/learning",
      label: "Seznam",
      icon: List,
      active: pathname.includes("/learning"),
    },
  ];

  return (
    <div className="fixed top-0 flex items-center justify-between w-full py-2 gap-4 px-4 bg-[var(--background)] border-b-2 z-10 opacity-90 hover:opacity-100">
      <nav className="flex gap-4 items-center justify-around w-full">
        {routes.map((route) => (
          <Link
            key={route.href}
            href={route.href}
            className={cn(
              "flex items-center text-sm font-medium transition-colors hover:text-primary",
              route.active ? "text-primary" : "text-muted-foreground"
            )}
          >
            <route.icon className="h-4 w-4 mr-2" />
            <span className="hidden sm:block">{route.label}</span>
          </Link>
        ))}
      </nav>
      <div className="flex gap-2 items-center">
        <ThemeToggle />
        <div className="min-w-8 min-h-8 flex justify-end items-center‹">
          <SignedOut>
            <SignInButton>
              <Button variant="link">Přihlásit</Button>
            </SignInButton>
          </SignedOut>
          <SignedIn>
            <UserButton />
          </SignedIn>
        </div>
      </div>
    </div>
  );
}
