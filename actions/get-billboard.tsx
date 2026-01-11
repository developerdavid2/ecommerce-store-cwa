import axios from "axios";
import { Billboard } from "@/types";

const URL = `${process.env.NEXT_PUBLIC_API_URL}/billboards`;

const getBillboard = async (id: string): Promise<Billboard | undefined> => {
  try {
    // ✅ Axios never caches - always fresh data
    const res = await axios.get(`${URL}/${id}`);
    return res.data;
  } catch (error) {
    console.error("Error fetching data:", error);
    return undefined;
  }
};

export default getBillboard;
