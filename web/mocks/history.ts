import { HistoryBucket, HistoryResponse } from "@/types/telemetry";

const BUCKET_MS = 5 * 60 * 1000;

export function makeHistoryMock(to: Date, hours = 24): HistoryResponse {
    const end = Math.floor(to.getTime() / BUCKET_MS) + BUCKET_MS; // align to :00, :05, :10...
    const start = end - hours * 60 * 60 * 1000;
    const count = (hours * 60 * 60 * 1000) / BUCKET_MS;

    const buckets: HistoryBucket[] = Array.from({ length: count }, (_, i) => {
        const bucket_start = new Date(start + i * BUCKET_MS).toISOString().replace(".000Z", "Z");
        const inGap = i >= 100 && i < 112;
        if (inGap) {
            return { bucket_start, temperature_avg: null, light_level_avg: null, presence_any: null, sample_count: 0 };
        }
        return {
            bucket_start,
            temperature_avg: Math.round((27 + 3 * Math.sin(i / 40)) * 10) / 10,
            light_level_avg: Math.round(50 + 40 * Math.sin(i / 50)),
            presence_any: i % 12 < 4,
            sample_count: 5,
        };
    });

    return {
        device_id: "bench-01",
        bucket_s: 300,
        from: new Date(start).toISOString().replace(".000Z", "Z"),
        to: new Date(end).toISOString().replace(".000Z", "Z"),
        buckets,
    };
}