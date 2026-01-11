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
    const res = await fetch(url);

    // Check if the response is OK
    if (!res.ok) {
      throw new Error(
        `Failed to fetch categories: ${res.status} ${res.statusText}`
      );
    }

    const data = await res.json();

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
