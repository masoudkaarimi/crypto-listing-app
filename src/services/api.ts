import axios from "axios";

import { ApiResponse } from "@/types/crypto";

const API_URL = "/api/crypto";
const CRYPTO_FETCH_START =
  Number(process.env.NEXT_PUBLIC_CRYPTO_FETCH_START) || 1;
const CRYPTO_FETCH_LIMIT =
  Number(process.env.NEXT_PUBLIC_CRYPTO_FETCH_LIMIT) || 100;

const apiClient = axios.create({
  baseURL: API_URL,
});

export async function fetchCryptoList(
  start = CRYPTO_FETCH_START,
  limit = CRYPTO_FETCH_LIMIT
): Promise<ApiResponse> {
  try {
    const response = await apiClient.get<ApiResponse>("", {
      params: {
        start,
        limit,
      },
    });

    if (
      response.data &&
      response.data.data &&
      response.data.data.cryptoCurrencyList
    ) {
      return response.data;
    } else {
      throw new Error("Invalid API response structure");
    }
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error("API error fetching crypto data:", error.message);
      throw new Error(
        error.response?.data?.error || "Local API request failed"
      );
    } else {
      console.error("Unexpected error:", error);
      throw new Error("An unexpected error occurred");
    }
  }
}
