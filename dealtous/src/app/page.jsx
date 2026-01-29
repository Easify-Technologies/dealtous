import ArrivalOne from "@/components/ArrivalOne";
import BannerOne from "@/components/BannerOne";
import BecomeSellerOne from "@/components/BecomeSellerOne";
import BlogOne from "@/components/BlogOne";
import BrandSectionOne from "@/components/BrandSectionOne";
import FeaturedAuthor from "@/components/FeaturedAuthor";
import FeaturedOne from "@/components/FeaturedOne";
import FooterOne from "@/components/FooterOne";
import HeaderOne from "@/components/HeaderOne";
import PerformanceAuthor from "@/components/PerformanceAuthor";
import PopularOne from "@/components/PopularOne";
import SellingOne from "@/components/SellingOne";
import Preloader from "@/helper/Preloader";

export const metadata = {
  title: "Dealtous - Buy & Sell Telegram Channels And Social Accounts",
  description: "Buy and sell Telegram channels and other social media accounts securely on Dealtous. Discover verified listings and reach your audience faster.",
  icons: {
    icon: "assets/images/icons/cropped-DEALTOUS-1.png"
  }
};

const page = () => {
  return (
    <section className="change-gradient">
      {/* Preloader */}
      <Preloader />

      {/* HeaderOne */}
      <HeaderOne />

      {/* BannerOne */}
      <BannerOne />

      {/* ArrivalOne */}
      <ArrivalOne />

      {/* FeaturedOne */}
      <FeaturedOne />

      {/* SellingOne */}
      <SellingOne />

      {/* FeaturedAuthor */}
      <FeaturedAuthor />

      {/* PerformanceAuthor */}
      <PerformanceAuthor />

      {/* BlogOne */}
      <BlogOne />

      {/* FooterOne */}
      <FooterOne />
    </section>
  );
};

export default page;
