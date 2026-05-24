import { type RouteConfig, index, route } from "@react-router/dev/routes";

export default [
  index("routes/_home.tsx"),
  route("products/:id", "routes/_home.products.$id.tsx"),
  route("cart", "routes/cart.tsx"),
] satisfies RouteConfig;
