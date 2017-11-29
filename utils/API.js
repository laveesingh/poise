
import axios from "axios";
const APIKEY = "2cf05646712d49639c765623bbbb99ea";
const queryURLBase = "https://api.nytimes.com/svc/search/v2/articlesearch.json?api-key=" +
APIKEY + "&q="
export default {


	Search: function(query) {
		return axios.get(queryURLBase + query );
	},
	saveArticle:function(articleData) {
		return axios.post("/api/saved", articleData);
	},
	savedArticles:function() {
		return axios.get("/api/saved");
	},
	deleteArticle:function(id) {
		return axios.delete("/api/saved/"+ id);
	}

};