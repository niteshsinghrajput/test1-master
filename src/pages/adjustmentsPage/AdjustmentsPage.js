import React, {useEffect, useState} from 'react'
import axios from 'axios';
import { Link, withRouter } from 'react-router-dom';

const AdjustmentsPage=(props) => {

const [adjustmentsData, setAdjustmentsData] = useState([])
const [selectedIndex, setSelectedIndex] = useState();
const selectedRow=(index)=>{
    setSelectedIndex(index)
    const url= `./new-adjustments?id=${adjustmentsData[index-1].id}`;
    props.history.push(url)
}


    const loadData= ()=>{
        axios.get(`/data/home.json`)
      .then(res => {
        const persons = res.data;
        setAdjustmentsData(res.data)
       
      })
    }

    useEffect(() => {
       loadData()
    }, [])


    return (
        <div className="body-layout">
           

    <div className="container  m-1">
        <div className="row">
            <div className="col-sm-6">
                <h3 className="headding">  Adjustments</h3>
            </div>
            <div className="col-sm-6 text-right">
            <Link to="/new-adjustments" className="btn btn-primary">
            + New Adjustments
            </Link>

            </div>
        </div>

        <div className="row1 m-1">
            <table className="table table-condensed ">
                <thead>
                    <tr>
                        <th>Report Date </th>
                        <th>Refinery</th>
                        <th>Status</th>
                        <th>Reviewer</th>
                    </tr>
                </thead>
                <tbody>
                    {adjustmentsData.map((rowData)=>(
                    <tr className={`clickable-row ${selectedIndex===rowData.id && "active"} `} onClick={()=>selectedRow(rowData.id)}>
                       
                        <td>{rowData.date} </td>
                        <td>{rowData.refinery} </td>
                        <td className={`${rowData.status=="Action Required" && "text-danger"}`}>{rowData.status} </td>
                        <td>{rowData.application} </td>

                    </tr>
                    ))
                    }

                   {adjustmentsData.length<1 &&
                    <tr>
                        <td colspan="4">No Adjustments to show.</td>

                    </tr>
                    }
                </tbody>
            </table>
        </div>
    </div> 
        </div>
    )
}

export default withRouter(AdjustmentsPage);