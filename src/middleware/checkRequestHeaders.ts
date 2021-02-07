import { Request, Response, NextFunction } from 'express';
import { RESPONSE_STATUS, HEADERS_ACCEPT, STATUS_MESSAGE } from '../constants';

export function checkRequestHeaders(req: Request, res: Response, next: NextFunction) {
    const { accept } = req.headers;
    if (accept === HEADERS_ACCEPT.APP_XML) {
        return res.status(RESPONSE_STATUS.NOT_ACCEPTABLE).send({
            status: RESPONSE_STATUS.NOT_ACCEPTABLE,
            message: STATUS_MESSAGE[RESPONSE_STATUS.NOT_ACCEPTABLE],
        });
    }

    next();
}
