import dotenv from 'dotenv';
import express from 'express';
import bodyParser from 'body-parser';
import handlerFunctions from './services';

const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger.json');

dotenv.config();

const port = process.env.SERVER_PORT || 4000;
const app: express.Application = express();

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.post( '/repositories/:name', async ( req: express.Request, res: express.Response ) => {
    const { name: userName } = req.params;
    const { accept } = req.body;
    const result = await handlerFunctions.getRepositoriesInformation(userName, accept);

    res.send(result);
});

app.listen( port, () => {
    console.log(`Server started at http://localhost:${ port }` );
});
