import { create } from "zustand";

import { fetchCryptoList } from "@/services/api";
import { getCryptosFromDB, upsertCryptos } from "@/services/db";
import { CryptoCurrency } from "@/types/crypto";

const CACHE_KEY = process.env.NEXT_PUBLIC_CACHE_KEY || "lastFetchTime";
const CACHE_STALE_TIME_MS =
  Number(process.env.NEXT_PUBLIC_CACHE_STALE_TIME_MS) || 5 * 60 * 1000;
const CRYPTO_FETCH_START =
  Number(process.env.NEXT_PUBLIC_CRYPTO_FETCH_START) || 1;
const CRYPTO_FETCH_LIMIT =
  Number(process.env.NEXT_PUBLIC_CRYPTO_FETCH_LIMIT) || 100;

interface CryptoState {
  cryptos: CryptoCurrency[];
  totalCount: number;
  isLoading: boolean;
  error: string | null;
  actions: CryptoActions;
}

interface CryptoActions {
  initialize: () => Promise<void>;
  fetchAndStore: (start?: number, limit?: number) => Promise<void>;
}

let intervalId: NodeJS.Timeout | null = null;

export const useCryptoStore = create<CryptoState>((set, get) => ({
  cryptos: [],
  totalCount: 0,
  isLoading: true,
  error: null,

  actions: {
    initialize: async () => {
      try {
        set({ isLoading: true, error: null });

        const allData = await getCryptosFromDB();
        set({ cryptos: allData, totalCount: allData.length });

        const lastFetchTime = localStorage.getItem(CACHE_KEY);
        const now = Date.now();
        let isCacheStale = true;

        if (lastFetchTime) {
          const timeSinceLastFetch = now - parseInt(lastFetchTime, 10);

          if (timeSinceLastFetch < CACHE_STALE_TIME_MS && allData.length > 0) {
            isCacheStale = false;
          }
        }

        if (isCacheStale) {
          await get().actions.fetchAndStore();
          const refreshedData = await getCryptosFromDB();
          set({
            cryptos: refreshedData,
            totalCount: refreshedData.length,
            isLoading: false,
          });
        } else {
          set({ isLoading: false });
        }

        if (!intervalId) {
          intervalId = setInterval(async () => {
            await get().actions.fetchAndStore();

            const latestData = await getCryptosFromDB();
            set({ cryptos: latestData, totalCount: latestData.length });
          }, CACHE_STALE_TIME_MS);
        }
      } catch (err) {
        set({ isLoading: false, error: (err as Error).message });
      }
    },
    fetchAndStore: async (
      start = CRYPTO_FETCH_START,
      limit = CRYPTO_FETCH_LIMIT
    ) => {
      try {
        const response = await fetchCryptoList(start, limit);
        const data = response.data.cryptoCurrencyList;
        if (data && data.length > 0) {
          await upsertCryptos(data);
          localStorage.setItem(CACHE_KEY, Date.now().toString());
        }
      } catch (err) {
        console.error(
          "Failed to fetch and store data:",
          (err as Error).message
        );
      }
    },
  },
}));

export const useCryptoActions = () => useCryptoStore((state) => state.actions);
