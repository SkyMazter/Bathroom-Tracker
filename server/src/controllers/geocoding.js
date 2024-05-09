import "dotenv/config";

const getGeocodeAddress = async (req, res) => {
  const address = req.params.address;
  try {
    const response = await fetch(
      `https://geocode.maps.co/search?q=${address}&api_key=${process.env.GEOCODING_API_KEY}`,
      {
        method: "GET",
        mode: "cors",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    const data = await response.json();
    
    if (response.ok) {
      res.status(200).json(data);
      return;
    } else {
      res.status(response.status);
      return res.json({
        error: response.statusText,
      });
    }
  } catch (error) {
    console.log(error);
  }
};

export { getGeocodeAddress };
