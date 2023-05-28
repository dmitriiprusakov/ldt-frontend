import { ConfigProvider } from "antd";
import React, { FC, PropsWithChildren } from "react";

const ThemeProvider: FC<PropsWithChildren> = ({ children }: PropsWithChildren) => {
	return (
		<ConfigProvider
			theme={{
				token: {
					colorPrimary: "#E74362",
					// colorText: "#FFFFFF",
					// colorTextBase: "#FFFFFF",
					fontSize: 16,
				},
			}}

		>
			{children}
		</ConfigProvider>
	);
};

export default ThemeProvider;
