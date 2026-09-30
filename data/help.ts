import { site } from "@/lib/site";

export type HelpPage = { slug: string; title: string; intro: string; sections: { heading: string; text: string }[] };

// Policy copy. Shipping, returns and exchange reflect the store's published
// terms; privacy and terms are starting drafts that need legal review.
export const helpPages: HelpPage[] = [
  {
    slug: "shipping",
    title: "Shipping",
    intro: "We ship across India with trusted courier partners.",
    sections: [
      { heading: "Delivery", text: `Orders are dispatched within 24–48 hours and usually arrive in 3–7 working days. Shipping is free on orders above ₹${site.freeShippingThreshold}.` },
      { heading: "Payment", text: "Cash on delivery is available, along with UPI, cards and net banking. Prepaid and UPI orders receive an extra 5% off." },
      { heading: "Tracking", text: "A tracking link is sent by SMS and email as soon as your parcel leaves our studio. You can also follow it from the Track Order page." },
    ],
  },
  {
    slug: "returns",
    title: "Returns",
    intro: "If it is not right, send it back within 7 days.",
    sections: [
      { heading: "Eligibility", text: "Pieces can be returned within 7 days of delivery, provided they are unworn, unwashed and have their original tags attached." },
      { heading: "How to return", text: `Message us on WhatsApp at ${site.contact.phone} or email ${site.contact.email} with your order number. We will arrange a pickup.` },
      { heading: "Refunds", text: "Once the piece has passed a quality check, the refund is issued to the original payment method or as store credit for COD orders." },
    ],
  },
  {
    slug: "exchange",
    title: "Exchange",
    intro: "Wrong size? Exchanges are simple and open for 7 days.",
    sections: [
      { heading: "Size exchange", text: "Request an exchange within 7 days of delivery. We collect the original piece and dispatch the new size as soon as it is picked up." },
      { heading: "Condition", text: "The piece must be unworn and unwashed, with tags intact and the spare button included." },
      { heading: "Need help choosing?", text: "Send us your usual size and height on WhatsApp and we will recommend the right fit before you order." },
    ],
  },
  {
    slug: "privacy",
    title: "Privacy",
    intro: "We collect only what we need to deliver your order and improve your experience.",
    sections: [
      { heading: "What we collect", text: "Your name, contact details and delivery address when you place an order, and basic analytics about how the site is used." },
      { heading: "How it is used", text: "To process and deliver orders, provide support and, if you opt in, send news about new collections. We do not sell personal data." },
      { heading: "Your choices", text: `You can ask to see, correct or delete your data at any time by writing to ${site.contact.email}.` },
    ],
  },
  {
    slug: "terms",
    title: "Terms",
    intro: "The terms that apply when you shop with us.",
    sections: [
      { heading: "Orders", text: "An order is confirmed once payment is received or, for COD, once it has been verified. We may cancel orders we are unable to fulfil and will refund them in full." },
      { heading: "Pricing", text: "Prices are listed in Indian Rupees and include applicable taxes. Offers cannot be combined unless stated." },
      { heading: "Product appearance", text: "We photograph every piece as faithfully as we can. Colours may vary slightly between screens." },
    ],
  },
];

export const getHelpPage = (slug: string) => helpPages.find((p) => p.slug === slug) ?? null;
