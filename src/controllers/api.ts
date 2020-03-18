"use strict";

import { Request, Response } from "express";
import async from "async";
import axios from "axios";
import NodeCache from "node-cache";

const apiCache = new NodeCache();

//Inital axios request setup
const api = () => {
  return axios.create({
    baseURL: "https://api.github.com/search/repositories?q="
  });
};

interface RepoQuery {
  name: string;
  [key: string]: string;
}

/**
 * GET
 * github repository search results
 */
export const getRepos = async (req: Request, res: Response) => {
  try {
    const body: RepoQuery = req.body;
    const cacheKey = `api${JSON.stringify(req.body)}`;
    apiCache.get(cacheKey) && res.send(apiCache.get(cacheKey));
    //If the data is not in our cache get fresh data from API
    const { data } = await api().get(`${body.name}`);
    apiCache.set(cacheKey, data);
    res.send(data);
  } catch (err) {
    throw err;
  }
};
