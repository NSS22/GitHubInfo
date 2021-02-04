import { anything } from 'ts-mockito';
import axios from 'axios';
import { responseHandler } from '../libs/responseMapper';
import { getRepositories } from './getRepositories';

jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;

describe('Get Repositories', () => {

    describe('getRepositories is invoked', () => {
        it('should repository responseHandler is invoked with status = 200', async (done) => {
            mockedAxios.get.mockResolvedValue({ status: 200, data: [] });
            const spyRepositoryResponseHandler = jest.spyOn(responseHandler, 'repository');
            await getRepositories(anything(), anything());

            expect(spyRepositoryResponseHandler).toBeCalledWith({ status: 200, data: [] });
            done();
        });

        it('should repository responseHandler is invoked with status = 404', async (done) => {
            mockedAxios.get.mockResolvedValue({ status: 404, data: { message: '' } });
            const spyRepositoryResponseHandler = jest.spyOn(responseHandler, 'repository');
            await getRepositories(anything(), anything());

            expect(spyRepositoryResponseHandler).toBeCalledWith({ status: 404, data: { message: '' } });
            done();
        });

        it('should repository responseHandler is invoked with status = 406', async (done) => {
            mockedAxios.get.mockResolvedValue({ status: 406, data: { message: '' } });
            const spyRepositoryResponseHandler = jest.spyOn(responseHandler, 'repository');
            await getRepositories(anything(), anything());

            expect(spyRepositoryResponseHandler).toBeCalledWith({ status: 406, data: { message: '' } });
            done();
        });
    });
});
