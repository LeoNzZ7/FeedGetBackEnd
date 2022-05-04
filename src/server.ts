import express, { Request, Response } from 'express';

const app = express();

app.get('/users', (req: Request, res: Response) => {
    return res.send('Hello World')
});

app.listen(3333, () => {
    console.log('HTTP server runing!')
});