# Metadata Editor

The Metadata Editor is a desktop application that allows users to edit the metadata of their files.

It is intended to be used by musicians to edit the metadata of their music files.

## Technology stack

The application is built using the following technologies:

-   [Electron](https://www.electronjs.org/)
-   [React](https://reactjs.org/)
-   [TypeScript](https://www.typescriptlang.org/)
-   [Tailwind CSS](https://tailwindcss.com/)
-   [Flowbite](https://flowbite.com/)

## Running the application

### Frontend
To run the application run the following command:

```
npm start
npm run dev:watch
```

To build the application for production, use the following command:

```
npm run build
```
### Backend 
1. Before running the backend, make sure to set up your configuration. Create a `.env` file in the backend directory with the following environment variables:

```
PORT=8000
MONGO_URI=
ACCESS_TOKEN_SECRET=
```
2. Install Dependencies:
```
cd backend
npm install
```
3. Run the Backend:
```
npx nodemon
```
