import { IAuthHttpService } from "@domains/infrastructure/http-service/iauth.http.service";
import { IHttpService } from "@domains/infrastructure/http-service/ihttp.service";
import { IFilterHttpService } from "@domains/infrastructure/ifilter.service";

export interface Report {
    id?: string;
    name: string;
    plannedBudget: number;
    userId: string;
    currentBudget: number;
}