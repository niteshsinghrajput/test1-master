import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { Link, useLocation } from 'react-router-dom'
import ConfirmationModel from '../../components/confirmation/ConfirmationModel';
import { withRouter } from 'react-router-dom';
import XLSX from 'xlsx';


const NewAdjustments = (props) => {
    const [newAdjustmentsData, setNewAdjustmentsData] = useState([])
    const [isShowModel, setIsShowModel] = useState(false)
    const [selectedIndex, setSelectedIndex] = useState();
    const [selectedIndexData, setSelectedIndexData] = useState();
    const [selectedFile, setSelectedFile] = useState({});
    const [fileUploaded, setFileUploaded] = useState({});
    const [dates, setDates] = useState({
        start: "2022-06-01",
        end: "2022-06-01",
        report: "2022-06-01"
    });
    const selectedRow = (row) => {
        setSelectedIndex(row)
    }
    const location = useLocation();
    const loadData = () => {
        axios.get(`/data/home.json`)
            .then(res => {
                const persons = res.data;
                const id = getParametar("id")
                if (id) {
                    res.data.map(row => {
                        if (row.id == id) {
                            setSelectedIndexData(row);
                        }
                    })
                }
                setNewAdjustmentsData(res.data)
            })
    }

    const getParametar = (key) => {
        return new URLSearchParams(props.location.search).get(key)
    }

  

    useEffect(() => {
        creatNew();
        loadData();

    }, [])

    const handleHideModel = () => {
        setIsShowModel(false)
    }

    const handleShowModel = () => {
        setIsShowModel(true)
    }

    const creatNew = () => {
        const newlist = {
            "id": "",
            "Non": "",
            "SIC": "",
            "Code": "",
            "Industry": "",
            "Primary": "",
            "CARM": "",
            "Country": "",
            "Underwriting": "",
            "Sell": "",
            "Desc": "",
            "Financially": "",
            "Risk": "",
            "Busines": "",
            "Affiliation": ""
        }

        setSelectedIndex(newlist)
    }

    const deleteRow = (index) => {
        const data = newAdjustmentsData.filter((row) => {
            return row.id !== selectedIndex.id
        })

        setIsShowModel(false);
        setNewAdjustmentsData(data);
    }

    const changeHandler = (event) => {
        const { name, value } = event.target;
        const rowupdate = JSON.parse(JSON.stringify(selectedIndex));
        rowupdate[name] = value;
        setSelectedIndex(rowupdate);
    }

    const changeDateHandler = (event) => {
        const { name, value } = event.target;
        console.log(new Date(value).toISOString().substring(0, 10), value)
        const rowupdate = JSON.parse(JSON.stringify(dates));
        rowupdate[name] = value;
        console.log(rowupdate)
        setDates(rowupdate);
    }

     const changeFileHandler = (event) => {
        setSelectedFile({ selectedFile: event.target.files[0] });
        console.log('file name : ', event.target.files[0].name);
    }

    const fileUploadHandler = (e) => {
        console.log('upload file called..')
    e.preventDefault();

    var files = e.target.files, f = files[0];
    var reader = new FileReader();
    reader.onload = function (e) {
        var data = e.target.result;
        let readedData = XLSX.read(data, {type: 'binary'});
        const wsname = readedData.SheetNames[0];
        const ws = readedData.Sheets[wsname];

        /* Convert array to json*/
        //const dataParse = XLSX.utils.sheet_to_json(ws, {header:1});
        const dataParse = XLSX.utils.sheet_to_csv(ws, {header:1});
        const dataJson = prepareJson(dataParse);
        console.log('json' + dataJson);
        setFileUploaded(dataJson);
        console.log('JSON Data : ', dataJson);
        setNewAdjustmentsData(dataJson)
    };
    reader.readAsBinaryString(f)
}

const prepareJson = (csv) => {
   
   var lines = csv.split("\n");

    var result = [];

    var headers = lines[0].split(",");

    for (var i = 1; i < lines.length; i++) {
      var obj = {};
      var currentline = lines[i].split(",");

      for (var j = 0; j < headers.length; j++) {
        obj[headers[j]] = currentline[j];
      }
      result.push(obj);
    }

    //return result; //JavaScript object
    return result; //JSON
    
}

    return (
        <div className="new">
            <div className="container  m-1">
                <div className="row">
                    <div className="col-sm-6">
                        <h3 className="headding">Requested Adjustments </h3>
                    </div>
                    <div className="col-sm-6 text-right">
                        {selectedIndex?.id &&
                            <button className="btn btn-primary m-b-1" onClick={() => creatNew()}>Create new </button>
                        }
                    </div>
                </div>
            </div>
            <div className="container  m-1">

            </div>
            <div className="container  m-1">

                <div className="row">
                    <div className="col-sm-12">

                        <div className="row">
                            <div className="col-sm-2">

                                <div className="form-group">
                                    <label for="email"> Report Date:</label>
                                    <span className="date">
                                        <input type="date" className="form-control" name="report" id="date1" onChange={(e) => changeDateHandler(e)} value={dates.report} />
                                    </span>
                                </div>

                            </div>

                            <div className="col-sm-2">

                                <div className="form-group">
                                    <label for="email"> Start Date:</label> 
                                    <span className="date">
                                        <input type="date" className="form-control" name="start" id="date2" onChange={(e) => changeDateHandler(e)} value={dates.start} />
                                    </span>
                                </div>

                            </div>

                            <div className="col-sm-2">

                                <div className="form-group">
                                    <label for="email"> End Date:</label> {dates.end}
                                    <span className="date">
                                        <input type="date" className="form-control" name="end" id="date3" onChange={(e) => changeDateHandler(e)} value={dates.end} />
                                    </span>
                                </div>

                            </div>
                            <div className="col-sm-2">

                                <div className="form-group">
                                    <label for="email"> Refinery:</label>

                                    <select className="form-control" id="refinery">
                                        <option>Select refinery</option>
                                        <option>2</option>
                                        <option>3</option>
                                        <option>4</option>
                                    </select>
                                </div>


                            </div>
                            <div className="col-sm-2">
                                <div className="form-group">
                                    <label for="upload"> Upload Ajustment </label>
                                    <span className="date">
                                        <input type="file" className="form-control" name="adjustment_file_excel" id="adjustment_file" onChange={(e) => fileUploadHandler(e)} />
                                    </span>
                                </div>
                            </div>
                             <div className="col-sm-2">
                                    <span className="date">
                                        <button className="create"> Create</button>
                                        <i class="bi bi-plus-circle-fill"></i>
                                    </span>
                            </div>

                        </div>
                        <div className="scroll-table-sm">
                            <table className="table table-condensed clickable-table">
                                <thead>
                                    <tr>
                                        <th></th>
                                        <th></th>
                                        <th>Adjustments Type</th>
                                        <th>Enty Id</th>
                                        <th>Area Id</th>
                                        <th>Reporting Facility Id</th>
                                        <th>Primary Country Code of Risk</th>
                                        <th>CARM - Secondary Country Code of Risk</th>
                                        <th>Country Code of Second Order Risk</th>
                                        <th>Underwriting Flag</th>
                                        <th>Sell Down Date</th>
                                        <th>Underwriting Deal Type</th>
                                        <th>Financially Sponsored Facility</th>
                                        <th>Primary Country Code of Risk</th>
                                        <th>Busines Customer Type</th>
                                        <th>Affiliation Code</th>
                                    </tr>
                                </thead>
                                <tbody>

                                    {selectedIndexData?.data.map((rowData) => (
                                        <tr className={`clickable-row ${selectedIndex.id === rowData.id && "active"}`} onClick={() => selectedRow(rowData)}>
                                            <td><button className="glyphicon1 glyphicon-trash1 btn-link text-danger1" onClick={handleShowModel} title="Delete Row">X</button></td>
                                            <td>  {rowData.Comment && <i className='glyphicon glyphicon-info-sign' title={rowData.Comment}></i>}</td>
                                            <td>{rowData.Non}</td>
                                            <td>{rowData.SIC}</td>
                                            <td>{rowData.Code}</td>
                                            <td>{rowData.Industry}</td>
                                            <td>{rowData.Primary}</td>
                                            <td>{rowData.CARM   }</td>
                                            <td>{rowData.Country}</td>
                                            <td>{rowData.Underwriting}</td>
                                            <td>{rowData.Sell}</td>
                                            <td>{rowData.Desc}</td>
                                            <td>{rowData.Financially}</td>
                                            <td>{rowData.Risk}</td>
                                            <td>{rowData.Busines}</td>
                                            <td>{rowData.Affiliation}</td>
                                        </tr>
                                    ))
                                    }

                                    { console.log('hiii'+ newAdjustmentsData)}

                                    {newAdjustmentsData.length < 1 ?
                                        (<tr>
                                            <td colspan="4">No Adjustments to show.</td>
                                        </tr>)
                                    : newAdjustmentsData.map((row)=> (<tr>
                                        <td></td>
                                        <td></td>
                                        <td>{row.Non}</td>
                                        <td>{row.SIC}</td>
                                        <td>{row.Code}</td>
                                        <td>{row.Industry}</td>
                                        <td>{row.Primary}</td>
                                        <td>{row.CARM}</td>
                                        <td>{row.Country}</td>
                                        <td>{row.Underwriting}</td>
                                        <td>{row.Sell}</td>
                                        <td>{row.Desc}</td>
                                        <td>{row.Financially}</td>
                                        <td>{row.Risk}</td>
                                        <td>{row.Busines}</td>
                                        <td>{row.Affiliation}</td>
                                    </tr>)) }
                                </tbody>
                            </table>
                        </div>
                        {/*<div className="alert alert-info m1">
                            Make all adjustments in right column, then click "<strong>Add Record</strong>". Once all records
                            have been adjusted, click on Submit.
                        </div>*/}
                    </div>

                    {/*<div className="col-sm-6">
                        <div className="scroll-table">

                            <table className="table table-condensed key-value ">
                                <thead>
                                    <tr>
                                        <th>Key </th>
                                        <th>Value</th>
                                    </tr>
                                </thead>
                                {selectedIndex &&
                                    <tbody>
                                         <tr>
                                        <td>Id</td>
                                        <td><input type="text" name="id" onChange={(e)=>changeHandler(e)}   value={selectedIndex.id} className="form-control" /></td>
                                    </tr> 
                                        <tr>
                                            <td>Adjustments Type*</td>
                                            <td><input type="text" name="Non" onChange={(e) => changeHandler(e)} value={selectedIndex.Non} className="form-control" /></td>
                                        </tr>

                                        <tr>
                                            <td>Enty Id*</td>
                                            <td><input type="text" name="SIC" onChange={(e) => changeHandler(e)} value={selectedIndex.SIC} className="form-control" /></td>
                                        </tr>

                                        <tr>
                                            <td>Area Id*</td>
                                            <td><input type="text" name="Industry" onChange={(e) => changeHandler(e)} value={selectedIndex.Industry} className="form-control" /></td>
                                        </tr>

                                        <tr>
                                            <td>Reporting Facility Id*</td>
                                            <td><input type="text" name="Desc" onChange={(e) => changeHandler(e)} value={selectedIndex.Desc} className="form-control" /></td>
                                        </tr>

                                        <tr>
                                            <td>Primary Country Code of Risk</td>
                                            <td><input type="text" name="Primary" onChange={(e) => changeHandler(e)} value={selectedIndex.Primary} className="form-control" /></td>
                                        </tr>

                                        <tr>
                                            <td>CARM - Secondary Country Code of Risk</td>
                                            <td><input type="text" name="CARM" onChange={(e) => changeHandler(e)} value={selectedIndex.CARM} className="form-control" /></td>
                                        </tr>

                                        <tr>
                                            <td>Country Code of Second Order Risk</td>
                                            <td><input type="text" name="Country" onChange={(e) => changeHandler(e)} value={selectedIndex.Country} className="form-control" /></td>
                                        </tr>

                                        <tr>
                                            <td>Underwriting Flag</td>
                                            <td><input type="text" name="Underwriting" onChange={(e) => changeHandler(e)} value={selectedIndex.Underwriting} className="form-control" /></td>
                                        </tr>

                                        <tr>
                                            <td>Sell Down Date</td>
                                            <td><input type="text" name="Sell" onChange={(e) => changeHandler(e)} value={selectedIndex.Sell} className="form-control" /></td>
                                        </tr>

                                        <tr>
                                            <td>Underwriting Deal Type</td>
                                            <td><input type="text" name="Underwriting" onChange={(e) => changeHandler(e)} value={selectedIndex.Underwriting} className="form-control" /></td>
                                        </tr>

                                        <tr>
                                            <td>Financially Sponsored Facility</td>
                                            <td><input type="text" name="Financially" onChange={(e) => changeHandler(e)} value={selectedIndex.Financially} className="form-control" /></td>
                                        </tr>

                                        <tr>
                                            <td>Primary Country Code of Risk</td>
                                            <td><input type="text" name="Country" onChange={(e) => changeHandler(e)} value={selectedIndex.Country} className="form-control" /></td>
                                        </tr>

                                        <tr>
                                            <td>Busines Customer Type</td>
                                            <td><input type="text" name="Busines" onChange={(e) => changeHandler(e)} value={selectedIndex.Busines} className="form-control" /></td>
                                        </tr>

                                        <tr>
                                            <td>Affiliation Code</td>
                                            <td><input type="text" name="Affiliation" onChange={(e) => changeHandler(e)} value={selectedIndex.Affiliation} className="form-control" /></td>
                                        </tr>

                                    </tbody>
                                }

                            </table>
                        </div>

                        <div className="m-1 row">
                            <div className="col-sm-6">
                                <Link to="/adjustment" className="btn btn-default">Save as Draft</Link>
                            </div>
                            <div className="col-sm-6 text-right">
                                {selectedIndex?.id ?
                                    <Link to="/adjustment" className="btn btn-primary">Update Row</Link>
                                    :
                                    <Link to="/adjustment" className="btn btn-primary"> Save Row</Link>
                                }
                            </div>
                        </div>
                    </div>*/}
                </div>
            </div>

            <div className="footer navbar-fixed-bottom1 m-1">
                <div className="container footer-btn" >
                    <div className="row">
                        <div className="col-sm-6">
                            <button className="btn btn-default"> Cancel</button>
                        </div>
                        <div className="col-sm-6 text-right">
                            <button className="btn btn-primary"> Submit</button>
                        </div>
                    </div>
                </div>
            </div>
            {isShowModel &&
                <ConfirmationModel handleHide={handleHideModel} onDelete={deleteRow} show={isShowModel} />
            }
        </div>
    )
}

export default withRouter(NewAdjustments);
