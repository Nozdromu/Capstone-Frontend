import './App.css';
import React from 'react';
import Home from './Components/Newhome'
import TTT from './Components/testf'



function App() {
  var te=new TTT();
  te.sett(()=>{
    console.log('done')
  });
  te.gett()();
  return (

      <Home />

  );
}

export default App;
