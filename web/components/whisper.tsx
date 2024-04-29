"use client";

import { useEffect, useState } from "react";

const Whisper = ({ type, label }: { type: "link" | "copy"; label: string }) => {
  const [mouse, setMouse] = useState<{ x: number; y: number }>({ x: 0, y: 0 });

  useEffect(() => {
    const updateMouse = (e: MouseEvent) =>
      setMouse({ x: e.clientX, y: e.clientY });

    window.addEventListener("mousemove", updateMouse);
    return () => window.removeEventListener("mousemove", updateMouse);
  }, []);

  const icon = (action: typeof type, className?: string): JSX.Element => {
    switch (action) {
      case "link":
        return (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            x="0px"
            y="0px"
            viewBox="0 0 72 72"
            className={className}
          >
            <path d="M 43 12 C 40.791 12 39 13.791 39 16 C 39 18.209 40.791 20 43 20 L 46.34375 20 L 35.171875 31.171875 C 33.609875 32.733875 33.609875 35.266125 35.171875 36.828125 C 35.951875 37.608125 36.977 38 38 38 C 39.023 38 40.048125 37.608125 40.828125 36.828125 L 52 25.65625 L 52 29 C 52 31.209 53.791 33 56 33 C 58.209 33 60 31.209 60 29 L 60 16 C 60 13.791 58.209 12 56 12 L 43 12 z M 23 14 C 18.037 14 14 18.038 14 23 L 14 49 C 14 53.962 18.037 58 23 58 L 49 58 C 53.963 58 58 53.962 58 49 L 58 41 C 58 38.791 56.209 37 54 37 C 51.791 37 50 38.791 50 41 L 50 49 C 50 49.551 49.552 50 49 50 L 23 50 C 22.448 50 22 49.551 22 49 L 22 23 C 22 22.449 22.448 22 23 22 L 31 22 C 33.209 22 35 20.209 35 18 C 35 15.791 33.209 14 31 14 L 23 14 z"></path>
          </svg>
        );
      case "copy":
        return (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            x="0px"
            y="0px"
            viewBox="0 0 72 72"
            className={className}
          >
            <path d="M 46.607422 10.400391 C 42.766172 10.400391 38.924 11.863109 36 14.787109 L 27.515625 23.271484 C 21.667625 29.119484 21.667625 38.636375 27.515625 44.484375 C 28.243625 45.213375 29.021656 45.849531 29.847656 46.394531 L 32.21875 44.023438 C 33.10775 43.134438 34.412438 41.81475 35.773438 40.46875 C 34.819437 40.13575 33.928875 39.585125 33.171875 38.828125 C 30.442875 36.099125 30.442875 31.658687 33.171875 28.929688 L 41.65625 20.443359 C 44.38625 17.714359 48.827641 17.714359 51.556641 20.443359 C 54.285641 23.172359 54.285641 27.61475 51.556641 30.34375 L 51.316406 30.582031 C 52.673406 33.722031 53.139656 37.160234 52.722656 40.490234 C 52.910656 40.317234 53.073547 40.139344 53.185547 40.027344 L 57.212891 36 C 63.060891 30.152 63.060891 20.635109 57.212891 14.787109 C 54.288891 11.863109 50.448672 10.400391 46.607422 10.400391 z M 42.152344 25.605469 L 39.78125 27.976562 C 38.89225 28.865562 37.587562 30.18525 36.226562 31.53125 C 37.180562 31.86425 38.071125 32.414875 38.828125 33.171875 C 41.557125 35.900875 41.557125 40.341313 38.828125 43.070312 L 30.34375 51.556641 C 27.61375 54.285641 23.172359 54.285641 20.443359 51.556641 C 17.714359 48.827641 17.714359 44.38525 20.443359 41.65625 L 20.683594 41.417969 C 19.326594 38.277969 18.860344 34.839766 19.277344 31.509766 C 19.089344 31.682766 18.926453 31.860656 18.814453 31.972656 L 14.787109 36 C 8.9391094 41.848 8.9391094 51.364891 14.787109 57.212891 C 20.635109 63.060891 30.152 63.060891 36 57.212891 L 44.484375 48.728516 C 50.332375 42.880516 50.332375 33.363625 44.484375 27.515625 C 43.756375 26.786625 42.978344 26.150469 42.152344 25.605469 z"></path>
          </svg>
        );
    }
  };

  return (
    <label
      className={
        "absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-200 ease-in-out z-50 w-max h-max translate-x-[var(--mouse-x)] translate-y-[--mouse-y] text-rock-100 fill-rock-100 bg-navy text-xs lg:flex hidden justify-center items-center pl-[0.27rem] pr-[0.4rem] pb-[0.15rem] pt-[0.2rem] rounded-lg bg-opacity-75 backdrop-blur-sm border-white/10 border-[0.15rem] normal-case group-active:scale-75"
      }
    >
      {icon(type, "w-[1rem]")}
      <span>{label}</span>
    </label>
  );
};

export default Whisper;
