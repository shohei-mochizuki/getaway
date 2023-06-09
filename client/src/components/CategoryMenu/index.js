import React, { useEffect } from "react";
import { useQuery } from "@apollo/client";
import { useStoreContext } from "../../utils/GlobalState";
import {
  UPDATE_CATEGORIES,
  UPDATE_CURRENT_CATEGORY,
} from "../../utils/actions";
import { QUERY_CATEGORIES } from "../../utils/queries";
import { idbPromise } from "../../utils/helpers";

function CategoryMenu() {
  const [state, dispatch] = useStoreContext();

  const { categories } = state;

  const { loading, data: categoryData } = useQuery(QUERY_CATEGORIES);

  useEffect(() => {
    if (categoryData) {
      dispatch({
        type: UPDATE_CATEGORIES,
        categories: categoryData.categories,
      });
      categoryData.categories.forEach((category) => {
        idbPromise("categories", "put", category);
      });
    } else if (!loading) {
      idbPromise("categories", "get").then((categories) => {
        dispatch({
          type: UPDATE_CATEGORIES,
          categories: categories,
        });
      });
    }
  }, [categoryData, loading, dispatch]);

  const handleClick = (id) => {
    dispatch({
      type: UPDATE_CURRENT_CATEGORY,
      currentCategory: id,
    });
  };

  // ONLY LINE 55 NEEDS TO BE UPDATED {item.name} --> {item.region}
  return (
    <div>
      <h2 className="p-3 text-primary-emphasis fw-semibold">
        Choose a Region:
      </h2>
      {categories.map((item) => (
        <button
          key={item._id}
          className="rounded m-1 p-1 bg-primary-emphasis text-white"
          onClick={() => {
            handleClick(item._id);
          }}
        >
          {item.region}
        </button>
      ))}
    </div>
  );
}

export default CategoryMenu;
