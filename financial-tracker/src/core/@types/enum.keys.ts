
export const enum INJECTION_KEYS {
    DbContext = 'DB_CONTEXT',
    CategoryService = 'CategoryService',
    UserAccountService = 'UserAccountService',
    UserCrudService = 'UserCrudService',
    VerificationManager = 'VerificationManager',
    EmailProvider = 'EmailProvider',
    PaymentService = 'PaymentService',
    ReportsService = 'ReportsService',

    PaymentsRepository = 'PaymentsRepository',
    CategoryRepository = 'CategoryRepository',
    ReportsRepository = 'ReportsRepository',
    UsersRepository = 'UserRepository'
}

export const enum ConfigurationParameters {
    DATABASE_TYPE = 'DATABASE_TYPE',
    DATABASE_HOST = 'DATABASE_HOST',
    DATABASE_PORT = 'DATABASE_PORT',
    DATABASE_USER = 'DATABASE_USER',
    DATABASE_PASSWORD = 'DATABASE_PASSWORD',
    DATABASE_NAME = 'DATABASE_NAME',
    DATABASE_SYNCHRONIZE = 'DATABASE_SYNCHRONIZE',
    DATABASE_LOGGING = 'DATABASE_LOGGING',
    LOG_DESTINATION_FILES = 'LOG_DESTINATION_FILES',
    JWT_SECRET = 'JWT_SECRET',
    JWT_EXPIRES = 'JWT_EXPIRES',
    REDIS_HOST = 'REDIS_HOST',
    REDIS_PORT = 'REDIS_PORT',
    EMAIL_API_KEY = 'EMAIL_API_KEY',
    EMAIL_FROM = 'EMAIL_FROM'
}

export const enum CacheDataKeys {
    verificationCode = 'api:verificationCode:',
}

export const enum ControllersRoutes {
    authorization = 'auth',
    categories = 'categories',
    payments = 'payments',
    reports = 'reports'
}

export const enum EndpointsParameters {
    id = 'id',
    reportId = 'reportId',
    userId = 'userId',
    categoryId = 'categoryId',
    paymentId = 'paymentId',
    groupBy = 'groupBy'
}

export const enum EndpointsRoutes {
    verify = 'verify',
    sendCode = 'sendCode',
    setAccountInfo = 'setAccountInfo',
    filter = 'filter',
    summary = 'summary'
}

//TODO: write routes and controllers