import {
  createLocalizedPathnamesNavigation,
  Pathnames,
} from "next-intl/navigation";
import { locales } from "@/i18n";

export const localePrefix = "always";
export const pathnames = {
  "/": "/",
  "/sales": {
    en: "/sales",
    fr: "/ventes",
  },
  "/sales/[id]": {
    en: "/sales/[id]",
    fr: "/ventes/[id]",
  },
  "/charter/[id]": "/charter/[id]",
  "/charters": {
    en: "/charters",
    fr: "/charters",
  },
  "/new-constructions": {
    en: "/new-constructions",
    fr: "/nouvelles-constructions",
  },
  "/new-constructions/[id]": {
    en: "/new-constructions/[id]",
    fr: "/nouvelles-constructions/[id]",
  },
  "/management": {
    en: "/management",
    fr: "/management",
  },
  "/company": {
    en: "/company",
    fr: "/compagnie",
  },
  "/partners": {
    en: "/partners",
    fr: "/partenaires",
  },
  "/news": {
    en: "/news",
    fr: "/actualites",
  },
  "/news/[id]": {
    en: "/news/[id]",
    fr: "/actualites/[id]",
  },
  "/events": {
    en: "/events",
    fr: "/evenements",
  },
  "/events/[id]": {
    en: "/events/[id]",
    fr: "/evenements/[id]",
  },
  "/recruitment": {
    en: "/recruitment",
    fr: "/recrutement",
  },
  "/contact": {
    en: "/contact",
    fr: "/contact",
  },
  "/destinations": {
    en: "/destinations",
    fr: "/destinations",
  },
  "/destinations/[id]": "/destinations/[id]",
  "/partners/[id]": {
    en: "/partners/[id]",
    fr: "/partners/[id]",
  },
} satisfies Pathnames<typeof locales>;

export const { Link, redirect, usePathname, useRouter, getPathname } =
  createLocalizedPathnamesNavigation({ locales, localePrefix, pathnames });
