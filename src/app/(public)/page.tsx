import Head from 'next/head';
import Hero from '@/components/Hero';
import Marquee from '@/components/Marquee';
import IntroSection from '@/components/IntroSection';
import SpecialistSection from '@/components/SpecialistSection';
import KeyServices from '@/components/KeyServices';
import ShopHighlight from '@/components/ShopHighlight';
import ServiceSteps from '@/components/ServiceSteps';
import OtherServices from '@/components/OtherServices';
import PromoBanner from '@/components/PromoBanner';
import BrandSlider from '@/components/BrandSlider';
import MapSection from '@/components/MapSection';
import GallerySection from '@/components/GallerySection';

export default function Home() {
  return (
    <div className="bg-white">
      <Hero />
      <Marquee />
      <IntroSection />
      <SpecialistSection />
      <KeyServices />
      <ShopHighlight />
      <ServiceSteps />
      <OtherServices />
      <PromoBanner />
      <BrandSlider />
      <MapSection />
      <GallerySection />
    </div>
  );
}
