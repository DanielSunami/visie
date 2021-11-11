// remove chaves do objeto que não constam em 'validKeys'
module.exports = function(obj, validKeys) {
	Object.keys(obj).forEach((key) => validKeys.includes(key) || delete obj[key]);	
}