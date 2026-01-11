import { Category } from "@/types";

const URL = `${process.env.NEXT_PUBLIC_API_URL}/categories`;

const getCategories = async (): Promise<Category[]> => {
  try {
    const res = await fetch(URL);

    // Check if the response is OK
    if (!res.ok) {
      throw new Error(
        `Failed to fetch categories: ${res.status} ${res.statusText}`
      );
    }

    // Parse the response as JSON
    const data = await res.json();

    // Ensure the data is an array
    if (!Array.isArray(data)) {
      throw new Error("Invalid data format: Expected an array of categories.");
    }

    return data;
  } catch (error) {
    console.error("Error fetching categories:", error);
    return []; // Return an empty array as a fallback
  }
};

export default getCategories;
