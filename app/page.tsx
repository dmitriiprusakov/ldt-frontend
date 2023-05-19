import { Inter } from 'next/font/google'
import styles from './page.module.css'

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
	return (
		<main className={styles.main}>
			<div className={styles.center}>
				<h1>EventLoop?</h1>
			</div>
		</main>
	)
}
