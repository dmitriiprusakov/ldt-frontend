import { Button, Card } from "antd";
import { eventsFetcher } from "core/fetchers";
import { JsonRpcBody, PlaceFilters, SearchItem, SearchResult } from "core/types";
import Link from "next/link";
import React, { FC, MouseEvent, MouseEventHandler, useEffect, useState } from "react";
import { useAppSelector } from "store";

import css from "./index.module.css";

const Items: FC = () => {
	const [items, setItems] = useState<SearchItem[]>([]);
	const currentFilters = useAppSelector((state) => state.core.filters);

	useEffect(() => {
		void fetchData({});
	}, []);

	useEffect(() => {
		console.log("currentFilters=", currentFilters);
		currentFilters && void fetchData(currentFilters);
	}, [currentFilters]);

	const fetchData = async ({ search, capacity, area, chairs, tables, timeRange }: PlaceFilters) => {
		const from_ts = timeRange?.at(0)?.toISOString();
		const to_ts = timeRange?.at(-1)?.toISOString();

		const { data: seacrhData } = await eventsFetcher.post<JsonRpcBody<SearchResult>>(
			"/",
			{
				method: "search_places",
				limit: 10,
				query: search || undefined,
				from_ts: from_ts,
				to_ts: to_ts,
				props: {
					"вместимость": capacity,
					"площадь": area,
					"стулья": chairs,
					"столы": tables,
				},
			}
		);

		if (seacrhData.error || !seacrhData.result) return setItems([]);

		console.log("seacrhData=", seacrhData);
		setItems(seacrhData.result.items);
	};

	const handleChose = (
		event: MouseEvent<HTMLAnchorElement, globalThis.MouseEvent> | MouseEvent<HTMLButtonElement, globalThis.MouseEvent>,
		id: number
	) => {
		event.preventDefault();
		console.log("handleChose=", id);
	};

	return (
		<div className={css.items}>
			{items.map(({ id, title, description, photo }) => (
				<Link
					href={`/search/${id}`}
					key={id}
				>
					<Card
						className={css.card}
						hoverable
						actions={[
							<Button key={"add"} onClick={(e) => handleChose(e, id)}>
								Выбрать
							</Button>,
							<Button key={"save"} >
								В избранное
							</Button>,
						]}
						cover={
							<img
								loading="lazy"
								alt="example"
								src={photo}
							/>
						}
					>
						<Card.Meta
							title={title}
							description={description}
						/>
					</Card>
				</Link>
			))}
		</div>
	);
};

export default Items;
