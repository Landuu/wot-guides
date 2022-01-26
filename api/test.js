
import dotenv from 'dotenv';
import pupa from 'pupa';
dotenv.config();

const cfg = {
    key: process.env.API_KEY,
    url: process.env.API_URL_ALL_TANKS
}

const apiUrl = pupa(cfg.url, [cfg.key]);
