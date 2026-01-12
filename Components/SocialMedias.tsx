import React from "react";
import {
  SiGoogle,
  SiTiktok,
  SiSpotify,
} from "react-icons/si";
import { FaDiscord } from "react-icons/fa";
import {
  Github,
  Twitter,
  Instagram,
  Facebook,
  Linkedin,
  Code,
} from "lucide-react";
import { useAnimate } from "framer-motion";

export const ClipPathLinks = () => {
  return (
    <div className="divide-y border divide-border border-border">
      <div className="grid grid-cols-3 divide-x divide-border">
        <LinkBox Icon={Github} href="https://github.com/kamaleshsa" />
        <LinkBox Icon={Twitter} href="https://x.com/Neutru_io" />
        <LinkBox Icon={Linkedin} href="https://www.linkedin.com/in/neutru-io-b097ab3a0/" />
      </div>
      <div className="grid grid-cols-3 divide-x divide-border">
        <LinkBox Icon={Instagram} href="https://www.instagram.com/neutru.io/" />
        <LinkBox Icon={Facebook} href="https://www.facebook.com/share/16Zgo4MK6M/" />
        <LinkBox Icon={FaDiscord} href="https://discord.gg/jSNXCReC" />
      </div>
    </div>
  );
};

const NO_CLIP = "polygon(0 0, 100% 0, 100% 100%, 0% 100%)";
const BOTTOM_RIGHT_CLIP = "polygon(0 0, 100% 0, 0 0, 0% 100%)";
const TOP_RIGHT_CLIP = "polygon(0 0, 0 100%, 100% 100%, 0% 100%)";
const BOTTOM_LEFT_CLIP = "polygon(100% 100%, 100% 0, 100% 100%, 0 100%)";
const TOP_LEFT_CLIP = "polygon(0 0, 100% 0, 100% 100%, 100% 0)";

const ENTRANCE_KEYFRAMES = {
  left: [BOTTOM_RIGHT_CLIP, NO_CLIP],
  bottom: [BOTTOM_RIGHT_CLIP, NO_CLIP],
  top: [BOTTOM_RIGHT_CLIP, NO_CLIP],
  right: [TOP_LEFT_CLIP, NO_CLIP],
};

const EXIT_KEYFRAMES = {
  left: [NO_CLIP, TOP_RIGHT_CLIP],
  bottom: [NO_CLIP, TOP_RIGHT_CLIP],
  top: [NO_CLIP, TOP_RIGHT_CLIP],
  right: [NO_CLIP, BOTTOM_LEFT_CLIP],
};

const LinkBox = ({ Icon, href, imgSrc, className }: { Icon?: any; href: string; imgSrc?: string; className?: string }) => {
  const [scope, animate] = useAnimate();

  const getNearestSide = (e: React.MouseEvent<HTMLAnchorElement>): "left" | "right" | "top" | "bottom" => {
    const box = (e.target as HTMLElement).getBoundingClientRect();

    const proximityToLeft = {
      proximity: Math.abs(box.left - e.clientX),
      side: "left",
    };
    const proximityToRight = {
      proximity: Math.abs(box.right - e.clientX),
      side: "right",
    };
    const proximityToTop = {
      proximity: Math.abs(box.top - e.clientY),
      side: "top",
    };
    const proximityToBottom = {
      proximity: Math.abs(box.bottom - e.clientY),
      side: "bottom",
    };

    const sortedProximity = [
      proximityToLeft,
      proximityToRight,
      proximityToTop,
      proximityToBottom,
    ].sort((a, b) => a.proximity - b.proximity);

    return sortedProximity[0].side as "left" | "right" | "top" | "bottom";
  };

  const handleMouseEnter = (e: React.MouseEvent<HTMLAnchorElement>) => {
    const side = getNearestSide(e);
    animate(scope.current, {
      clipPath: ENTRANCE_KEYFRAMES[side],
    });
  };

  const handleMouseLeave = (e: React.MouseEvent<HTMLAnchorElement>) => {
    const side = getNearestSide(e);
    animate(scope.current, {
      clipPath: EXIT_KEYFRAMES[side],
    });
  };

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className="relative grid h-20 w-full place-content-center sm:h-28 md:h-36 text-foreground bg-background"
    >
      {imgSrc ? (
        <img
          src={imgSrc}
          alt="custom icon"
          className={className ?? "max-h-10 sm:max-h-16 md:max-h-20 object-contain"}
        />
      ) : (
        <Icon className="text-xl sm:text-3xl md:text-4xl" />
      )}

      <div
        ref={scope}
        style={{ clipPath: BOTTOM_RIGHT_CLIP }}
        className="absolute inset-0 grid place-content-center bg-white text-black transition-colors duration-300"
      >
        {imgSrc ? (
          <img
            src={imgSrc}
            alt="custom icon hover"
            className={className ?? "max-h-10 sm:max-h-16 md:max-h-20 object-contain"}
          />
        ) : (
          <Icon className="text-xl sm:text-3xl md:text-4xl" />
        )}
      </div>
    </a>
  );
};
