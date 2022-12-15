import React, { useEffect, useState } from "react";
import axios from "axios";
import Forpaging from "./Components/Forpaging";
import { Forpage } from "./Components/Forpage";
import "./Components/Style.css";

const App = () => {
  const todayDate = new Date().toISOString().slice(0, 10);
  const [values, setValues] = useState([]);
  const [from, setFrom] = useState("");
  const [to, setTo] = useState(todayDate); 

  const [reqest1, setReqest1] = useState(true);
  const [reqcol, setreqcol] = useState("lightgrey");

  const [response1, setResponse1] = useState(true);
  const [rescol, setrescol] = useState("lightgrey");

  const [impression1, setImpression1] = useState(true);
  const [impcol, setimpcol] = useState("lightgrey");

  const [click1, setClick1] = useState(true);
  const [clickcol, setclickcol] = useState("lightgrey");

  const [revenue1, setRevenue1] = useState(true);
  const [revcol, setrevcol] = useState("lightgrey");

  const [fillrate1, setFillrate1] = useState(true);
  const [fillcol, setfillcol] = useState("lightgrey");

  const [ctr1, setCtr1] = useState(true);
  const [ctrcol, setctrcol] = useState("lightgrey");

  const [currentPage, setCurrentPage] = useState(1);



  const [dateRange, setDateRange] = useState([null, null]);
  const [startDate, endDate] = dateRange;
  console.log(dateRange);


  const handlePageChange = (page) => {
    setCurrentPage(page);
  };
  const updateRequest = () => {
    if(reqcol === "lightgrey") setreqcol("#FFFFFF");
    else setreqcol("lightgrey");
    setReqest1((prevState) => !prevState);
  };
  const updateResponse = () => {
    if(rescol === "lightgrey") setrescol("#FFFFFF");
    else setrescol("lightgrey");
    setResponse1((prevState) => !prevState);
  };
  const updateImpression = () => {
    if(impcol === "lightgrey") setimpcol("#FFFFFF");
    else setimpcol("lightgrey");
    setImpression1((prevState) => !prevState);
  };
  const updateClick = () => {
    if(clickcol ==="lightgrey") setclickcol("#FFFFFF");
    else setclickcol("lightgrey");
    setClick1((prevState) => !prevState);
  };
  const updateRevenue = () => {
    if(revcol === "lightgrey") setrevcol("#FFFFFF");
    else setrevcol("lightgrey");
    setRevenue1((prevState) => !prevState);
  };
  const updateFillrate = () => {
    if(fillcol === "lightgrey") setfillcol("#FFFFFF");
    else setfillcol("lightgrey");
    setFillrate1((prevState) => !prevState);
  };
  const updateCTR = () => {
    if(ctrcol === "lightgrey") setctrcol("#FFFFFF");
    else setctrcol("lightgrey");
    setCtr1((prevState) => !prevState);
  };
  const displayappname = (id) => {
    switch (id) {
      case "123456":
        return "Panda Draw";

      case "789652":
        return "Number Ninja";

      case "741553":
        return "Word Crush";

      case "986321":
        return "Brain Quiz";

      case "320248":
        return "Age Calculator";

      default:
        return id;
    }
  };

  useEffect(() => {
    axios
      .get(
        `https://go-dev.greedygame.com/v3/dummy/report?startDate=${from}&endDate=${to}`
      )
      .then((res) => setValues(res.data.data))
      .catch((err) => console.log(err));
  }, [from, to]);

  const alldata = Forpage(values, currentPage, 10);

  

  return (
    <div className="overallbody">
      <h3 className="analytichrad">Analytics</h3>
      <label htmlFor="from">From Date:</label>
      <input
       className="datepicker"
        type="date"
        name="from"
        value={from}
        id="from"ß
        onChange={(e) => {
          return setFrom(e.target.value);
        }}
      />
      <label htmlFor="to">To Date:</label>
      <input
       className="datepicker"
        type="date"
        name="to"
        value={to}
        id="to"
        onChange={(e) => setTo(e.target.value)}
      />

      <div className="setting-change">
        <h3 className="filter">Dimensions and Metrics</h3>
        <div className="boxes">

          
          <div className="box">
        <button className="button" style={{ backgroundColor:reqcol}} onClick={updateRequest} > Ad Request </button>
        </div>
          <div className="box">
        <button className="button" style={{ backgroundColor:rescol}} onClick={updateResponse} > Ad Response </button>
          </div>
          <div className="box">
        <button className="button" style={{ backgroundColor:impcol}} onClick={updateImpression} > Impression </button>
          </div>
          <div className="box">
        <button className="button" style={{ backgroundColor:clickcol}} onClick={updateClick} > Clicks </button>
          </div>
          <div className="box">
        <button className="button" style={{ backgroundColor:revcol}} onClick={updateRevenue} > Revenue </button>
          </div>
          <div className="box">
        <button className="button" style={{ backgroundColor:fillcol}} onClick={updateFillrate} > Fill Rate </button>
          </div>
          <div className="box">
        <button className="button" style={{ backgroundColor:ctrcol}} onClick={updateCTR} > CTR </button>
          </div>
         

        </div>
      </div>
      {/* ) : null} */}
      {alldata.length > 0 ? (
        <h3>Search Result Count: {values.length}</h3>
      ) : (
        <h3>Please provide start and end date to fetch records.</h3>
      )}
      <table className="table table-striped table-bordered" id="resulttable">
        <thead>
          <tr>
            <th scope="col">Date</th>
            <th scope="col">App Name</th>
            {reqest1 ? <th scope="col">AD_Request</th> : null}
            {response1 ? <th scope="col">AD_Response</th> : null}
            {impression1 ? <th scope="col">Impression</th> : null}
            {click1 ? <th scope="col">Click</th> : null}
            {revenue1 ? <th scope="col">Revenue</th> : null}
            {fillrate1 ? <th scope="col">Fill Rate</th> : null}
            {ctr1 ? <th scope="col">CTR</th> : null}
          </tr>
        </thead>
        <tbody>
          {alldata.map((item, index) => {
            return (
              <tr key={index}>
                <td>{item.date}</td>
                <td>{displayappname(item.app_id)}</td>
                {reqest1 ? <td>{item.requests}</td> : null}
                {response1 ? <td>{item.responses}</td> : null}
                {impression1 ? <td>{item.impressions}</td> : null}
                {click1 ? <td>{item.clicks}</td> : null}
                {revenue1 ? <td>{item.revenue.toFixed(2)}</td> : null}
                {fillrate1 ? (
                  <td>{((item.requests / item.responses) * 100).toFixed(2)}</td>
                ) : null}
                {ctr1 ? (
                  <td>{((item.clicks / item.impressions) * 100).toFixed(2)}</td>
                ) : null}
              </tr>
            );
          })}
        </tbody>
      </table>
      <Forpaging
        itemsCount={values.length}
        pageSize={10}
        currentPage={currentPage}
        onPageChange={handlePageChange}
      />
    </div>
  );
};

export default App;
