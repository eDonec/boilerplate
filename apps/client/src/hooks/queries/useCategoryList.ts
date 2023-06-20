import { useEffect, useState } from "react";

import Api from "api";

export const useCategoryList = () => {
  const [categories, setCategories] = useState<
    {
      _id: string;
      title: string;
      description: string;
      slug: string;
    }[]
  >([]);

  useEffect(() => {
    Api.categorySDK.getUnpaginatedCategories({}).then((response) =>
      setCategories(
        response.map((el) => ({
          _id: el._id,
          title: el.title,
          description: el.description,
          slug: el.slug,
        }))
      )
    );
  }, []);

  return { categories };
};
