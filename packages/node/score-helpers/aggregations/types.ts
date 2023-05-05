import { PipelineStage } from "mongoose";
import { IPaginationQuery } from "shared-types";

export type ScoreAggregationFunction = () => {
  /**
   * - The sort field and direction
   */
  sort: Required<
    Pick<IPaginationQuery<unknown>, "sort-direction" | "sort-field">
  >;
  /**
   * - The aggregation pipeline stages
   */
  pipeLines: PipelineStage.FacetPipelineStage[];
  /**
   * - The projection to be applied to the aggregation pipeline
   * - This is used to remove fields that are not needed in the final result
   */
  projection: Record<string, number>;
};
