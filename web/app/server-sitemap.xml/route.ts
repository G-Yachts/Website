import { getServerSideSitemap, ISitemapField } from "next-sitemap";
import { fetchSitemap } from "@/actions/actions";
import IDoc from "@/types/server-sitemap";

/*
export const GET = async (request: Request) => {
  const data = await fetchSitemap(),
    URLs: ISitemapField[] = [];

  const addURLs = (category: string, basePath: { en: string; fr: string }) => {
    data[category].docs.forEach((doc: IDoc) => {
      URLs.push({
        loc: `https://www.g-yachts.com/${basePath.en}/${doc.slug}`,
        lastmod: doc.updatedAt,
        priority: 0.8,
        alternateRefs: [
          {
            href: `https://www.g-yachts.com/${basePath.en}/${doc.slug}`,
            hreflang: "en",
          },
          {
            href: `https://www.g-yachts.com/${basePath.fr}/${doc.slug}`,
            hreflang: "fr",
          },
          {
            href: `https://www.g-yachts.com/en/${basePath.en}/${doc.slug}`,
            hreflang: "en",
          },
          {
            href: `https://www.g-yachts.com/fr/${basePath.fr}/${doc.slug}`,
            hreflang: "fr",
          },
        ],
      });
    });
  };

  addURLs("Yachts", { en: "sales", fr: "ventes" });
  addURLs("Charters", { en: "charters", fr: "charters" });
  addURLs("NewConstructions", {
    en: "new-constructions",
    fr: "nouvelles-constructions",
  });
  addURLs("Destinations", { en: "destinations", fr: "destinations" });
  addURLs("Articles", { en: "news", fr: "actualites" });
  addURLs("Events", { en: "events", fr: "evenements" });

  return getServerSideSitemap(URLs);
};
*/
