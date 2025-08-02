"use client";

import { IArticle } from "@/types/article";
import { Link } from "@/navigation";
import { useTranslations } from "next-intl";
import { useEffect, useState } from "react";
import { clsx } from "clsx";
import { useSearchParams } from "next/navigation";
import Image from "next/image";

const Articles = ({ articles, locale }: { articles: IArticle[]; locale: string }) => {
    const t = useTranslations("news");
    // Get all years from articles
    const years = articles.map((article) => new Date(article.date).getFullYear());
    // Get unique years
    const uniqueYears = years.filter((year, index) => years.indexOf(year) === index);
    const selectedCategory = useSearchParams().get("category") || undefined;
    const selectedYear = useSearchParams().get("year");
    const selectedMonth = useSearchParams().get("month");
    // State to store the opened year
    const [openedYear, setOpenedYear] = useState(selectedYear ?? uniqueYears[0]);
    // State to store the filtered articles
    const filteredArticles = articles
        .filter((article) => {
            if (!selectedYear) return true;
            if (selectedYear) {
                if (selectedMonth) {
                    return (
                        new Date(article.date).getFullYear() == parseInt(selectedYear) &&
                        new Date(article.date).getMonth() == parseInt(selectedMonth)
                    );
                }
                return new Date(article.date).getFullYear() == parseInt(selectedYear);
            }
        })
        .filter((article) => {
            if (selectedCategory) {
                return article.category.title === selectedCategory;
            }
            return true;
        })
        .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

    // Limit the number of articles to show
    const articleLimitConst = 4;
    const [articlesLimit, setArticlesLimit] = useState(articleLimitConst);

    // // Reset the selected month when the year changes
    // useEffect(() => {
    //   setSelectedMonth(undefined);
    // }, [openedYear]);

    // // Filter the articles based on the selected month and year
    // useEffect(() => {
    //   // Show only that are older than the selected month and year
    //   const selectedDate = new Date(openedYear, selectedMonth || 11);
    //   const newFilteredArticles = articles.filter(
    //     (article) => new Date(article.date) <= selectedDate,
    //   );
    //   setFilteredArticles(newFilteredArticles);
    // }, [selectedMonth, openedYear]);

    // // Filter the articles based on the selected category
    // useEffect(() => {
    //   if (selectedCategory) {
    //     const newFilteredArticles = articles.filter((article) => {
    //       return article.category.title === selectedCategory;
    //     });
    //     setFilteredArticles(newFilteredArticles);
    //   } else {
    //     setFilteredArticles(articles);
    //   }
    //   setOpenedYear(uniqueYears[0]);
    //   setSelectedMonth(undefined);
    // }, [selectedCategory]);

    return (
        <div className="my-28 flex flex-col-reverse lg:flex-row">
            <div className="flex flex-col w-full lg:w-3/4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-[2vh]">
                    {filteredArticles.length === 0 && (
                        <h2 className="mt-16 lg:mt-0">{t("noArticles")}</h2>
                    )}
                    {filteredArticles.map((article, index) => (
                        <ArticleCard key={index} article={article} locale={locale} />
                    ))}
                </div>
                {filteredArticles.length > articlesLimit + 1 && (
                    <span
                        onClick={() => setArticlesLimit(articlesLimit + articleLimitConst)}
                        className="glass-button mx-auto mt-16 cursor-pointer h-min my-auto">
                        {t("loadMore")}
                    </span>
                )}
            </div>
            <div className="w-full lg:w-1/4 lg:ml-10 lg:pl-10 lg:border-l-2 border-gray-700 flex flex-row flex-wrap lg:flex-col">
                {uniqueYears.map((year, index) => (
                    <div className="flex flex-col my-4 mr-4" key={index}>
                        <div
                            className="flex flex-row w-full justify-between cursor-pointer"
                            onClick={() => setOpenedYear(year)}>
                            <h4
                                className={clsx("text-2xl", {
                                    "font-bold w-full": openedYear === year,
                                })}>
                                {year}
                            </h4>
                            <img
                                src="/icons/arrow.svg"
                                alt="arrow"
                                className={clsx(
                                    "h-6 w-6 transition-transform duration-200 hidden lg:block",
                                    {
                                        "transform rotate-90": openedYear !== year,
                                        "transform rotate-0": openedYear === year,
                                    }
                                )}
                            />
                        </div>
                        {openedYear === year && (
                            <div className="flex flex-row lg:flex-col flex-wrap gap-2 mt-2">
                                {Array(12)
                                    .fill(0)
                                    .map((_, i) => (
                                        <Link
                                            href={{
                                                pathname: "/news",
                                                query: {
                                                    year: year,
                                                    month: i,
                                                    category: selectedCategory || undefined,
                                                },
                                            }}
                                            className={clsx("cursor-pointer", {
                                                "font-bold":
                                                    selectedYear &&
                                                    parseInt(selectedYear) === year &&
                                                    selectedMonth &&
                                                    parseInt(selectedMonth) == i,
                                            })}
                                            key={i}>
                                            {new Date(year, i).toLocaleString(locale, {
                                                month: "long",
                                            })}
                                        </Link>
                                    ))}
                            </div>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
};

const ArticleCard = ({ article, locale }: { article: IArticle; locale: string }) => {
    const t = useTranslations("news");
    return (
        <Link
            href={{
                pathname: "/news/[slug]",
                params: { slug: article.slug },
            }}
            className="flex justify-start items-start flex-col gap-[2vh]">
            <Image
                src={encodeURI(article.image.sizes.fhd.url)}
                width={article.image.sizes.fhd.width}
                height={article.image.sizes.fhd.height}
                alt={article.image.alt}
                className={"w-full h-[32vh] object-cover object-center"}
            />
            <div className={"flex flex-col justify-start items-start gap-[1vh]"}>
                <p className={"uppercase"}>{article.category.title}</p>
                <h3 className="font-slick font-light text-2xl">{article.title}</h3>
                <p className="text-gray-400 uppercase underline">{t("readArticle")}</p>
            </div>
        </Link>
    );
};

export default Articles;
