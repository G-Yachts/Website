"use client";

import Logo from "@/public/logo/new/Black.png";
import { useTranslations } from "next-intl";
import { useEffect, useState } from "react";
import { useViewContext } from "@/context/view";
import { Link } from "@/navigation";
import { clsx } from "clsx";

const Bar = ({ dynamicColor }: { dynamicColor: number }) => {
    const t = useTranslations("bar"),
        { openView } = useViewContext(),
        [isScrolled, setScrolled] = useState<boolean>(false);

    useEffect(() => {
        if (dynamicColor === -1) setScrolled(true);

        const handleScroll = () => {
            const position = window.scrollY;
            const threshold = dynamicColor;
            if (position > threshold) setScrolled(true);
            else if (position <= threshold) setScrolled(false);
        };

        window.addEventListener("scroll", handleScroll);

        return () => window.removeEventListener("scroll", handleScroll);
    }, [isScrolled]);

    return (
        <>
            <div
                className={`fixed w-full h-[16vh] top-0 z-10 bg-gradient-to-b from-stone-100 from-10% transition-opacity duration-200 ease-in-out ${isScrolled ? "opacity-100" : "opacity-0"}`}
            />
            <Link
                href={"/"}
                className={"fixed top-0 lg:h-[2.5vw] h-[4vh] lg:z-20 lg:my-[4vh] my-[2vh] z-10"}>
                <Logo
                    className={`w-full h-full transition-[fill] duration-200 ease-in-out ${isScrolled ? "fill-black" : "fill-white"}`}
                />
            </Link>
            <section
                className={`fixed top-0 flex justify-between items-center lg:py-[4vh] py-[2vh] containerize z-10`}>
                <div className="flex justify-center items-center">
                    <button
                        onClick={() => openView("navigation")}
                        className={`center flex-col lg:w-[2vw] w-[4vw] group lg:hover:gap-[0.75vh] ${isScrolled ? "fill-black" : "fill-white"}`}>
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 128 8"
                            className={"burger-bar"}>
                            <rect width="128" height="8" rx="4" />
                        </svg>
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 128 8"
                            className={
                                "burger-bar my-[0.30rem] lg:group-hover:my-[0.48rem] lg:transition-[margin] duration-200 ease-in-out"
                            }>
                            <rect width="128" height="8" rx="4" />
                        </svg>
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 128 8"
                            className={"burger-bar"}>
                            <rect width="128" height="8" rx="4" />
                        </svg>
                    </button>
                    <button
                        type={"button"}
                        onClick={() => openView("search")}
                        className="lg:hidden ml-4">
                        <img
                            src={`/icons/search-light.svg`}
                            alt={"Search"}
                            className={clsx("w-4 h-4 transition-all duration-300", {
                                invert: isScrolled,
                            })}
                        />
                    </button>
                </div>
                <div className={"flex justify-center items-center"}>
                    <button
                        type={"button"}
                        onClick={() => openView("search")}
                        className="hidden lg:block mr-4">
                        <img
                            src={`/icons/search-light.svg`}
                            alt={"Search"}
                            className={clsx("w-6 h-6 transition-all duration-300", {
                                invert: isScrolled,
                            })}
                        />
                    </button>
                    <button
                        type={"button"}
                        onClick={() => openView("contact")}
                        className={`glass-button ${isScrolled ? "glass-button-dark" : "glass-button-light"}`}>
                        <span className={"lg:hidden block uppercase"}>Contact</span>
                        <span className={"hidden lg:block"}>{t("CTA")}</span>
                    </button>
                </div>
            </section>
        </>
    );
};

export default Bar;
