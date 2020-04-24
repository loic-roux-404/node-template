exports.doInjur = (e) => {
	return "t'es moche " + e
}

exports.getAge = (naissance) => {
	return new Date().getFullYear() - naissance - 1;
}
