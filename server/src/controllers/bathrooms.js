import supabase from "../config/connection.js";

const getAllBathrooms = async (req, res) => {
  try {
    const { data, error } = await supabase.from("bathrooms").select();
    console.log(data);
    res.status(200);
    return res.json(data);
  } catch (error) {
    res.status(500);
    return res.json({ error: "Unable to retireve information from database" });
  }
};

export { getAllBathrooms };
