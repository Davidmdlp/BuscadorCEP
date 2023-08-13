import { useState } from 'react'
import { FiSearch } from 'react-icons/fi';
import React from 'react';
import api from './services/api';

function App() {

  const [input, setInput] = useState('');
  const [cep, setCep] = useState({});
  const handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      handleSearch();
    }
  };

  async function handleSearch(){
    // 60840282/json

    if(input ===''){
      alert("Preencha com algum CEP!")
      return;
    }

    try{
      const response = await api.get(`${input}/json`);
      console.log(response)
      setCep(response.data)
      setInput("");

    }catch{
      alert("Ops erro ao buscar");
      setInput("")
    }
  }

  return (
    <div className="container">
      <div className='title'>
        BUSCADOR CEP
      </div>
      <div className="containerInput">
        <input type="text" 
        placeholder='Digite seu cep' 
        value={input}
        onChange={(e) => setInput(e.target.value)} 
        onKeyPress={handleKeyPress} />
        <button className="buttonSearch" onClick={handleSearch}>
          <FiSearch size={25} color="#FFF"/>
        </button>
      </div>

      {Object.keys(cep).length > 0 &&(
        <main className='main'>
          <h2>CEP: {cep.cep}</h2>

          <span>{cep.logradouro}</span>
          <span>Número: {cep.complemento}</span>
          <span>Bairro: {cep.bairro}</span>
          <span>{cep.localidade} - {cep.uf}</span>
        </main>
      )}
      
    </div>
  );
}

export default App;
