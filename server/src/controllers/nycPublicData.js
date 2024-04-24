const getPublicData = async (req, res) => {
  try {
    const apiResponse = await fetch(
      "https://data.cityofnewyork.us/resource/h87e-shkn.json",
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    const data = await apiResponse.json()
    
    if (apiResponse.ok) {
      res.status(200).json(data);
      return
    } else {
      res.status(apiResponse.status);
      return res.json({
        error: apiResponse.statusText,
      });
    }
  } catch (error) {
    res.status(500);
    returnres.json({
      error: "Unable to retireve information from API (Unknown Error)",
    });
  }
};

export { getPublicData };
