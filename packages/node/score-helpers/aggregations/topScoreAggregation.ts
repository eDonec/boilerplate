import { PipelineStage } from "mongoose";
import { IPaginationQuery, SortDirection } from "shared-types";

import { ScoreAggregationFunction } from "./types";

const SCORE_WEIGHT = 1;
const CLAP_WEIGHT = 0.001;

/**
 * Based on [hotScoreAggregation](./hotScoreAggregation.ts) without accounting for time
 */
export const topScoreAggregation: ScoreAggregationFunction = () => {
  const sort: Required<
    Pick<IPaginationQuery<unknown>, "sort-direction" | "sort-field">
  > = {
    "sort-field": "topScore",
    "sort-direction": SortDirection.DSC,
  };

  const projection = {
    topScore: 0,
    sign: 0,
    order: 0,
    score: 0,
    clapFactor: 0,
  };

  const pipeLines: PipelineStage.FacetPipelineStage[] = [
    {
      $addFields: {
        clapFactor: {
          $cond: [
            { $gt: ["$claps", 0] },
            { $divide: [1, { $log10: { $add: ["$claps", 1] } }] },
            1,
          ],
        },
        score: {
          $subtract: ["$upvotes", "$downvotes"],
        },
        order: {
          $log10: {
            $max: [{ $abs: { $subtract: ["$upvotes", "$downvotes"] } }, 1],
          },
        },
      },
    },
    {
      $addFields: {
        sign: {
          $cond: [
            {
              $gt: ["$score", 0],
            },
            1,
            {
              $cond: [{ $lt: ["$score", 0] }, -1, 0],
            },
          ],
        },
      },
    },
    {
      $addFields: {
        topScore: {
          $round: [
            {
              $add: [
                {
                  $multiply: ["$sign", "$order", SCORE_WEIGHT],
                },
                {
                  $multiply: ["$clapFactor", "$claps", CLAP_WEIGHT],
                },
              ],
            },
            7,
          ],
        },
      },
    },
  ];

  return {
    sort,
    projection,
    pipeLines,
  };
};
