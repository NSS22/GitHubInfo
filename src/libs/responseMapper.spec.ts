import { responseHandler, responseBuilder } from './responseMapper';
import { BranchSuccessResponse } from '../types';
import { RESPONSE_STATUS, STATUS_MESSAGE } from '../constants';

describe('Map Request Response', () => {

    describe('responseRepositoryHandler is invoked', () => {
        it('should return null', () => {
            const payload = null;

            expect(responseHandler.repository(payload as any))
                .toEqual(null);
        });

        it('should return success response', () => {
            const payload = {
                status: 200,
                data: {
                    items: []
                },
            };
            const spyBuildSuccessResponse = jest.spyOn(responseBuilder, 'buildSuccessResponse');

            expect(responseHandler.repository(payload))
                .toEqual({ status: 200, data: [] });
            expect(spyBuildSuccessResponse).toBeCalledWith(200, []);
        });

        it('should return not found response', () => {
            const payload = {
                status: 422,
                data: { message: 'Not Found' },
            };
            const spyBuildFailedResponse = jest.spyOn(responseBuilder, 'buildFailedResponse');

            expect(responseHandler.repository(payload as any))
                .toEqual({ status: 404, data: { status: 404, message: STATUS_MESSAGE[RESPONSE_STATUS.NOT_FOUND] }});
            expect(spyBuildFailedResponse).toBeCalledWith(404, STATUS_MESSAGE[RESPONSE_STATUS.NOT_FOUND]);
        });
    });

    describe('responseBranchHandler is invoked', () => {
        it('should return null', () => {
            const payload = null;

            expect(responseHandler.branch(payload as any))
                .toEqual(null);
        });

        it('should return data', () => {
            const payload = {
                status: 200,
                data: [],
            };

            expect(responseHandler.branch(payload as BranchSuccessResponse))
                .toEqual({ data: [] });
        });
    });
});
