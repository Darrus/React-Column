import React, { Component } from 'react';
import './PeopleTable.css';

class PeopleTable extends Component {
    constructor(props) {
        super(props);

        const columnHeaders = this._extractColumns(this.props.data);
        const page = 1;
        const itemsPerPage = 10;
        const filteredData = this.props.data;
        const displayData = this._getPageData(this.props.data, page, itemsPerPage);
        const sortSettings = {};
        
        // Initialize sort settings object with keys from each column
        for(let col of columnHeaders) {
            sortSettings[col] = 0;
        }

        this.state = {
            columnHeaders,
            page,
            itemsPerPage,
            filteredData,
            displayData,
            sortSettings
        }
    }

    sortBy = (key, asc)=>{
        let displayData = [...this.state.displayData];
        let sortSettings = {...this.state.sortSettings};
        sortSettings[key] = asc;

        displayData.sort((a, b)=>{
            for(let sortCol in sortSettings) {
                if(!sortSettings.hasOwnProperty(sortCol) || sortSettings[sortCol] === 0) continue;

                // Pushes all empty values to the bottom
                if(!a.hasOwnProperty(sortCol)) return 1;
                if(!b.hasOwnProperty(sortCol)) return -1;
    
                // Sort
                if(a[sortCol] < b[sortCol]) return -1 * sortSettings[sortCol];
                if(a[sortCol] > b[sortCol]) return 1 * sortSettings[sortCol];
            }
        });

        this.setState({displayData, sortSettings});
    }

    search = (event)=>{
        let keywords = event.target.value.toLowerCase();
        let newData = [...this.props.data];
        newData = newData.filter((e)=>{
            // Combines all the values of the object into a string
            let values = Object.values(e).toString().toLowerCase();
            
            // Replace boolean fields so that it matches display
            values = values.replace("true", "yes");
            values = values.replace("false", "no");

            return values.includes(keywords);
        });

        let pageData = this._getPageData(newData, 1, this.state.itemsPerPage);
        this.setState({filteredData: newData, displayData: pageData, page: 1 });
        this.resetSort();
    }

    changePage = (amount)=>{
        let page = this.state.page + amount;
        let pageData = this._getPageData(this.state.filteredData, page, this.state.itemsPerPage);
        this.setState({displayData: pageData, page: page});
    }

    resetSort = ()=>{
        let sortSettings = {...this.state.sortSettings};
        for(let col in sortSettings) {
            if(!sortSettings.hasOwnProperty(col)) continue;
            
            sortSettings[col] = 0;
        }

        let displayData = this._getPageData(this.state.filteredData, this.state.page, this.state.itemsPerPage);
        this.setState({displayData, sortSettings});
    }

    _getPageData(data, page, itemsPerPage){
        let startPageIndex = itemsPerPage * page - itemsPerPage;
        let endPageIndex = itemsPerPage * page;

        if(endPageIndex > data.length)
            endPageIndex = data.length;

        return data.slice(startPageIndex, endPageIndex);
    }

    _extractColumns(data) {
        let result = [];
        for(let element of data) {
            let keys = Object.keys(element);
            for(let key of keys) {
                let lowerCaseKey = key.toLowerCase();
                if(!result.includes(lowerCaseKey))
                    result.push(key);
            }
        }
        return result;
    }

    render(){
        let prev = null;
        let next = null;
        
        if(this.state.page !== 1) {
            prev = (<span className="pagination" onClick={this.changePage.bind(this, -1)}>Prev</span>);
        }

        if(this.state.page * this.state.itemsPerPage < this.state.filteredData.length) {
            next = (<span className="pagination" onClick={this.changePage.bind(this, 1)}>Next</span>);
        }

        // Initialize table headers
        let tableHeader = (
            <tr>
            {this.state.columnHeaders.map(name=>{
                return <th>
                        <span>{name}</span>
                        <span className={this.state.sortSettings[name] === 1 ? "upArrow red" : "upArrow"} onClick={this.sortBy.bind(this, name, 1)}>^</span>
                        <span className={this.state.sortSettings[name] === -1 ? "downArrow red" : "downArrow"} onClick={this.sortBy.bind(this, name, -1)}>v</span>
                    </th>;
            })}
            </tr>
        );

        // Initialize table body
        let tableBody = this.state.displayData.map((element, index)=>{
            return <tr>{this.state.columnHeaders.map(header=>{
                let text = "";

                // If the element is a boolean, display as Yes or No instead of true or false
                if(typeof(element[header]) === "boolean")
                    text = element[header] ? "Yes" : "No";
                else
                    text = element[header];

                return <td>{text}</td>;
            })}</tr>;
        });

        return (
        <div>
            <h1>People Table</h1>
            <span className="clear" onClick={this.resetSort}>Clear sort settings</span>
            <input type='text' onChange={this.search}></input>
            {prev}
            {next}
            <table className='Table'>
                <thead>
                    {tableHeader}
                </thead>
                <tbody>
                    {tableBody}
                </tbody>
            </table>
        </div>
        );
    }
}

export default PeopleTable;