import axios from "axios";

const axiosInst = axios.create({
	baseURL: process.env.NEXT_PUBLIC_VERCEL_URL || "",
	headers: {
		"Content-Type": "application/json",
	},
});

export { axiosInst };
