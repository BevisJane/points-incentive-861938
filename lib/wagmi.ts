import { createConfig, http, createStorage, cookieStorage } from "wagmi";
import { base } from "wagmi/chains";
import { injected } from "wagmi/connectors";

// ERC-8021 Builder Code suffix for attribution
// Builder Code: bc_stoezdid
const DATA_SUFFIX = "0x62635f73746f657a6469640b0080218021802180218021802180218021";

export const config = createConfig({
  chains: [base],
  connectors: [injected()],
  storage: createStorage({ storage: cookieStorage }),
  ssr: true,
  transports: {
    [base.id]: http(),
  },
  dataSuffix: DATA_SUFFIX as `0x${string}`,
});

declare module "wagmi" {
  interface Register {
    config: typeof config;
  }
}
