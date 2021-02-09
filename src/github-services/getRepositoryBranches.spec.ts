import { anything } from 'ts-mockito';
import axios from 'axios';
import { responseHandler } from '../libs/responseMapper';
import { getRepositoryBranches } from './getRepositoryBranches';

jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;

describe('Get Repository Branches', () => {

    describe('getRepositoryBranches is invoked', () => {
        it('should branch responseHandler is invoked with status = 200', async () => {
            mockedAxios.get.mockResolvedValue({ status: 200, data: [] });
            const spyRepositoryResponseHandler = jest.spyOn(responseHandler, 'branch');
            await getRepositoryBranches(anything());

            expect(spyRepositoryResponseHandler).toBeCalledWith({ status: 200, data: [] });
        });

        it('should branch responseHandler is invoked with null', async () => {
            mockedAxios.get.mockResolvedValue(null);
            const spyRepositoryResponseHandler = jest.spyOn(responseHandler, 'branch');
            await getRepositoryBranches(anything());

            expect(spyRepositoryResponseHandler).toBeCalledWith(null);
        });

        it('should branch responseHandler is invoked with status = 404', async () => {
            mockedAxios.get.mockResolvedValue({ status: 404, data: { message: '' } });
            const spyBranchResponseHandler = jest.spyOn(responseHandler, 'branch');
            await getRepositoryBranches(anything());

            expect(spyBranchResponseHandler).toBeCalledWith({ status: 404, data: { message: '' } });
        });
    });
});
