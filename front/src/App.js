import {useState, useEffect} from 'react';
import logo from './logo.svg';
import './App.css';
import Book_form2 from './comps/Book_form2';
import Books_list from './comps/Books_list';
import Login_signup from './comps/Login_signup';

function App() {
  const [_flag_update, set_flag_update] = useState(true);
  const [_user, set_user] = useState(-1);


  useEffect(()=>
    {

    }, []);

  return (
    <div className="App">
      <header className="App-header">
        { _user !== -1 ? (

          <div>
            <Book_form2 onUpdateList={()=>{set_flag_update(true)}} user_id={_user}/>
            <Books_list user_id={_user} update={_flag_update} onUpdatedList={()=>{set_flag_update(false)}} onUpdateList={()=>{set_flag_update(true)}}/>  
          </div>

          ) : (

          <div>
            <Login_signup onLogin={(user_id)=>{set_user(user_id)}} />
          </div>

          ) }
        
      </header>
    </div>
  );
}

export default App;
