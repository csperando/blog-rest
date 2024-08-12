export interface iApiResponse {
    status: number;
    errors: Error[];
    data: any;
    message?: String;
}
