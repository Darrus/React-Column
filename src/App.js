import React from 'react';
import PeopleTable from './PeopleTable/PeopleTable'
import Data from './resource/Data.json'
import './App.css';

function App() {
  return (
    <div className="App">
      <PeopleTable data={Data}/>
    </div>
  );
}

export default App;
