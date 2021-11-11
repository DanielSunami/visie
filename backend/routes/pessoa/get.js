/**
 * @api {get} /pessoa Busca todas as pessoas cadastradas
 * @apiName Busca pessoas
 * @apiGroup Pessoa
 *
 * @apiError (Erro 500 - Server Error) {ErroInterno} 1 Erro Interno durante a execução
 * 
 */

const knex = require(rootDir+'/lib/knex.js');
const fecha = require('fecha');

module.exports = [
function (req, res, next) {

	knex.select('*')
	  .from('pessoas')
	  .then(function(data) {
		for(let i = 0; i < data.length; i++) {
			data[i].data_nascimento = fecha.format(data[i].data_nascimento, 'DD/MM/YYYY');
			data[i].data_admissao = fecha.format(data[i].data_admissao, 'DD/MM/YYYY');
		}

		res.json({ ok: true, data });
	}).catch(function(err) {
		console.error(err);
		res.status(500).json({ ok: false, msg: 'Erro ao buscar pessoa', cod: 1 });
	});
}
];