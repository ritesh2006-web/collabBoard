# CollabBoard

A modern, intuitive project and task management application built with React and Appwrite.

---
## Screenshots

### Dashboard
![Dashboard](public/Screenshot%202026-01-09%20212324.png)

### Task Creation
![Task creation](public/Screenshot%202026-01-09%20212345.png)

---

## ✨ Key Features

### Current Features

- **User Authentication**: Secure registration and login system with persistent sessions
- **Project Management**: Create and organize multiple projects from your dashboard
- **Task Management**: Full CRUD operations for tasks within projects
  - Create new tasks
  - Update task status (Todo/Done)
  - Delete completed or obsolete tasks
- **Protected Routes**: Dashboard and project pages accessible only to authenticated users
- **Responsive Design**: Clean, mobile-friendly interface built with Tailwind CSS
- **Session Persistence**: Stay logged in across browser refreshes

### Planned Features

- **Team Collaboration**: Invite team members to projects
- **Role-Based Access Control**: Owner, Editor, and Viewer roles
- **Project Sharing**: Share projects via invite links
- **Real-time Updates**: Live synchronization across team members
- **Task Assignment**: Assign tasks to specific team members
- **Comments & Activity Feed**: Discuss tasks and track project activity

---

## 🛠️ Tech Stack

- **Frontend**: React 18 + Vite
- **Styling**: Tailwind CSS
- **Backend**: Appwrite (BaaS)
- **Authentication**: Appwrite Auth
- **Database**: Appwrite Database
- **Routing**: React Router DOM

---

## 📁 Project Structure
```
CollabBoard/
├── src/
│   ├── components/       # Reusable UI components
│   ├── pages/           # Page components (Dashboard, Projects, etc.)
│   ├── services/         # Appwrite configuration and utilities
│   ├── context/         # React Context (Auth, etc.)
│   ├── hooks/           # Custom React hooks
│   └── App.jsx          # Main app component with routing
├── public/              # Static assets
└── package.json
```

---

## 🚦 Setup & Installation

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn
- Appwrite account ([cloud.appwrite.io](https://cloud.appwrite.io) or self-hosted)

### Installation Steps

1. **Clone the repository**
```bash
   git clone https://github.com/yourusername/collabboard.git
   cd collabboard
```

2. **Install dependencies**
```bash
   npm install
```

3. **Configure environment variables**
   
   Create a `.env` file in the root directory (see Environment Variables section below)

4. **Start the development server**
```bash
   npm run dev
```

5. **Open your browser**
   
   Navigate to `http://localhost:5173`

---

## 🔐 Environment Variables

Create a `.env` file in the root directory with the following variables:
```env
VITE_APPWRITE_ENDPOINT=https://cloud.appwrite.io/v1
VITE_APPWRITE_PROJECT_ID=your_project_id_here
VITE_APPWRITE_DATABASE_ID=your_database_id_here
VITE_APPWRITE_PROJECTS_COLLECTION_ID=your_projects_collection_id
VITE_APPWRITE_TASKS_COLLECTION_ID=your_tasks_collection_id
```

> **Note**: Replace placeholder values with your actual Appwrite configuration

---

## ⚙️ Appwrite Setup

### 1. Create a New Project

- Log in to your Appwrite console
- Create a new project and note the Project ID

### 2. Create Database & Collections

#### Database
- Create a new database and note the Database ID

#### Collections

**Projects Collection:**
- Collection ID: `projects`
- Attributes:
  - `name` (string, required)
  - `description` (string, optional)
  - `userId` (string, required) - Owner's user ID
  - `createdAt` (datetime)

**Tasks Collection:**
- Collection ID: `tasks`
- Attributes:
  - `title` (string, required)
  - `projectId` (string, required)
  - `status` (enum: `todo`, `done`)
  - `createdAt` (datetime)

### 3. Configure Permissions

Set appropriate read/write permissions for both collections:
- Projects: Users can read/write their own projects
- Tasks: Users can read/write tasks in their projects

### 4. Enable Authentication

- Navigate to Auth settings
- Enable Email/Password authentication
- Configure session limits and security settings as needed

---

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the project
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## 👤 Author

**Ritesh Puri**

- GitHub: [@ritesh2006-web](https://github.com/ritesh2006-web)

---

**Built with ❤️ using React and Appwrite**
