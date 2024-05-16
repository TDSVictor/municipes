import connection from './banco.js';

export function create(nome, rg, cpf, nasc, email, telefone){
    connection.query('INSERT INTO pessoas (nome, rg, cpf, nasc, email, telefone) VALUE (?, ?, ?, ?, ?, ?)', [nome, rg, cpf, nasc, email, telefone]);
}