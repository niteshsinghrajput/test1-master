
import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { Link, useLocation } from 'react-router-dom'
import ConfirmationModel from '../../components/confirmation/ConfirmationModel';
import { withRouter } from 'react-router-dom';

const AuditList = (props) => {

    const [AuditListData, setAuditListData] = useState([])
    const [isShowModel, setIsShowModel] = useState(false)
    const [selectedIndex, setSelectedIndex] = useState([]);
    const [selectedRow, setSelectedRow] = useState([]);

    const location = useLocation();
    const loadData = () => {
        axios.get(`/data/home.json`)
            .then(res => {
                const persons = res.data;
                const id = getParametar("id")
                if (id) {
                    res.data.map(row => {
                        if (row.id == id) {
                            console.log("row", row)
                            setSelectedIndex(row)

                        }
                    })
                }

                setAuditListData(res.data)

            })

        console.log()
    }

    const getParametar = (key) => {
        return new URLSearchParams(props.location.search).get(key)
    }

    useEffect(() => {
        loadData()
    }, [])


    const selectRow = (index) => {

        const indexelement = selectedRow && selectedRow.indexOf(index)
        console.log("indexelement", indexelement)
        if (indexelement > -1) {
            const temp = [...selectedRow]
            const elmen = temp.splice(indexelement, 1)
            console.log("====>", temp)
            setSelectedRow(temp)
        } else {
            const checklist = selectedRow ? [...selectedRow, index] : [index];
            setSelectedRow(checklist)
        }

    }
    const deSelectRow = () => {
        setSelectedRow([]);
    }


    return (
        <div className="new">
            <div className="container  m-1">
                <div className="row">
                    <div className="col-sm-6">
                        <h3 className="headding"> Adjustments Details</h3>
                    </div>
                    <div className="col-sm-6 text-right">

                    </div>
                </div>
            </div>
            <div className="container  m-1">

            </div>
            <div className="container  m-1">

                <div className="row fixtable">


                    <div className="col-sm-12">
                        <div className="scroll-table">

                            <table className="table table-condensed key-value ">




                                {selectedIndex?.data && <tr></tr>}
                                {
                                    selectedIndex?.data &&
                                    <React.Fragment>
                                        <thead>
                                            <tr>
                                                <th>  </th>
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
                                                <th>Affiliation Code</th>

                                            </tr>
                                        </thead>
                                        <tbody>
                                            {
                                                selectedIndex.data.map((row) => (
                                                    <tr onClick={() => selectRow(row.id)} className={`clickable-row ${selectedRow && selectedRow.indexOf(row.id) > -1 && "danger text-danger"}`}>
                                                        <td><i className="glyphicon glyphicon-flag"></i> </td>
                                                        {Object.keys(row).map((key) => (
                                                            <td> {row[key]}</td>
                                                        ))
                                                        }
                                                    </tr>
                                                )
                                                )
                                            }

                                        </tbody>
                                    </React.Fragment>
                                }
                            </table>


                        </div>


                    </div>
                </div>
            </div>
            {selectedRow &&
                <div className="container  m-1">
                    <div className="row">
                        <div className="col-sm-12">
                            <textarea class="form-control" rows="3" placeholder="Commentary box shown if one or more rows is flagged "></textarea>
                        </div>
                    </div>

                    <div className="row m-1">
                        <div className="col-sm-6">
                            <button className="btn btn-default" onClick={deSelectRow}> Cancel</button>
                        </div>
                        <div className="col-sm-6 text-right">

                            <Link to="/request-audit" className="btn btn-default" role="button"> Submit</Link>
                        </div>

                    </div>
                </div>
            }

        </div >
    )
}

export default withRouter(AuditList);
