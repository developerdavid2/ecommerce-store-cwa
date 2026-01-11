import { Size } from "@/types";

const URL = `${process.env.NEXT_PUBLIC_API_URL}/sizes`;

const getSizes = async (): Promise<Size[]> => {
  try {
    const res = await fetch(URL);

    // Check if the response is OK
    if (!res.ok) {
      throw new Error(`Failed to fetch sizes: ${res.status} ${res.statusText}`);
    }

    // Parse the response as JSON
    const data = await res.json();
    console.log("Sizes", data);

    // Ensure the data is an array
    if (!Array.isArray(data)) {
      throw new Error("Invalid data format: Expected an array of sizes.");
    }

    return data;
  } catch (error) {
    console.error("Error fetching sizes:", error);
    return []; // Return an empty array as a fallback
  }
};

export default getSizes;
