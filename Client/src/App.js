import './App.css';
import React, { useState, useEffect } from 'react';
import Home from './Components/Newhome'
import Core from './Components/Core';
import { createContext } from 'react';

export const itemdetial = createContext(null);
export const itemshow = createContext(null);

function App() {
  // state that control page show
  const [load, setLoad] = useState(false)
  const [page, setpage] = useState(<></>);
  const [item, setitem] = useState('');
  const [itemdetialshow, setitemdetialshow] = useState(false)
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

  return (
    <itemdetial.Provider value={{ item, setitem }}>
      <itemshow.Provider value={{ itemdetialshow, setitemdetialshow }}>
        {page}
      </itemshow.Provider>
    </itemdetial.Provider>

  )
}

export default App;
