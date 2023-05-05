import { useRef } from "react";

import { useScoreMutations } from "hooks/mutations/useScoreMutations";

export const useScore = () => {
  const {
    claps,
    clapDocument,
    upvoteDocument,
    downvoteDocument,
    upvotes,
    isDownvotedByUser,
    isUpvotedByUser,
  } = useScoreMutations();
  const clapWrapperRef = useRef<HTMLButtonElement>(null);
  const voteWrapperRef = useRef<HTMLDivElement>(null);
  const clapRef = useRef<SVGSVGElement>(null);

  const handleUpvoteClick = () => {
    upvoteDocument();
    if (!voteWrapperRef.current) return;
    voteWrapperRef.current.style.transformOrigin = "right";
    voteWrapperRef.current.animate(
      [
        {
          transform: "rotate(0deg)",
        },
        {
          transform: "rotate(10deg)",
        },
        {
          transform: "rotate(0deg)",
        },
      ],
      {
        duration: 700,
        easing: "cubic-bezier(.09,1.26,.98,1.17)",
      }
    );
  };

  const handleDownvoteClick = () => {
    downvoteDocument();
    if (!voteWrapperRef.current) return;
    voteWrapperRef.current.style.transformOrigin = "left";
    voteWrapperRef.current.animate(
      [
        {
          transform: "rotate(0deg)",
        },
        {
          transform: "rotate(10deg)",
        },
        {
          transform: "rotate(0deg)",
        },
      ],
      {
        duration: 700,
        easing: "cubic-bezier(.09,1.26,.98,1.17)",
      }
    );
  };

  const handleClapDocument = () => {
    clapDocument();
    if (!clapWrapperRef.current || !clapRef.current) return;

    const node = clapRef.current.cloneNode(true) as typeof clapRef.current;

    node.classList.replace("hidden", "absolute");
    node.style.left = `${Math.random() * 100}%`;
    clapWrapperRef.current.appendChild(node);
    const animation = node.animate(
      {
        opacity: 0,
        transform: `rotate(${
          -10 + Math.random() * 20
        }deg) scale(0.8) translateY(-100px)`,
      },
      {
        duration: 1000,
        fill: "forwards",
      }
    );

    animation.onfinish = () => {
      node.remove();
    };
  };

  return {
    handleUpvoteClick,
    handleDownvoteClick,
    handleClapDocument,
    upvotes,
    clapRef,
    claps,
    clapWrapperRef,
    isUpvotedByUser,
    isDownvotedByUser,
    voteWrapperRef,
  };
};
