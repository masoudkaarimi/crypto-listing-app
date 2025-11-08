import axios from "axios";
import { type NextRequest, NextResponse } from "next/server";

const API_URL =
  process.env.COINMARKETCAP_API_URL ||
  "https://api.coinmarketcap.com/data-api/v3/cryptocurrency/listing";
const CRYPTO_FETCH_START =
  Number(process.env.NEXT_PUBLIC_CRYPTO_FETCH_START) || 1;
const CRYPTO_FETCH_LIMIT =
  Number(process.env.NEXT_PUBLIC_CRYPTO_FETCH_LIMIT) || 100;
const DEFAULT_PARAMS = {
  sortBy: "rank",
  sortType: "desc",
  convert: "USD,BTC,ETH",
  cryptoType: "all",
  tagType: "all",
  audited: false,
  aux: "ath,atl,high24h,low24h,num_market_pairs,cmc_rank,date_added,max_supply,circulating_supply,total_supply,volume_7d,volume_30d,self_reported_circulating_supply,self_reported_market_cap",
};

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const start = Number(searchParams.get("start") || CRYPTO_FETCH_START);
  const limit = Number(searchParams.get("limit") || CRYPTO_FETCH_LIMIT);

  try {
    const response = await axios.get(API_URL, {
      params: {
        ...DEFAULT_PARAMS,
        start,
        limit,
      },
    });

    return NextResponse.json(response.data);
  } catch (error) {
    let errorMessage = "An unexpected error occurred";
    if (axios.isAxiosError(error)) {
      errorMessage =
        error.response?.data?.status?.errorMessage || "API request failed";
    }
    return NextResponse.json({ error: errorMessage }, { status: 500 });
  }
}
