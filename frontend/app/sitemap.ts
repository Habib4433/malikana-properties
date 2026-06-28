import { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: "https://malikanaproperties.com", lastModified: new Date(), changeFrequency: "daily", priority: 1 },
    { url: "https://malikanaproperties.com/plots", lastModified: new Date(), changeFrequency: "daily", priority: 0.9 },
    { url: "https://malikanaproperties.com/flats", lastModified: new Date(), changeFrequency: "daily", priority: 0.9 },
    { url: "https://malikanaproperties.com/installment", lastModified: new Date(), changeFrequency: "monthly", priority: 0.7 },
    { url: "https://malikanaproperties.com/contact", lastModified: new Date(), changeFrequency: "monthly", priority: 0.7 },
    { url: "https://malikanaproperties.com/login", lastModified: new Date(), changeFrequency: "monthly", priority: 0.5 },
  ];
}
