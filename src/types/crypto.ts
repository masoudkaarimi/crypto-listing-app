export type Quote = {
  name: string;
  price: number;
  volume24h: number;
  volume7d: number;
  volume30d: number;
  marketCap: number;
  selfReportedMarketCap: number;
  percentChange1h: number;
  percentChange24h: number;
  percentChange7d: number;
  percentChange30d: number;
  percentChange60d: number;
  percentChange90d: number;
  lastUpdated: string;
  fullyDilluttedMarketCap: number;
  marketCapByTotalSupply: number;
  dominance: number;
  turnover: number;
  ytdPriceChangePercentage: number;
  percentChange1y: number;
};

export type CryptoCurrency = {
  id: number;
  name: string;
  symbol: string;
  slug: string;
  cmcRank: number;
  marketPairCount: number;
  circulatingSupply: number;
  selfReportedCirculatingSupply: number;
  totalSupply: number;
  maxSupply: number | null;
  ath: number;
  atl: number;
  high24h: number;
  low24h: number;
  isActive: number;
  lastUpdated: string;
  dateAdded: string;
  quotes: Quote[];
  isAudited: boolean;
};

export type ApiResponseData = {
  cryptoCurrencyList: CryptoCurrency[];
  totalCount: string;
};

export type ApiStatus = {
  timestamp: string;
  error_code: string;
  error_message: string;
  elapsed: string;
  credit_count: number;
};

export type ApiResponse = {
  data: ApiResponseData;
  status: ApiStatus;
};
