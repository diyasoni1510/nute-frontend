import React, { useEffect, useState } from "react";
import Menuitem from "../components/Menuitem";
import Header from "./Header";
import Tabel1 from "../components/Tabel1";
import { getAssets, getAssetsUser } from "../pages/utils/api_functions";
import { useSelector } from "react-redux";
const Addassets = () => {
  const [assetsData, setAssets] = useState([]);
  const { token } = useSelector((state) => state.AuthReducer);

  const tableHeadings = ["Name", "Symbol", "Chain Name", "Address", "Action"];

  useEffect(() => {
    getAssets().then((res) => {
      if (res.status === 200) {
        const largeArray = res.data;
        getAssetsUser(token).then((res1) => {
          // setUserAssests(res.asset_data);
          if (res1.status == 200) {
            const smallArray = res1.asset_data;
            // Custom sorting function based on the order of elements in the small array
            let mainArray = largeArray.map((item) => {
              let newtemp = { ...item, status: false };

              for (let i = 0; i < smallArray.length; i++) {
                if (
                  item.symbol === smallArray[i].symbol &&
                  item.slug == smallArray[i].slug
                ) {
                  newtemp.status = true;
                  break; // No need to continue checking once a match is found
                }
              }

              return newtemp;
            });

            // Now mainArray contains the elements with the added "status" property

            const sortedFilteredArray = mainArray.sort(
              (a, b) => b.status - a.status
            );
            setAssets(sortedFilteredArray);
          } else {
            setAssets(largeArray);
          }
        });
      }
    });
  }, []);
  return (
    <>
      <Header />
      <div className="d-flex">
        <Menuitem />

        <div className=" container-fluid subdashbordmain">
          <div className=" pagewrapper">
            <Tabel1
              heading="Add Assets"
              assetsData={assetsData}
              tableHeadings={tableHeadings}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default Addassets;
