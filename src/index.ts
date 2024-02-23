#!/usr/bin/env node

import inquirer from "inquirer";

interface Article {
    id: string;
    owner_id: string;
    parent_id: string | null;
    slug: string;
    title: string;
    status: "published" | "draft" | "deleted"; // Assuming status can be "draft" or "deleted" as well
    source_url: string | null;
    created_at: string; // Assuming this is a ISO 8601 date string
    updated_at: string; // Assuming this is a ISO 8601 date string
    published_at: string | null; // Assuming this is a ISO 8601 date string
    deleted_at: string | null; // Assuming this is a ISO 8601 date string
    tabcoins: number;
    tabcoins_credit: number;
    tabcoins_debit: number;
    owner_username: string;
    children_deep_count: number;
}

async function main() {
	console.clear();
	try {
		const news = await getNews();

		console.log(news);

		const refineNews = news.map((article: Article) => {
			return article;
		});

		const nameArticles = refineNews.map((article) => {
			return article.title;
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
			.then((answers) => {
				console.clear();
				const article = refineNews.find(
					(article) => article.title === answers.post,
				);

				getArticle(article as Article).then((data: any) => {
					console.log(data.body);
				});

			});
	} catch (error) {
		console.error("Error fetching news:", error);
	}
}

main();

export async function getNews(): Promise<Article[]> {
	const url = "https://www.tabnews.com.br/api/v1/contents?page=1";

	const response = await fetch(url);
	const data = await response.json();

	return data as Article[];
}

export async function getArticle(article: Article) {
	const url = `https://www.tabnews.com.br/api/v1/contents/${article.owner_username}/${article.slug}`;

	const response = await fetch(url);
	const data = await response.json();

	return data;
}
