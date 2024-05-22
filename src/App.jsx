import React, { useState } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { FaGithub } from 'react-icons/fa';
import Registrar from './registrar';
import Visualizar from './visualizar';

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
      const response = await fetch('http://localhost:3000/pessoa', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(pessoa)
      });

      if (!response.ok) {
        throw new Error('Erro ao registrar pessoa');
      }

      // Limpar os campos de entrada
      setNome('');
      setRg('');
      setCpf('');
      setNasc('');
      setEmail('');
      setTelefone('');

      // Exibir mensagem de confirmação
      toast.success('Registro realizado com sucesso!', {
        position: "top-right"
      });
    } catch (error) {
      toast.error('Registro não realizado!', {
        position: "top-right"
      });
      console.error("Erro ao registrar pessoa:", error);
    }
  };

  return (
    <div className="main-container">
      <div className="left-container">
        <img src="logo.png" alt="Brasao do Estado" className="flag" />
        <h2>Sistema de Registros de Municipes</h2><br/>
        <p>Sistema desenvolvido para modernizar o processo de cadastramento de munícipes, evitando duplicidades e aumentando a eficiência.</p>
        <p className='creditos'>Desenvolvedor <a href='https://github.com/TDSVictor'>Victor Araujo <FaGithub/></a></p>
      </div>
      <div className="divider"></div>
      <div className="right-container">
        <div className="botao-container">
          <button onClick={() => cliqueSecao('visualizar')} className='botao-menu' id="muni">Visualizar</button>
          <button onClick={() => cliqueSecao('registrar')} className='botao-menu' id="regi">Registrar</button>
        </div>

        {secaoAtual === 'visualizar' && (
          <div className="visualizar">
            <Visualizar />
            <ToastContainer />
          </div>
        )}

        {secaoAtual === 'registrar' && (
          <div className="registrar">
            <Registrar 
              nome={nome} setNome={setNome}
              rg={rg} setRg={setRg}
              cpf={cpf} setCpf={setCpf}
              nasc={nasc} setNasc={setNasc}
              email={email} setEmail={setEmail}
              telefone={telefone} setTelefone={setTelefone}
              handleSubmit={handleSubmit}
            />
            <ToastContainer />
          </div>
        )}
      </div>
    </div>
  );
}

export default Principal;
