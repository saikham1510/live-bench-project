import { ApiErrorBody, HistoryResponse, LatestResponse } from "@/types/telemetry";

// To replace with an environment variable
const API_BASE = "http://localhost:8000";

export class ApiError extends Error {
    status: number;
    code: string;

    constructor(status: number, code: string, message: string) {
        super(message);
        this.name = "ApiError";
        this.status = status;
        this.code = code;
    };
};

function isApiErrorBody(value: unknown): value is ApiErrorBody {
    return (
        typeof value === "object" &&
        value !== null &&
        "error" in value &&
        "message" in value &&
        typeof value.error === "string" &&
        typeof value.message === "string"
    );
};

export async function parseResponse<T>(res:Response): Promise<T> {      
    if (res.ok) {
        return (await res.json()) as T;
    }

    let body: unknown = null;
    try {
        body = await res.json();
    } catch {
        // not JSON , HTML error page
    }

    if (isApiErrorBody(body)) {
        throw new ApiError(res.status, body.error, body.message)
    }
    throw new ApiError(res.status, "unknown", `Request failed with status ${res.status}`);
};

export async function getLastest(deviceId: string): Promise<LatestResponse> {
    const res = await fetch(`${API_BASE}/devices/${encodeURIComponent(deviceId)}/latest`);
    return parseResponse<LatestResponse>(res);
}

export async function getHistory(deviceId: string, hours = 24): Promise<HistoryResponse> {
    const res = await fetch(`${API_BASE}/devices/${encodeURIComponent(deviceId)}/history?hours=${hours}`);
    return parseResponse<HistoryResponse>(res);
}