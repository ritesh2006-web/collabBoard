import { Client, TablesDB,Account } from "appwrite";

const client = new Client();
const account = new Account(client);

client.setEndpoint(import.meta.env.VITE_APPWRITE_ENDPOINT);
client.setProject(import.meta.env.VITE_APPWRITE_PROJECT_ID);
const db = new TablesDB(client);

const PROJECTS_COLLECTION_ID = import.meta.env.VITE_APPWRITE_TABLE_PROJECTS;
const TASKS_COLLECTION_ID = import.meta.env.VITE_APPWRITE_TABLE_TASKS;
const DATABASE_ID = import.meta.env.VITE_APPWRITE_DB_ID;

export {client,db, DATABASE_ID, PROJECTS_COLLECTION_ID, TASKS_COLLECTION_ID,account };