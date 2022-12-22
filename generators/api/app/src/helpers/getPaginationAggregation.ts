import getNumberFromString from "core-utils/getNumberFromString";
import { PipelineStage } from "mongoose";
import { IPaginationQuery } from "shared-types/IPaginationQuery";
import { SortDirection } from "shared-types/SortDirection";

export const getPaginationAggregation = <T>({
  "sort-field": sortField = "_id",
  "sort-direction": sortDirection = SortDirection.ASC,
  page,
  limit,
  match = {},
  projection,
}: IPaginationQuery<T>): PipelineStage[] => {
  const limitNumber = getNumberFromString(limit);
  const pageNumber = getNumberFromString(page);
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
