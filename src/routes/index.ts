import express, { Request, Response } from 'express';
import handlerFunctions from '../services';

const router = express.Router();

router.get('/:name', async (req: Request, res: Response) => {
    const { name: userName } = req.params;
    const result = await handlerFunctions.getRepositoriesInformation(userName);
    if(!result) {
        return res.send(result);
    }

    const { status: statusCode, data } = result;
    res.status(statusCode).send(data);
});

export default router;
