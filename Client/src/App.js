import './App.css';
import React, { useState, useEffect } from 'react';
import Home from './Components/Newhome'
import Core from './Components/Core';



function App() {
  // state that control page show
  const [load, setLoad] = useState(false)
  const [page, setpage] = useState(<></>);
  var set = () => {
    setLoad(true);
  }

  if (!load) {
    Core.addhook(set);
  }


  useEffect(() => {
    if (load)
      setpage(Core.gethomepage())
  }, [load])

  return (page)
}

export default App;
