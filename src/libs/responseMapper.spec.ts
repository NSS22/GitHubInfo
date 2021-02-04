import { responseHandler, responseBuilder } from './responseMapper';
import { RepositorySuccessResponse, BranchSuccessResponse } from '../types';

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
                data: [],
            };
            const spyBuildSuccessResponse = jest.spyOn(responseBuilder, 'buildSuccessResponse');

            expect(responseHandler.repository(payload as RepositorySuccessResponse))
                .toEqual({ status: 200, data: [] });
            expect(spyBuildSuccessResponse).toBeCalledWith(200, []);
        });

        it('should return not found response', () => {
            const payload = {
                status: 404,
                data: { message: 'Not Found' },
            };
            const spyBuildFailedResponse = jest.spyOn(responseBuilder, 'buildFailedResponse');

            expect(responseHandler.repository(payload as any))
                .toEqual({ status: 404, message: 'Not Found' });
            expect(spyBuildFailedResponse).toBeCalledWith(404, 'Not Found');
        });

        it('should return not acceptable response',() => {
            const payload = {
                status: 406,
                data: { message: 'Not Acceptable' },
            };
            const spyBuildFailedResponse = jest.spyOn(responseBuilder, 'buildFailedResponse');

            expect(responseHandler.repository(payload as any))
                .toEqual({ status: 406, message: 'Not Acceptable' });
            expect(spyBuildFailedResponse).toBeCalledWith(406, 'Not Acceptable');
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
