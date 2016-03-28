// responsabilidades de ferramentas básicas

function replaceAllSpecialCharacters(str) {
    return str.replace(/([.*+?^=!:${}()|\[\]\/\\])/g, "");
}

function arrange_json(form_json){
	var newkey;
	for(var key in form_json){
		newkey = replaceAllSpecialCharacters(key);
		if(newkey != key){
			form_json[newkey] = form_json[key];
			delete form_json[key];
		}
	}
	return form_json;
}


// responsabilidades que serão utilizadas quando este arquivo for importado
module.exports = {
    replaceAllSpecialCharacters: replaceAllSpecialCharacters,
    arrange_json: arrange_json
};
