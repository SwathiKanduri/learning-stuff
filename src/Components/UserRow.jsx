import React from 'react'

const UserRow = ({ user }) => (
    <div className="row user-row">
        <div className="col-sm-4">
            {user.full_name}
        </div>
        <div className="col-sm-4">
            {user.class}
        </div>
        <div className="col-sm-4">
            {user.school}
        </div>
    </div>
)

export default UserRow
