import axios from "axios";

const baseURL = `${process.env.NEXT_PUBLIC_URL || ""}`;
console.warn("=====baseURL======", baseURL);
const axiosInst = axios.create({
	baseURL: baseURL,
	headers: {
		"Content-Type": "application/json",
	},
});

export { axiosInst };
