import React from 'react';

const PeopleTable = (prop) => {
    let data = prop.data;
    let columnHeaders = _extractColumns(data);
    
    // Headers
    let headers = (
        <tr>
        {columnHeaders.map(name=>{
            return <th>{name}</th>;
        })}
        </tr>
    );

    let content = data.map((element, index)=>{
        return <tr>{columnHeaders.map(header=>{
            return <td>{element[header]}</td>;
        })}</tr>;
    });

    return (
        <table className='PeopleTable'>
            <thead>
                {headers}
            </thead>
            <tbody>
                {content}
            </tbody>
        </table>
    );

    function _extractColumns(data) {
        let result = [];
        for(let element of data) {
            let keys = Object.keys(element);
            for(let key of keys) {
                let lowerCaseKey = key.toLowerCase();
                if(!result.includes(lowerCaseKey))
                    result.push(lowerCaseKey);
            }
        }
        return result;
    }
}

export default PeopleTable;