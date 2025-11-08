import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function getCryptoLogoUrl(id: number): string {
  return `https://s2.coinmarketcap.com/static/img/coins/64x64/${id}.png`;
}

export function formatCurrency(value: number): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(value);
}

export function formatMarketCap(value: number): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(value);
}

export function getPercentageColor(value: number | null | undefined): string {
  if (!value || !Number.isFinite(value)) return "text-foreground";
  return value > 0
    ? "text-green-600"
    : value < 0
      ? "text-red-600"
      : "text-foreground";
}
