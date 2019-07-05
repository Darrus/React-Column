import React from 'react';
import './Table.css';

const Table = (prop) => {
    let data = prop.data;
    let columnHeaders = prop.columnHeaders;

    // Headers
    let headers = (
        <tr>
        {columnHeaders.map(name=>{
            return <th>
                    <span>{name}</span>
                    <span className="upArrow" onClick={prop.sortHandler.bind(this, name, 1)}>^</span>
                    <span className="downArrow" onClick={prop.sortHandler.bind(this, name, -1)}>v</span>
                </th>;
        })}
        </tr>
    );

    let content = data.map((element, index)=>{
        return <tr>{columnHeaders.map(header=>{
            let text = "";
            if(typeof(element[header]) === "boolean")
                text = element[header] ? "Yes" : "No";
            else
                text = element[header];

            return <td>{text}</td>;
        })}</tr>;
    });

    return (
        <table className='Table'>
            <thead>
                {headers}
            </thead>
            <tbody>
                {content}
            </tbody>
        </table>
    );

    
}

export default Table;