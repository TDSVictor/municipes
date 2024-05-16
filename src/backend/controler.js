import {create} from './model.js';

export async function createPessoa(req, res){
    const {nome, rg, cpf, nasc, email, telefone} = req.body;
    console.log('Dados recebidos do frontend', {nome, rg, cpf, nasc, email, telefone});

    create(nome, rg, cpf, nasc, rg, cpf, email, telefone, (err,result) => {
        if(err){
            res.status(500).json({error: err.message});
        }
        res.status(201).json({ mensagem: 'Pessoa criado com sucesso'});
    });
}