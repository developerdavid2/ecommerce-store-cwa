import { Colour } from "@/types";

const URL = `${process.env.NEXT_PUBLIC_API_URL}/colours`;

const getColours = async (): Promise<Colour[]> => {
  try {
    const res = await fetch(URL);

    // Check if the response is OK
    if (!res.ok) {
      throw new Error(
        `Failed to fetch colours: ${res.status} ${res.statusText}`,
      );
    }

    // Parse the response as JSON
    const data = await res.json();
    console.log(data);

    // Ensure the data is an array
    if (!Array.isArray(data)) {
      throw new Error("Invalid data format: Expected an array of colours.");
    }

    return data;
  } catch (error) {
    console.error("Error fetching colours:", error);
    return []; // Return an empty array as a fallback
  }
};

export default getColours;
