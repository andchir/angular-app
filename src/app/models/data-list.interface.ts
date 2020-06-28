export interface DataList<T> {
    offset: number;
    limit: number;
    total: number;
    result: T[];
}
