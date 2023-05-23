import axios from "axios";

const axiosInst = axios.create({
	baseURL: process.env.BASE_PATH || "",
	headers: {
		"Content-Type": "application/json",
	},
});

export { axiosInst };
