import { useTransition } from "react";
import { useTranslations } from "next-intl";
import { usePathname, useRouter, Link, pathnames } from "@/navigation";
import { useParams } from "next/navigation";
import Logo from "@/public/logo/new/Black.png";
import { motion } from "framer-motion";
import SocialLinks from "@/components/nav/socialLinks";
import ContactLinks from "@/components/nav/contactLinks";
import { handleMouseMove } from "@/utils/mouseCoords";
import { useViewContext } from "@/context/view";

export const Close = () => {
  const { openView } = useViewContext();

  return (
    <button type={"button"} onClick={() => openView(null)}>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        x="0px"
        y="0px"
        viewBox="0 0 64 64"
        className={
          "lg:size-[1.5vw] size-[3vh] hover:rotate-90 transition-transform duration-200 ease-in-out"
        }
      >
        <path d="M 16 14 C 15.488 14 14.976938 14.194937 14.585938 14.585938 C 13.804937 15.366937 13.804937 16.633063 14.585938 17.414062 L 29.171875 32 L 14.585938 46.585938 C 13.804938 47.366938 13.804937 48.633063 14.585938 49.414062 C 14.976937 49.805062 15.488 50 16 50 C 16.512 50 17.023062 49.805062 17.414062 49.414062 L 32 34.828125 L 46.585938 49.414062 C 47.366938 50.195063 48.633063 50.195062 49.414062 49.414062 C 50.195063 48.633062 50.195062 47.366937 49.414062 46.585938 L 34.828125 32 L 49.414062 17.414062 C 50.195063 16.633063 50.195062 15.366938 49.414062 14.585938 C 48.633062 13.804938 47.366937 13.804938 46.585938 14.585938 L 32 29.171875 L 17.414062 14.585938 C 17.023062 14.194938 16.512 14 16 14 z"></path>
      </svg>
    </button>
  );
};

const Language = ({ locale }: { locale: string }): JSX.Element => {
  const [isPending, startTransition] = useTransition(),
    pathname = usePathname(),
    params = useParams(),
    router = useRouter();

  const changeLanguage = (locale: string) => {
    startTransition(() =>
      router.replace(
        { pathname, params: params as any },
        { locale: locale, scroll: false },
      ),
    );
  };

  return (
    <button
      type={"button"}
      disabled={isPending}
      onClick={() => changeLanguage(locale)}
    >
      <p
        className={`${document.cookie.includes("NEXT_LOCALE=" + locale) ? "font-black" : "font-light"} uppercase font-gothic`}
      >
        {locale}
      </p>
    </button>
  );
};

const Page = ({ href }: { href: any }) => {
  const t = useTranslations("navigation.links"),
    { openView } = useViewContext();

  return (
    <div
      className={
        "flex flex-col overflow-hidden justify-start items-start h-[2.75rem] group"
      }
    >
      <Link
        href={href}
        className={"navigation-link font-slick font-light"}
        onClick={() => openView(null)}
      >
        {t(`${href.slice(1)}`)}
      </Link>
      <Link
        href={href}
        className={"navigation-link font-classic font-medium uppercase"}
        onClick={() => openView(null)}
      >
        {t(`${href.slice(1)}`)}
      </Link>
    </div>
  );
};

const Navigation = () => {
  const t = useTranslations("navigation.links"),
    { openView } = useViewContext();

  return (
    <motion.nav
      initial={{ x: "-100%" }}
      animate={{ x: "0" }}
      exit={{ x: "-100%" }}
      transition={{ duration: 0.2, ease: "easeInOut" }}
      className={`fixed left-0 top-0 z-30 h-[100dvh] lg:w-[44vw] w-full lg:px-[2vw] px-[4vw] py-[4vh] bg-rock-100 text-navy flex justify-between items-start flex-col overflow-x-hidden overflow-y-auto`}
      onMouseMove={handleMouseMove}
    >
      <div className={"navigation-section"}>
        <div className={"w-full flex justify-between items-center"}>
          <Close />
          <div
            className={
              "flex justify-end items-baseline gap-[8vw] md:gap-[2vw] text-base"
            }
          >
            <Language locale={"en"} />
            <Language locale={"fr"} />
          </div>
        </div>
        <div
          className={"w-full flex flex-col justify-start items-start gap-[0vh]"}
        >
          <Page href={"/sales"} />
          <Page href={"/sell-your-yacht"} />
          <Page href={"/charters"} />
          <Page href={"/new-constructions"} />
          <Page href={"/destinations"} />
          <Page href={"/management"} />
          <Page href={"/company"} />
          <Page href={"/partners"} />
          <Page href={"/news"} />
          <Page href={"/events"} />
          <Page href={"/recruitment"} />
          <div
            className={
              "flex flex-col overflow-hidden justify-start items-start h-[2.75rem] group"
            }
          >
            <button
              type={"button"}
              onClick={() => setTimeout(() => openView("contact"), 200)}
              className={"navigation-link font-slick font-light"}
            >
              {t("contact")}
            </button>
            <button
              type={"button"}
              onClick={() => setTimeout(() => openView("contact"), 200)}
              className={"navigation-link font-classic font-medium uppercase"}
            >
              {t("contact")}
            </button>
          </div>
        </div>
      </div>
      <div className={"navigation-section"}>
        <span
          className={
            "lg:hidden flex flex-col justify-center items-start gap-[2vh]"
          }
        >
          <Logo className={"w-[24vw]"} />
          <ContactLinks />
        </span>
        <span className={"lg:block hidden"}>
          <SocialLinks address={true} />
        </span>
        <div className={"w-full h-[0.25vh] bg-rock-200"} />
        <div className={"flex flex-col justify-start items-start"}>
          <span className={"lg:hidden block"}>
            <SocialLinks address={true} />
          </span>
          <span
            className={
              "lg:flex flex-col justify-center items-start gap-[2vh] hidden"
            }
          >
            <Logo className={"w-[8vw]"} />
            <ContactLinks />
          </span>
        </div>
      </div>
    </motion.nav>
  );
};

export default Navigation;
