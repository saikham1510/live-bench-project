import type { HistoryResponse, LatestResponse } from "@/types/telemetry";

export const latestOnline: LatestResponse = {
    device: {
        device_id: "bench-01",
        status: "online",
        last_seen: "2026-09-17T09:12:00Z",
        publish_interval_s: 60,
    },
    reading: {
        device_id: "bench-01",
        timestamp: "2026-09-17T09:12:00Z",
        temperature: 23.4,
        light_level: 41,
        presence: true,
    },
};

export const latestOffline: LatestResponse = {
    device: { ...latestOnline.device, status: "offline" },
    reading: latestOnline.reading,
};

export const latestNeverReported: LatestResponse = {
    device: {
        device_id: "bench-01",
        status: "offline",
        last_seen: null,
        publish_interval_s: 60,
    },
    reading: null,
};

export const historyShort: HistoryResponse = {
  device_id: "bench-01",
  bucket_s: 300,
  from: "2026-09-16T09:10:00Z",
  to: "2026-09-17T09:10:00Z",
  buckets: [
    { 
        bucket_start: "2026-09-16T09:10:00Z", 
        temperature_avg: 22.9, 
        light_level_avg: 38, 
        presence_any: false, 
        sample_count: 5 
    },
    { 
        bucket_start: "2026-09-16T09:15:00Z", 
        temperature_avg: null, 
        light_level_avg: null, 
        presence_any: null, 
        sample_count: 0 
    },
  ],
};