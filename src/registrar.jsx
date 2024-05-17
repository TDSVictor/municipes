import React from 'react';
import './App.css';

const Registrar = ({ nome, setNome, rg, setRg, cpf, setCpf, nasc, setNasc, email, setEmail, telefone, setTelefone, handleSubmit }) => {
  return (
    <div className="registrar">
      <form onSubmit={handleSubmit}>

        <input 
          type="text"
          value={nome} 
          onChange={(e) => setNome(e.target.value)} 
          placeholder="Nome"
          required 
        />

        <input 
          type="number" 
          value={rg} 
          onChange={(e) => setRg(e.target.value)} 
          placeholder="RG" 
        />
        
        <input 
          type="number" 
          value={cpf} 
          onChange={(e) => setCpf(e.target.value)} 
          placeholder="CPF" 
        />

        <input 
          type="date" 
          value={nasc} 
          onChange={(e) => setNasc(e.target.value)} 
          placeholder="Data de Nascimento" 
        />

        <input 
          type="email" 
          value={email} 
          onChange={(e) => setEmail(e.target.value)} 
          placeholder="Email" 
        />

        <input 
          type="tel" 
          value={telefone} 
          onChange={(e) => setTelefone(e.target.value)} 
          placeholder="Telefone" 
        />

        

      </form>
      <button type='submit'>Registrar</button>
    </div>
  );
};

export default Registrar;
