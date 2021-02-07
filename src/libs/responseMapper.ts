import { RESPONSE_STATUS, STATUS_MESSAGE } from '../constants';
import { RepositorySuccessResponse, RepositoryFailedResponse, BranchSuccessResponse, Repository } from '../types';

export const responseBuilder = {
    buildSuccessResponse: (status: number, data: Repository[]): RepositorySuccessResponse => (
        {
            status,
            data,
        }),
    buildFailedResponse: (status: number, message: string): RepositoryFailedResponse => ({ status, data: { status, message } }),
};

export const responseHandler = {
    repository: (value: any): RepositorySuccessResponse | RepositoryFailedResponse | null | undefined => {
        if (!value) {
            return null;
        }

        const { status, data } = value;

        switch(status) {
            case RESPONSE_STATUS.SUCCESS:
                return responseBuilder.buildSuccessResponse(status, data.items);
            case RESPONSE_STATUS.UNPROCESSABLE:
                return responseBuilder.buildFailedResponse(RESPONSE_STATUS.NOT_FOUND, STATUS_MESSAGE[RESPONSE_STATUS.NOT_FOUND]);
            default:
                return null;
        }
    },
    branch: (value: any): BranchSuccessResponse | null | undefined => {
        if (!value) {
            return null;
        }

        const { status, data } = value;

        switch(status) {
            case RESPONSE_STATUS.SUCCESS:
                return { data };
            default:
                return null;
        }
    },
};