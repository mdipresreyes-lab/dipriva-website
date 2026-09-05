import "dotenv/config";
import express from "express";
import { createServer } from "http";
import { createExpressMiddleware } from "@trpc/server/adapters/express";
import { registerOAuthRoutes } from "./oauth";
import { appRouter } from "../routers";
import { createContext } from "./context";
import { serveStatic, setupVite } from "./vite";

async function startServer() {
  const app = express();
  const server = createServer(app);
  
  // Configure body parser with larger size limit for file uploads
  app.use(express.json({ limit: "50mb" }));
  app.use(express.urlencoded({ limit: "50mb", extended: true }));

  // AI-bot discoverability headers on every response
  app.use((_req, res, next) => {
    res.append('Link', '<https://www.dipriva.com/sitemap.xml>; rel="sitemap"');
    res.append('Link', '<https://www.dipriva.com/robots.txt>; rel="robots"');
    next();
  });

  // OAuth callback under /api/oauth/callback
  registerOAuthRoutes(app);
  
  // tRPC API
  app.use(
    "/api/trpc",
    createExpressMiddleware({
      router: appRouter,
      createContext,
    })
  );
  
  // Prevent /client_form from being indexed by search engines (server-side)
  app.use('/client_form', (_req, res, next) => {
    res.setHeader('X-Robots-Tag', 'noindex, nofollow');
    next();
  });

  // 301 permanent redirects for legacy Manus-generated routes (GSC soft-404 fix)
  const legacyRedirects: Record<string, string> = {
    '/home':             '/',
    '/es':               '/',  // Spanish route placeholder — update if /es-* is added
    '/approach-318656':  '/',
    '/home-716983':      '/',
    '/impact':           '/',
    '/about':            '/about/manuel-dipres',
  };
  app.use((req, res, next) => {
    const target = legacyRedirects[req.path];
    if (target) return res.redirect(301, target);
    next();
  });

  // development mode uses Vite, production mode uses static files
  if (process.env.NODE_ENV === "development") {
    await setupVite(app, server);
  } else {
    serveStatic(app);
  }

  // ALWAYS use port 3000 - the platform proxy handles routing
  const PORT = 3000;
  console.log(`[SERVER] Starting server on port ${PORT}...`);
  console.log(`[SERVER] NODE_ENV: ${process.env.NODE_ENV}`);

  server.listen(PORT, () => {
    console.log(`[SERVER] ✅ Server running on http://localhost:${PORT}/`);
  });
  
  // Log unhandled errors
  server.on('error', (err) => {
    console.error(`[SERVER] Server error:`, err);
  });
}

startServer().catch(console.error);
