export interface ResponseObject<T> {
    data: T;
    errorMessage?: any;
    success: boolean;
    timestamp: string;
}