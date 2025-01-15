"use server";

import { getClient } from "@/apollo";
import { gql } from "@apollo/client";
import { IFeatured } from "@/types/yacht";
import IYacht, { ICharter, INewConstruction, ISale } from "@/types/yacht";
import { IDestination } from "@/types/destination";
import { IShipyard } from "@/types/shipyard";
import puppeteer from "puppeteer";
import { PDFDocument, PDFPage } from "pdf-lib";
import { IContext } from "@/context/view";

export const fetchFeaturedSales = async (
  locale: "en" | "fr",
): Promise<IFeatured> => {
  const client = getClient();
  const { data } = await client.query({
    query: gql`
      query Yachts($locale: LocaleInputType!) {
        Yachts(
          locale: $locale
          where: { featured: { equals: true }, displayOnWebsite: { not_equals: false } }
          limit: 0
        ) {
          docs {
            id
            name
            slug
            price
            builder
            length
            sleeps
            yearBuilt
            etiquette
            photos {
              featured {
                sizes {
                  fhd {
                    url
                  }
                  thumbnail {
                    url
                  }
                }
              }
            }
          }
        }
      }
    `,
    variables: {
      locale,
    },
  });

  return data.Yachts.docs;
};

export const fetchSales = async (locale: "en" | "fr"): Promise<ISale[]> => {
  const client = getClient();
  const { data } = await client.query({
    query: gql`
      query Yachts($locale: LocaleInputType!) {
        Yachts(locale: $locale,where: { displayOnWebsite: { not_equals: false } }, limit: 0) {
          docs {
            id
            name
            slug
            price
            builder
            category
            length
            sleeps
            yearBuilt
            etiquette
            indexField
            photos {
              featured {
                alt
                sizes {
                  thumbnail {
                    url
                    width
                    height
                  }
                }
              }
              gallery {
                image {
                  alt
                  sizes {
                    thumbnail {
                      url
                      width
                      height
                    }
                  }
                }
              }
            }
          }
        }
      }
    `,
    variables: {
      locale,
    },
  });

  return [...data.Yachts.docs].sort(
    (a: ISale, b: ISale) => a.indexField - b.indexField,
  );
};

export const fetchSale = async (
  slug: string,
  locale: "en" | "fr",
): Promise<ISale> => {
  const client = getClient();
  const { data } = await client.query({
    query: gql`
      query Yacht($locale: LocaleInputType!, $slug: String) {
        Yachts(
          where: { slug: { equals: $slug }, displayOnWebsite: { not_equals: false } }
          locale: $locale
          fallbackLocale: en
          limit: 1
        ) {
          docs {
            slug
            name
            model
            price
            LOA
            beam
            builder
            category
            city
            continent
            country
            cruising
            crypto
            length
            state
            material
            maxDraft
            minDraft
            region
            rooms
            sleeps
            cruisingGuests
            subcategory
            tonnage
            yearBuilt
            yearRefit
            keyFeatures
            customKeyFeatures
            description
            similar {
              id
              name
              price
              builder
              length
              sleeps
              yearBuilt
              etiquette
              photos {
                featured {
                  sizes {
                    thumbnail {
                      url
                    }
                  }
                  alt
                }
              }
            }
            broker {
              name
              email
              picture {
                alt
                sizes {
                  thumbnail {
                    url
                    width
                    height
                  }
                }
              }
              position
              phones {
                prefix
                number
              }
              socials {
                platform
                link
              }
            }
            photos {
              featured {
                alt
                sizes {
                  fhd {
                    url
                    width
                    height
                  }
                }
              }
              gallery {
                image {
                  alt
                  sizes {
                    thumbnail {
                      url
                      width
                      height
                    }
                    fhd {
                      url
                      width
                      height
                    }
                  }
                }
              }
            }
          }
        }
      }
    `,
    variables: { slug, locale },
  });

  return data.Yachts.docs[0];
};

export const fetchFeaturedCharters = async (): Promise<IFeatured[]> => {
  const client = getClient();
  const { data } = await client.query({
    query: gql`
      query Charters {
        Charters(where: { featured: { equals: true }, displayOnWebsite: { not_equals: false } }, limit: 0) {
          docs {
            id
            name
            slug
            price {
              low
              high
            }
            builder
            length
            sleeps
            yearBuilt
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
  });

  return data.Charters.docs;
};

export const fetchCharters = async (): Promise<ICharter[]> => {
  const client = getClient();
  const { data } = await client.query({
    query: gql`
      query Charters {
        Charters(where: { displayOnWebsite: { not_equals: false } },limit: 0) {
          docs {
            id
            name
            slug
            price {
              low
              high
            }
            builder
            category
            length
            sleeps
            yearBuilt
            etiquette
            indexField
            reservations {
              from
              to
            }
            photos {
              featured {
                sizes {
                  thumbnail {
                    url
                  }
                }
              }
              gallery {
                image {
                  sizes {
                    thumbnail {
                      url
                    }
                  }
                }
              }
            }
          }
        }
      }
    `,
  });

  return [...data.Charters.docs].sort(
    (a: ICharter, b: ICharter) => a.indexField - b.indexField,
  );
};

export const fetchCharter = async (
  slug: string,
  locale: "en" | "fr",
): Promise<ICharter> => {
  const client = getClient();
  const { data } = await client.query({
    query: gql`
      query Charter($slug: String, $locale: LocaleInputType!) {
        Charters(
          where: { slug: { equals: $slug }, displayOnWebsite: { not_equals: false } }
          locale: $locale
          fallbackLocale: en
          limit: 1
        ) {
          docs {
            slug
            name
            model
            price {
              low
              high
            }
            LOA
            beam
            builder
            category
            city
            continent
            country
            cruising
            crypto
            length
            state
            material
            maxDraft
            minDraft
            region
            rooms
            sleeps
            cruisingGuests
            subcategory
            tonnage
            yearBuilt
            yearRefit
            featured
            keyFeatures
            customKeyFeatures
            description
            similar {
              id
              name
              price {
                low
                high
              }
              builder
              length
              sleeps
              yearBuilt
              etiquette
              photos {
                featured {
                  sizes {
                    thumbnail {
                      url
                    }
                  }
                  alt
                }
              }
            }
            reservations {
              from
              to
            }
            broker {
              id
              name
              email
              picture {
                alt
                sizes {
                  thumbnail {
                    url
                    width
                    height
                  }
                }
              }
              position
              phones {
                prefix
                number
              }
              socials {
                platform
                link
              }
              langs
            }
            photos {
              featured {
                alt
                sizes {
                  fhd {
                    url
                    width
                    height
                  }
                }
              }
              gallery {
                image {
                  alt
                  sizes {
                    thumbnail {
                      url
                      width
                      height
                    }
                    fhd {
                      url
                      width
                      height
                    }
                  }
                }
              }
            }
          }
        }
      }
    `,
    variables: { slug, locale },
  });

  return data.Charters.docs[0];
};

export const fetchChartersForDestination = async (
  destination: IDestination,
): Promise<ICharter[]> => {
  const client = getClient();
  const charters: ICharter[] = [];
  const { data: countryData } = await client.query({
    query: gql`
      query Charters($country: String!, $limit: Int!) {
        Charters(where: { country: { equals: $country }, displayOnWebsite: { not_equals: false } }, limit: $limit) {
          docs {
            id
            slug
            name
            price {
              low
              high
            }
            builder
            length
            sleeps
            yearBuilt
            photos {
              featured {
                alt
                sizes {
                  thumbnail {
                    url
                    width
                    height
                  }
                }
              }
            }
          }
        }
      }
    `,
    variables: { country: destination.country, limit: 4 },
  });
  if (countryData) charters.push(...countryData.Charters.docs);
  if (charters.length >= 4) return charters;
  const { data: continentData } = await client.query({
    query: gql`
      query Charters($continent: String!, $limit: Int!) {
        Charters(where: { continent: { equals: $continent }, displayOnWebsite: { not_equals: false } }, limit: $limit) {
          docs {
            id
            slug
            name
            price {
              low
              high
            }
            builder
            length
            sleeps
            yearBuilt
            photos {
              featured {
                alt
                sizes {
                  thumbnail {
                    url
                    width
                    height
                  }
                }
              }
            }
          }
        }
      }
    `,
    variables: { continent: destination.continent, limit: 4 - charters.length },
  });
  if (continentData) charters.push(...continentData.Charters.docs);
  if (charters.length >= 4) return charters;
  const { data: randomData } = await client.query({
    query: gql`
      query Charters($limit: Int!) {
        Charters(limit: $limit, where: { displayOnWebsite: { not_equals: false } }) {
          docs {
            id
            slug
            name
            price {
              low
              high
            }
            builder
            length
            sleeps
            yearBuilt
            photos {
              featured {
                alt
                sizes {
                  thumbnail {
                    url
                    width
                    height
                  }
                }
              }
            }
          }
        }
      }
    `,
    variables: { limit: 4 - charters.length },
  });
  if (randomData) charters.push(...randomData.Charters.docs);
  return charters;
};

export const fetchSimilarSales = async (
  length: number,
): Promise<
  Pick<
    ISale,
    | "id"
    | "slug"
    | "length"
    | "price"
    | "name"
    | "builder"
    | "yearBuilt"
    | "sleeps"
    | "photos"
    | "etiquette"
  >[]
> => {
  const client = getClient();
  const { data: highestClicks } = await client.query({
    query: gql`
      query Yachts {
        Yachts(sort: "clicks", limit: 4, where: { displayOnWebsite: { not_equals: false } }) {
          docs {
            id
            slug
            name
            price
            builder
            length
            sleeps
            yearBuilt
            clicks
            etiquette
            photos {
              featured {
                sizes {
                  thumbnail {
                    url
                  }
                }
              }
            }
          }
        }
      }
    `,
    variables: { length },
  });

  const { data: biggerLength } = await client.query({
    query: gql`
      query Yachts($length: Float!) {
        Yachts(
          sort: "length"
          limit: 2
          where: { length: { greater_than: $length }, displayOnWebsite: { not_equals: false } }
        ) {
          docs {
            id
            slug
            name
            price
            builder
            length
            sleeps
            yearBuilt
            clicks
            etiquette
            photos {
              featured {
                sizes {
                  thumbnail {
                    url
                  }
                }
              }
            }
          }
        }
      }
    `,
    variables: { length },
  });

  const { data: smallerLength } = await client.query({
    query: gql`
      query Yachts($length: Float!) {
        Yachts(
          sort: "length"
          limit: 2
          where: { length: { less_than: $length }, displayOnWebsite: { not_equals: false } }
        ) {
          docs {
            id
            slug
            name
            price
            builder
            length
            sleeps
            yearBuilt
            clicks
            etiquette
            photos {
              featured {
                sizes {
                  thumbnail {
                    url
                  }
                }
              }
            }
          }
        }
      }
    `,
    variables: { length },
  });
  return [
    ...highestClicks.Yachts.docs,
    ...biggerLength.Yachts.docs,
    ...smallerLength.Yachts.docs,
  ];
};

export const fetchSimilarCharters = async (
  length: number,
): Promise<
  Pick<
    ICharter,
    | "id"
    | "slug"
    | "length"
    | "price"
    | "name"
    | "builder"
    | "yearBuilt"
    | "sleeps"
    | "photos"
    | "etiquette"
  >[]
> => {
  const client = getClient();
  const { data: highestClicks } = await client.query({
    query: gql`
      query Charters {
        Charters(sort: "clicks", limit: 4, where: { displayOnWebsite: { not_equals: false } }) {
          docs {
            id
            slug
            name
            price {
              low
              high
            }
            builder
            length
            sleeps
            yearBuilt
            clicks
            etiquette
            photos {
              featured {
                sizes {
                  thumbnail {
                    url
                  }
                }
              }
            }
          }
        }
      }
    `,
    variables: { length },
  });

  const { data: biggerLength } = await client.query({
    query: gql`
      query Charters($length: Float!) {
        Charters(
          sort: "length"
          limit: 2
          where: { length: { greater_than: $length }, displayOnWebsite: { not_equals: false } }
        ) {
          docs {
            id
            slug
            name
            price {
              low
              high
            }
            builder
            length
            sleeps
            yearBuilt
            clicks
            etiquette
            photos {
              featured {
                sizes {
                  thumbnail {
                    url
                  }
                }
              }
            }
          }
        }
      }
    `,
    variables: { length },
  });

  const { data: smallerLength } = await client.query({
    query: gql`
      query Charters($length: Float!) {
        Charters(
          sort: "length"
          limit: 2
          where: { length: { less_than: $length }, displayOnWebsite: { not_equals: false } }
        ) {
          docs {
            id
            slug
            name
            price {
              low
              high
            }
            builder
            length
            sleeps
            yearBuilt
            clicks
            etiquette
            photos {
              featured {
                alt
                sizes {
                  thumbnail {
                    url
                  }
                }
              }
            }
          }
        }
      }
    `,
    variables: { length },
  });

  return [
    ...highestClicks.Charters.docs,
    ...biggerLength.Charters.docs,
    ...smallerLength.Charters.docs,
  ];
};

export const fetchNewConstructions = async (): Promise<INewConstruction[]> => {
  const client = getClient();
  const { data } = await client.query({
    query: gql`
      query NewConstructions {
        NewConstructions(limit: 0, where: { displayOnWebsite: { not_equals: false } }) {
          docs {
            id
            slug
            delivery
            name
            price
            builder
            category
            length
            sleeps
            yearBuilt
            etiquette
            indexField
            photos {
              featured {
                alt
                sizes {
                  thumbnail {
                    url
                    width
                    height
                  }
                }
              }
              gallery {
                image {
                  alt
                  sizes {
                    thumbnail {
                      url
                      width
                      height
                    }
                  }
                }
              }
            }
          }
        }
      }
    `,
  });

  return [...data.NewConstructions.docs].sort(
    (a: INewConstruction, b: INewConstruction) => a.indexField - b.indexField,
  );
};
export const fetchNewConstruction = async (
  slug: string,
  locale: "en" | "fr",
): Promise<INewConstruction> => {
  const client = getClient();
  const { data } = await client.query({
    query: gql`
      query NewConstruction($slug: String, $locale: LocaleInputType!) {
        NewConstructions(
          where: { slug: { equals: $slug }, displayOnWebsite: { not_equals: false } }
          locale: $locale
          fallbackLocale: en
        ) {
          docs {
            slug
            delivery
            name
            model
            price
            LOA
            beam
            builder
            category
            city
            continent
            country
            cruising
            crypto
            length
            state
            material
            maxDraft
            minDraft
            region
            rooms
            sleeps
            cruisingGuests
            subcategory
            tonnage
            yearBuilt
            keyFeatures
            customKeyFeatures
            description
            similar {
              slug
              name
              price
              builder
              length
              sleeps
              yearBuilt
              etiquette
              photos {
                featured {
                  sizes {
                    thumbnail {
                      url
                    }
                  }
                  alt
                }
              }
            }
            broker {
              name
              email
              picture {
                alt
                sizes {
                  thumbnail {
                    url
                    width
                    height
                  }
                }
              }
              position
              phones {
                prefix
                number
              }
              socials {
                platform
                link
              }
            }
            photos {
              featured {
                alt
                sizes {
                  fhd {
                    url
                    width
                    height
                  }
                }
              }
              gallery {
                image {
                  alt
                  sizes {
                    thumbnail {
                      url
                      width
                      height
                    }
                    fhd {
                      url
                      width
                      height
                    }
                  }
                }
              }
            }
          }
        }
      }
    `,
    variables: { slug, locale },
  });

  return data.NewConstructions.docs[0];
};

export const fetchShipyards = async (): Promise<IShipyard[]> => {
  const client = getClient();
  const { data } = await client.query({
    query: gql`
      query Shipyards {
        Shipyards(limit: 50, where: { displayOnWebsite: { not_equals: false } }) {
          docs {
            id
            name
            quote
            website
            updatedAt
            createdAt
            indexField
            logo {
              alt
              sizes {
                thumbnail {
                  url
                  width
                  height
                }
                fhd {
                  url
                  width
                  height
                }
              }
            }
            banner {
              alt
              sizes {
                thumbnail {
                  url
                  width
                  height
                }
                fhd {
                  url
                  width
                  height
                }
              }
            }
          }
        }
      }
    `,
  });
  return [...data.Shipyards.docs].sort(
    (a: IShipyard, b: IShipyard) => a.indexField - b.indexField,
  );
};
export const fetchSimilarNewConstructions = async (
  length: number,
): Promise<IFeatured[]> => {
  const client = getClient();
  const { data: highestClicks } = await client.query({
    query: gql`
      query NewConstructions {
        NewConstructions(sort: "clicks", limit: 4, where: { displayOnWebsite: { not_equals: false } }) {
          docs {
            id
            slug
            name
            price
            builder
            length
            sleeps
            yearBuilt
            clicks
            photos {
              featured {
                sizes {
                  thumbnail {
                    url
                  }
                }
              }
            }
          }
        }
      }
    `,
    variables: { length },
  });

  const { data: biggerLength } = await client.query({
    query: gql`
      query NewConstructions($length: Float!) {
        NewConstructions(
          sort: "length"
          limit: 2
          where: { length: { greater_than: $length }, displayOnWebsite: { not_equals: false } }
        ) {
          docs {
            id
            slug
            name
            price
            builder
            length
            sleeps
            yearBuilt
            clicks
            photos {
              featured {
                sizes {
                  thumbnail {
                    url
                  }
                }
              }
            }
          }
        }
      }
    `,
    variables: { length },
  });

  const { data: smallerLength } = await client.query({
    query: gql`
      query NewConstructions($length: Float!) {
        NewConstructions(
          sort: "length"
          limit: 2
          where: { length: { less_than: $length }, displayOnWebsite: { not_equals: false } }
        ) {
          docs {
            id
            slug
            name
            price
            builder
            length
            sleeps
            yearBuilt
            clicks
            photos {
              featured {
                sizes {
                  thumbnail {
                    url
                  }
                }
              }
            }
          }
        }
      }
    `,
    variables: { length },
  });

  return [
    ...highestClicks.NewConstructions.docs,
    ...biggerLength.NewConstructions.docs,
    ...smallerLength.NewConstructions.docs,
  ];
};

export const brochurize = async ({
  type,
  photos,
  locale,
  slug,
  currency,
  units,
}: {
  type: "sale" | "charter" | "new-construction";
  photos: IYacht["photos"];
  locale: "en" | "fr";
  slug: string;
  currency: IContext["currency"];
  units: IContext["units"];
}) => {
  const baseUrl = (
      brochure: "hero" | "details" | "key-features" | number | "footer",
    ) => {
      return `https://g-yachts.com/${locale}/brochure/${slug}?type=${type}&brochure=${brochure}&currency=${currency}&length=${units.length}&weight=${units.weight}`;
    },
    urls = [
      baseUrl("hero"),
      baseUrl("details"),
      /*`http://localhost:3000/${locale}/${type}/${id}/key-features`,*/ // key-features page will be available once new key-features component is implemented
      ...photos.gallery.map((_, i) => baseUrl(i)),
      baseUrl("footer"),
    ],
    browser = await puppeteer.launch({
      headless: true,
      args: ["--no-sandbox", "--disable-setuid-sandbox"],
    }),
    pdfBuffers: Uint8Array[] = [],
    page = await browser.newPage();

  for (const url of urls) {
    console.log(url);
    await page.goto(url, { waitUntil: "networkidle0", timeout: 0 });

    const pdfBuffer = await page.pdf({
      width: "2048px",
      height: "1536px",
      printBackground: true,
      timeout: 0,
    });

    pdfBuffers.push(pdfBuffer);
    await page.evaluate(() => window.gc && window.gc());
  }

  await page.close();
  await browser.close();

  const mergedPdf = await PDFDocument.create();

  for (const pdfBuffer of pdfBuffers) {
    const pdf = await PDFDocument.load(pdfBuffer),
      copiedPages = await mergedPdf.copyPages(pdf, pdf.getPageIndices());

    copiedPages.forEach((page: PDFPage) => mergedPdf.addPage(page));
  }

  return Buffer.from(await mergedPdf.save()).toString("base64");
};

export const click = async ({
  id,
  type,
}: {
  id: string;
  type: "sales" | "charters" | "new-constructions";
}) => {
  const client = getClient(),
    { data } = await client.query({
      query:
        type === "sales"
          ? gql`
              query Yacht($id: String!) {
                Yacht(id: $id) {
                  clicks
                }
              }
            `
          : type === "charters"
            ? gql`
                query Charter($id: String!) {
                  Charter(id: $id) {
                    clicks
                  }
                }
              `
            : gql`
                query NewConstruction($id: String!) {
                  NewConstruction(id: $id) {
                    clicks
                  }
                }
              `,
      variables: { id },
    });

  await client.mutate({
    mutation:
      type === "sales"
        ? gql`
            mutation UpdateYacht($id: String!, $count: Float!) {
              updateYacht(id: $id, data: { clicks: $count }) {
                clicks
              }
            }
          `
        : type === "charters"
          ? gql`
              mutation UpdateCharter($id: String!, $count: Float!) {
                updateCharter(id: $id, data: { clicks: $count }) {
                  clicks
                }
              }
            `
          : gql`
              mutation UpdateNewConstruction($id: String!, $count: Float!) {
                updateNewConstruction(id: $id, data: { clicks: $count }) {
                  clicks
                }
              }
            `,
    variables: {
      id,
      count:
        type === "sales"
          ? data.Yacht.clicks + 1
          : type === "charters"
            ? data.Charter.clicks + 1
            : data.NewConstruction.clicks + 1,
    },
  });
};
