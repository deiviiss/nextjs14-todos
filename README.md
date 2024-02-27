# Development
Steps to start the app in development

1. Set up the db
```
docker-compose up -d
```
2. Rename the .env.example to .env
3. Replace the enviroment variables
4. Execute the command:
```
pnpm install
```
5. Execute these prisma commands:
```
npx prisma migrate dev; npx prisma generate
```
6. Run server with command:
```
pnpm run dev
```
7. Execute SEED [create local database](http://localhost:3000/api/seed)

# Notes: default user
__user__ admin@mail.com
__password__ admin


# Prisma commands
```
npx prisma init
npx prisma migrate dev
npx prisma generate
```
