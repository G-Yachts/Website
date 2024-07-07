import Hero from "@/components/sales/hero";
import Bar from "@/components/nav/bar";
import dynamic from "next/dynamic";
import { fetchFeaturedSales, fetchSales } from "@/actions/yachts";

const View = dynamic(() => import("@/components/view"));
const Listing = dynamic(() => import("@/components/sales/listing"));
const Newsletter = dynamic(() => import("@/components/newsletter"));
const Footer = dynamic(() => import("@/components/footer"));

const Sales = async () => {
  return (
    <main className="w-full flex flex-col justify-start items-center">
      <Bar dynamicColor={100} />
      <View />
      <Hero data={await fetchFeaturedSales()} />
      <Listing data={await fetchSales()} />
      <Newsletter />
      <Footer />
    </main>
  );
};

export default Sales;
