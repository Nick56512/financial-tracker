export const FinanceApiBaseUrls = Object.freeze({
   baseAuthUrl: 'http://localhost:3000/auth',
   baseReportsUrl: 'http://localhost:3000/reports',
   baseCategoriesUrl: 'http://localhost:3000/categories',
   basePaymentsUrl: 'http://localhost:3000/payments',
});

export const FinanceApiEndpoints = Object.freeze({
   get: 'get',
   getById: 'getById',
   sendCode: 'sendCode',
   verifyCode: 'verify',
   filter: 'filter',
   summary: 'summary',
});
