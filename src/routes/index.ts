import express, { Request, Response } from 'express';
import handlerFunctions from '../services';
import { RESPONSE_STATUS } from '../constants';

const router = express.Router();

router.get('/healthCheck', async (req: Request, res: Response) => {
    res.status(RESPONSE_STATUS.SUCCESS).end();
});

router.get('/repositories/:name', async (req: Request, res: Response) => {
    const { name: userName } = req.params;
    const result = await handlerFunctions.getRepositoriesInformation(userName);
    if(!result) {
        return res.send(result);
    }

    const { status: statusCode, data } = result;
    res.status(statusCode).send(data);
});

export default router;
