// Single source of truth for brand, contact and merchandising copy.
export const site = {
  name: "Quib Fashion",
  legalName: "Quib Fashion",
  tagline: "Premium menswear designed for the modern gentleman.",
  description:
    "Quib Fashion is a premium Indian menswear label. Designer shirts, tailored trousers, co-ords and club wear, cut from Egyptian and Giza cottons and finished by hand in Surat.",
  url: (process.env.NEXT_PUBLIC_SITE_URL ?? "https://quib.com").replace(/\/$/, ""),
  locale: "en_IN",
  currency: "INR",
  freeShippingThreshold: 999,
  shippingFee: 79,
  season: "Autumn / Winter 2026",
  contact: {
    email: "support@quib.com",
    business: "business@quib.com",
    phone: "+91 95586 39989",
    whatsapp: "https://wa.me/919558639989",
    hours: "Monday – Saturday, 10:00 AM – 6:00 PM",
    address: {
      street: "26-27, Liberty Industrial Park, Laskana Kholvad Road, Laskana",
      city: "Surat",
      region: "Gujarat",
      postalCode: "395013",
      country: "IN",
    },
  },
  trackingUrl: "https://thefoomer.shiprocket.co/",
  social: [
    { label: "Instagram", href: "https://instagram.com/quibfashion", handle: "@quibfashion" },
    { label: "WhatsApp", href: "https://wa.me/919558639989", handle: "+91 95586 39989" },
  ],
  announcements: [
    "Buy 2 get flat 10% off",
    "Free shipping above ₹999",
    "New collection just dropped",
    "Premium embroidered shirts",
    "Limited time offer",
    "Extra 5% off on UPI & prepaid orders",
  ],
  marquee: [
    { label: "New Arrivals", href: "/new-arrivals" },
    { label: "Designer Shirts", href: "/collection/designer-shirts" },
    { label: "Premium T-Shirts", href: "/t-shirts" },
    { label: "Club Wear", href: "/club-wear" },
    { label: "Trousers", href: "/trousers" },
    { label: "Co-Ords", href: "/co-ords" },
    { label: "Travel Wear", href: "/collection/travel-wear" },
  ],
  styles: [
    { label: "Casual", collection: "casual", note: "Everyday ease" },
    { label: "Formal", collection: "formal", note: "Sharp by default" },
    { label: "Party", collection: "club-wear", note: "After dark" },
    { label: "Travel", collection: "travel-wear", note: "Made to move" },
    { label: "Premium", collection: "premium", note: "The Lux edit" },
    { label: "Street", collection: "street", note: "City uniform" },
  ],
  // Collections rendered as carousels on the homepage, in order.
  homeCollections: [
    "new-arrivals",
    "best-sellers",
    "designer-shirts",
    "plain-shirts",
    "printed-shirts",
    "check-shirts",
    "stripe-shirts",
    "over-shirts",
    "trousers",
    "co-ords",
    "club-wear",
    "dynamic-looks",
    "travel-wear",
  ],
  // Editorial imagery is picked from the catalog by product slug so it stays
  // in sync with the store. Missing slugs fall back to a collection's lead product.
  editorial: {
    hero: "black-wave-rhinestone-hand-work-satin-cotton-premium-mens-shirt",
    gentleman: "copy-of-night-black-regular-fit-formal-shirt-for-mens-1",
    story: "black-guitar-embroidered-luxury-linen-cotton-mens-shirt",
    look: {
      image: "copy-of-night-black-regular-fit-formal-shirt-for-mens-1",
      items: [
        { label: "Shirt", slug: "copy-of-night-black-regular-fit-formal-shirt-for-mens-1", x: 62, y: 34 },
        { label: "Trouser", slug: "foomer-formal-cream-pant-for-mens", x: 42, y: 80 },
        { label: "Overshirt", slug: "foomer-black-glen-checked-casual-shirt", x: 38, y: 27 },
      ],
    },
  },
  story: {
    headline: "Built for men who don't follow the crowd.",
    paragraphs: [
      "Quib Fashion began in Surat, the textile capital of India, with a simple conviction: quality is always in trend. We bring contemporary design and modern technology together with old-school tailoring, so a shirt can look sharp, feel effortless and still be priced fairly.",
      "Every piece is sewn at sixteen stitches to the inch on Japanese machines, cut from pre-washed Egyptian, Giza and premium cottons, enzyme-treated for softness and finished with genuine mother-of-pearl buttons.",
    ],
    facts: [
      { value: "16", label: "Stitches per inch" },
      { value: "Giza", label: "& Egyptian cottons" },
      { value: "MOP", label: "Hand-carved buttons" },
      { value: "7 day", label: "Easy exchange" },
    ],
  },
};

export const footerNav = [
  {
    heading: "Shop",
    links: [
      { label: "New Arrivals", href: "/new-arrivals" },
      { label: "Shirts", href: "/shirts" },
      { label: "T-Shirts", href: "/t-shirts" },
      { label: "Trousers", href: "/trousers" },
      { label: "Co-Ords", href: "/co-ords" },
      { label: "Club Wear", href: "/club-wear" },
      { label: "Sale", href: "/sale" },
    ],
  },
  {
    heading: "Customer Care",
    links: [
      { label: "Contact", href: "/contact" },
      { label: "Shipping", href: "/help/shipping" },
      { label: "Returns", href: "/help/returns" },
      { label: "Exchange", href: "/help/exchange" },
      { label: "Track Order", href: site.trackingUrl },
    ],
  },
  {
    heading: "Company",
    links: [
      { label: "About", href: "/about" },
      { label: "Gallery", href: "/gallery" },
      { label: "Journal", href: "/journal" },
      { label: "Privacy", href: "/help/privacy" },
      { label: "Terms", href: "/help/terms" },
    ],
  },
];
