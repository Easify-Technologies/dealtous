import React from 'react';

import Preloader from "@/helper/Preloader";
import FooterOne from "@/components/FooterOne";
import HeaderOne from "@/components/HeaderOne";

export const metadata = {
  title: "Dealtous - Buy & Sell Telegram Channels And Social Accounts",
  description: "Buy and sell Telegram channels and other social media accounts securely on Dealtous. Discover verified listings and reach your audience faster.",
  icons: {
    icon: "assets/images/icons/cropped-DEALTOUS-1.png"
  }
};

const page = () => {
  return (
    <>
        <HeaderOne />

        

        <FooterOne />
    </>
  )
}

export default page