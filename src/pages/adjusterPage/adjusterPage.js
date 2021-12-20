import React from 'react'
import { Link } from 'react-router-dom'

export default function adjusterPage() {
    return (
        <div className="container  m-1">
                <div class="row slideanim">
                    <div class="col-sm-offset-2 col-sm-4 col-xs-12">
                         
                        <div class="panel panel-default text-center">
                            <div class="panel-heading">
                                <h3>Adjustment </h3>
                            </div>
                            <div class="panel-body">
                                <p><strong>Make</strong> </p>
                                <p><strong>Review</strong> </p>
                            </div>
                            <div class="panel-footer">
                               
                            <Link to="adjustment" class="btn btn-lg">View More</Link>
                            </div>
                        </div>
                        
                    </div>

                    <div class="col-sm-4 col-xs-12">
                         
                        <div class="panel panel-default text-center">
                            <div class="panel-heading">
                                <h3>Request audit  </h3>
                            </div>
                            <div class="panel-body">
                                <p><strong>Report/RAR</strong> </p>
                                 
                                <p><strong>Others</strong> </p>
                            </div>
                            <div class="panel-footer">
                               
                            <Link to="request-audit" class="btn btn-lg">View More</Link>
                            </div>
                        </div>
                         
                    </div>
                </div>
            </div>
    )
}
