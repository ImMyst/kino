import { HeadContent, Scripts, createRootRouteWithContext } from '@tanstack/react-router';
import { TanStackRouterDevtoolsPanel } from '@tanstack/react-router-devtools';
import { TanstackDevtools } from '@tanstack/react-devtools';

import appCss from '../styles.css?url';
import { ReactNode } from 'react';
import { QueryClient } from '@tanstack/react-query';
import { DefaultCatchBoundary } from '@/components/DefaultCatchBoundary';
import { NotFound } from '@/components/NotFound';

export const Route = createRootRouteWithContext<{
  queryClient: QueryClient
}>()({
  head: () => ({
    meta: [
      {
        charSet: 'utf-8',
      },
      {
        name: 'viewport',
        content: 'width=device-width, initial-scale=1',
      },
      {
        title: 'TanStack Start Starter',
      },
    ],
    links: [
      {
        rel: 'stylesheet',
        href: appCss,
      },
    ],
  }),

  shellComponent: RootDocument,

  errorComponent: DefaultCatchBoundary,
  notFoundComponent: () => <NotFound />,
})

function RootDocument({ children }: { children: ReactNode }) {
  return (
    <html suppressHydrationWarning lang="en">
      <head>
        <HeadContent />
      </head>
      <body suppressHydrationWarning>
        {children}
        <TanstackDevtools
          config={{
            position: 'bottom-left',
          }}
          plugins={[
            {
              name: 'Tanstack Router',
              render: <TanStackRouterDevtoolsPanel />,
            },
          ]}
        />
        <Scripts />
      </body>
    </html>
  )
}
