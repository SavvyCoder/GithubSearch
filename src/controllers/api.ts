"use strict";

import { Request, Response } from "express";
import async from "async";
import axios from "axios";

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
    const { data } = await api().get(`${body.name}`);
    res.send(data);
  } catch (err) {
    throw err;
  }
};
