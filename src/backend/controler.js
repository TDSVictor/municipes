import connection from './banco.js';
import {update, deletePes} from './model.js'

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
  const query = 'INSERT INTO pessoas (nome, rg, cpf, nasc, email, telefone, pessoa_ativa) VALUES (?, ?, ?, ?, ?, ?, 1)';
  connection.query(query, [nome, rg, cpf, nasc, email, telefone], (err, results) => {
    if (err) {
      res.status(500).json({ message: err.message });
      return;
    }
    res.status(201).json({ message: 'Pessoa criada com sucesso!' });
  });
};

export async function updatePessoa(req, res){
  const { id } = req.params;
  const novoDados = req.body;
  update(id, novoDados, (err, result) => {
    if (err){
      res.status(500).json({error: err.message});
      return;
    }
    res.send('Pessoa atualizada com sucesso')
  });
}

export async function deletePessoa(req, res){
  const { id } = req.params;
  deletePes(id, (err, result) => {
    if (err) {
      res.status(500).json({error: err.message});
      return;
    }
    res.send('Pessoa excluída com sucesso');
  })
}


