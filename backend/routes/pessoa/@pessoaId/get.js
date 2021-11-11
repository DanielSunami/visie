/**
 * @api {get} /pessoa/:pessoaId Busca pessoa
 * @apiName Busca pessoa por ID
 * @apiGroup Pessoa
 * @apiError (Erro 400 - Bad Request) {CampoInexistenteOuInvalido} 0 Campo "pessoaId" invalido
 *
 * @apiParam {String} pessoaId
 *
 */

const knex = require(rootDir+'/lib/knex.js');
const fecha = require('fecha');

module.exports = [
// validacoes
function (req, res, next) {
	if (!req.params.pessoaId || isNaN(req.params.pessoaId))
		res.status(400).json({ ok: false, msg: "Campo 'pessoaId' invalido", tipo: "CampoInexistenteOuInvalido", cod: 0 });
	else 
		next();
},
function (req, res, next) {

	knex.select('*')
	  .from('pessoas')
	  .where('id_pessoa', req.params.pessoaId)
	  .then(function(data) {
	  	if(data.length <= 0) {
			res.json({ ok: true, data: [] });
	  		return;
	  	}

		data[0].data_nascimento = fecha.format(data[0].data_nascimento, 'DD/MM/YYYY');
		data[0].data_admissao = fecha.format(data[0].data_admissao, 'DD/MM/YYYY');
		

		res.json({ ok: true, data: data[0] });
	}).catch(function(err) {
		console.error(err);
		res.status(500).json({ ok: false, msg: "Erro ao buscar pessoa", cod: 1 });
	});
}
];