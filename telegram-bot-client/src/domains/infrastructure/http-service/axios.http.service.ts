import { FinanceApiEndpoints } from '@core/api.routes';
import { IAuthorizationProvider } from './auth-provider/iauth.provider';
import { IHttpService } from './ihttp.service';
import axios, { Axios, AxiosRequestTransformer, AxiosResponse } from 'axios';
import { injectable } from 'inversify';
import { IAuthHttpService } from './iauth.http.service';
import { IFilterHttpService } from '../ifilter.service';

export type SuccessResponse = {
   success: boolean;
};

@injectable()
export class AxiosHttpService<T>
   implements IAuthHttpService, IHttpService<T>, IFilterHttpService<T>
{
   protected http: Axios;
   private authProvider: IAuthorizationProvider;

   constructor(baseUrl: string, authProvider: IAuthorizationProvider) {
      this.http = axios.create({
         baseURL: baseUrl,
      });
      this.authProvider = authProvider;
   }

   public setAuthenticationToken(token: string): void {
      this.http.defaults.headers.common['Authorization'] =
         this.authProvider.getAuthorizationHeader(token);
   }

   async getById(id: string): Promise<T | null> {
      const response = await this.http.get(`/`, {
         params: {
            id,
         },
      });
      return response.data;
   }
   async create(model: T): Promise<T> {
      const response = await this.http.post('/', model);
      return response.data;
   }

   public async filter(params: Partial<T>): Promise<T[]> {
      const result: AxiosResponse<T[]> = await this.http.get(
         FinanceApiEndpoints.filter,
         {
            params,
         }
      );
      return result.data;
   }

   public async removeById(id: string): Promise<boolean> {
      const removeResult: AxiosResponse<SuccessResponse> =
         await this.http.delete('/', {
            params: {
               id,
            },
         });
      return removeResult.data.success;
   }
}
