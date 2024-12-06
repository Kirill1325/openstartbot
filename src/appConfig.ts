import express, { Application, Request, Response } from 'express';
import cors from 'cors'

export const configure = (app: Application) => {

    app
        .use(express.json())
        .use(cors<Request>())
        .get('/', (req, res: Response, next) => {
            res.send('working');
        })

}