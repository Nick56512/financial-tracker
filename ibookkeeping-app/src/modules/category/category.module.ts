import { Module } from "@nestjs/common";
import { CategoryController } from "./category.controller";
import { AbstractService } from "infrastructure";

@Module({
    controllers: [ CategoryController ],
    providers: [AbstractService]
})
export class CategoryModule {}