import * as newsService from '../services/news.service.js';

/** @type {import("express").RequestHandler} */
export const getNews = async (req, res, next) => {
  try {
    const { limit, from, query } = req.query;
    const news = await newsService.getNews({ query, from, limit });

    res.send(news);
  } catch (err) {
    next(err);
  }
};