"use client";

import React from "react";
import ProtectedPage from "src/components/protectedPage";

export default function OrderPage() {
  return (
    <ProtectedPage>
      <div>Orders</div>
    </ProtectedPage>
  );
}
