import React, { Component } from 'react';
import Table from './Table';
import './PeopleTable.css';

class PeopleTable extends Component {
    state = {
        columnHeaders: this._extractColumns(this.props.data),
        page: 1,
        itemsPerPage: 10,
        filteredData: this.props.data,
        displayData: this._getPageData(this.props.data, 1, 10)
    };

    sortBy = (key, asc)=>{
        let newData = [...this.state.filteredData];
        newData.sort((a, b)=>{
            // Pushes all empty values to the bottom
            if(!a.hasOwnProperty(key)) return 1;
            if(!b.hasOwnProperty(key)) return -1;

            // Sort
            if(a[key] < b[key]) return -1 * asc;
            if(a[key] > b[key]) return 1 * asc;
            return 0;
        });

        let pageData = this._getPageData(newData, 1, this.state.itemsPerPage);
        this.setState({filteredData: newData, displayData: pageData, page: 1 });
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
    }

    changePage = (amount)=>{
        let page = this.state.page + amount;
        let pageData = this._getPageData(this.state.filteredData, page, this.state.itemsPerPage);
        this.setState({displayData: pageData, page: page});
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
                    result.push(lowerCaseKey);
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

        return <div>
            <h1>People Table</h1>
            <input type='text' onChange={this.search}></input>
            {prev}
            {next}
            <Table 
            data={this.state.displayData} 
            columnHeaders={this.state.columnHeaders}
            sortHandler={this.sortBy}/>
        </div>;
    }
}

export default PeopleTable;