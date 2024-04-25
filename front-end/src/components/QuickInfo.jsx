import { useEffect, useState } from "react";

const QuickInfo = () => {
  //PLans for this component
  /*
    Call the list of NYC Open BAthrooms
    PArse through data and find closet ones based on strings
    Print an array of the top five closest, 
    implement a buttonto show the next 2 buttons
  */

  const [nycData, setNycData] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);

  const getNYCData = async () => {
    try {
      const response = await fetch("http://localhost:3001/nycPublicData/all", {
        method: "GET",
        mode: "cors",
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (response.ok) {
        const res = response.json();
        res.then((data) => {
          setNycData(data);
          setIsLoaded(true);
        });
      }
    } catch (error) {
      console.log(error);
    }
  };

  // const clickhandler = () => {
  //   // console.log(nycData);
  // };

  useEffect(() => {
    getNYCData();

    return () => {
      console.log("Fetched QuickInfo");
    };
  }, [isLoaded]);

  if (isLoaded) {

    let arr = nycData;
    return (
      <div>
        <p>Title</p>
        {arr.map((element, index) => (
          <p key={index}>{element.name}: Name</p>
        ))}
      </div>
    );
  } else {
    return <p>Loading...</p>;
  }
};

export default QuickInfo;
