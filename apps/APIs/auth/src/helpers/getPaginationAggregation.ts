import { PipelineStage } from "mongoose";
import { IPaginationQuery } from "shared-types/IPaginationQuery";
import { SortDirection } from "shared-types/SortDirection";

const getSafeNumber = (input?: string, min = 1): number => {
  const number = Number(input);

  if (Number.isNaN(number)) {
    return min;
  }

  return Math.max(number, min);
};

export const getPaginationAggregation = <T>({
  sortField = "_id",
  sortDirection = SortDirection.ASC,
  page,
  limit,
  match = {},
  projection,
}: IPaginationQuery<T>): PipelineStage[] => {
  const limitNumber = getSafeNumber(limit);
  const pageNumber = getSafeNumber(page);
  const skip = (pageNumber - 1) * limitNumber;

  return [
    { $match: match },
    {
      $sort: {
        [sortField]: sortDirection === SortDirection.ASC ? 1 : -1,
      },
    },
    {
      $facet: {
        total: [
          {
            $count: "count",
          },
        ],
        data: [
          ...[
            {
              $skip: skip,
            },
            {
              $limit: limitNumber,
            },
          ],
          ...(projection
            ? [
                {
                  $project: projection,
                },
              ]
            : []),
        ],
      },
    },
    {
      $unwind: {
        path: "$total",
        preserveNullAndEmptyArrays: true,
      },
    },
    {
      $project: {
        items: "$data",
        page: {
          $literal: skip / limitNumber + 1,
        },
        hasNextPage: {
          $lt: [{ $multiply: [limitNumber, pageNumber] }, "$total.count"],
        },
        totalPages: {
          $ceil: {
            $divide: ["$total.count", limitNumber],
          },
        },
        totalItems: "$total.count",
      },
    },
  ];
};
