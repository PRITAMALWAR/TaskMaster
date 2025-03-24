
# TaskMaster

## 🚀 Project Overview

TaskMaster is a modern task management web application that helps users efficiently organize, collaborate, and track their tasks. With features like task boards, deadline management, and real-time collaboration, TaskMaster takes task management to the next level. It uses a Kanban-style board for task categorization and offers intuitive functionalities to keep you on top of your work.

You can create, update, delete, and manage tasks with ease, collaborate with your team, and receive reminders for deadlines. The app is fully responsive and provides a sleek, dark mode experience for a modern look.

Check out the app live: [TaskMaster Live](https://friendly-halva-efa6bd.netlify.app/)

## 🛠️ Technologies Used

- **JavaScript**
- **React.js**
- **Tailwind CSS**
- **Firebase Authentication**
- **Netlify**
- **Local Storage**
- **React-Icons/FA**
- **Plain CSS**
- **GitHub for version control**

## 📋 Features

### Minimum Expected Features:

- **Task CRUD Operations**  
  - Create, Read, Update, and Delete tasks.
  - Tasks include fields: title, description, due date, priority level, and status.
  
- **Task Board (Kanban-style)**  
  - Tasks are displayed in columns based on their status (To-Do, In Progress, Completed).
  - Tasks can be dragged and dropped between columns.

- **Deadline Management**  
  - Set deadlines for tasks and receive reminder notifications.

- **User Authentication**  
  - User registration and login functionalities.
  - Role-based access control for regular users and admins.

- **Task Assignment and Collaboration**  
  - Assign tasks to multiple users.
  - Users can leave comments on tasks for better collaboration.

### Unique Features:

- **Secured Sharable Links for Collaboration**  
  - Generate time-bound, secured links to invite collaborators to join a task.
  - Set link expiration times for added security.

- **Tagging Users in Task Comments**  
  - Tag users in comments to notify them of updates.

- **Recurring Tasks**  
  - Set tasks as recurring (daily, weekly, monthly).
  - Receive notifications for the next iteration once the current task is completed.

- **Customizable Task Board Layouts**  
  - Create custom columns and save layouts for future use.

- **Complete Responsive Design**  
  - Fully optimized for both mobile and desktop devices.

- **Dark Mode**  
  - Toggle dark mode for a modern, eye-friendly interface.

- **Real-Time Updates**  
  - Changes made by one user are reflected in real-time across all users.

## 💻 Installation & Setup

1. Clone the repository:

```bash
git clone https://github.com/PRITAMALWAR/TaskMaster.git
```

2. Navigate to the project directory:

```bash
cd TaskMaster
```

3. Install dependencies:

```bash
npm install
```

4. Start the development server:

```bash
npm start
```

5. Open your browser and go to `http://localhost:3000` to see the app in action.

## 🌐 Deployment

The app is hosted on Netlify. You can view it here:  
[TaskMaster on Netlify](https://friendly-halva-efa6bd.netlify.app/)

## 🔐 Authentication

Firebase Authentication is used to manage user login and registration. Create a Firebase project and follow the setup instructions to link the app with Firebase.

## 📂 File Structure

```bash
TaskMaster/
│
├── public/           
├── src/              
│   ├── components/   
│   ├── pages/        
│   ├── context/     
│   └── App.js        
│
├── tailwind.config.js # Tailwind CSS configuration
├── package.json      # Project dependencies and scripts
└── README.md         # Project documentation
```


## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

**Created by [Pritam]**  

