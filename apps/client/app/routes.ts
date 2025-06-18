import {
  index,
  layout,
  route,
  type RouteConfig,
} from "@react-router/dev/routes";

export default [
  layout("./routes/root-layout.tsx", [
    index("./routes/home.tsx"),
    route("about", "./routes/about.tsx"),
    route("features", "./routes/features.tsx"),
    route("changelog", "./routes/changelog.tsx"),
  ]),
  route("login", "./routes/login.tsx"),
] satisfies RouteConfig;
