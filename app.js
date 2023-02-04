/********APP.JS KISMI********/
import './App.css';

import Contacts from './companents/Contacts';

function App() {
  return (
    <div className="App">
      <Contacts />
    </div>
  );
}
export default App;

/****************************CONTACTS-INDEX.JS*********************************/
import { useState, useEffect } from 'react';

import './style.css'

import List from './List/index';
import Form from './Form';

function Contacts() {

  const [contacts, setContacts] = useState([
    {
    fullname:"ömür",
    phone_number:"5052222222"
  },
 /* {
    fullname:"",
    phone_number:"",
  },{
    fullname:"",
    phone_number:""
  }*/
]);

  useEffect(() => {
    console.log(contacts);
  }, [contacts])

  return (
    <div id='container'>
      <h1>CONTACTS</h1>
      <List contacts={contacts}/>
      <Form addContact={setContacts} contacts={contacts}/>

    </div>
  );
}
export default Contacts

/**********FORM-INDEX.JS***********/
import { useState, useEffect } from "react";

function Form({ addContact , contacts}) {


  const [form, setForm] = useState({ fullname: "", phone_number: "" }); // submit edince çalışması için fonksiyona dğer oluşturduk

  useEffect(()=>{
    setForm({fullname:"", phone_number:""});  //veriyi Add ettikten sonra formu temizledik valusunu set ettik
  }, [contacts])

  const onChangeInput = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  const onSubmit = (e) => {
    e.preventDefault()   // formun varsayılan değerine dönüşünü engellemek için evetn ekledik

    if (form.fullname === "" || form.phone_number === "" ) {  //form boş bırakılırsa hata vermek için
      return false;
    }
    addContact([...contacts,form])
  }
  return (
    <div>
      <form onSubmit={onSubmit}>
        <div>
          <input 
          name="fullname" 
          placeholder='Full Name'
          value={form.fullname} 
          onChange={onChangeInput} />
        </div>
        <div>
          <input 
          //pattern="\d{10}"  
          //  title="başında 0 olmadan 10haneli telefon numaranızı giriniz"  
          name="phone_number" 
          placeholder='Phone Number' 
          value={form.phone_number}
          onChange={onChangeInput} />
        </div>
        <div className="btn">
          <button>Add</button>
        </div>
      </form>
    </div>
  )
}
export default Form;

/************************LİST-INDEX.JS********************/
import { useState } from 'react'

function List({ contacts }) {
  const [filterText, setFilterText] = useState('');
  const filtered = contacts.filter((item) => {
    return Object.keys(item).some((key) =>
      item[key]
        .toString()
        .toLowerCase()
        .includes(filterText.toLocaleLowerCase())
    );
  });

  return (
    <div>
      <input placeholder='filter contact' value={filterText} onChange={(e) => setFilterText(e.target.value)} />
      <ul className='list'>
        {filtered.map((contacts, i) => (
          <li key={i}>
            <span>{contacts.fullname}
              </span>
              <span>{contacts.phone_number}</span>
          </li>))}
      </ul>
      <p>Kayıt Sayısı: ({filtered.length})</p>
    </div>
  )
}

export default List;


/**************** CONTACTS STYLE.CSS*************************/
#container {
    width: 400px;
    background-color: rgb(115, 181, 240);
    padding: 20px;
}
input {
    width: 100%;
    box-sizing: border-box;
    -webkit-box-sizing: border-box;
    -moz-box-sizing: border-box;
}
input:hover {
    background-color: rgb(171, 196, 201);
}
ul,li {
    margin: 0;
    padding: 0;
    list-style-type: none;
}
.list {
    margin: 15px 0;
}
.list>li {
    background-color: antiquewhite;
    padding: 5px;
    margin-bottom: 2px;
    display: flex;
    justify-content: space-between;
}
.btn {
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 5px 0;
}
.btn>button {
    background-color: rgb(76, 158, 212);
    padding: 5px;
    width: 100px;
}

/******************************* APP.CSS***************************************/
.App {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
}


