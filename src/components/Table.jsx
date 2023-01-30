import React from 'react';
import {CSVLink} from "react-csv";

const MyTable = ({index, fullName, country, phone, address}) => {
    const csvData = [
        ["fullName", "country", "phone", 'address'],
        [fullName, country, phone, 'address']
    ];
    return (
        <tr className="table-active">
            <th scope="row">{index + 1}</th>
            <td>{fullName}</td>
            <td>{country}</td>
            <td>{phone}</td>
            <td>{address}</td>
            <td>
                <CSVLink data={csvData}>Download me</CSVLink>;
            </td>
        </tr>
    );
};

export default MyTable;
