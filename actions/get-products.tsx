import axios from "axios";
import qs from "query-string";
import { Product } from "@/types";

const URL = `${process.env.NEXT_PUBLIC_API_URL}/products`;

interface Query {
  categoryId?: string;
  colourId?: string;
  sizeId?: string;
  isFeatured?: boolean;
}

const getProducts = async (query: Query): Promise<Product[]> => {
  try {
    const url = qs.stringifyUrl({
      url: URL,
      query: {
        colourId: query.colourId,
        sizeId: query.sizeId,
        categoryId: query.categoryId,
        isFeatured: query.isFeatured,
      },
    });

    const { data } = await axios.get<Product[]>(url);

    // Ensure the data is an array
    if (!Array.isArray(data)) {
      throw new Error("Invalid data format: Expected an array of products.");
    }

    return data;
  } catch (error) {
    console.error("Error fetching products:", error);
    return []; // Return an empty array as a fallback
  }
};

export default getProducts;
