export interface Payment {
    id?: string
    reportId: string;
    categoryId: string;
    amount: string;
}

export type SummaryCategory = {
    categoryId: string
    categoryName: string
    sum: number
}

export type PaymentsSummaryByCategories = {
    categories: SummaryCategory[],
    total: number,
    reportId: string
    reportCreatedAt: Date
}