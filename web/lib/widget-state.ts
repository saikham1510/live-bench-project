import type { LatestResponse } from "@/types/telemetry";
import type { WidgetState } from "@/types/widget";

export function toWidgetState({ device, reading }: LatestResponse): WidgetState {
    return device.status === "online"
    ? { kind: "live", device, reading }
    : { kind: "offline", device, reading};
}