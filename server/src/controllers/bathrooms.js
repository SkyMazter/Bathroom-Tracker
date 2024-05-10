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

/*
{
  id: int
  lat: float
  lng: float
  address: string
  notes: string
}
*/
const setNewBathroom = async (req, res) => {
  console.log(req.body);
  try {
    const { error } = await supabase.from("bathrooms").insert({
      name: req.body.name,
      lat: req.body.lat,
      lng: req.body.lng,
      address: req.body.address,
      notes: req.body.notes,
      is_saved: true
    });

    if (error) {
      console.log(error);
      res.status(200);
      return res.json({
        error: error,
      });
    } else {
      res.status(200);
      return res.json({ message: "success!"});
    }
  } catch (error) {
    console.log(error);
  }
};
export { getAllBathrooms, setNewBathroom };
