import type { Metadata } from "next";
import Providers from "@/components/Providers";
import "./globals.css";

export const metadata: Metadata = {
  title: "PointsIncentive",
  description: "Zero-cost onchain points incentive app with referral growth on Base.",
  other: {
    "base:app_id": "bc_stoezdid",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <meta name="base:app_id" content="bc_stoezdid" />
      </head>
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
