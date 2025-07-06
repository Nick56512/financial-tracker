import { EntitySchema, MixedList } from "typeorm"

export type AvailableDatadabaseTypes = 'mysql' | 'postgres'
export const availableDatabaseTypes: AvailableDatadabaseTypes[] = ['mysql', 'postgres']
export type DbConnectOptions = {
    type: AvailableDatadabaseTypes
    host: string
    port: number
    username: string
    password: string
    database: string
    synchronize: boolean
    logging: boolean,
    entities: MixedList<string | Function | EntitySchema<any>>
}