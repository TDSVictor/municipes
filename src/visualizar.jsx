import React, { useEffect, useState } from 'react';

function Visualizar() {
  const [pessoas, setPessoas] = useState([]);
  const [pessoaSelecionada, setPessoaSelecionada] = useState(null);
  const [paginaAtual, setPaginaAtual] = useState(1);
  const [termoPesquisa, setTermoPesquisa] = useState('');
  const pessoasPorPagina = 5;

  useEffect(() => {
    fetch('http://localhost:3000/pessoa')
      .then(response => response.json())
      .then(data => {
        console.log(data); // Verifique a estrutura dos dados recebidos
        setPessoas(Array.isArray(data) ? data : []);
      })
      .catch(error => console.error('Erro ao buscar pessoas:', error));
  }, []);

  const handleButtonClick = (pessoa) => {
    setPessoaSelecionada(pessoa);
  };

  const handleInputChange = (e) => {
    const { value } = e.target;
    setTermoPesquisa(value);
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

  // Função para filtrar pessoas com base no termo de pesquisa
  // Função para filtrar pessoas com base no termo de pesquisa
const filtrarPessoas = (pessoa) => {
  if (!pessoa) return false; // Verificar se a pessoa é nula
  const { nome, cpf, rg } = pessoa;
  const termo = termoPesquisa.toLowerCase();
  return nome.toLowerCase().includes(termo) || cpf.includes(termo) || rg.includes(termo);
};

  // Calcular índices das pessoas para a página atual
  const indiceInicial = (paginaAtual - 1) * pessoasPorPagina;
  const indiceFinal = paginaAtual * pessoasPorPagina;

  // Slice das pessoas filtradas para exibir apenas as da página atual
  const pessoasFiltradasPaginaAtual = pessoas.filter(filtrarPessoas).slice(indiceInicial, indiceFinal);

  return (
    <div>
      <div className="h2move">
        <h2>Lista de Pessoas</h2>
      </div>
      <div className="form-group">
        <input
          type="text"
          value={termoPesquisa}
          onChange={handleInputChange}
          placeholder="Pesquisar por nome, CPF ou RG"
        />
      </div>
      {pessoaSelecionada ? (
        <div className="detalhes-pessoa">
          {/* Detalhes da pessoa */}
        </div>
      ) : (
        <div className="botao-containervisu">
          {pessoasFiltradasPaginaAtual.map(pessoa => (
            <button key={pessoa.id} onClick={() => handleButtonClick(pessoa)} className="botao-pessoa">
              {pessoa.nome}
            </button>
          ))}
          {pessoas.length > indiceFinal && (
            <button onClick={handleNextPage}>Próxima Página</button>
          )}
          {paginaAtual > 1 && (
            <button onClick={handlePrevPage}>Página Anterior</button>
          )}
        </div>
      )}
    </div>
  );
}

export default Visualizar;
