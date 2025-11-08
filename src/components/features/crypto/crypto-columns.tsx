"use client";

import { Column, ColumnDef } from "@tanstack/react-table";
import { ChevronDown, ChevronsUpDown, ChevronUp } from "lucide-react";
import Image from "next/image";

import { Button } from "@/components/ui/button";
import {
  formatCurrency,
  formatMarketCap,
  getCryptoLogoUrl,
  getPercentageColor,
} from "@/lib/utils";
import { cn } from "@/lib/utils";
import { CryptoCurrency, Quote } from "@/types/crypto";

interface SortableHeaderProps<TData, TValue> {
  column: Column<TData, TValue>;
  title: string;
  align?: "left" | "right" | "center";
}

function SortableHeader<TData, TValue>({
  column,
  title,
  align = "left",
}: SortableHeaderProps<TData, TValue>) {
  const sorted = column.getIsSorted();

  const icon = sorted ? (
    sorted === "asc" ? (
      <ChevronUp className="size-3" />
    ) : (
      <ChevronDown className="size-3" />
    )
  ) : (
    <ChevronsUpDown className="size-3 opacity-0 transition-opacity group-hover:opacity-100" />
  );

  return (
    <Button
      variant="link"
      onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      className={cn(
        "group w-full pr-0!",
        align === "center" && "justify-center",
        align === "right" && "justify-end",
        align === "left" && "justify-start"
      )}
    >
      <span className="text-xs font-bold">{title}</span>
      {icon}
    </Button>
  );
}

const getUsdQuote = (quotes: Quote[]) => quotes.find((q) => q.name === "USD");

export const columns: ColumnDef<CryptoCurrency>[] = [
  {
    accessorKey: "cmcRank",
    header: ({ column }) => (
      <SortableHeader column={column} title="#" align="center" />
    ),
    cell: ({ row }) => (
      <div className="text-xs pl-2">{row.original.cmcRank}</div>
    ),
  },
  {
    accessorKey: "name",
    header: ({ column }) => <SortableHeader column={column} title="Name" />,
    cell: ({ row }) => {
      const crypto = row.original;
      const logoUrl = getCryptoLogoUrl(crypto.id);

      return (
        <div className="flex items-center gap-3">
          <Image
            src={logoUrl}
            alt={`${crypto.name} logo`}
            width={26}
            height={26}
            className="rounded-full"
            referrerPolicy="no-referrer"
          />
          <div className="flex flex-col">
            <span className="text-xs font-medium max-w-[200px] overflow-hidden whitespace-normal break-words leading-relaxed pr-6">
              {crypto.name}
            </span>
            <span className="text-xs text-muted-foreground">
              {crypto.symbol}
            </span>
          </div>
        </div>
      );
    },
  },
  {
    accessorKey: "quotes_price",
    header: ({ column }) => (
      <SortableHeader column={column} title="Price" align="right" />
    ),
    cell: ({ row }) => {
      const usdQuote = getUsdQuote(row.original.quotes);
      return (
        <div className="text-xs font-medium text-right">
          {usdQuote ? formatCurrency(usdQuote.price) : "N/A"}
        </div>
      );
    },
    sortingFn: (rowA, rowB) => {
      const priceA = getUsdQuote(rowA.original.quotes)?.price ?? 0;
      const priceB = getUsdQuote(rowB.original.quotes)?.price ?? 0;
      return priceA - priceB;
    },
  },
  {
    accessorKey: "quotes_1h",
    header: ({ column }) => (
      <SortableHeader column={column} title="1h %" align="right" />
    ),
    cell: ({ row }) => {
      const usdQuote = getUsdQuote(row.original.quotes);
      return (
        <div
          className={cn(
            "text-xs text-right",
            getPercentageColor(usdQuote?.percentChange1h)
          )}
        >
          {usdQuote ? `${usdQuote.percentChange1h.toFixed(2)}%` : "N/A"}
        </div>
      );
    },
    sortingFn: (rowA, rowB) => {
      const valA = getUsdQuote(rowA.original.quotes)?.percentChange1h ?? 0;
      const valB = getUsdQuote(rowB.original.quotes)?.percentChange1h ?? 0;
      return valA - valB;
    },
  },
  {
    accessorKey: "quotes_24h",
    header: ({ column }) => (
      <SortableHeader column={column} title="24h %" align="right" />
    ),
    cell: ({ row }) => {
      const usdQuote = getUsdQuote(row.original.quotes);
      return (
        <div
          className={cn(
            "text-xs text-right",
            getPercentageColor(usdQuote?.percentChange24h)
          )}
        >
          {usdQuote ? `${usdQuote.percentChange24h.toFixed(2)}%` : "N/A"}
        </div>
      );
    },
    sortingFn: (rowA, rowB) => {
      const valA = getUsdQuote(rowA.original.quotes)?.percentChange24h ?? 0;
      const valB = getUsdQuote(rowB.original.quotes)?.percentChange24h ?? 0;
      return valA - valB;
    },
  },
  {
    accessorKey: "quotes_7d",
    header: ({ column }) => (
      <SortableHeader column={column} title="7d %" align="right" />
    ),
    cell: ({ row }) => {
      const usdQuote = getUsdQuote(row.original.quotes);
      return (
        <div
          className={cn(
            "text-xs text-right",
            getPercentageColor(usdQuote?.percentChange7d)
          )}
        >
          {usdQuote ? `${usdQuote.percentChange7d.toFixed(2)}%` : "N/A"}
        </div>
      );
    },
    sortingFn: (rowA, rowB) => {
      const valA = getUsdQuote(rowA.original.quotes)?.percentChange7d ?? 0;
      const valB = getUsdQuote(rowB.original.quotes)?.percentChange7d ?? 0;
      return valA - valB;
    },
  },
  {
    accessorKey: "volume_24h",
    header: ({ column }) => (
      <SortableHeader column={column} title="Volume(24h)" align="right" />
    ),
    cell: ({ row }) => {
      const usdQuote = getUsdQuote(row.original.quotes);
      return (
        <div className="text-xs text-right">
          {usdQuote ? formatCurrency(usdQuote.volume24h) : "N/A"}
        </div>
      );
    },
    sortingFn: (rowA, rowB) => {
      const valA = getUsdQuote(rowA.original.quotes)?.volume24h ?? 0;
      const valB = getUsdQuote(rowB.original.quotes)?.volume24h ?? 0;
      return valA - valB;
    },
  },
  {
    accessorKey: "quotes_marketCap",
    header: ({ column }) => (
      <SortableHeader column={column} title="Market Cap" align="right" />
    ),
    cell: ({ row }) => {
      const usdQuote = getUsdQuote(row.original.quotes);
      return (
        <div className="text-xs text-right">
          {usdQuote ? formatMarketCap(usdQuote.marketCap) : "N/A"}
        </div>
      );
    },
    sortingFn: (rowA, rowB) => {
      const valA = getUsdQuote(rowA.original.quotes)?.marketCap ?? 0;
      const valB = getUsdQuote(rowB.original.quotes)?.marketCap ?? 0;
      return valA - valB;
    },
  },
];
