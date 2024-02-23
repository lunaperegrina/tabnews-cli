#!/usr/bin/env node

import inquirer from "inquirer";

import type { Article } from "./utils/article";
import { getNews, getArticle } from "./getData";

(async function () {
	console.clear();
	try {
		const news = await getNews();

		const refineNews = news.map((article: Article) => {
			return article;
		});

		const nameArticles = refineNews.map((article) => {
			return `${article.title} 🔥 ${article.tabcoins} | 💬 ${article.children_deep_count} | ${article.owner_username}`;
		});

		inquirer
			.prompt([
				{
					type: "list",
					name: "post",
					pageSize: 10,
					message: "Que artigo deseja ver?",
					choices: nameArticles,
				},
			])
			.then(async (answers) => {
				console.clear();
				
				const article = refineNews.find(
					(article) => article.title === answers.post.slice(0, answers.post.indexOf("🔥") - 1),
				);

				article == undefined ?
					console.log("Artigo não encontrado")
					: async () => {
						await getArticle(article).then((data) => { console.log(data.body) });
					}

			});
	} catch (error) {
		console.error("Error fetching news:", error);
	}
})();
