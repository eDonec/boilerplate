import { PipelineStage } from "mongoose";
import { IPaginationQuery, SortDirection } from "shared-types";

import { ScoreAggregationFunction } from "./types";

const SCORE_WEIGHT = 1;
const CLAP_WEIGHT = 0.001;
const TIME_WEIGHT = 1;
const BASE_TIMESTAMP = new Date("2023-01-01").getTime();

/**
 * Based on the [reddit hot sorting algorithm](https://medium.com/hacking-and-gonzo/how-reddit-ranking-algorithms-work-ef111e33d0d9)
 *
 * Modified to use claps in the hot score calculation
 */

export const hotScoreAggregation: ScoreAggregationFunction = () => {
  const sort: Required<
    Pick<IPaginationQuery<unknown>, "sort-direction" | "sort-field">
  > = {
    "sort-field": "hotScore",
    "sort-direction": SortDirection.DSC,
  };

  const projection = {
    hotScore: 0,
    sign: 0,
    epochSeconds: 0,
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
        epochSeconds: {
          $subtract: [
            {
              $toLong: "$createdAt",
            },
            BASE_TIMESTAMP,
          ],
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
        hotScore: {
          $round: [
            {
              $add: [
                {
                  $multiply: ["$sign", "$order", SCORE_WEIGHT],
                },
                {
                  $multiply: ["$clapFactor", "$claps", CLAP_WEIGHT],
                },
                {
                  $multiply: [
                    { $divide: ["$epochSeconds", 650000000] },
                    TIME_WEIGHT,
                  ],
                },
              ],
            },
            7,
          ],
        },
      },
    },
  ];

  return { pipeLines, sort, projection };
};
