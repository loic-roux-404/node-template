const dataPath = '../Views/data/tech.json';
import http from 'http'

const techApi = "http://"+process.env.IP+":"+process.env.PORT+"/techs/api"

export default {
	api(req, res) {
		res.send(require(dataPath));
	},
	list(req, response) {
		http.get(techApi, (res) => {
			res.on('data', function (body) {
				response.json({
					title: "Async techs",
					items: JSON.parse(body)
				});
			});
		});
	}
}
