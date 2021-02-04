import { RESPONSE_STATUS } from '../config/responseStatus';
import { RepositorySuccessResponse, RepositoryFailedResponse, BranchSuccessResponse, Repository } from '../types';

export const responseBuilder = {
    buildSuccessResponse: (status: number, data: Repository[]): RepositorySuccessResponse => (
        {
            status,
            data: data.filter(({ forks }) => !forks),
        }),
    buildFailedResponse: (status: number, message: string): RepositoryFailedResponse => ({ status, message }),
};

export const responseHandler = {
    repository: (value: any): RepositorySuccessResponse | RepositoryFailedResponse | null | undefined => {
        if (!value) {
            return null;
        }

        const { status, data } = value;

        switch(status) {
            case RESPONSE_STATUS.SUCCESS:
                return responseBuilder.buildSuccessResponse(status, data);
            case RESPONSE_STATUS.NOT_FOUND:
            case RESPONSE_STATUS.NOT_ACCEPTABLE:
            default:
                return responseBuilder.buildFailedResponse(status, data.message);
        }
    },
    branch: (value: any): BranchSuccessResponse | null | undefined => {
        if (!value) {
            return null;
        }

        const { status, data } = value;

        return status === RESPONSE_STATUS.SUCCESS ? ({ data }) : null;
    },
};