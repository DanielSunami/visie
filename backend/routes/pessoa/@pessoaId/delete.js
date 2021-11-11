/**
 * @api {delete} /pessoa/:pessoaId Deletar pessoa
 * @apiName Deletar Pessoa por ID
 * @apiGroup Pessoa
 * 
 * @apiError (Erro 400 - Bad Request) {CampoInexistenteOuInvalido} 0 Campo "pessoaId" invalido
 * @apiError (Erro 500 - Server Error) {ErroInterno} 1 Erro Interno durante a execução
 *
 * @apiParam {String} pessoaId
 *
 */

const knex = require(rootDir+'/lib/knex.js');

module.exports = [
// validacoes
function (req, res, next) {
	if (!req.params.pessoaId || isNaN(req.params.pessoaId))
		res.status(400).json({ ok: false, msg: 'Campo "pessoaId" invalido', tipo: 'CampoInexistenteOuInvalido', cod: 0 });
	else 
		next();
},
function (req, res, next) {

	knex('pessoas')
	  .where('id_pessoa', req.params.pessoaId)
	  .del()
	  .then(function(modified) {
		res.json({ ok: true, modified });
	}).catch(function(err) {
		console.error(err);
		res.status(500).json({ ok: false, msg: "Erro ao deletar pessoa", cod: 1 });
	});
}
];
