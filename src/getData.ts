import type { Article, ArticleWithContent } from "./utils/article";

export async function getNews(): Promise<Article[]> {
	const url = "https://www.tabnews.com.br/api/v1/contents?page=1&per_page=10";

	const response = await fetch(url);
	const data = await response.json();

	return data as Article[];
}

export async function getArticle(article: Article): Promise<ArticleWithContent> {
	const url = `https://www.tabnews.com.br/api/v1/contents/${article.owner_username}/${article.slug}`;
	console.log(url);
	const response = await fetch(url);
	const data: ArticleWithContent = await response.json();

	return data;
}
