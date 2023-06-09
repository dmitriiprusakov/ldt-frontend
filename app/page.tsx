import { Footer, Header, Main } from "core/layouts";
import { JsonRpcBody, Statistic } from "core/types";
import { Cases, Cta, Hero, RecentEvents, Stats } from "features/home";

import css from "./index.module.css";

// async function getData() {
// 	if (!process.env.NEXT_PUBLIC_URL) return;

// 	const res = await fetch(`${process.env.NEXT_PUBLIC_URL}/api/stats`);

// 	if (!res.ok) {
// 		return;
// 	}

// 	return res.json() as Promise<JsonRpcBody<Statistic>>;
// }

export default function RootPage() {
	// const data = await getData();

	return (
		<>
			<Header />
			<Main >
				<Hero />
				{/* {data?.result && <Stats data={data.result} />} */}
				<Cases
					title="Что можно провести?"
					subtitle="Мероприятие любого типа «под ключ»"
					hint="ИИ-ассистент составит план или порекомендует готовый пресет уже прошедшего мероприятия"
					linkHref="/new-event"
					linkText="Создать мероприятие"
					spotOnLeft={true}
					links={[
						"Проведение хакатона",
						"Выставка картин",
						"Запись альбома",
						"Мастер-класс",
						"Семинар",
						"Сьемка клипа",
						"Свадьба",
					]}
				/>
				<Cases
					title="Какие услуги есть?"
					subtitle="Выбор всех услуг по системе «единого окна»"
					hint="Маркетплейс услуг, необходимых для проведения идеального мероприятия"
					linkHref="/new-service"
					linkText="Добавить услуги"
					spotOnLeft={false}
					links={[
						"Площадки",
						"Цветы и декор",
						"Кейтеринг",
						"Оформление",
						"Фотосъемка",
						"Продвижение",
						"Музыканты",
						"Уборка",
					]}
				/>
				{/* <RecentEvents /> */}
				<Cta />
			</Main>
			<Footer />
		</>
	);
}
