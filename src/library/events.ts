import { ValidationErrorItem } from "joi";


interface Error {
    error: string;
    errorDetails?: ValidationErrorItem[];
}

interface Success<T> {
    data : T;
}

export type Response<T> = Error | Success<T>;

export interface ServerEvents {
    "game:joined": (user: any) => void;
    "game:played": (record: any) => void;
}

export interface ClientEvents {
    "game:finished": (callback: (res: Response<any[]>) => void) => void;
}

