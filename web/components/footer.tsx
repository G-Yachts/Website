"use client";

import Logo from "@/public/logo/new/Black.png";
import SocialLinks from "@/components/nav/socialLinks";
import { Link } from "@/navigation";
import { useTranslations } from "next-intl";
import { useViewContext } from "@/context/view";
import { motion } from "framer-motion";
import { useLocale } from "next-intl";

const Footer = () => {
  const t = useTranslations(),
    { openView, view } = useViewContext();

  return (
    <footer
      className={
        "w-full h-max flex flex-col justify-center items-center containerize lg:py-[6vh] py-[8vw] gap-[2vh] bg-rock-100"
      }
    >
      <div className={"w-full flex justify-between items-center"}>
        <Logo className={"lg:h-[2.5vw] h-[4vh]"} />
        <div className={"w-max"}>
          <SocialLinks address={false} />
        </div>
      </div>
      <div className={"w-full h-[0.25vh] bg-rock-200"} />
      <div
        className={"w-full flex justify-between items-center text-xs uppercase"}
      >
        <div
          className={"flex justify-start items-baseline flex-wrap gap-[2vw]"}
        >
          <Link href={"/sales"}>{t("navigation.links.sales")}</Link>
          <Link href={"/charters"}>{t("navigation.links.charters")}</Link>
          <Link href={"/management"}>{t("navigation.links.management")}</Link>
          <Link href={"/company"}>{t("navigation.links.company")}</Link>
          <button
            type={"button"}
            onClick={() => openView("contact")}
            className={"uppercase"}
          >
            {t("navigation.links.contact")}
          </button>
        </div>
        <div className={"flex justify-end items-baseline flex-wrap gap-[2vw]"}>
          <button
            type={"button"}
            onClick={() => openView("terms")}
            className={"uppercase"}
          >
            {t("footer.terms")}
          </button>
          <button
            type={"button"}
            onClick={() => openView("privacy")}
            className={"uppercase"}
          >
            {t("footer.privacy")}
          </button>
          <button
            type={"button"}
            onClick={() => openView("credits")}
            className={"uppercase"}
          >
            {t("footer.credits")}
          </button>
        </div>
      </div>
    </footer>
  );
};

const Modal = ({
  children,
  title,
}: {
  children: React.ReactNode;
  title:
    | string
    | React.ReactElement<any, string | React.JSXElementConstructor<any>>
    | React.ReactNodeArray;
}) => {
  const { openView } = useViewContext();

  return (
    <motion.section
      initial={{ scale: 0 }}
      animate={{ scale: 1 }}
      exit={{ scale: 0 }}
      transition={{ duration: 0.2, ease: "easeInOut" }}
      className={
        "fixed inset-0 w-full h-full flex justify-center items-center z-30 cursor-pointer"
      }
      onClick={() => openView(null)}
    >
      <div
        className={
          "bg-rock-100 w-[92vw] md:w-[72vw] lg:w-[32vw] h-max max-h-[72vh] cursor-default drop-shadow-2xl flex flex-col justify-start md:justify-start items-center gap-[2vh] p-[2vh] overflow-y-auto"
        }
        onClick={(e) => e.stopPropagation()}
      >
        <div className={"w-full flex justify-between items-center"}>
          <h3 className={"font-slick font-light py-[0.1rem]"}>{title}</h3>
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
        </div>
        {children}
      </div>
    </motion.section>
  );
};

export const Credits = () => {
  const t = useTranslations("credits"),
    locale = useLocale();

  return (
    <Modal
      title={t.rich("title", {
        classic: (chunk) => (
          <span className={"font-classic uppercase font-medium"}>{chunk}</span>
        ),
      })}
    >
      <div
        className={"w-full flex flex-col justify-center items-center gap-[2vh]"}
      >
        <h5
          className={
            "w-full font-slick font-light text-center text-2xl tracking-tighter"
          }
        >
          {t.rich("description", {
            br: () => <br></br>,
            classic: (chunk) => (
              <span
                className={
                  "font-classic font-medium uppercase hover:underline tracking-tight text-blue-900"
                }
              >
                {chunk}
              </span>
            ),
            greg: (chunk) => (
              <a href={"https://gregory-buffard.com"} target={"_blank"}>
                {chunk}
              </a>
            ),
            maks: (chunk) => (
              <a
                href={"https://www.linkedin.com/in/maksym-petriv-b6ba062a0"}
                target={"_blank"}
              >
                {chunk}
              </a>
            ),
            malo: (chunk) => (
              <a href={"https://agencemalo.com"} target={"_blank"}>
                {chunk}
              </a>
            ),
          })}
        </h5>
        <label className={"text-center"}>
          G-Yachts &copy; {new Date().getFullYear()}
          <br />
          <span className={"normal-case"}>
            {t.rich("manufacture", {
              heart: () => (
                <>
                  {locale === "fr" && <span>&apos;</span>}
                  <span>&#10084;&#65039;</span>
                </>
              ),
            })}
          </span>
        </label>
      </div>
    </Modal>
  );
};

export const Privacy = () => {
  const t = useTranslations("privacy");

  return (
    <Modal
      title={t.rich("title", {
        classic: (chunk) => (
          <span className={"font-classic uppercase"}>{chunk}</span>
        ),
      })}
    >
      <p className={"w-full text-justify"}>
        {t.rich("description", {
          a: (chunk) => (
            <a
              href={"mailto:info@g-yachts.com"}
              className={"underline text-blue-500"}
            >
              {chunk}
            </a>
          ),
        })}
      </p>
    </Modal>
  );
};

export const Terms = () => {
  const t = useTranslations("terms"),
    locale = useLocale();

  return (
    <Modal
      title={t.rich("title", {
        classic: (chunk) => (
          <>
            {locale === "fr" && <>&apos;</>}
            <span className={"font-classic uppercase"}>{chunk}</span>
          </>
        ),
      })}
    >
      <p className={"w-full text-justify"}>
        {t.rich("description", {
          a: (chunk) => (
            <a
              href={"mailto:info@g-yachts.com"}
              className={"underline text-blue-500"}
            >
              {chunk}
            </a>
          ),
        })}
      </p>
    </Modal>
  );
};

export default Footer;
