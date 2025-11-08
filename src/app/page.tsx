import { CryptoListView } from "@/components/features/crypto/crypto-list-view";

export default function HomePage() {
  return (
    <div className="w-full">
      <section className="flex flex-col items-center text-center mb-4">
        <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight mb-4">
          Cryptocurrency Listings
        </h1>
        <p className="text-lg text-muted-foreground max-w-2xl">
          Explore the latest prices, market caps, and trends of top
          cryptocurrencies from around the world.
        </p>
      </section>
      <CryptoListView />
    </div>
  );
}
