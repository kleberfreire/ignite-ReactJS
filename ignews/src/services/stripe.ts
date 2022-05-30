import Stripe from "stripe";

import { version } from "../../package.json";

console.log(`Stripe version: ${version}`);

export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string, {
  apiVersion: "2020-08-27",
  appInfo: {
    name: "Ignews",
    version,
  },
});
