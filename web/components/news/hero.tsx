import { Link } from "@/navigation";
import { IArticle } from "@/types/article";
import clsx from "clsx";
import { useTranslations } from "next-intl";

const Hero = ({
    article,
    categories,
    selectedCategory,
    selectedYear,
    selectedMonth,
}: {
    article: IArticle;
    categories: string[];
    selectedCategory?: string;
    selectedYear?: string;
    selectedMonth?: string;
}) => {
    const t = useTranslations("news");
    return (
        <div className="w-full h-[36dvh] md:h-screen mt-[24vh] md:mt-0">
            <div className="h-1/3 flex flex-col justify-end items-center">
                <Link
                    href={{
                        pathname: "/news",
                    }}>
                    <h2 className={"font-slick font-light"}>
                        {t.rich("title", {
                            classic: (chunk) => (
                                <span className={"font-classic uppercase font-medium"}>
                                    {chunk}
                                </span>
                            ),
                        })}
                    </h2>
                </Link>
                <div className="flex flex-row flex-wrap justify-center gap-4 my-10 ">
                    {categories.map((category, index) => (
                        <Link
                            href={{
                                pathname: "/news",
                                query:
                                    selectedCategory === category
                                        ? {
                                              category: undefined,
                                              year: selectedYear,
                                              month: selectedMonth,
                                          }
                                        : {
                                              category: category,
                                              year: selectedYear,
                                              month: selectedMonth,
                                          },
                            }}
                            shallow={true}
                            key={index}
                            className={clsx(
                                "uppercase text-xl transition-all hover:underline mx-5",
                                {
                                    underline: category === selectedCategory,
                                }
                            )}>
                            {category}
                        </Link>
                    ))}
                </div>
            </div>
            <Link
                href={{ pathname: "/news/[slug]", params: { slug: article.slug } }}
                className={
                    "w-full px-[4vw] md:px-[8vw] h-2/3 bg-cover bg-center flex flex-col justify-end items-start text-white uppercase py-[2vh] md:py-[6vh]"
                }
                style={{
                    backgroundImage: `url(${encodeURI(article.image.sizes.fhd.url)})`,
                }}>
                <h4>{article.category.title}</h4>
                <h2 className={"normal-case font-slick lg:text-5xl md:text-4xl text-xl"}>
                    {article.title}
                </h2>
            </Link>
        </div>
    );
};

export default Hero;
