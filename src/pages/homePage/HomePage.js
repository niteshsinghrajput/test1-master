import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { Link } from 'react-router-dom';
import AdjusterPage from '../adjusterPage/adjusterPage';
import ApproverPage from '../approverPage/ApproverPage';
import AlertMessage from '../../components/alertMessage/AlertMessage';

export default function HomePage(props) {

    const [adjustmentsData, setAdjustmentsData] = useState([])
    const [messageStatus, setMessageStatus] = useState(true)
    const { loginUser } = props
    useEffect(() => {
    }, [])

    const closeAlert = () => {
        setMessageStatus(false)
    }


    return (
        <div className="body-layout">
            {messageStatus &&
                <AlertMessage closeAlert={closeAlert} message="Welcome" />
            }
            {loginUser &&
                loginUser.role === "Adjuster" ?
                <div className="container  m-1">
                    <div class="row slideanim m-1">
                        <div class="col-sm-offset-2 col-sm-4 col-xs-12">

                            <div class="panel panel-default text-center">

                                <div class="panel-btn">

                                    <Link to="adjustment" class="btn btn-lg btn-block btn-primary">Make Adjustments</Link>

                                </div>
                            </div>

                        </div>

                        <div class="col-sm-4 col-xs-12">

                            <div class="panel panel-default text-center">

                                <div class="panel-btn">
                                    <Link to="adjuster-request-audit" class="btn btn-lg btn-block btn-primary">Request Audit Report</Link>
                                </div>
                            </div>

                        </div>
                    </div>
                </div> :
                <div className="container  m-1">
                    <div class="row slideanim">
                        <div class="col-sm-offset-2 col-sm-4 col-xs-12">

                            <div class="panel panel-default text-center">

                                <div class="panel-btn">

                                    <Link to="approver" class="btn btn-lg btn-block btn-primary">Review Adjustments</Link>

                                </div>
                            </div>

                        </div>

                        <div class="col-sm-4 col-xs-12">

                            <div class="panel panel-default text-center">

                                <div class="panel-btn">
                                    <Link to="request-audit" class="btn btn-lg btn-block btn-primary">Request Audit Report</Link>
                                </div>
                            </div>

                        </div>
                    </div>
                </div>
            }




        </div>
    )
}
