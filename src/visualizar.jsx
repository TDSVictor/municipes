import React, { useEffect, useState } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { FaGithub, FaSearch } from 'react-icons/fa';

function Visualizar() {
  const [pessoas, setPessoas] = useState([]);
  const [pessoaSelecionada, setPessoaSelecionada] = useState(null);
  const [paginaAtual, setPaginaAtual] = useState(1);
  const [termoPesquisa, setTermoPesquisa] = useState('');
  const pessoasPorPagina = 6;

  useEffect(() => {
    fetch('http://localhost:3000/pessoa')
      .then(response => response.json())
      .then(data => {
        console.log(data);
        setPessoas(Array.isArray(data) ? data : []);
      })
      .catch(error => console.error('Erro ao buscar pessoas:', error));
  }, []);

  const handleButtonClick = (pessoa) => {
    setPessoaSelecionada(pessoa);
  };

  const handleInputChange = (e, inputName) => {
    const { value } = e.target;
    if (inputName === 'pesquisa') {
      setTermoPesquisa(value);
    } else if (inputName === 'detalhes') {

      setPessoaSelecionada(prevState => ({
        ...prevState,
        [e.target.name]: value
      }));
    }
  };

  const handleBackClick = () => {
    setPessoaSelecionada(null);
  };

  const handleNextPage = () => {
    setPaginaAtual(prevPage => prevPage + 1);
  };

  const handlePrevPage = () => {
    setPaginaAtual(prevPage => prevPage - 1);
  };

  const handleUpdate = async () => {
    if (pessoaSelecionada) {
      try {
        await fetch(`http://localhost:3000/pessoa/${pessoaSelecionada.id}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(pessoaSelecionada)
        });
        setPessoaSelecionada(null);
        window.location.reload();
        toast.success('Pessoa atualizada com sucesso!', {
          position: "top-right"
        });
      } catch (error) {
        console.error('Erro ao atualizar pessoa:', error);
      }
    }
  };

  const handleDelete = async (id) => {
    try {
      await fetch(`http://localhost:3000/pessoa/${id}`, {
        method: 'DELETE'
      });
      toast.success('Pessoa inativada com sucesso!', {
        position: "top-right"
      });
      setPessoaSelecionada(null);
      window.location.reload();
    } catch (error) {
      toast.error('Delete não concluído!', {
        position: "top-right"
      });
      console.error('Erro ao excluir pessoa:', error);
    }
  };


  // Função para filtrar pessoas com base no termo de pesquisa
  const filtrarPessoas = (pessoa) => {
    if (!pessoa) return false; // Verificar se a pessoa é nula
    const termo = termoPesquisa.toLowerCase();
    return pessoa.pessoa_ativa === 1 && (pessoa.nome.toLowerCase().includes(termo) || pessoa.cpf.includes(termo) || pessoa.rg.includes(termo));
  };

  // Calcular índices das pessoas para a página atual
  const indiceInicial = (paginaAtual - 1) * pessoasPorPagina;
  const indiceFinal = paginaAtual * pessoasPorPagina;

  // Slice das pessoas filtradas para exibir apenas as da página atual
  const pessoasFiltradasPaginaAtual = pessoas.filter(filtrarPessoas).slice(indiceInicial, indiceFinal);

  return (
    <div className="visualizar-container">

      {!pessoaSelecionada && (
        <div className="header">
          <div className="h2move">
            <h2>Lista de Pessoas</h2>
          </div>

          <div className="form-group">
            <input
              type="text"
              value={termoPesquisa}
              onChange={(e) => handleInputChange(e, 'pesquisa')}
              placeholder="Pesquisar por nome, CPF ou RG"
              className="input-pesquisa"
           />
          </div>
        </div>
      )}
      {pessoaSelecionada ? (
        <div className="detalhes-pessoa">

          <h3>Detalhes do ID: {pessoaSelecionada.id}</h3>

          <div className="form-group">
            <label htmlFor="nome">Nome:</label>
            <input type="text" id="nome" name="nome" value={pessoaSelecionada.nome}  onChange={(e) => handleInputChange(e, 'detalhes')} />
          </div>

          <div className="form-group">
            <label htmlFor="rg">RG:</label>
            <input type="text" id="rg" name="rg" value={pessoaSelecionada.rg}  onChange={(e) => handleInputChange(e, 'detalhes')} />
          </div>

          <div className="form-group">
            <label htmlFor="cpf">CPF:</label>
            <input type="text" id="cpf" name="cpf" value={pessoaSelecionada.cpf} onChange={(e) => handleInputChange(e, 'detalhes')} />
          </div>

          <div className="form-group">
            <label htmlFor="nasc">Nascimento:</label>
            <input type="text" id="nasc" name="nasc" value={pessoaSelecionada.nasc} onChange={(e) => handleInputChange(e, 'detalhes')} />
          </div>

          <div className="form-group">
            <label htmlFor="email">Email:</label>
            <input type="text" id="email" name="email" value={pessoaSelecionada.email} onChange={(e) => handleInputChange(e, 'detalhes')} />
          </div>

          <div className="form-group">
            <label htmlFor="telefone">Telefone:</label>
            <input type="text" id="telefone" name="telefone" value={pessoaSelecionada.telefone} onChange={(e) => handleInputChange(e, 'detalhes')} />
          </div>

          <div className="button-voltar-container">

            <button onClick={handleBackClick} className='button-voltar'>Voltar</button>

            <button onClick={handleUpdate} className='button-voltar'>Editar</button>

            <button onClick={() => handleDelete(pessoaSelecionada.id)} className='button-voltar'>Excluir</button>

          </div>

        </div>
      ) : (

        <div className="botao-containervisu">

          {pessoasFiltradasPaginaAtual.map(pessoa => (
            <button key={pessoa.id} onClick={() => handleButtonClick(pessoa)} className="botao-pessoa">
              {pessoa.nome}
            </button>

          ))}
          
        <div className="button-page-container">
            {pessoas.length > indiceFinal && (
              <button onClick={handleNextPage} className='button-page'>Próxima Página</button>
            )}

            {paginaAtual > 1 && (
              <button onClick={handlePrevPage} className='button-page'>Página Anterior</button>
            )}
        </div>

        </div>
      )}

    </div>
  );
}

export default Visualizar;
