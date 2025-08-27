import { PrimaryKeyEntity } from "entities";
import { SumByFieldResult } from "types";
import { SelectQueryBuilder } from "typeorm";
import { EntityRepository } from "./entity.repository";
import { IModelRepository } from "./infrastructure/imodel.repository";

export interface IQueryBuilderRepository<Entity extends PrimaryKeyEntity> extends IModelRepository<Entity> {
    sumByField<
        K extends keyof Entity,
        S extends keyof Entity,
        T extends keyof Entity
        >
    (
        groupField: K,
        sumField: S,
        selectFields: T[],
        filter?: Partial<Entity>
    ): Promise<Array<SumByFieldResult<Entity, K, T>>>
}
export class QueryBuilderRepository<Entity extends PrimaryKeyEntity> extends EntityRepository<Entity> implements IQueryBuilderRepository<Entity> {
    
    protected qb(alias: string = "entity"): SelectQueryBuilder<Entity> {
        return this.repository.createQueryBuilder(alias)
    }

    sumByField<K extends keyof Entity, S extends keyof Entity, T extends keyof Entity>(groupField: K, sumField: S, selectFields: T[], filter?: Partial<Entity>, tableAlias: string = "entity", ): Promise<SumByFieldResult<Entity, K, T>[]> {
        const queryBuilder = this.qb()
                .select(`${tableAlias}.${String(groupField)}`, String(groupField))
                .addSelect(`SUM(${tableAlias}.${String(sumField)})`, "sum")
        
        selectFields.forEach((field) => {
            queryBuilder.addSelect(`${tableAlias}.${String(field)}`, String(field))
        })
        if(filter) {
            Object.entries(filter).forEach(([key, value]) => {
                queryBuilder.andWhere(`${tableAlias}.${key} = :${key}`, { 
                    [key]: value
                })
            })
        }
        
        queryBuilder.groupBy(`${tableAlias}.${String(groupField)}`)

        return queryBuilder.getRawMany<SumByFieldResult<Entity, K, T>>()
    }
}