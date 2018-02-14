import React from 'react'

const UserRow = ({ index, user, editAction, removeAction }) => (
    <div className="row user-row">
        <div className="col-sm-2">
            {user.full_name}
        </div>
        <div className="col-sm-2">
            {user.class}
        </div>
        <div className="col-sm-2">
            {user.school}
        </div>
        <div className="col-sm-2"> 
            <button type="button" onClick={() => editAction(index)}className="btn btn-info">Edit </button>
        </div>
        <div className="col-sm-2">
            <button type="button" onClick={() => removeAction(index)} className="btn btn-danger">Remove </button>
        </div>
    </div>
)

export default UserRow

