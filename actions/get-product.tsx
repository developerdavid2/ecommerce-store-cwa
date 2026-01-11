import { Product } from "@/types";

const URL = `${process.env.NEXT_PUBLIC_API_URL}/products`;

const getProduct = async (id: string): Promise<Product | undefined> => {
  try {
    const res = await fetch(`${URL}/${id}`);

    // Check if the response is OK
    if (!res.ok) {
      throw new Error(
        `Failed to fetch product: ${res.status} ${res.statusText}`
      );
    }

    // Parse the response as JSON
    return await res.json();
  } catch (error) {
    console.error("Error fetching data:", error);
    return undefined;
  }
};

export default getProduct;
