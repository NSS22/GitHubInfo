import dotenv from 'dotenv';
import express from 'express';
import path from 'path';
import bodyParser from 'body-parser';
import swaggerUi  from 'swagger-ui-express';
import YAML from 'yamljs';

import routes from './routes';
import { checkRequestHeaders } from './middleware/checkRequestHeaders';

dotenv.config();

const port = process.env.SERVER_PORT || 4000;
const app: express.Application = express();
const swaggerPath = path.resolve(__dirname, './swagger/api.yaml');
const swaggerDocument = YAML.load(swaggerPath);

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(checkRequestHeaders);
app.use('/repositories', routes);

app.listen( port, () => {
    console.log(`Server started at http://localhost:${ port }` );
});
