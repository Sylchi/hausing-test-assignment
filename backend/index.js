const { PrismaClient } = require('@prisma/client');
const express = require('express');

const prisma = new PrismaClient();

const baseUrl = '/api/v1'

const routes = {
  "/tickets":  require('./api/ticket').handler(prisma),
  "/tickets/:id": require('./api/ticket').handler(prisma)
}

const initRoutes = (app) => {
  for(const [route, handler] of Object.entries(routes)){
    if(typeof handler !== 'function') continue;
    const path = `${baseUrl}${route}`;
    app.use(path, handler);
  }
}

const main = async () => {
  const app = express();
  app.use(express.json());
  initRoutes(app);
  app.listen(process.env.PORT || 3000);
}

main()
.catch(e => {
  console.error(e);
  throw e;
})
.finally(async () => {
  await prisma.$disconnect();
});