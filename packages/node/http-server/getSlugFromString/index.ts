import { Model } from "mongoose";
import getSlug from "speakingurl";

export const asyncCreateSlugFromString = async <A extends { slug: string }>(
  str: string,
  model: Model<A>
) => {
  let newSlug = getSlug(str);
  let match = null;
  let count = 0;
  const query = {
    slug: new RegExp(`${newSlug}(-(\\d+))?$`),
  };

  const lastModel = await model
    .findOne(query)
    .sort({ slug: -1 })
    .collation({ locale: "en_US", numericOrdering: true });

  if (lastModel) {
    match = lastModel.slug.match(/([^A-Za-z])(\d+)(?!.*\d)+$/g);

    if (match) {
      count = Number(match[0]);
    }
    count--;
    newSlug = `${newSlug}${count}`;
  }

  return newSlug;
};
