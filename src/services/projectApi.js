import { Query, ID } from "appwrite";
import { db, DATABASE_ID, PROJECTS_COLLECTION_ID, TASKS_COLLECTION_ID } from "./appwrite";

export const getMyProjects = async (userId) => {
    try {
        const response = await db.listRows({
            databaseId: DATABASE_ID,
            tableId: PROJECTS_COLLECTION_ID,
            queries: [
                Query.equal('ownerId', userId),
            ]
        })

        return response.rows;
    }
    catch (error) {
        console.log("Error fetching projects:", error);
    }
}

export const createProject = async ({ name, description, ownerId }) => {
    try {
        const response = await db.createRow({
            databaseId: DATABASE_ID,
            tableId: PROJECTS_COLLECTION_ID,
            rowId: ID.unique(),
            data: {
                name,
                description,
                ownerId,
            }

        })
    }
    catch (error) {
        console.log("Error creating project:", error);
    }
}

export async function getProjectById(projectId) {
    const res = await db.getRow(
        DATABASE_ID,
        PROJECTS_COLLECTION_ID,
        projectId,
    )
    return res;
}

