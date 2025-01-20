"use server";

import { getClient } from "@/apollo";
import { gql } from "@apollo/client";
import { Metadata } from "next";
import { joinSEO } from "@/utils/metadata";
import puppeteer from "puppeteer";
import { IContext } from "@/context/view";

export const fetchMetadata = async ({
  slug,
  type,
  locale,
}: {
  slug: string;
  type:
    | "sale"
    | "charter"
    | "new-construction"
    | "destination"
    | "article"
    | "event";
  locale: "en" | "fr";
}): Promise<Metadata> => {
  const client = getClient();

  switch (type) {
    case "sale":
      const saleData = (
        await client.query({
          query: gql`
            query Yacht($locale: LocaleInputType!, $slug: String!) {
              Yachts(
                where: { slug: { equals: $slug } }
                locale: $locale
                limit: 1
              ) {
                docs {
                  name
                  description
                  seo {
                    value
                  }
                  photos {
                    featured {
                      sizes {
                        fhd {
                          url
                        }
                      }
                    }
                  }
                }
              }
            }
          `,
          variables: { slug, locale },
        })
      ).data.Yachts.docs[0];

      return {
        title: saleData.name,
        description: saleData.description,
        keywords: joinSEO(saleData.seo),
        openGraph: {
          title: saleData.name,
          siteName: "G-Yachts",
          url:
            locale === "en"
              ? `https://www.g-yachts.com/${locale}/sales/${slug}`
              : `https://www.g-yachts.com/${locale}/ventes/${slug}`,
          description: saleData.description,
          type: "website",
          locale: locale === "en" ? "en_US" : "fr_FR",
          images: [
            {
              url: encodeURI(saleData.photos.featured.sizes.fhd.url),
              width: 1200,
              height: 630,
              alt: saleData.photos.featured.alt,
            },
          ],
        },
      };

    case "charter":
      const charterData = (
        await client.query({
          query: gql`
            query Charter($locale: LocaleInputType!, $slug: String) {
              Charters(
                where: { slug: { equals: $slug } }
                locale: $locale
                limit: 1
              ) {
                docs {
                  name
                  description
                  seo {
                    value
                  }
                  photos {
                    featured {
                      sizes {
                        fhd {
                          url
                        }
                      }
                      alt
                    }
                  }
                }
              }
            }
          `,
          variables: { slug, locale },
        })
      ).data.Charters.docs[0];

      return {
        title: charterData.name,
        description: charterData.description,
        keywords: joinSEO(charterData.seo),
        openGraph: {
          title: charterData.name,
          siteName: "G-Yachts",
          url: `https://www.g-yachts.com/${locale}/charters/${slug}`,
          description: charterData.description,
          type: "website",
          locale: locale === "en" ? "en_US" : "fr_FR",
          images: [
            {
              url: encodeURI(charterData.photos.featured.sizes.fhd.url),
              width: 1200,
              height: 630,
              alt: charterData.photos.featured.alt,
            },
          ],
        },
      };

    case "new-construction":
      const newConstructionData = (
        await client.query({
          query: gql`
            query NewConstruction($locale: LocaleInputType!, $slug: String) {
              NewConstructions(
                where: { slug: { equals: $slug } }
                locale: $locale
                limit: 1
              ) {
                docs {
                  name
                  description
                  seo {
                    value
                  }
                  photos {
                    featured {
                      sizes {
                        fhd {
                          url
                        }
                      }
                      alt
                    }
                  }
                }
              }
            }
          `,
          variables: { slug, locale },
        })
      ).data.NewConstructions.docs[0];

      return {
        title: newConstructionData.name,
        description: newConstructionData.description,
        keywords: joinSEO(newConstructionData.seo),
        openGraph: {
          title: newConstructionData.name,
          siteName: "G-Yachts",
          url:
            locale === "en"
              ? `https://www.g-yachts.com/${locale}/new-constructions/${slug}`
              : `https://www.g-yachts.com/${locale}/nouvelles-constructions/${slug}`,
          description: newConstructionData.description,
          type: "website",
          locale: locale === "en" ? "en_US" : "fr_FR",
          images: [
            {
              url: encodeURI(newConstructionData.photos.featured.sizes.fhd.url),
              width: 1200,
              height: 630,
              alt: newConstructionData.photos.featured.alt,
            },
          ],
        },
      };

    case "event":
      const eventData = (
        await client.query({
          query: gql`
            query Event($locale: LocaleInputType!, $slug: String) {
              Events(
                where: { slug: { equals: $slug } }
                locale: $locale
                limit: 1
              ) {
                docs {
                  title
                  fromDate
                  toDate
                  image {
                    alt
                    sizes {
                      fhd {
                        url
                      }
                    }
                  }
                  seo {
                    value
                  }
                  location {
                    city
                    country
                  }
                }
              }
            }
          `,
          variables: { slug, locale },
        })
      ).data.Events.docs[0];

      return {
        title: eventData.title,
        description: `${eventData.fromDate} - ${eventData.toDate} | ${eventData.location.city}, ${eventData.location.country}`,
        keywords: joinSEO(eventData.seo),
        openGraph: {
          title: eventData.title,
          siteName: "G-Yachts",
          url:
            locale === "en"
              ? `https://www.g-yachts.com/${locale}/events/${slug}`
              : `https://www.g-yachts.com/${locale}/evenements/${slug}`,
          description: `${eventData.fromDate} - ${eventData.toDate} | ${eventData.location.city}, ${eventData.location.country}`,
          type: "website",
          locale: locale === "en" ? "en_US" : "fr_FR",
          images: [
            {
              url: encodeURI(eventData.image.sizes.fhd.url),
              width: 1200,
              height: 630,
              alt: eventData.image.alt,
            },
          ],
        },
      };

    case "destination":
      const destinationData = (
        await client.query({
          query: gql`
            query Destination($locale: LocaleInputType!, $slug: String) {
              Destinations(
                where: { slug: { equals: $slug } }
                locale: $locale
                limit: 1
              ) {
                docs {
                  destination
                  country
                  region
                  continent
                  seo {
                    value
                  }
                  photos {
                    featured {
                      alt
                      sizes {
                        fhd {
                          url
                        }
                      }
                    }
                  }
                }
              }
            }
          `,
          variables: { slug, locale },
        })
      ).data.Destinations.docs[0];

      return {
        title: destinationData.destination,
        description: `${destinationData.destination}, ${destinationData.country}, ${destinationData.region}, ${destinationData.continent}`,
        keywords: joinSEO(destinationData.seo),
        openGraph: {
          title: destinationData.destination,
          siteName: "G-Yachts",
          url: `https://www.g-yachts.com/${locale}/destinations/${slug}`,
          description: `${destinationData.destination}, ${destinationData.country}, ${destinationData.region}, ${destinationData.continent}`,
          type: "website",
          locale: locale === "en" ? "en_US" : "fr_FR",
          images: [
            {
              url: encodeURI(destinationData.photos.featured.sizes.fhd.url),
              width: 1200,
              height: 630,
              alt: destinationData.photos.featured.alt,
            },
          ],
        },
      };

    case "article":
      const articleData = (
        await client.query({
          query: gql`
            query Article($locale: LocaleInputType!, $slug: String) {
              Articles(
                where: { slug: { equals: $slug } }
                locale: $locale
                limit: 1
              ) {
                docs {
                  title
                  category(locale: $locale) {
                    title
                  }
                  author {
                    name
                  }
                  image {
                    alt
                    sizes {
                      fhd {
                        url
                      }
                    }
                  }
                  seo {
                    value
                  }
                }
              }
            }
          `,
          variables: { slug, locale },
        })
      ).data.Articles.docs[0];

      return {
        title: articleData.title,
        description: articleData.category.title,
        keywords: joinSEO(articleData.seo),
        authors: articleData.author.name,
        openGraph: {
          title: articleData.title,
          siteName: "G-Yachts",
          url:
            locale === "en"
              ? `https://www.g-yachts.com/${locale}/news/${slug}`
              : `https://www.g-yachts.com/${locale}/actualites/${slug}`,
          description: articleData.category.title,
          type: "website",
          locale: locale === "en" ? "en_US" : "fr_FR",
          images: [
            {
              url: encodeURI(articleData.image.sizes.fhd.url),
              width: 1200,
              height: 630,
              alt: articleData.image.alt,
            },
          ],
        },
      };
  }
};

export const fetchSitemap = async () => {
  const client = getClient();

  return (
    await client.query({
      query: gql`
        query Sitemap {
          Articles(limit: 0) {
            docs {
              slug
              updatedAt
            }
          }
          Yachts(where: { displayOnWebsite: { not_equals: false } }, limit: 0) {
            docs {
              slug
              updatedAt
            }
          }
          Charters(
            where: { displayOnWebsite: { not_equals: false } }
            limit: 0
          ) {
            docs {
              slug
              updatedAt
            }
          }
          NewConstructions(
            where: { displayOnWebsite: { not_equals: false } }
            limit: 0
          ) {
            docs {
              slug
              updatedAt
            }
          }
          Destinations(limit: 0) {
            docs {
              slug
              updatedAt
            }
          }
          Events(limit: 0) {
            docs {
              slug
              updatedAt
            }
          }
        }
      `,
    })
  ).data;
};

export const getRate = async () => {
  const client = getClient();
  return (
    await client.query({
      query: gql`
        query ExchangeRate {
          ExchangeRate {
            usd
            gbp
            jpy
          }
        }
      `,
    })
  ).data.ExchangeRate;
};
