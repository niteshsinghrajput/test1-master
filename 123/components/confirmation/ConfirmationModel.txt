import React from 'react'
import { Modal, Button } from 'react-bootstrap'

export default function ConfirmationModel(props) {
    const { show, handleHide , onDelete} = props;
    return (
        <div className="static-modal">

            <div id="myModal" class="modal fade in" role="dialog" style={{display: "block"}}>
                <div class="modal-dialog modal-sm">

                    <div class="modal-content">
                        <div class="modal-header">
                            
                            <h3 class="modal-title">Confirm</h3>
                        </div>
                        <div class="modal-body">
                            <p> Are you sure you want to delete?</p>
                        </div>
                        <div class="modal-footer">
                            <button type="button" class="btn btn-default" data-dismiss="modal" onClick={handleHide}>Cancel</button>
                            <button type="button" class="btn btn-danger" data-dismiss="modal" onClick={onDelete} >Delete</button>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    )
}
