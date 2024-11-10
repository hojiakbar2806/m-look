"use client";

import { useRouter } from "next/navigation";
import React, { ReactNode, useEffect, useState } from "react";
import Loading from "src/components/common/loading";
import { useAuthStore } from "src/store/authStore";

interface ProtectedPageProps {
  children: ReactNode;
}

const ProtectedPage: React.FC<ProtectedPageProps> = ({ children }) => {
  const { getToken, token } = useAuthStore();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const checkToken = async () => {
      const userToken = await getToken();
      if (!userToken) {
        router.push("/login");
      } else {
        setIsLoading(false);
      }
    };

    checkToken();
  }, [token, router, getToken]);

  if (isLoading) {
    return <Loading />;
  }

  return (
    <div className="transition-all duration-300 ease-in-out">{children}</div>
  );
};

export default ProtectedPage;
