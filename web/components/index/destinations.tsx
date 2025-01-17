"use client";

import { IDestination } from "@/types/destination";
import { useTranslations } from "next-intl";
import { Link } from "@/navigation";
import { useEffect, useState } from "react";

const Card = ({ card }: { card: IDestination }) => {
  return (
    <Link
      href={{ pathname: "/destinations/[slug]", params: { slug: card.slug } }}
      className={
        " flex flex-col w-max justify-center items-start font-classic font-normal tracking-wider group transition-transform lg:duration-[var(--animate-destination)] ease-in-out lg:translate-x-[var(--translate-destination)] pr-[1.5vw]"
      }
    >
      <div
        className={
          "transition-[background-color]  bg-cover bg-center duration-200 ease-in-out md:w-[18.5vw] md:h-[55vh] w-[35vw] h-[25vh] flex justify-start items-start mb-[1vh]"
        }
        style={{
          backgroundImage: `url(${encodeURI(card.photos.featured.sizes.fhd.url)})`,
        }}
      >
        <div
          className={"flex flex-col p-[1vh] md:px-6 md:py-4 px-1 text-white"}
        >
          <h3 className={"md:text-2xl text-lg font-slick px-[1vw] md:p-0"}>
            {card.destination}
          </h3>
          <h3 className={"md:text-base text-sm font-classic px-[1vw] md:p-0"}>
            {card.country}
          </h3>
        </div>
      </div>
    </Link>
  );
};

const CarouselButton = ({
  direction,
  onClick,
}: {
  direction: string;
  onClick: () => void;
}) => {
  return (
    <button
      type={"button"}
      onClick={onClick}
      className={
        "p-[0.25vw] rounded-full border-[0.25vh] hover:bg-teal hover:border-teal [transition:_background-color_200ms_ease-in-out,_border-color_200ms_ease-in-out]"
      }
    >
      {direction === "next" ? (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          x="0px"
          y="0px"
          viewBox="0 0 64 64"
          className={"size-[1.5vw]"}
        >
          <path d="M 37.546875 15.041016 C 37.034875 15.032766 36.520047 15.219516 36.123047 15.603516 C 35.330047 16.371516 35.309125 17.638641 36.078125 18.431641 L 47.279297 30 L 12 30 C 10.896 30 10 30.896 10 32 C 10 33.104 10.896 34 12 34 L 47.279297 34 L 36.078125 45.568359 C 35.310125 46.361359 35.330047 47.627484 36.123047 48.396484 C 36.512047 48.772484 37.014625 48.960938 37.515625 48.960938 C 38.037625 48.960938 38.560172 48.757562 38.951172 48.351562 L 53.435547 33.390625 C 54.186547 32.615625 54.186547 31.384375 53.435547 30.609375 L 38.951172 15.648438 C 38.568172 15.251437 38.058875 15.049266 37.546875 15.041016 z"></path>
        </svg>
      ) : (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          x="0px"
          y="0px"
          viewBox="0 0 64 64"
          className={"size-[1.5vw]"}
        >
          <path d="M 26.451172 15.041016 C 25.939297 15.049266 25.432328 15.251437 25.048828 15.648438 L 10.5625 30.609375 C 9.8115 31.384375 9.8115 32.615625 10.5625 33.390625 L 25.048828 48.351562 C 25.440828 48.756562 25.962375 48.960938 26.484375 48.960938 C 26.985375 48.960938 27.487953 48.772484 27.876953 48.396484 C 28.669953 47.628484 28.690875 46.361359 27.921875 45.568359 L 16.720703 34 L 52 34 C 53.104 34 54 33.104 54 32 C 54 30.896 53.104 30 52 30 L 16.720703 30 L 27.921875 18.431641 C 28.689875 17.638641 28.669953 16.372516 27.876953 15.603516 C 27.479953 15.219516 26.963047 15.032766 26.451172 15.041016 z"></path>
        </svg>
      )}
    </button>
  );
};

const Destinations = ({ data }: { data: IDestination[] }) => {
  const t = useTranslations("index.destinations"),
    carouselExtended = [...data, ...data, ...data, ...data],
    defaultTranslate = data.length * -100,
    setTranslate = (amount: number) => {
      document.documentElement.style.setProperty(
        "--translate-destination",
        `${amount}%`,
      );
    },
    getTranslation = () =>
      parseInt(
        document.documentElement.style.getPropertyValue(
          "--translate-destination",
        ),
      ),
    setAnimate = (duration: number) =>
      document.documentElement.style.setProperty(
        "--animate-destination",
        `${duration}ms`,
      ),
    [paused, pause] = useState<boolean>(false);

  useEffect(() => {
    setTranslate(defaultTranslate);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      if (!paused) translate("next");
    }, 5000);

    return () => clearInterval(interval);
  }, [paused]);

  const translate = (direction: string) => {
    const delta = direction === "next" ? -100 : 100;
    setAnimate(500);
    setTranslate(getTranslation() + delta);
    if (getTranslation() === defaultTranslate * 2 || getTranslation() === 0) {
      setTimeout(() => {
        setAnimate(0);
        setTranslate(defaultTranslate);
      }, 500);
    }
  };

  return (
    <section className="w-full flex flex-col justify-center py-[4vh]">
      <div className="containerize flex justify-between items-center">
        <h1 className="font-slick font-light lg:py-16 lg:px-32">
          {t.rich("title", {
            classic: (chunks) => (
              <span className="font-classic uppercase font-medium">
                {chunks}
              </span>
            ),
          })}
        </h1>
        <div className="flex justify-center items-center gap-[2vw]">
          <div className="hidden lg:flex justify-center items-center mt-36 mr-10 gap-[0.5vw]">
            <CarouselButton
              direction="previous"
              onClick={() => {
                translate("previous");
                pause(true);
                setTimeout(() => pause(false), 5000);
              }}
            />
            <CarouselButton
              direction="next"
              onClick={() => {
                translate("next");
                pause(true);
                setTimeout(() => pause(false), 5000);
              }}
            />
          </div>
        </div>
      </div>
      <div className="flex md:flex-row flex-col w-full justify-center ">
        <div className="md:w-[33vw] w-full flex flex-col items-start justify-center">
          <p
            className={
              "flex flex-col text-left lg:pl-44 px-4 mt-10 lg:max-w-[27vw] w-full"
            }
          >
            {t("description")}
          </p>
          <Link
            href={"/destinations"}
            type={"button"}
            className="glass-button glass-button-dark lg:ml-44 ml-4 lg:mt-10 mt-5 whitespace-nowrap"
          >
            {t("CTA")}
          </Link>
        </div>
        <div className={"md:w-[62vw] pb-12"}>
          <div
            className={
              "lg:hidden h-full w-full flex justify-start lg:overflow-x-hidden overflow-x-scroll  py-[2vh]"
            }
          >
            {data.map((card, i) => (
              <Card key={i} card={card} />
            ))}
          </div>
          <div
            className={
              "hidden h-max w-full lg:flex justify-start  lg:overflow-x-hidden overflow-x-scroll  py-[2vh]"
            }
          >
            {carouselExtended.map((card, i) => (
              <Card key={i} card={card} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Destinations;
