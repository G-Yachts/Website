"use client";

import { createContext, useContext, useEffect, useState } from "react";
import {
  currency as useCurrency,
  units as useUnits,
  bookmarks as useBookmarks,
} from "@/utils/yachts";
import Cookies from "js-cookie";

import { getRate } from "@/actions/actions";

interface IActions {
  changeCurrency: (currency: IContext["currency"]) => void;
  changeUnits: (units: IContext["units"]) => void;
  addBookmark: (id: string) => void;
  removeBookmark: (id: string) => void;
  openView: (view: IContext["view"]) => void;
  setCookiesAgreement: (agreed: IContext["cookiesAgreed"]) => void;
}

export interface IContext extends IActions {
  currency: "EUR" | "USD" | "GBP" | "JPY";
  rates: {
    EUR: number;
    USD: number;
    GBP: number;
    JPY: number;
  };
  units: {
    length: string;
    weight: string;
  };
  bookmarks: string[];
  view:
    | "navigation"
    | "contact"
    | "search"
    | "credits"
    | "terms"
    | "privacy"
    | null;
  cookiesAgreed: boolean;
}

const ViewContext = createContext<IContext | undefined>(undefined);

export const ViewProvider = ({ children }: { children: React.ReactNode }) => {
  const [currency, setCurrency] = useState<IContext["currency"]>(useCurrency()),
    [rates, setRates] = useState<IContext["rates"]>({
      EUR: 1,
      USD: 0,
      GBP: 0,
      JPY: 0,
    }),
    [units, setUnits] = useState<IContext["units"]>(useUnits()),
    [view, openView] = useState<IContext["view"]>(null),
    [bookmarks, setBookmarks] = useState<IContext["bookmarks"]>(useBookmarks()),
    [cookiesAgreed, setCookiesAgreement] = useState<IContext["cookiesAgreed"]>(
      Cookies.get("cookiesAgreed") === "true",
    ),
    changeUnits = (units: IContext["units"]) => {
      Cookies.set("length", units.length);
      Cookies.set("weight", units.weight);
      setUnits(units);
    },
    changeCurrency = (currency: IContext["currency"]) => {
      Cookies.set("currency", currency);
      setCurrency(currency);
    },
    addBookmark = (id: string) => {
      Cookies.set("bookmarks", JSON.stringify([...bookmarks, id]), {
        expires: 365,
      });
      setBookmarks([...bookmarks, id]);
    },
    removeBookmark = (id: string) => {
      Cookies.set(
        "bookmarks",
        JSON.stringify(bookmarks.filter((bookmark) => bookmark !== id)),
      );
      setBookmarks(bookmarks.filter((bookmark) => bookmark !== id));
    };

  useEffect(() => {
    const assignRates = async () => {
      const data = await getRate();
      setRates({
        EUR: 1,
        USD: data.usd,
        GBP: data.gbp,
        JPY: data.jpy,
      });
    };
    assignRates();
  }, []);

  const value = {
    currency,
    rates,
    units,
    view,
    bookmarks,
    cookiesAgreed,
    setCookiesAgreement,
    changeCurrency,
    changeUnits,
    openView,
    addBookmark,
    removeBookmark,
  };

  return <ViewContext.Provider value={value}>{children}</ViewContext.Provider>;
};

export const useViewContext = (): IContext => {
  const context = useContext(ViewContext);
  if (context === undefined) {
    throw new Error("useViewContext must be used within an ViewProvider");
  }
  return context;
};
