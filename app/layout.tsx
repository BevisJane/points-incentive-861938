import type { Metadata } from "next";
import Providers from "@/components/Providers";
import "./globals.css";

export const metadata: Metadata = {
  title: "PointsIncentive",
  description: "Zero-cost onchain points incentive app with referral growth on Base.",
  other: {
    "base:app_id": "69bcadaa945e0bb74a271fa8",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <meta name="base:app_id" content="69bcadaa945e0bb74a271fa8" />
      </head>
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
