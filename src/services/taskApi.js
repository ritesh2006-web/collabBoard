import { Query, ID } from "appwrite";
import { db, DATABASE_ID, TASKS_COLLECTION_ID } from "./appwrite";


export async function createTask({ title, description, projectId }) {
    try {
        const response = await db.createRow({
            databaseId: DATABASE_ID,
            tableId: TASKS_COLLECTION_ID,
            rowId: ID.unique(),
            data: {
                title,
                description,
                projectId,
                status: "todo",
                createdAt: new Date().toISOString(),
                updatedAt: new Date().toISOString(),
            }
        })
        return response;
    }

    catch (error) {
        console.log("Error creating task:", error);
    }
}

export async function getAllTasks(projectId) {
    try {
        const response = await db.listRows({
            databaseId: DATABASE_ID,
            tableId: TASKS_COLLECTION_ID,
            queries: [
                Query.equal('projectId', projectId),
            ]
        }
        )
        return response.rows;
    }
    catch (error) {
        console.log("Error fetching tasks:", error);
    }
}

export async function deleteTask(taskId) {
    {
        try {
            await db.deleteRow({
                databaseId: DATABASE_ID,
                tableId: TASKS_COLLECTION_ID,
                rowId: taskId,

            })
        }
        catch (error) {
            console.log("Error deleting task:", error);
        }
    }
}