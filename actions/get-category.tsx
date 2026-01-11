import axios from "axios";
import { Category } from "@/types";

const URL = `${process.env.NEXT_PUBLIC_API_URL}/categories`;

const getCategory = async (id: string): Promise<Category | undefined> => {
  try {
    const { data } = await axios.get<Category>(`${URL}/${id}`);
    return data;
  } catch (error) {
    console.error("Error fetching category:", error);
    return undefined;
  }
};

export default getCategory;
