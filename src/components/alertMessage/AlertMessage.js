import React from 'react'

export default function AlertMessage(props) {

    const {closeAlert} = props;
    return (
        <div className="container ">
                <div className="row">
                    <div className="col-sm-12">
                        <div className="alert alert-info alert-dismissible fade in">
                            <a href="#" className="close" onClick={()=>closeAlert()}  data-dismiss="alert" aria-label="close">&times;</a>
                            <strong>{props.message}</strong> .
                        </div>
                    </div>
                </div>
            </div>
    )
}
