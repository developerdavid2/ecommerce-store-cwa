import axios from "axios";
import { Product } from "@/types";

const URL = `${process.env.NEXT_PUBLIC_API_URL}/products`;

const getProduct = async (id: string): Promise<Product | undefined> => {
  try {
    const { data } = await axios.get<Product>(`${URL}/${id}`);
    return data;
  } catch (error) {
    console.error("Error fetching product:", error);
    return undefined;
  }
};

export default getProduct;
