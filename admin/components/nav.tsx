"use client";

import { useViewContext, views } from "@/context/view";
import { Button } from "@nextui-org/react";

const Selector = ({ open }: { open: (typeof views)[number] }) => {
  const { openView } = useViewContext();

  return (
    <Button
      isIconOnly={true}
      variant={"shadow"}
      onClick={() => openView(open)}
      className={`size-[4vh] fill-neutral-100 text-neutral-800 p-[0.5vh] rounded-2xl bg-gradient-to-tr ${open === "dashboard" ? "from-neutral-500 to-neutral-400" : open === "yachts" ? "from-blue-500 to-blue-400" : ""}`}
    >
      {open === "dashboard" ? (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          x="0px"
          y="0px"
          viewBox="0 0 72 72"
        >
          <path d="M 36 10 C 34.861 10 33.722922 10.386609 32.794922 11.162109 L 11.517578 28.941406 C 10.052578 30.165406 9.5519375 32.270219 10.460938 33.949219 C 11.711938 36.258219 14.661453 36.740437 16.564453 35.148438 L 35.359375 19.445312 C 35.730375 19.135313 36.269625 19.135313 36.640625 19.445312 L 55.435547 35.148438 C 56.183547 35.774437 57.093047 36.078125 57.998047 36.078125 C 59.171047 36.078125 60.333953 35.567219 61.126953 34.574219 C 62.503953 32.850219 62.112922 30.303672 60.419922 28.888672 L 58 26.867188 L 58 16.667969 C 58 15.194969 56.805984 14 55.333984 14 L 52.667969 14 C 51.194969 14 50 15.194969 50 16.667969 L 50 20.181641 L 39.205078 11.162109 C 38.277078 10.386609 37.139 10 36 10 z M 35.996094 22.925781 L 13.996094 41.302734 L 13.996094 50 C 13.996094 54.418 17.578094 58 21.996094 58 L 49.996094 58 C 54.414094 58 57.996094 54.418 57.996094 50 L 57.996094 41.302734 L 35.996094 22.925781 z M 32 38 L 40 38 C 41.105 38 42 38.895 42 40 L 42 50 L 30 50 L 30 40 C 30 38.895 30.895 38 32 38 z"></path>
        </svg>
      ) : open === "yachts" ? (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          x="0px"
          y="0px"
          viewBox="0 0 72 72"
        >
          <path d="M 36 7 C 34.343 7 33 8.343 33 10 L 33 13 L 31 13 C 28.24 13 26 15.24 26 18 L 26 19 L 24 19 C 21.24 19 19 21.24 19 24 L 19 25.830078 L 34.140625 22.220703 C 34.750625 22.070703 35.38 22 36 22 C 36.62 22 37.249609 22.070703 37.849609 22.220703 L 53 25.830078 L 53 24 C 53 21.24 50.76 19 48 19 L 46 19 L 46 18 C 46 15.24 43.76 13 41 13 L 39 13 L 39 10 C 39 8.343 37.657 7 36 7 z M 36 25.998047 C 35.6875 25.998047 35.375312 26.034375 35.070312 26.109375 L 14.070312 31.109375 C 12.860313 31.399375 11.839844 32.240625 11.339844 33.390625 C 10.829844 34.530625 10.9 35.849453 11.5 36.939453 L 16.269531 45.519531 L 16.5 46.349609 C 18.25 45.559609 20.38 45 23 45 C 30.633 45 34.226219 49.741 35.949219 51 C 35.950219 51.001 35.988 51 36 51 C 36.012 51 36.049781 51.001 36.050781 51 C 37.864781 49.674 41.388 45 49 45 C 51.59 45 53.709219 45.540312 55.449219 46.320312 L 55.689453 45.400391 L 60.480469 36.980469 C 61.100469 35.880469 61.169922 34.560156 60.669922 33.410156 C 60.169922 32.250156 59.149687 31.399375 57.929688 31.109375 L 36.929688 26.109375 C 36.624688 26.034375 36.3125 25.998047 36 25.998047 z M 26.5 35 C 27.881 35 29 36.119 29 37.5 L 29 39.5 C 29 40.881 27.881 42 26.5 42 C 25.119 42 24 40.881 24 39.5 L 24 37.5 C 24 36.119 25.119 35 26.5 35 z M 45.5 35 C 46.881 35 48 36.119 48 37.5 L 48 39.5 C 48 40.881 46.881 42 45.5 42 C 44.119 42 43 40.881 43 39.5 L 43 37.5 C 43 36.119 44.119 35 45.5 35 z M 23 49 C 18.264 49 15.6915 51.333109 13.8125 53.037109 C 12.2735 54.434109 11.585 55 10 55 C 7.791 55 6 56.791 6 59 C 6 61.209 7.791 63 10 63 C 14.736 63 17.3095 60.666891 19.1875 58.962891 C 20.7275 57.565891 21.415 57 23 57 C 24.585 57 25.2735 57.565891 26.8125 58.962891 C 28.6915 60.666891 31.264 63 36 63 C 40.733 63 43.3085 60.667844 45.1875 58.964844 C 46.7285 57.567844 47.416 57 49 57 C 50.585 57 51.2725 57.566891 52.8125 58.962891 C 54.6915 60.666891 57.265 63 62 63 C 64.209 63 66 61.209 66 59 C 66 56.791 64.209 55 62 55 C 60.415 55 59.7275 54.433109 58.1875 53.037109 C 56.3085 51.333109 53.735 49 49 49 C 44.267 49 41.6915 51.332156 39.8125 53.035156 C 38.2715 54.432156 37.584 55 36 55 C 34.415 55 33.7275 54.434109 32.1875 53.037109 C 30.3095 51.333109 27.736 49 23 49 z"></path>
        </svg>
      ) : (
        <></>
      )}
    </Button>
  );
};

const Nav = () => {
  return (
    <nav
      className={
        "fixed bottom-[4vh] z-50 w-full flex justify-center items-center"
      }
    >
      <div
        className={
          "bg-neutral-300/50 border-neutral-300/25 border-[0.25vh] backdrop-blur-2xl px-[2vw] py-[1vh] rounded-3xl flex justify-center items-center gap-[4vw]"
        }
      >
        {views.map((view, _) => (
          <Selector key={view} open={view} />
        ))}
      </div>
    </nav>
  );
};

export default Nav;
