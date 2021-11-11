/**
 * @api {post} /pessoa/:pessoaId Busca pessoa
 * @apiName Busca pessoa por ID
 * @apiGroup Pessoa
 * @apiError (Erro 400 - Bad Request) {CampoInexistenteOuInvalido} 0 Campo "nome" invalido
 * @apiError (Erro 400 - Bad Request) {CampoInexistenteOuInvalido} 1 Campo "rg" invalido
 * @apiError (Erro 400 - Bad Request) {CampoInexistenteOuInvalido} 2 Campo "cpf" invalido
 * @apiError (Erro 400 - Bad Request) {CampoInexistenteOuInvalido} 3 Campo "data_nascimento" invalido
 * @apiError (Erro 400 - Bad Request) {CampoInexistenteOuInvalido} 4 Campo "data_admissao" invalido
 * @apiError (Erro 500 - Server Error) {ErroInterno} 6 Erro Interno durante a execução
 *
 * @apiParam {String} pessoaId
 * 
 * @apiBody {String} nome Exemplo: Joao 
 * @apiBody {String} rg Exemplo: 11.111.111-11
 * @apiBody {String} cpf Exemplo: 111.111.111-11
 * @apiBody {String} data_nascimento Exemplo: 01/01/2021, deve serguir o modelo 'DD/MM/YYYY'
 * @apiBody {String} data_admissao Exemplo: 01/01/2021, deve serguir o modelo 'DD/MM/YYYY'
 * @apiBody {String} [funcao] Exemplo: 
 *
 */

const knex = require(rootDir+'/lib/knex.js');
const removeInvalidKeys = require(rootDir+'/lib/removeInvalidKeys');
const fecha = require('fecha');

module.exports = [
// cleaning
function (req, res, next) {
	removeInvalidKeys(req.body, [ 'nome', 'rg', 'cpf', 'data_nascimento', 'data_admissao', 'funcao' ]);

	if(req.body.data_nascimento)
		req.body.data_nascimento = fecha.parse(req.body.data_nascimento, 'DD/MM/YYYY');
	
	if(req.body.data_admissao)
		req.body.data_admissao = fecha.parse(req.body.data_admissao, 'DD/MM/YYYY');


	next();
},
// validacoes
function (req, res, next) {

	if(!req.body.data_nascimento)
		res.status(400).json({ ok: false, msg: 'Campo "nome" invalido', tipo: 'CampoInexistenteOuInvalido', cod: 0 });
	if(!req.body.data_nascimento)
		res.status(400).json({ ok: false, msg: 'Campo "rg" invalido', tipo: 'CampoInexistenteOuInvalido', cod: 1 });
	if(!req.body.data_nascimento)
		res.status(400).json({ ok: false, msg: 'Campo "cpf" invalido', tipo: 'CampoInexistenteOuInvalido', cod: 2 });
	if(!req.body.data_nascimento)
		res.status(400).json({ ok: false, msg: 'Campo "data_nascimento" invalido', tipo: 'CampoInexistenteOuInvalido', cod: 3 });
	if(!req.body.data_admissao)
		res.status(400).json({ ok: false, msg: 'Campo "data_admissao" invalido', tipo: 'CampoInexistenteOuInvalido', cod: 4 });
	else 
		next();
},
function (req, res, next) {

	knex('pessoas')
	  .where('id_pessoa', req.params.pessoaId)
	  .update(req.body)
	  .then(function(modified) {
		res.json({ ok: true, modified });
	}).catch(function(err) {
		console.error(err);
		res.status(500).json({ ok: false, msg: 'Erro ao atualizar pessoa', cod: 6 });
	});
}
];
