import React from 'react';

const MyTable = ({index, fullName, country, phone, address}) => {
    return (
        <tr className="table-active">
            <th scope="row">{index + 1}</th>
            <td>{fullName}</td>
            <td>{country}</td>
            <td>{phone}</td>
            <td>{address}</td>
        </tr>
    );
};

export default MyTable;
