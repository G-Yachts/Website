"use client";

import { useTranslations } from "next-intl";
import { Close } from "@/components/nav/navigation";
import { motion } from "framer-motion";
import { useViewContext } from "@/context/view";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { searchAll } from "@/actions/search";
import { IDestination } from "@/types/destination";
import { IArticle } from "@/types/article";
import { Link } from "@/navigation";
import { ISale, ICharter } from "@/types/yacht";

const Search = () => {
  const t = useTranslations("search");
  const { openView } = useViewContext();
  const [query, setQuery] = useState<string>("");
  const params = useParams();
  const locale = params.locale as string;
  const [results, setResults] = useState<
    | {
        yachts: ISale[];
        charters: ICharter[];
        destinations: IDestination[];
        articles: IArticle[];
        pages: { title: string; url: string }[];
      }
    | undefined
  >(undefined);

  useEffect(() => {
    if (query.length > 0) {
      searchAll(query, locale).then((data) => setResults(data));
    }
  }, [query]);

  return (
    <motion.section
      initial={{ opacity: 0, scale: 0.5 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.5 }}
      transition={{ duration: 0.2, ease: "easeInOut" }}
      className="fixed top-0 left-0 grid place-items-center w-full h-full z-20 cursor-pointer"
      onClick={() => openView(null)}
    >
      <div
        className="lg:h-[60vh] h-[100dvh] w-full lg:w-2/3 px-[4vw] py-[8vh] lg:py-10 bg-rock-100 overflow-y-auto cursor-default flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="w-full flex flex-row justify-end">
          <Close />
        </div>
        <div
          className={"flex flex-col justify-start items-start gap-[3vh] mb-2"}
        >
          <h1 className={"font-slick lg:text-5xl text-4xl font-light"}>
            {t.rich("search")}
          </h1>
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value.trim())}
            autoComplete="off"
            className={
              "w-full px-1 py-2 bg-transparent border-b border-black focus:outline-none placeholder:text-rock-500 font-classic font-normal"
            }
            autoFocus={true}
            placeholder={t("placeholder")}
          />
        </div>
        {results && <YachtsResults yachts={results.yachts} />}
        {results && <ChartersResults charters={results.charters} />}
        {results && <DestinationsResults destinations={results.destinations} />}
        {results && (
          <ArticlesResults articles={results.articles} locale={locale} />
        )}
        {results && <PagesResult pages={results.pages} />}
      </div>
    </motion.section>
  );
};

const YachtsResults = ({ yachts }: { yachts: ISale[] }) => {
  const t = useTranslations("search");
  const { openView } = useViewContext();
  return (
    <div className="w-full flex flex-col justify-start items-start mt-4">
      <h4>{t("yachts")}</h4>
      {yachts.map((yacht) => (
        <Link
          onClick={() => openView(null)}
          href={{
            pathname: "/sales/[slug]",
            params: { slug: yacht.slug },
          }}
          key={yacht.slug}
          className="w-full flex flex-col py-2 px-4 border-2 border-rock-300 hover:bg-rock-200 transition-colors duration-200 cursor-pointer mt-2"
        >
          <span>{yacht.name}</span>
          <p className="text-sm text-gray-500">{t("yacht")}</p>
        </Link>
      ))}
      {yachts.length === 0 && (
        <span className="text-sm text-gray-500">{t("noResults")}</span>
      )}
    </div>
  );
};

const ChartersResults = ({ charters }: { charters: ICharter[] }) => {
  const t = useTranslations("search");
  const { openView } = useViewContext();
  return (
    <div className="w-full flex flex-col justify-start items-start mt-4">
      <h4>{t("charters")}</h4>
      {charters.map((charter) => (
        <Link
          onClick={() => openView(null)}
          href={{
            pathname: "/charters/[slug]",
            params: { slug: charter.slug },
          }}
          key={charter.slug}
          className="w-full flex flex-col py-2 px-4 border-2 border-rock-300 hover:bg-rock-200 transition-colors duration-200 cursor-pointer mt-2"
        >
          <span>{charter.name}</span>
          <p className="text-sm text-gray-500">{t("charter")}</p>
        </Link>
      ))}
      {charters.length === 0 && (
        <span className="text-sm text-gray-500">{t("noResults")}</span>
      )}
    </div>
  );
};

const DestinationsResults = ({
  destinations,
}: {
  destinations: IDestination[];
}) => {
  const t = useTranslations("search");
  const { openView } = useViewContext();
  return (
    <div className="w-full flex flex-col justify-start items-start mt-4">
      <h4>{t("destinations")}</h4>
      {destinations.map((destination) => (
        <Link
          onClick={() => openView(null)}
          href={{
            pathname: "/destinations/[slug]",
            params: { slug: destination.slug },
          }}
          key={destination.slug}
          className="w-full flex flex-col py-2 px-4 border-2 border-rock-300 hover:bg-rock-200 transition-colors duration-200 cursor-pointer mt-2"
        >
          <span>{destination.destination}</span>
          <p className="text-sm text-gray-500">{t("destination")}</p>
        </Link>
      ))}
      {destinations.length === 0 && (
        <span className="text-sm text-gray-500">{t("noResults")}</span>
      )}
    </div>
  );
};

const ArticlesResults = ({
  articles,
  locale,
}: {
  articles: IArticle[];
  locale: string;
}) => {
  const t = useTranslations("search");
  const { openView } = useViewContext();
  return (
    <div className="w-full flex flex-col justify-start items-start mt-4">
      <h4>{t("articles")}</h4>
      {articles.map((article) => (
        <Link
          onClick={() => openView(null)}
          href={{
            pathname: "/news/[slug]",
            params: { slug: article.slug },
          }}
          key={article.slug}
          className="w-full flex flex-col py-2 px-4 border-2 border-rock-300 hover:bg-rock-200 transition-colors duration-200 cursor-pointer mt-2"
        >
          <span>{article.title}</span>
          <p className="text-sm text-gray-500">{t("article")}</p>
        </Link>
      ))}
      {articles.length === 0 && (
        <span className="text-sm text-gray-500">{t("noResults")}</span>
      )}
    </div>
  );
};

const PagesResult = ({
  pages,
}: {
  pages: { title: string; url: string }[];
}) => {
  const t = useTranslations("search");
  const { openView } = useViewContext();
  return (
    <div className="w-full flex flex-col justify-start items-start mt-4">
      <h4>{t("pages")}</h4>
      {pages.map((page) => (
        <Link
          onClick={() => openView(null)}
          href={page.url as any}
          key={page.url}
          className="w-full flex flex-col py-2 px-4 border-2 border-rock-300 hover:bg-rock-200 transition-colors duration-200 cursor-pointer mt-2"
        >
          <span>{page.title}</span>
          <p className="text-sm text-gray-500">{t("article")}</p>
        </Link>
      ))}
      {pages.length === 0 && (
        <span className="text-sm text-gray-500">{t("noResults")}</span>
      )}
    </div>
  );
};

export default Search;
