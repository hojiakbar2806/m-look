"use client";

import { useQuery } from "@tanstack/react-query";
import { CheckCircle,  Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import React from "react";
import { ActivateService } from "src/services/auth.service";

type ActivationCompProps = {
  token: string;
};

const ActivationComp: React.FC<ActivationCompProps> = ({ token }) => {
  const router = useRouter();
  const { isLoading, isSuccess } = useQuery({
    queryKey: ["session"],
    queryFn: async () => await ActivateService(token),
  });

  return (
    <div>
      {isLoading ? (
        <div className="flex flex-col items-center gap-4">
          <Loader2 className="animate-spin text-blue-500" size={50} />
          <p className="text-lg font-semibold text-blue-600">
            Activating account...
          </p>
        </div>
      ) : isSuccess ? (
        <div className="flex flex-col items-center gap-4 animate-fade-in">
          <CheckCircle className="text-green-500" size={60} />
          <h1 className="text-2xl font-bold text-green-600">
            Account Activated!
          </h1>
          <p className="text-lg text-gray-700">
            Your account is now active. You may proceed to login.
          </p>
          <button
            onClick={() => router.push("/login")}
            className="px-4 py-2 mt-4 font-semibold text-white bg-blue-500 rounded-lg hover:bg-blue-600 transition-all duration-300"
          >
            Go to Login
          </button>
        </div>
      ) : (
        <p className="text-lg text-red-600 font-semibold">
          Activation failed. Please try again.
        </p>
      )}
    </div>
  );
};

export default ActivationComp;
