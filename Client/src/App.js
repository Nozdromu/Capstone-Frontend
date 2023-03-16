import './App.css';
import React, { useState, useEffect } from 'react';
import Core from './Components/Core';
import { createContext } from 'react';

export const itemdetial = createContext(null);
export const itemshow = createContext(null);
export const islogin = createContext(null);

function App() {
  // state that control page show
  const [load, setLoad] = useState(false)
  const [page, setpage] = useState(<></>);
  const [item, setitem] = useState('');
  const [itemdetialshow, setitemdetialshow] = useState(false)
  const [login, setlogin] = useState(false)
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
        <islogin.Provider value={{ login, setlogin }}>
          {page}
        </islogin.Provider>
      </itemshow.Provider>
    </itemdetial.Provider>

  )
}

export default App;
