import db from '../../database.js';
import fetch from 'cross-fetch';
import pupa from 'pupa';
import ck from 'ckey';

const connection = await db.getConnection();

class Tank {
    wot_tank_id;
    name;
    short_name;
    tier;

    constructor(wot_tank_id, name, short_name, tier) {
        this.wot_tank_id = wot_tank_id;
        this.name = name;
        this.short_name = short_name;
        this.tier = tier;
    }

    getSql() {
        const insertSql = "INSERT INTO `tanks` (`wot_tank_id`, `name`, `short_name`, `tier`) VALUES ('{wot_tank_id}','{name}','{short_name}','{tier}')";
        return pupa(insertSql, this);
    }
}

class Api {
    static key = ck.API_KEY;
    static url = `https://api.worldoftanks.eu/wot/encyclopedia/vehicles/?application_id=${this.key}&fields=tank_id%2C+name%2C+short_name%2C+tier&page_no={0}`;
    static page = 1;
    static maxPage = 1;

    static getUrl() {
        return pupa(this.url, [this.page]);
    }

    static async fetch() {
        const req = await fetch(this.getUrl());
        const res = await req.json();
        if(res.status == 'error') return null;
        // TODO: Error checking (API NOT RESPODNING / PRINT ERROR?)
        this.maxPage = res.meta.page_total;
        console.log(`[R] Page: ${this.page}, MaxPage: ${this.maxPage}, DataCount: ${res.meta.count}`);
        this.page++;
        return res.data;
    }

    static async getData() {
        let tanks = [];
        for(let i = 1; i <= this.maxPage; i++) {
            const data = await this.fetch();
            const pData = Object.values(data);
            pData.forEach(t => {
                const tank = new Tank(t.tank_id, t.name, t.short_name, t.tier);
                tanks.push(tank);
            });
        }
        return tanks;
    }
}


const tanks = await Api.getData();
for(let i = 0; i < tanks.length; i++) {
    const tank = tanks[i];
    // TODO: Check database connection and break if there's error
    await connection.execute(tank.getSql());
}


connection.release();
db.end();