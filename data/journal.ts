export type Article = {
  slug: string;
  title: string;
  category: string;
  date: string;
  readTime: string;
  excerpt: string;
  /** Collection whose lead product supplies the cover image. */
  cover: string;
  body: { heading?: string; text: string }[];
};

export const articles: Article[] = [
  {
    slug: "ten-fabrics-for-everyday-wear",
    title: "Ten Different Types of Fabrics To Choose For Everyday Wear",
    category: "Fabric Guide",
    date: "2026-09-12",
    readTime: "6 min read",
    excerpt: "From Giza cotton to linen blends, a plain-spoken guide to the cloth that will carry you through the week.",
    cover: "plain-shirts",
    body: [
      { text: "The fabric decides almost everything about a shirt: how it hangs, how it breathes, how it looks at six in the evening. Learn ten of them and you will rarely buy badly again." },
      { heading: "The cottons", text: "Egyptian and Giza cottons have long, fine fibres that spin into a smooth, strong yarn. Poplin is crisp and light, twill has a soft diagonal rib and drapes well, Oxford is heavier and more relaxed, and satin-finished cotton carries a quiet sheen that suits the evening." },
      { heading: "The warm-weather cloths", text: "Linen is unmatched for airflow and wears its creases with pride. Linen-cotton blends keep the texture and lose some of the rumple. Chambray gives the look of denim at a fraction of the weight." },
      { heading: "The textured and the technical", text: "Corduroy and brushed flannel bring depth to cooler months, while poly-cotton blends hold colour and shape through travel and repeated washing. Choose for the day you are dressing for, not the label." },
    ],
  },
  {
    slug: "timelessness-of-luxury-cotton-shirts",
    title: "The Timelessness of Wearing Luxury Cotton Shirts Everyday",
    category: "Style Notes",
    date: "2026-08-28",
    readTime: "4 min read",
    excerpt: "Why the well-made cotton shirt has outlasted every trend that tried to replace it.",
    cover: "premium",
    body: [
      { text: "Trends arrive loudly and leave quietly. The cotton shirt has simply stayed. It is the rare garment that looks correct in a boardroom, at a dinner table and on a Sunday with the sleeves rolled." },
      { heading: "What makes it last", text: "Longevity is built in at the seams. A shirt sewn at sixteen stitches per inch holds its line for years, and cloth that has been pre-washed will not shrink away from you after the first laundering." },
      { heading: "Wearing it daily", text: "Rotate three or four good shirts rather than ten indifferent ones. Wash cold, hang to dry, press while slightly damp. The shirt will soften with age and look better for it." },
    ],
  },
  {
    slug: "adding-luxury-to-your-shirt-collection",
    title: "Adding Luxury to Your Premium Shirt Collection",
    category: "Wardrobe",
    date: "2026-08-09",
    readTime: "5 min read",
    excerpt: "Embroidery, mother-of-pearl and satin finishes: the details that separate a good shirt from a great one.",
    cover: "designer-shirts",
    body: [
      { text: "Luxury in a shirt is rarely about a logo. It lives in details you notice on the second look: the depth of a button, the weight of a placket, a line of embroidery placed exactly where it should be." },
      { heading: "Start with the finish", text: "A satin-cotton shirt in black or deep wine is the simplest way to raise the register of an outfit. It catches light without shouting about it." },
      { heading: "Add one statement", text: "A single embroidered motif at the chest or collar gives a shirt character. Keep everything around it plain and let the hand-work speak." },
      { heading: "Mind the buttons", text: "Genuine mother-of-pearl buttons are cool to the touch and have a depth plastic cannot imitate. They are a small thing that changes how a shirt feels to wear." },
    ],
  },
  {
    slug: "upgrade-your-wardrobe",
    title: "Upgrade Your Wardrobe",
    category: "Essentials",
    date: "2026-07-21",
    readTime: "5 min read",
    excerpt: "A considered edit of shirts, trousers and layers that works harder than a full closet.",
    cover: "trousers",
    body: [
      { text: "A better wardrobe is usually a smaller one. The aim is a set of pieces that all work together, so getting dressed takes a minute and always looks deliberate." },
      { heading: "The foundation", text: "Begin with two plain shirts in white and sky, one in black, and a pair of well-cut trousers in charcoal or cream. These four pieces will cover most of the week." },
      { heading: "The character pieces", text: "Add a check overshirt for layering, a printed shirt for the weekend and one embroidered piece for evenings. A co-ord set earns its place when you travel." },
      { heading: "The fit", text: "Whatever you buy, buy it to fit the shoulders. Everything else can be adjusted; the shoulder cannot." },
    ],
  },
];

export const getArticle = (slug: string) => articles.find((a) => a.slug === slug) ?? null;
