# Development
Steps to start the app in development

1.- Set up the db
```
docker-compose up -d
```
2.- Rename the .env.example to .env
3.- Replace the enviroment variables
4.- Execute the command ``pnpm install``
5.- Execute these prisma commands``npx prisma migrate dev; npx prisma generate``
6.- Execute the command ``pnpm run dev``
4.- Execute SEED [create local data base](localhost:3000/api/seed)

# Prisma commands
```
npx prisma init
npx prisma migrate dev
npx prisma generate
```
