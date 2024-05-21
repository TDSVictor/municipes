import connection from './banco.js';

export function read(callback){
    connection.query('SELECT * FROM pessoas', callback);
}

export function create(nome, rg, cpf, nasc, email, telefone) {
    connection.query('INSERT INTO pessoas (nome, rg, cpf, nasc, email, telefone, pessoa_ativa) VALUES (?, ?, ?, ?, ?, ?, 1)', [nome, rg, cpf, nasc, email, telefone]);
}

export function update(id, novoDados, callback){
    connection.query('UPDATE pessoas SET ? WHERE id = ?', [novoDados, id], callback);
}

export function deletePes(id, callback){
    connection.query('UPDATE pessoas SET pessoa_ativa = 0 WHERE id = ?', [id], callback);
}
