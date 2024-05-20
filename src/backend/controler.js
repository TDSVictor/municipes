import connection from './banco.js';

export const getAllPessoa = (req, res) => {
  connection.query('SELECT * FROM pessoas', (err, results) => {
    if (err) {
      res.status(500).json({ message: err.message });
      return;
    }
    res.json(results);
  });
};

export const createPessoa = (req, res) => {
  const { nome, rg, cpf, nasc, email, telefone } = req.body;
  const query = 'INSERT INTO pessoas (nome, rg, cpf, nasc, email, telefone) VALUES (?, ?, ?, ?, ?, ?)';
  connection.query(query, [nome, rg, cpf, nasc, email, telefone], (err, results) => {
    if (err) {
      res.status(500).json({ message: err.message });
      return;
    }
    res.status(201).json({ message: 'Pessoa criada com sucesso!' });
  });
};
