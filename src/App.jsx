import React, { useState } from 'react';
import Registrar from './registrar';
import Visualizar from './visualizar';
import Editar from './editar';

function Principal() {
  const [secaoAtual, setSecaoAtual] = useState('visualizar');
  const [nome, setNome] = useState('');
  const [rg, setRg] = useState('');
  const [cpf, setCpf] = useState('');
  const [nasc, setNasc] = useState('');
  const [email, setEmail] = useState('');
  const [telefone, setTelefone] = useState('');

  const cliqueSecao = (secao) => {
    setSecaoAtual(secao);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const pessoa = { nome, rg, cpf, nasc, email, telefone };

    try {
      await fetch('http://localhost:3000/pessoa', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(pessoa)
      });
    } catch (error) {
      console.error("Erro ao registrar pessoa:", error);
    }
  };

  return (
    <div className="container">
      <div className="botao-container">
        <button onClick={() => cliqueSecao('visualizar')} className='botao-menu' id="muni">Visualizar</button>
        <button onClick={() => cliqueSecao('registrar')} className='botao-menu' id="regi">Registrar</button>
        <button onClick={() => cliqueSecao('editar')} className='botao-menu' id="exc">Excluir</button>
      </div>

      <div className="visualizar">
          {secaoAtual === 'visualizar' && (
            <Visualizar />
          )}
      </div>

          {secaoAtual === 'registrar' && (
            <Registrar 
              nome={nome} setNome={setNome}
              rg={rg} setRg={setRg}
              cpf={cpf} setCpf={setCpf}
              nasc={nasc} setNasc={setNasc}
              email={email} setEmail={setEmail}
              telefone={telefone} setTelefone={setTelefone}
              handleSubmit={handleSubmit}
            />
          )}

        <div className="editar">
          {secaoAtual === 'editar' && (
            <Editar />
          )}
        </div>

    </div>
  );
}

export default Principal;
