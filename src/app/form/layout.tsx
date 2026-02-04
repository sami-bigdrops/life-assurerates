import type { Metadata } from "next";
import Navbar from "@/sections/Navbar";
import Footer from "@/sections/Footer";

export const metadata: Metadata = {
  title: "Life Insurance Form | AssureRates",
  description: "Life insurance form for using AssureRates's insurance comparison services.",
};

export default function FpsFormLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <div className="flex-1 flex flex-col min-h-0">
          {children}
      </div>
      <Footer />
    </div>
  );
}
