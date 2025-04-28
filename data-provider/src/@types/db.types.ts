export type AvailableDatadabaseTypes = 'mysql' | 'postgres'
export type DbConnectOptions = {
    type: AvailableDatadabaseTypes
    host: string
    port: number
    username: string
    password: string
    database: string
    synchronize: boolean
    logging: boolean
}