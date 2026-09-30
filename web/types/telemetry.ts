export type DeviceStatus = "online" | "offline";

export type Reading = {
    device_id: string;
    timestamp: string;
    temperature: number | null;
    light_level: number | null;
    presence: boolean | null;
};

export type Device = {
    device_id: string;
    status: DeviceStatus;
    last_seen: string | null;
    publish_interval_s: number;
};

export type HistoryBucket = {
    bucket_start: string;
    temperature_avg: number | null;
    light_level_avg: number | null;
    presence_any: boolean | null;
    sample_count: number;
};

export type LatestResponse = {
    device: Device;
    reading: Reading | null;
};

export type HistoryResponse = {
    device_id: string;
    bucket_s: number;
    from: string;
    to: string;
    buckets: HistoryBucket[];
};

export type ApiErrorCode = "device_not_found" | "invalid_parameter";

export type ApiErrorBody = {
    error: ApiErrorCode;
    message: string;
}