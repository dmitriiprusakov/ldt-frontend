import { Button, Card } from "antd";
import { eventsFetcher } from "core/fetchers";
import { JsonRpcBody, PlaceFilters, SearchItem, SearchItemShort, SearchResult } from "core/types";
import Image from "next/image";
import Link from "next/link";
import React, { FC, MouseEvent, useEffect, useState } from "react";
import { useAppSelector } from "store";

import css from "./index.module.css";

type Props = {
	addEventCallback: (id: SearchItemShort) => void;
}
const Items: FC<Props> = ({ addEventCallback }: Props) => {
	const [items, setItems] = useState<SearchItem[]>([]);
	const currentFilters = useAppSelector((state) => state.core.filters);

	useEffect(() => {
		currentFilters && void fetchData(currentFilters);
	}, [currentFilters]);

	const fetchData = async ({ search, capacity, area, chairs, tables, timeRange }: PlaceFilters) => {
		const from_ts = timeRange?.at(0);
		const to_ts = timeRange?.at(-1);

		const { data: seacrhData } = await eventsFetcher.post<JsonRpcBody<SearchResult>>(
			"/",
			{
				method: "search_places",
				limit: 30,
				query: search || undefined,
				from_ts: from_ts,
				to_ts: to_ts,
				props: {
					"вместимость": capacity,
					"площадь": area,
					"стулья": chairs || undefined,
					"столы": tables || undefined,
				},
			}
		);

		if (seacrhData.error || !seacrhData.result?.items) return setItems([]);

		setItems(seacrhData.result.items);
	};

	const handleChose = (
		event: MouseEvent<HTMLAnchorElement, globalThis.MouseEvent> | MouseEvent<HTMLButtonElement, globalThis.MouseEvent>,
		item: SearchItemShort
	) => {
		event.preventDefault();

		addEventCallback(item);
	};

	const handleAddToFavourites = (event: MouseEvent<HTMLAnchorElement, globalThis.MouseEvent> | MouseEvent<HTMLButtonElement, globalThis.MouseEvent>) => {
		event.preventDefault();
	};

	return (
		<div className={css.items}>
			{items.map(({ id, title, description, photo, price, type }) => (
				<Link
					href={`/search/${id}`}
					key={id}
				>
					<Card
						className={css.card}
						hoverable
						actions={[
							<Button
								key={"add"}
								type={"primary"}
								onClick={(e) => handleChose(e, { id, type, title, photo, price })}
							>
								Выбрать
							</Button>,
							<Button
								key={"save"}
								onClick={handleAddToFavourites}
							>
								В избранное
							</Button>,
						]}
						title={title}
						extra={<b>{`${price} ₽`}</b>}
						cover={
							<Image
								fill
								loading="lazy"
								aria-hidden="true"
								alt="Фото объекта"
								src={photo}
							/>
						}
					>
						<Card.Meta
							description={description}
						/>
					</Card>
				</Link>
			))}
		</div>
	);
};

export default Items;
