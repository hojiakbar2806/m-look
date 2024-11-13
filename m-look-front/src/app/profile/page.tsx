"use client";

import { useQuery } from "@tanstack/react-query";
import ProtectedPage from "src/components/protectedPage";
import { MyProfileService } from "src/services/user.service";

export default function Page() {
  const { data } = useQuery({
    queryKey: ["profile"],
    queryFn: MyProfileService,
  });

  console.log(data);
  return (
    <ProtectedPage>
      <h1 className="text-5xl p-4 text-center bg-primary">
        {data?.data.email}
      </h1>
    </ProtectedPage>
  );
}
