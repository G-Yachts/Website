/** @type {import('next-sitemap').IConfig} */

module.exports = {
  siteUrl: process.env.NEXT_PUBLIC_ADMIN_BASE_URI || "https://www.g-yachts.com",
  generateRobotsTxt: true,
  sitemapSize: 5000,
  robotsTxtOptions: {
    additionalSitemaps: ["https://www.g-yachts.com/server-sitemap.xml"],
    policies: [
      {
        disallow: [
          "/admin",
          "/admin/*",
          "/api",
          "/api/*",
          "/media",
          "/media/*",
          "/images",
          "/images/*",
          "/videos",
          "/videos/*",
          "/pictures",
          "/pictures/*",
          "/brochure",
          "/brochure/*",
        ],
        userAgent: "*",
      },
    ],
  },
  additionalPaths: async (config) => {
    const result = [],
      staticPaths = [
        {
          locale: "en",
          paths: [
            "",
            "charters",
            "company",
            "destinations",
            "events",
            "management",
            "new-constructions",
            "news",
            "partners",
            "recruitment",
            "sales",
            "sell-your-yacht",
          ],
        },
        {
          locale: "fr",
          paths: [
            "",
            "charters",
            "compagnie",
            "destinations",
            "evenements",
            "management",
            "nouvelles-constructions",
            "actualites",
            "partenaires",
            "recrutement",
            "ventes",
            "vendre-votre-yacht",
          ],
        },
      ];

    for (let i = 0; i < staticPaths[0].paths.length; i++) {
      result.push({
        loc: `/${staticPaths[0].paths[i]}`,
        lastmod: new Date().toISOString(),
        priority: 0.7,
        alternateRefs: [
          {
            href: `${config.siteUrl}/${staticPaths[0].paths[i]}`,
            hreflang: staticPaths[0].locale,
          },
          {
            href: `${config.siteUrl}/${staticPaths[1].paths[i]}`,
            hreflang: staticPaths[1].locale,
          },
          {
            href: `${config.siteUrl}/${staticPaths[0].locale}/${staticPaths[0].paths[i]}`,
            hreflang: staticPaths[0].locale,
          },
          {
            href: `${config.siteUrl}/${staticPaths[1].locale}/${staticPaths[1].paths[i]}`,
            hreflang: staticPaths[1].locale,
          },
        ],
      });
    }

    return result;
  },
  exclude: ["/admin", "/admin/*", "/server-sitemap.xml"],
};
