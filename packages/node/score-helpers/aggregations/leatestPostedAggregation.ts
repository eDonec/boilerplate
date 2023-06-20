import { SortDirection } from "shared-types";

import { ScoreAggregationFunction } from "./types";

export const leatestPostedAggregation: ScoreAggregationFunction = () => ({
  pipeLines: [],
  projection: {},
  sort: {
    "sort-field": "createdAt",
    "sort-direction": SortDirection.DSC,
  },
});
