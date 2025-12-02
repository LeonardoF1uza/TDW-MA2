// app/root.tsx
import './app.css';
import { Links, Meta, Outlet, Scripts, ScrollRestoration } from "react-router";
import { Provider } from "react-redux";
import { store } from "./redux/store";

export function Layout() {
  return (
    <html lang="en">
      <head>
        <Meta />
        <Links />
      </head>
      <body>
        {/* Provider tem que estar AQUI */}
        <Provider store={store}>
          <Outlet />
        </Provider>

        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}

export const basename = "/TDW-MA2";
