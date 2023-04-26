import './App.css';
import React, { useState, useEffect } from 'react';
import Home from './Components/Newhome'
import Core from './Components/Core';
import Map from './Components/UpdatedMap';
import MyComponent from './Components/Test_example/Google_map_example';



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

      <Map/>

  useEffect(() => {
    if (load)
      setpage(Core.gethomepage())
  }, [load])

  return (page)
}

export default App;

// 