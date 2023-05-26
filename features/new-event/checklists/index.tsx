"use client";

import React, { FC } from "react";
import { Provider } from "react-redux";

import store from "store";
import { Matcher } from "./components";

const Checklists: FC = () => {
	return (
		<Provider store={store}>
			<Matcher />
		</Provider>
	);
};

export default Checklists;
