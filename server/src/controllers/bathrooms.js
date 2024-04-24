import supabase from "../config/connection.js";

const getAllBathrooms = async (req, res) => {
  try {
    const { data, error } = await supabase.from("bathrooms").select();
    if (data) {
      res.status(200);
      return res.json(data);
    } else if (error) {
      res.status(400);
      return res.json(error);
    }
  } catch (error) {
    res.status(500);
    return res.json({
      error: "Unable to retireve information from database (Unknown Error)",
    });
  }
};

export { getAllBathrooms };
