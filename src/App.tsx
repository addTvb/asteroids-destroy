import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { RecoilRoot } from 'recoil';
import { useLocation, useOutlet } from 'react-router-dom';
import { NotFound } from 'pages/NotFound/NotFound';
import { Asteroid } from 'pages/Asteroid/Asteroid';
import { Main } from 'pages/Main/Main';
import { CSSTransition, SwitchTransition } from 'react-transition-group';
import { createRef } from 'react';

export const routes = [
	{ path: '/', element: <Main />, nodeRef: createRef() },
	{ path: '/asteroid/:id', element: <Asteroid />, nodeRef: createRef() },
	{ path: '*', element: <NotFound />, nodeRef: createRef() },
];

function App() {
	const location = useLocation();
	const currentOutlet = useOutlet();
	const { nodeRef }: any = routes.find((route) => route.path === location.pathname) ?? {};

	const queryClient = new QueryClient({
		defaultOptions: {
			queries: {
				refetchOnWindowFocus: false,
				refetchOnMount: false,
			},
		},
	});
	return (
		<>
			<RecoilRoot>
				<QueryClientProvider client={queryClient}>
					<SwitchTransition>
						<CSSTransition
							key={location.pathname}
							nodeRef={nodeRef}
							timeout={300}
							classNames='page'
							unmountOnExit
						>
							{() => (
								<div ref={nodeRef} className='page'>
									{currentOutlet}
								</div>
							)}
						</CSSTransition>
					</SwitchTransition>
				</QueryClientProvider>
			</RecoilRoot>
		</>
	);
}

export default App;
