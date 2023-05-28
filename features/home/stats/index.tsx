import { Statistic } from "core/types";
import React, { FC } from "react";

import css from "./index.module.css";

type Props = {
	data: Statistic;
}
const Stats: FC<Props> = ({ data }: Props) => {
	return (
		<section>
			<div className={css.content}>
				<div>
					<h3>
						{data.events_count}
					</h3>
					<p>
						Мероприятий уже проведено<br />на платформе
					</p>
				</div>
				<div>
					<h3>
						{data.services_count}
					</h3>
					<p>
						Услуг в базе<br />на платформе
					</p>
				</div>
				<div>
					<h3>
						{data.users_count}
					</h3>
					<p>
						Людей посетило<br />мероприятия платофрмы
					</p>
				</div>
			</div>
		</section>
	);
};

export default Stats;
