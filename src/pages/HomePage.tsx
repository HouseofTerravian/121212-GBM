import Hero from '@/components/home/Hero';
import StatsBar from '@/components/home/StatsBar';
import CategoryGrid from '@/components/home/CategoryGrid';
import FeaturedVendors from '@/components/home/FeaturedVendors';
import Tagline from '@/components/home/Tagline';
import SellerCTA from '@/components/home/SellerCTA';
import Newsletter from '@/components/home/Newsletter';

export default function HomePage() {
  return (
    <>
      <Hero />
      <StatsBar />
      <CategoryGrid />
      <FeaturedVendors />
      <Tagline />
      <SellerCTA />
      <Newsletter />
    </>
  );
}
