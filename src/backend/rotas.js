import express from 'express';
import cors from 'cors';
import connection from './banco.js';
import {createPessoa, getAllPessoa, updatePessoa, deletePessoa} from './controler.js'

const app = express();

app.use(express.json());
app.use(cors());

app.get('/pessoa', getAllPessoa)
app.post('/pessoa', createPessoa);
app.put('/pessoa/:id', updatePessoa);
app.delete('/pessoa/:id', deletePessoa);

app.listen(3000, () => {
    console.log(`Servidor funcionando na porta 3000`);
});
