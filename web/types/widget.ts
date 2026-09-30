import { Device, Reading } from "@/types/telemetry";

export type WidgetState = 
    | { kind: "loading"}
    | { kind: "live"; device: Device; reading: Reading | null }
    | { kind: "offline"; device: Device; reading: Reading | null }
    | { kind: "error"; message: string };