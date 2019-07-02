import React from 'react';
import PeopleTable from './PeopleTable/PeopleTable'
import Data from './PeopleTable/Data'
import logo from './logo.svg';
import './App.css';

function App() {
  return (
    <div className="App">
      <PeopleTable data={Data}/>
    </div>
  );
}

export default App;
