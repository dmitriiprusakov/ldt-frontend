import { ConfigProvider, theme } from "antd";
import React, { FC, PropsWithChildren } from "react";
import ru_RU from "antd/locale/ru_RU";
import dayjs from "dayjs";

import "dayjs/locale/ru";

dayjs.locale("ru");

const AntdProvider: FC<PropsWithChildren> = ({ children }: PropsWithChildren) => {
	return (
		<ConfigProvider
			locale={ru_RU}
			theme={{
				algorithm: [theme.darkAlgorithm],
				token: {
					fontSize: 16,
					colorPrimary: "#E74362",
					colorBgContainer: "#0C1622",
					colorBgLayout: "#0C1622",
					colorBgElevated: "#0C1622",
				},
			}}

		>
			{children}
		</ConfigProvider>
	);
};

export default AntdProvider;
