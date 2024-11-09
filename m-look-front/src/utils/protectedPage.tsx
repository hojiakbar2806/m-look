"use client";

import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import React, { ReactNode } from "react";
import { Session } from "src/services/session.service";

interface ProtectedPageProps {
  children: ReactNode;
}

export default function ProtectedPage({ children }: ProtectedPageProps) {
  const router = useRouter();

  const { data: session, isError } = useQuery({
    queryKey: ["session"],
    queryFn: Session,
  });
  
  if (isError) {
    router.push("/login");
  }
  return <React.Fragment>{session && children}</React.Fragment>;
}
