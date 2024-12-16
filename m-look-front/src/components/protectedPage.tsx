"use client";

import { usePathname, useRouter } from "next/navigation";
import React, { ReactNode, useEffect, useState } from "react";
import { useAuthStore } from "src/store/authStore";
import Loading from "src/components/common/loading";

interface ProtectedPageProps {
  children: ReactNode;
}

const ProtectedPage: React.FC<ProtectedPageProps> = ({ children }) => {
  const { getToken, token } = useAuthStore();
  const router = useRouter();
  const pathname = usePathname();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const checkToken = async () => {
      const userToken = await getToken();
      if (!userToken) {
        // router.push(`/login?next=${pathname}`);
      } else {
        setIsLoading(false);
      }
    };

    checkToken();
  }, [token, router, getToken]);

  if (isLoading) return <Loading />;

  return (
    <div className="transition-all duration-300 ease-in-out">{children}</div>
  );
};

export default ProtectedPage;
