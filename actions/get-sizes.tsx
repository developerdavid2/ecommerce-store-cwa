import axios from "axios";
import { Size } from "@/types";

const URL = `${process.env.NEXT_PUBLIC_API_URL}/sizes`;

const getSizes = async (): Promise<Size[]> => {
  try {
    const { data } = await axios.get<Size[]>(URL);

    console.log(data);

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
