"use client";

import { LayoutGrid, LayoutList } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";

type ProductBarProps = {
  productLength: number;
};

const ProductBar = ({ productLength }: ProductBarProps) => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const view = searchParams.get("view") === "list" ? "list" : "grid";

  return (
    <div className="w-full sticky top-20 z-20 flex items-center justify-between p-4 bg-slate-300 rounded-md">
      <p>{productLength} Items</p>

      <div className="flex items-center gap-4">
        <button
          data-active={view === "grid"}
          className="data-[active=true]:bg-primary/80 data-[active=true]:text-white p-2 hover:bg-primary/80 hover:text-white rounded transition-all"
          onClick={() => router.push(`?view=grid`)}
        >
          <LayoutGrid />
        </button>
        <button
          data-active={view === "list"}
          className="data-[active=true]:bg-primary/80 data-[active=true]:text-white p-2 hover:bg-primary/80 hover:text-white rounded transition-all"
          onClick={() => router.push(`?view=list`)}
        >
          <LayoutList />
        </button>
      </div>
    </div>
  );
};

export default ProductBar;
