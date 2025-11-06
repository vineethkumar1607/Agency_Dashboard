import { Client, Account, Databases, Storage} from 'appwrite';

const appwriteConfig={
    endpointUrl:import.meta.env.VITE_APPWRITE_API_ENDPOINT,
    projectid:import.meta.env.VITE_APPWRITE_PROJECT_ID,
    apiKey:import.meta.env.VITE_APPWRITE_API_SECRET,
    databaseId:import.meta.env.VITE_APPWRITE_DATABASE_ID,
    usersTableId:import.meta.env.VITE_APPWRITE_USERS_TABLE,
    tripsTableId:import.meta.env.VITE_APPWRITE_TRIPS_TABLE
}



export const client = new Client();

client
    .setEndpoint(appwriteConfig.endpointUrl)
    .setProject(appwriteConfig.projectid); 

export const account = new Account(client);
export const database = new Databases(client);
export const storage = new Storage(client);
export { ID } from 'appwrite';


