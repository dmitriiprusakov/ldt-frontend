import { Button, Card } from "antd";
import { eventsFetcher } from "core/fetchers";
import { JsonRpcBody, ServiceSearchItem, ServiceSearchItemShort, ServicesSearchResult } from "core/types";
import React, { FC, MouseEvent, useEffect, useState } from "react";

import css from "./index.module.css";

type Props = {
	serviceType: string;
	addEventCallback: (id: ServiceSearchItemShort) => void;
}
const ServicesItems: FC<Props> = ({ serviceType, addEventCallback }: Props) => {
	const [items, setItems] = useState<ServiceSearchItem[]>([]);

	useEffect(() => {
		const fetchData = async () => {

			const { data: seacrhData } = await eventsFetcher.post<JsonRpcBody<ServicesSearchResult>>(
				"/",
				{
					method: "search_services",
					limit: 10,
					service_type: serviceType,
				}
			);

			console.log(seacrhData);

			if (seacrhData.error || !seacrhData.result?.items) return setItems([]);

			setItems(seacrhData.result.items);
		};

		void fetchData();
	}, [serviceType]);

	const handleChose = (
		event: MouseEvent<HTMLAnchorElement, globalThis.MouseEvent> | MouseEvent<HTMLButtonElement, globalThis.MouseEvent>,
		item: ServiceSearchItemShort
	) => {
		event.preventDefault();

		addEventCallback(item);
	};

	return (
		<div className={css.items}>
			{items.map(({ id, title, min_price, max_price, images, type }) => (
				<Card
					key={id}
					className={css.card}
					hoverable
					actions={[
						<Button
							key={"add"}
							type={"primary"}
							onClick={(e) => handleChose(e, {
								id,
								type,
								title,
								images,
								min_price,
								max_price,
							})}
						>
							Выбрать
						</Button>,
						<Button key={"save"} >
							В избранное
						</Button>,
					]}
					title={title}
					extra={<b>{`${min_price} - ${max_price} ₽`}</b>}
					cover={
						<img
							loading="lazy"
							alt="example"
							src={images[0]}
						/>
					}
				/>
			))}
		</div>
	);
};

export default ServicesItems;
