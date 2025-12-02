// app/root.tsx
import './app.css'; 
import { Link, Links, Meta, Outlet, Scripts, ScrollRestoration } from "react-router";
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


export default function App() {
  return (
    <>
      <header>
        <nav>
          <Link to="/home">Início</Link> | <Link to="/filters">Filtros</Link>
        </nav>
      </header>

      <Outlet />

    </>
  );
}