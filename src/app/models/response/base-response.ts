export class BaseResponse<T> {
    public success: boolean;
    public message: string;
    public result: T;
}
