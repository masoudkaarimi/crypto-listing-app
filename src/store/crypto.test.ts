import { act, renderHook } from "@testing-library/react";

import * as api from "@/services/api";
import * as db from "@/services/db";
import { useCryptoStore } from "@/store/crypto";
import { CryptoCurrency } from "@/types/crypto";

jest.mock("@/services/db");
jest.mock("@/services/api");

const mockedGetCryptosFromDB = db.getCryptosFromDB as jest.Mock;
const mockedFetchCryptoList = api.fetchCryptoList as jest.Mock;
const mockedUpsertCryptos = db.upsertCryptos as jest.Mock;

const MOCK_CRYPTO_LIST: CryptoCurrency[] = [
  {
    id: 1,
    name: "Bitcoin",
    cmcRank: 1,
    quotes: [],
  } as unknown as CryptoCurrency,
  {
    id: 2,
    name: "Ethereum",
    cmcRank: 2,
    quotes: [],
  } as unknown as CryptoCurrency,
];

describe("Crypto Store (src/store/crypto.ts)", () => {
  beforeEach(() => {
    jest.resetAllMocks();
    act(() => {
      useCryptoStore.setState({
        cryptos: [],
        totalCount: 0,
        isLoading: true,
        error: null,
      });
    });
  });

  it("should initialize correctly, fetch from DB, then fetch from API and refresh", async () => {
    mockedGetCryptosFromDB.mockResolvedValueOnce(MOCK_CRYPTO_LIST.slice(0, 1));
    mockedGetCryptosFromDB.mockResolvedValueOnce(MOCK_CRYPTO_LIST);

    mockedFetchCryptoList.mockResolvedValue({
      data: { cryptoCurrencyList: MOCK_CRYPTO_LIST },
    });
    mockedUpsertCryptos.mockResolvedValue(undefined);

    const { result } = renderHook(() => useCryptoStore());

    expect(result.current.isLoading).toBe(true);

    await act(async () => {
      await result.current.actions.initialize();
    });

    expect(mockedGetCryptosFromDB).toHaveBeenCalledTimes(2);
    expect(mockedFetchCryptoList).toHaveBeenCalledTimes(1);
    expect(mockedUpsertCryptos).toHaveBeenCalledWith(MOCK_CRYPTO_LIST);

    expect(result.current.cryptos.length).toBe(2);
    expect(result.current.cryptos[1].name).toBe("Ethereum");
    expect(result.current.isLoading).toBe(false);
    expect(result.current.error).toBe(null);
  });

  it("should handle initialization error if DB fails", async () => {
    const MOCK_ERROR = "Failed to read DB";
    mockedGetCryptosFromDB.mockRejectedValue(new Error(MOCK_ERROR));

    const { result } = renderHook(() => useCryptoStore());

    await act(async () => {
      await result.current.actions.initialize();
    });

    expect(result.current.isLoading).toBe(false);
    expect(result.current.error).toBe(MOCK_ERROR);
  });
});
