import React, { useState } from 'react';

function Principal() {
  const [secaoAtual, setSecaoAtual] = useState('municipes');
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

    }
  };

  return (
    <div className="container">
      <div className="botao-container">
        <button onClick={() => cliqueSecao('municipes')} className='botao-menu' id="muni">Visualizar</button>
        <button onClick={() => cliqueSecao('registrar')} className='botao-menu' id="regi">Registrar</button>
        <button onClick={() => cliqueSecao('excluir')} className='botao-menu' id="exc">Excluir</button>
      </div>

      <div className="conteudos">
        {secaoAtual === 'municipes' && (
          <p>Visualizar Munícipes</p>
        )}

        {secaoAtual === 'registrar' && (
          <>
            <form onSubmit={handleSubmit}>

              <input type="text"
                value={nome}
                onChange={(e) => setNome(e.target.value)}
                placeholder="Nome"
              />

              <input type="number"
                value={rg}
                onChange={(e) => setRg(e.target.value)}
                placeholder="RG"
              />

              <input type="number"
                value={cpf}
                onChange={(e) => setCpf(e.target.value)}
                placeholder="CPF"
              />

              <input type="date"
                value={nasc}
                onChange={(e) => setNasc(e.target.value)}
                placeholder="Data de Nascimento"
              />

              <input type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email"
              />

              <input type="tel"
                value={telefone}
                onChange={(e) => setTelefone(e.target.value)}
                placeholder="Telefone"
              />

              <button type='submit'>Registrar</button>
            </form>
          </>
        )}

        {secaoAtual === 'excluir' && (
          <p>Excluir Munícipe</p>
        )}
      </div>
    </div>
  )
}

export default Principal;
