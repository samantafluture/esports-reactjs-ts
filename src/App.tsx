import { useEffect, useState } from 'react'
import { GameBanner } from './components/GameBanner'
import { CreateAdBanner } from './components/CreateAdBanner'
import { CreateAdModal } from './components/CreateAdModal'
import { createClient } from '@supabase/supabase-js'
import * as Dialog from '@radix-ui/react-dialog'

import './styles/main.css'
import logoImg from './assets/logo.svg'

const supabaseUrl = 'https://ninazryatcdkcekisjor.supabase.co'
const supabaseKey: any = import.meta.env.VITE_SUPABASE_KEY
const client = createClient(supabaseUrl, supabaseKey)

interface Game {
	id: string
	title: string
	bannerUrl: string
}

function App() {
	const [games, setGames] = useState<Game[]>([])

	useEffect(() => {
		client.from("Game").select("id, title, bannerUrl").then(({data, error}) => {
			if(!error) {
        setGames(data)
      }
		})
	}, [])

	return (
		<div className='max-w-[1344px] mx-auto flex flex-col items-center my-20'>
			<img src={logoImg} />

			<h1 className='text-6xl text-white font-black mt-20'>
				Your{' '}
				<span className='text-transparent bg-esports-gradient bg-clip-text'>
					duo
				</span>{' '}
				is here
			</h1>

			<div className='grid grid-cols-6 gap-6 mt-16'>
				{games.map((game) => {
					return (
						<GameBanner
							key={game.id}
							bannerUrl={game.bannerUrl}
							title={game.title}
						/>
					)
				})}
			</div>

			<Dialog.Root>
				<CreateAdBanner />
				<CreateAdModal />
			</Dialog.Root>
		</div>
	)
}

export default App
