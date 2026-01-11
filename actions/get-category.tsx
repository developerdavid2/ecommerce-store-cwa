import { Category } from "@/types";

const URL = `${process.env.NEXT_PUBLIC_API_URL}/categories`;

const getCategory = async (id: string): Promise<Category | undefined> => {
  try {
    const res = await fetch(`${URL}/${id}`);

    // Check if the response is OK
    if (!res.ok) {
      throw new Error(
        `Failed to fetch category: ${res.status} ${res.statusText}`
      );
    }

    // Parse the response as JSON
    return await res.json();
  } catch (error) {
    console.error("Error fetching data:", error);
    return undefined;
  }
};

export default getCategory;
