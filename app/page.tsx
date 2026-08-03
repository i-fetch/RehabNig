import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Services from "@/components/Services";
import WhyChooseUs from "@/components/WhyChooseUs";
import RecoveryJourney from "@/components/RecoveryJourney";
import Specialists from "@/components/Specialists";
import Testimonials from "@/components/Testimonials";
import FAQ from "@/components/FAQ";
import CTA from "@/components/CTA";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main className="min-h-screen overflow-x-hidden bg-surface text-primary">
      <Navbar />
      <Hero />
      <Services />
      <WhyChooseUs />
      <RecoveryJourney />
      <Specialists />
      <Testimonials />
      <FAQ />
      <CTA />
      <Footer />
    </main>
  );
}