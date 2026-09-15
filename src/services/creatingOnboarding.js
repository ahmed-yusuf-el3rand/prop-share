import Stripe from "stripe";

const stripe = new Stripe("sk_test_51S8Mw12QGPucpFARilbol3AB9UxdF6rQ30C4cp2uX2Jzsn1jPzjgs5t5vvVqGn6s1GcJTR8xgmqrdS1mbCVu59fY007AaVuHId");

const account = await stripe.accounts.create({
  type: "express",
});

const accountLink = await stripe.accountLinks.create({
  account: account.id,
  refresh_url: "http://localhost:5173/settings",
  return_url: "http://localhost:5173/settings",
  type: "account_onboarding",
});

console.log("\nStripe onboarding URL:\n");
console.log(accountLink.url);