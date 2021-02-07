import { RESPONSE_STATUS } from './responseStatus';

export const STATUS_MESSAGE = {
    [RESPONSE_STATUS.NOT_FOUND]: 'Content is not found for current account name',
    [RESPONSE_STATUS.NOT_ACCEPTABLE]: 'The requested resource is capable of generating only content not acceptable.',
};
