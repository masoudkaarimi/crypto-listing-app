"use client";

import { AlertTriangle } from "lucide-react";
import { useEffect } from "react";

import { DataTable } from "@/components/common/data-table";
import { columns } from "@/components/features/crypto/crypto-columns";
import { CryptoTableSkeleton } from "@/components/features/crypto/crypto-table-skeleton";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { useCryptoActions, useCryptoStore } from "@/store/crypto";

export function CryptoListView() {
  const { initialize } = useCryptoActions();
  const { cryptos, isLoading, error } = useCryptoStore();

  useEffect(() => {
    void initialize();
  }, [initialize]);

  if (isLoading && cryptos.length === 0) {
    return <CryptoTableSkeleton />;
  }

  if (error) {
    return (
      <Alert variant="destructive">
        <AlertTriangle className="size-4" />
        <AlertTitle>Error</AlertTitle>
        <AlertDescription>{error}</AlertDescription>
      </Alert>
    );
  }

  return (
    <div className="w-full">
      <DataTable columns={columns} data={cryptos} />
    </div>
  );
}
