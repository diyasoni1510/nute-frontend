import React, { useState } from "react";

const Tabel = (props) => {
  const { headers, tabledata } = props;
  const [data, setData] = useState(tabledata);

  const createRow = () => {
    setData([...data, { serialNo: "", Wallet: "", Chain: "", Balance: "" }]);
  };

  const removeRow = (index) => {
    if (data.length > 1) {
      const newData = [...data];
      newData.splice(index, 1);
      setData(newData);
    } else {
      alert("You don't have permission to delete this?");
    }
  };

  return (
    <>
      <div className="">
        <div className="sub-tab table-responsive">
          <table
            id="example"
            className="table table-hover "
            style={{ width: "100%" }}
          >
            <thead className="table-head">
              <tr>
                {headers.map((header, index) => (
                  <th key={index}>{header}</th>
                ))}
                <th width="50px">
                  <div className="action_container">
                    <button className="success" onClick={createRow}>
                      <i className="fa fa-plus"></i>
                    </button>
                  </div>
                </th>
              </tr>
            </thead>{" "}
            <tbody id="table_body">
              {!data.length >= 0 ? (
                <>
                  {data.map((row, rowIndex) => (
                    <tr key={rowIndex}>
                      {Object.values(row).map((cell, cellIndex) => (
                        <td key={cellIndex}>{cell}</td>
                      ))}
                      <td>
                        <div className="action_container">
                          <button
                            className="danger"
                            onClick={() => removeRow(rowIndex)}
                          >
                            <i className="fa fa-close"></i>
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </>
              ) : (
                <>
                  <tr>
                    <td colSpan={headers.length} className="text-center">
                      <div>
                        <i className="fa-regular fa-face-sad-tear fs-5 text-secondary"></i>
                        <p className="text-center text-secondary fw-bold">
                          No Record Found...
                        </p>
                      </div>
                    </td>
                  </tr>
                </>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default Tabel;
