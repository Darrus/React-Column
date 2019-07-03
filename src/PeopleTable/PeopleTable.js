import React, { Component } from 'react';
import Table from './Table';

class PeopleTable extends Component {
    state = {
        columnHeaders: this._extractColumns(this.props.data),
        data: this.props.data
    };

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

    sortBy = (key)=>{
        let newData = [...this.state.data];
        newData.sort((a, b)=>{
            if(!a.hasOwnProperty(key)) return 1;
            if(!b.hasOwnProperty(key)) return -1;
            if(a[key] < b[key]) return -1;
            if(a[key] > b[key]) return 1;
            return 0;
        });
        this.setState({data: newData});
    }

    render(){
        return <Table 
        data={this.state.data} 
        columnHeaders={this.state.columnHeaders}
        sortHandler={this.sortBy}/>;
    }
}

export default PeopleTable;