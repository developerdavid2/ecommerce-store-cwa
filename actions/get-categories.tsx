import axios from "axios";
import { Category } from "@/types";

const URL = `${process.env.NEXT_PUBLIC_API_URL}/categories`;

const getCategories = async (): Promise<Category[]> => {
  try {
    const { data } = await axios.get<Category[]>(URL);

    console.log(data);

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
