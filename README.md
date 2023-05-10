# Next.js Warm Routes

Next.js `useWarmRoutes` hooks ensures that your routes are warm so that you never have to start from a cold start again.

Define a route mapping to ensure that a list of routes gets called with a **pre-flight request**
when the current route matches the route defined in the object.

## Usage

```ts
// Use this at the root of your Next.js application, _app.tsx for maximum effectiveness
useWarmRoutes({
  "/": ["/articles/*", "/api/article"],
});
```
