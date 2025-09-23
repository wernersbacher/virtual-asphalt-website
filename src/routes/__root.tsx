import { TanstackDevtools } from '@tanstack/react-devtools';
import { Outlet, createRootRoute } from '@tanstack/react-router';
import { TanStackRouterDevtoolsPanel } from '@tanstack/react-router-devtools';

import Footer from '../components/Footer';
import Header from '../components/Header';
import { Card, CardContent } from '../components/ui/card';

export const Route = createRootRoute({
  component: () => (
    <div className="min-h-screen bg-gradient-to-br from-violet-50  to-violet-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-700">
      <div className="m-auto max-w-5xl flex flex-col items-center">
        <Header />
        <main className="w-full max-w-6xl gap-6 flex-1 flex flex-col items-center px-2 mt-2 md:px-0 text-gray-900 dark:text-gray-200">
          <Card className="w-full max-w-5xl rounded-none">
            <CardContent>
              <section className="flex flex-col gap-6 text-inherit">
                <Outlet />
              </section>
            </CardContent>
          </Card>
        </main>
        <Footer />
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
      </div>
    </div>
  ),
});
