import got from 'got';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

import config from '../config.js';
import { getHash } from '../utils.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const BASE_URL = 'https://newsapi.org/v2';

/**
 * @typedef {Object} Article
 * @property {object} source
 * @property {string} source.id
 * @property {string} source.name
 * @property {string} author
 * @property {string} title
 * @property {string} description
 * @property {string} url
 * @property {string} urlToImage
 * @property {string} publishedAt
 * @property {string} content
 */
/**
 * @typedef {Object} HeadlinesResult
 * @property {string} status
 * @property {number} totalResults
 * @property {Article[]} articles
 */

const request = got.extend({
  headers: {
    'X-Api-Key': config.newsapi.key,
  },
});

/**
 * Get top headlines
 * @param {Object} params search params
 * @param {string} params.query search query
 * @param {number} params.from page number
 * @param {number} params.limit news per page
 * @returns {HeadlinesResult}
 */
const getHeadlines = ({ query, from, limit }) =>
  request
    .get(`${BASE_URL}/top-headlines`, {
      searchParams: {
        q: query,
        page: from,
        pageSize: limit,
      },
    })
    .json();

const isFileExists = (filepath = '') =>
  fs
    .promises
    .access(filepath, fs.constants.F_OK)
    .then(() => true)
    .catch(() => false);

/**
 * @param {string} filepath
 * @returns {Article & { timestamp: string }}
 */
const readArticleFromFile = async (filepath = '') => {
  const [stat, article] = await Promise.all([
    fs.promises.stat(filepath),
    fs
      .promises
      .readFile(filepath, 'utf8')
      .then(JSON.parse),
  ]);
  
  return {
    ...article,
    timestamp: stat.birthtime.toISOString(),
  };
}

/**
 * Save article in file if not exists
 * @param {Article} article
 * @returns {Article}
 */
const saveArticleIfNotExists = async (article) => {
  const hash = getHash(article.url);
  const filepath = path.join(__dirname, '..', '..', 'temp', hash);

  const fileExists = await isFileExists(filepath);

  if (!fileExists) {
    await fs.promises.writeFile(filepath, JSON.stringify(article));
  }

  return readArticleFromFile(filepath);
};

/**
 * Get news
 * @param {Object} params search params
 * @param {string} params.query search query
 * @param {number} params.from page number
 * @param {number} params.limit news per page
 */
export const getNews = async ({ query, from, limit }) => {
  const { articles, totalResults, status } = await getHeadlines({ query, from, limit });

  const results = [];

  for (const article of articles) {
    const processedArticle = await saveArticleIfNotExists(article);
    results.push(processedArticle);
  }

  return {
    totalResults,
    status,
    articles: results,
  };
};
