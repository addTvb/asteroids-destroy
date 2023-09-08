import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { RecoilRoot } from 'recoil';
import { Routes, Route } from 'react-router-dom';
import { NotFound } from 'pages/NotFound/NotFound';
import { Asteroid } from 'pages/Asteroid/Asteroid';
import { Main } from 'pages/Main/Main';

function App() {
	const queryClient = new QueryClient({
		defaultOptions: {
			queries: {
				refetchOnWindowFocus: false,
				refetchOnMount: false,
			}
		}
	});
	return (
		<RecoilRoot>
			<QueryClientProvider client={queryClient}>
				{/* <Main /> */}
				<Routes>
					<Route path='/' element={<Main />} />
					<Route path='/asteroid/:id' element={<Asteroid />} />
					<Route path='*' element={<NotFound />} />
				</Routes>
			</QueryClientProvider>
		</RecoilRoot>
	);
}

export default App;
