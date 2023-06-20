import React, { FC } from "react";

import { AuthGuarded } from "authenticator";
import { clsx } from "core-utils";

import FacebookShare from "components/FacebookShare";
import ClapSVG from "components/svgs/ClapSVG";
import ThumbsUpSVG from "components/svgs/ThumbsUpSVG";

import { useScore } from "./useScore";

type DocumentClapProps = {
  className?: string;
};
const DocumentClap: FC<DocumentClapProps> = ({ className }) => {
  const {
    handleDownvoteClick,
    handleUpvoteClick,
    upvotes,
    clapRef,
    claps,
    handleClapDocument,
    clapWrapperRef,
    isUpvotedByUser,
    isDownvotedByUser,
    voteWrapperRef,
  } = useScore();

  return (
    <div className={clsx(className, "flex gap-3")}>
      <FacebookShare />

      {/* Scale animation is on the outer wrapper because it breaks z-index otherwise */}
      <div className="transition-transform hover:scale-105">
        <button
          ref={clapWrapperRef}
          className={clsx(
            "relative flex items-center justify-between gap-1 rounded-full bg-white px-4 py-2 font-bold shadow-lg md:gap-3 "
          )}
          onClick={handleClapDocument}
        >
          <ClapSVG
            width={24}
            height={24}
            className="pointer-events-none -z-10 hidden"
            ref={clapRef}
          />
          <ClapSVG width={24} height={24} className=" fill-black/50 " />
          <span className="min-w-[2ch] md:min-w-[4ch]">{claps}</span>
        </button>
      </div>
      <div
        ref={voteWrapperRef}
        className={clsx(
          "flex items-center gap-1 rounded-full bg-white px-3 font-bold shadow-lg transition-colors md:gap-3",
          {
            "!bg-primary-700 text-white": isUpvotedByUser,
            "!bg-red-700 text-white": isDownvotedByUser,
          }
        )}
      >
        <AuthGuarded className="flex" onSuccessfullLogin={handleUpvoteClick}>
          <button onClick={handleUpvoteClick}>
            <ThumbsUpSVG
              width={20}
              height={20}
              className={clsx({
                "opacity-50": !isUpvotedByUser,
              })}
            />
          </button>
        </AuthGuarded>
        <p className="min-2-[4 md:min-w-[4ch]ch] border-l border-r border-current px-3 text-center">
          {upvotes}
        </p>
        <AuthGuarded className="flex" onSuccessfullLogin={handleDownvoteClick}>
          <button onClick={handleDownvoteClick}>
            <ThumbsUpSVG
              width={20}
              height={20}
              className={clsx("rotate-180", {
                "opacity-50": !isDownvotedByUser,
              })}
            />
          </button>
        </AuthGuarded>
      </div>
    </div>
  );
};

export default DocumentClap;
