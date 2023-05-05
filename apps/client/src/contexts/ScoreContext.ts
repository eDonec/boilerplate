import { createContext, useContext } from "react";

export interface ScorableDocument {
  slug: string;
  upvotes: number;
  downvotes: number;
  claps: number;
  isUpvotedByUser: boolean;
  isDownvotedByUser: boolean;
}

interface ScoreHydrationResponse {
  upvotes: number;
  downvotes: number;
  claps: number;
  isUpvotedByUser: boolean;
  isDownvotedByUser: boolean;
}

type MutationFunction = (args: {
  params: { slug: string };
}) => Promise<unknown>;

type HydrationFunction = (args: {
  params: { slug: string };
}) => Promise<ScoreHydrationResponse>;

export interface ScoreMutationPayload {
  upvoteFunction: MutationFunction;
  dowvoteFunction: MutationFunction;
  removeVoteFunction: MutationFunction;
  clapFunction: MutationFunction;
  hydrationFunction: HydrationFunction;
}

const ScoreContext = createContext<{
  document: ScorableDocument;
  payload: ScoreMutationPayload;
} | null>(null);

export const ScoreProvider = ScoreContext.Provider;

export const useScoreContext = () => {
  const context = useContext(ScoreContext);

  if (!context) {
    throw new Error("useScoreContext must be used within a ScoreProvider");
  }

  return context;
};
