import { useCallback, useEffect, useState } from "react";
import toast from "react-hot-toast";

import { useMutation } from "@tanstack/react-query";
import { useAuthClient } from "authenticator";
import { useScoreContext } from "contexts/ScoreContext";

export function useScoreMutations() {
  const {
    document,
    payload: {
      upvoteFunction,
      dowvoteFunction,
      removeVoteFunction,
      clapFunction,
      hydrationFunction,
    },
  } = useScoreContext();

  const [upvotes, setUpvotes] = useState(document.upvotes);
  const [claps, setClaps] = useState(document.claps ?? 0);
  const user = useAuthClient();
  const [isUpvotedByUser, setIsUpvotedByUser] = useState(
    document.isUpvotedByUser
  );
  const [isDownvotedByUser, setIsDownvotedByUser] = useState(
    document.isDownvotedByUser
  );

  const rehydrateDocument = useCallback(async () => {
    try {
      const rehydratedDocument = await hydrationFunction({
        params: {
          slug: document.slug,
        },
      });

      setUpvotes(rehydratedDocument.upvotes);
      setClaps(rehydratedDocument.claps);
      setIsUpvotedByUser(rehydratedDocument.isUpvotedByUser);
      setIsDownvotedByUser(rehydratedDocument.isDownvotedByUser);
    } catch (error) {
      if (error instanceof Error) toast.error(error.message);
    }
  }, [hydrationFunction, document.slug]);

  useEffect(() => {
    rehydrateDocument();
  }, [user, rehydrateDocument]);

  const { mutate: upvoteDocument, ...upvoteDocumentMutation } = useMutation({
    mutationFn: () => {
      return upvoteFunction({
        params: {
          slug: document.slug,
        },
      });
    },
    onMutate: () => {
      if (isUpvotedByUser || !user) return;

      const oldUpvotesSnapshot = upvotes;
      const isDownvotedByUserSnapshot = isDownvotedByUser;

      setUpvotes((oldUpvotes) => oldUpvotes + 1);
      setIsUpvotedByUser(true);
      setIsDownvotedByUser(false);

      return {
        oldUpvotesSnapshot,
        isDownvotedByUserSnapshot,
      };
    },
    onError: (_error, _variables, context) => {
      if (context) {
        setUpvotes(context.oldUpvotesSnapshot);
        setIsUpvotedByUser(false);
        setIsDownvotedByUser(context.isDownvotedByUserSnapshot);
      }
    },
  });
  const { mutate: downvoteDocument, ...downvoteDocumentMutation } = useMutation(
    {
      mutationFn: () => {
        return dowvoteFunction({
          params: {
            slug: document.slug,
          },
        });
      },
      onMutate: () => {
        if (isDownvotedByUser || !user) return;

        const oldUpvotesSnapshot = upvotes;
        const isUpvotedByUserSnapshot = isUpvotedByUser;

        if (isUpvotedByUser) setUpvotes((oldUpvotes) => oldUpvotes - 1);
        setIsDownvotedByUser(true);
        setIsUpvotedByUser(false);

        return {
          oldUpvotesSnapshot,
          isUpvotedByUserSnapshot,
        };
      },
      onError: (_error, _variables, context) => {
        if (context) {
          setUpvotes(context.oldUpvotesSnapshot);
          setIsDownvotedByUser(false);
          setIsUpvotedByUser(context.isUpvotedByUserSnapshot);
        }
      },
    }
  );
  const { mutate: removeDocumentVote, ...removeDocumentVoteMutation } =
    useMutation({
      mutationFn: () => {
        return removeVoteFunction({
          params: {
            slug: document.slug,
          },
        });
      },
      onMutate: () => {
        if ((!isUpvotedByUser && !isDownvotedByUser) || !user) return;

        const oldUpvotesSnapshot = upvotes;
        const isUpvotedByUserSnapshot = isUpvotedByUser;
        const isDownvotedByUserSnapshot = isDownvotedByUser;

        if (isUpvotedByUser) setUpvotes((oldUpvotes) => oldUpvotes - 1);
        setIsDownvotedByUser(false);
        setIsUpvotedByUser(false);

        return {
          oldUpvotesSnapshot,
          isDownvotedByUserSnapshot,
          isUpvotedByUserSnapshot,
        };
      },
      onError: (_error, _variables, context) => {
        if (context) {
          setUpvotes(context.oldUpvotesSnapshot);
          setIsDownvotedByUser(context.isDownvotedByUserSnapshot);
          setIsUpvotedByUser(context.isUpvotedByUserSnapshot);
        }
      },
    });

  const { mutate: clapDocument, ...clapDocumentMutation } = useMutation({
    mutationFn: () => {
      return clapFunction({
        params: {
          slug: document.slug,
        },
      });
    },
    onMutate: () => {
      const oldClapsSnapshot = claps;

      setClaps((oldClaps) => oldClaps + 1);

      return {
        oldClapsSnapshot,
      };
    },
    onError: (_error, _variables, context) => {
      if (context) {
        setClaps(context.oldClapsSnapshot);
      }
    },
  });

  return {
    upvoteDocument: isUpvotedByUser ? removeDocumentVote : upvoteDocument,
    upvoteDocumentMutation: isUpvotedByUser
      ? removeDocumentVoteMutation
      : upvoteDocumentMutation,
    downvoteDocument: isDownvotedByUser ? removeDocumentVote : downvoteDocument,
    downvoteDocumentMutation: isDownvotedByUser
      ? removeDocumentVoteMutation
      : downvoteDocumentMutation,
    clapDocument,
    clapDocumentMutation,
    claps,
    upvotes,
    isDownvotedByUser,
    isUpvotedByUser,
  };
}
