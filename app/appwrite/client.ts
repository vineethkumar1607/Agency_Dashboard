import { Client, Account, Databases, Storage } from "appwrite";

export const appwriteConfig = {
  endpointUrl: import.meta.env.VITE_APPWRITE_API_ENDPOINT,
  projectId: import.meta.env.VITE_APPWRITE_PROJECT_ID,
  databaseId: import.meta.env.VITE_APPWRITE_DATABASE_ID,
  usersTableId: import.meta.env.VITE_APPWRITE_USERS_TABLE,
  tripsTableId: import.meta.env.VITE_APPWRITE_TRIPS_TABLE,
};

export const client = new Client()
  .setEndpoint(appwriteConfig.endpointUrl)
  .setProject(appwriteConfig.projectId);

client.headers["X-Appwrite-Response-Format"] = "1.0.0";

export const account = new Account(client);
export const database = new Databases(client);
export const storage = new Storage(client);
export { ID, Permission, Role } from "appwrite";
