import express from 'express';
import 'dotenv/config'
import * as http from 'http';
import * as winston from 'winston';
import * as expressWinston from 'express-winston';
import cors from 'cors'
import debug from 'debug';
import ensureToken from './src/auth/auth.config';
let jwt = require("jsonwebtoken")

//Routers
import {CommonRoutesConfig} from './src/common/common.routes.config';
import { ProductRoutes } from './src/product/product.route';
import { CategoryRoutes } from './src/category/category.route';

const app: express.Application = express();
const server: http.Server = http.createServer(app);
const port = 80;
const routes: Array<CommonRoutesConfig> = [];
const debugLog: debug.IDebugger = debug('app');



app.use(express.json())
app.use(cors());

const loggerOptions: expressWinston.LoggerOptions = {
    transports: [new winston.transports.Console()],
    format: winston.format.combine(
        winston.format.json(),
        winston.format.prettyPrint(),
        winston.format.colorize({ all: true })
    ),
};

if (!process.env.DEBUG) {
    loggerOptions.meta = false; // when not debugging, make terse
}

app.use(expressWinston.logger(loggerOptions));
  

routes.push(new ProductRoutes(app));
routes.push(new CategoryRoutes(app));


app.post('/signIn', (req: express.Request, res: express.Response) => {

    const token = jwt.sign(
        { username: process.env.USERNAME }, 
        'secretkey',
        (err:any, token:any) => {
          res.status(200).send({
           ok: true,
           message: "Login successful"
          })
          console.log('Token='+token)
    })
});


const runningMessage = `Server running at http://localhost:${port}`;

app.get('/', (req: express.Request, res: express.Response) => {

    res.status(200).send(runningMessage)
});

server.listen(port, () => {
    routes.forEach((route: CommonRoutesConfig) => {
        console.log(`Routes configured for ${route.getName()}`);
    });
    console.log(runningMessage);
});