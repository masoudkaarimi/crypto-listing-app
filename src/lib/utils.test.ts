import {
  formatCurrency,
  formatMarketCap,
  getPercentageColor,
} from "@/lib/utils";

describe("Utility Functions (src/lib/utils.ts)", () => {
  describe("formatCurrency", () => {
    it("should format numbers into USD currency", () => {
      expect(formatCurrency(1234.567)).toBe("$1,234.57");
      expect(formatCurrency(100)).toBe("$100.00");
      expect(formatCurrency(0.99)).toBe("$0.99");
    });
  });

  describe("formatMarketCap", () => {
    it("should format large numbers as currency with no decimals", () => {
      expect(formatMarketCap(1234567890.5)).toBe("$1,234,567,891");
      expect(formatMarketCap(500000)).toBe("$500,000");
    });
  });

  describe("getPercentageColor", () => {
    it("should return text-green-600 for positive numbers", () => {
      expect(getPercentageColor(5.5)).toBe("text-green-600");
    });

    it("should return text-red-600 for negative numbers", () => {
      expect(getPercentageColor(-2.1)).toBe("text-red-600");
    });

    it("should return text-foreground for zero", () => {
      expect(getPercentageColor(0)).toBe("text-foreground");
    });

    it("should return text-foreground for null or undefined values", () => {
      expect(getPercentageColor(null)).toBe("text-foreground");
      expect(getPercentageColor(undefined)).toBe("text-foreground");
    });
  });
});
