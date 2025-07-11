import { Inject, Injectable, OnModuleInit } from "@nestjs/common";
import { DbContext } from "data-provider";
import { INJECTION_KEYS } from "core/@types/enum.keys";

@Injectable()
export class DatabaseCreateConnection implements OnModuleInit {
    constructor(@Inject(INJECTION_KEYS.DbContext)private readonly dbContext: DbContext) {}
    async onModuleInit() {
        console.log('sstratdssddsds')
        await this.dbContext.createConnection()
    }
}