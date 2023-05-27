import { Dayjs } from "dayjs";

export type Values = {
	eventType: string;
	timeRange: [Dayjs, Dayjs];
	budget: number
}
