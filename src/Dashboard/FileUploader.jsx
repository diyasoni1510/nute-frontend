import React, { useState } from "react";

const FileUploader = () => {
  const [fileName, setFileName] = useState(null);

  const handleButtonClick = () => {
    inputRef.current.click();
  };

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    setFileName(selectedFile.name);
  };

  const inputRef = React.createRef();

  const fileData = fileName ? (
    <form action="" method="post">
      <div className="form">
        <h4>{fileName}</h4>
        <input type="email" placeholder="Enter email to upload file" />
        <button className="btn">Upload</button>
      </div>
    </form>
  ) : (
    <div>
      <label htmlFor="" className="formtxt">Upload Cancelled Cheque</label>
      <div className="drop_box">
        <div className="uploadinput">
          <input
            type="file"
            hidden
            accept=".doc, .docx, .pdf"
            id="fileID"
            style={{ display: "none" }}
            onChange={handleFileChange}
            ref={inputRef}
          />
          <i className="fa-solid fa-cloud-arrow-up" onClick={handleButtonClick}></i>
        </div>

        <ul className="">
          <li className=" step-content">Files Supported: PDF, TEXT, DOC, DOCX</li>
          <li className="step-content">Drag & drop the file here</li>
          <li className=" step-content">Max file size: 20 MB</li>
        </ul>
      </div>
    </div>
  );

  return <div>{fileData}</div>;
};

export default FileUploader;
