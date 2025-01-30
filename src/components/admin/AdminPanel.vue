<template>
      <!-- Sidebar -->
      <aside class="sidebar">
        <h2 class="sidebar-title">Admin Panel</h2>
        <router-link to="/admin">✅ Admin Dashboard</router-link>
        <router-link to="/admin/lessons">📚 Manage Lessons</router-link>
        <router-link to="/admin/users">👥 Manage Users</router-link>
        <button class="logout-button" @click="logout">Logout</button>
      </aside>
  
      
   
  </template>
  
  <script>
  import { getAuth, signOut } from "firebase/auth";
  
  export default {
    name: 'AdminPanel',
    methods: {
      logout() {
        const auth = getAuth();
        signOut(auth)
          .then(() => {
            alert("Logged out successfully!");
            this.$router.push("/login");
          })
          .catch((error) => {
            console.error("Error during logout: ", error);
            alert("Failed to logout. Please try again.");
          });
      },
    },
  };
  </script>
  
  <style scoped>
  .admin-container {
    display: flex;
    height: 100vh;
    font-family: 'Poppins', sans-serif;
    background-color: #f4f7fa;
  }
  
  .sidebar {
  width: 280px;
  background-color: #2c3e50;
  color: white;
  padding: 25px;
  display: flex;
  flex-direction: column;
  height: 100vh;
  box-shadow: 4px 0 10px rgba(0, 0, 0, 0.1);
  justify-content: flex-start;
  position: fixed;
  height: 100%;
	float: left;
}
.sidebar-title {
  font-size: 1.8rem;
  text-align: center;
  margin-bottom: 30px;
  border-bottom: 3px solid #3498db;
  padding-bottom: 15px;
  font-weight: bold;
}

.sidebar a {
  text-decoration: none;
  color: white;
  font-size: 1rem;
  padding: 15px;
  display: flex;
  align-items: center;
  gap: 10px;
  border-radius: 8px;
  transition: all 0.3s ease;
  font-weight: 500;
}

.sidebar a:hover {
  background-color: #3498db;
  transform: scale(1.05);
}

/* Bouton de déconnexion correctement aligné */
.logout-button {
  background: linear-gradient(135deg, #e74c3c, #c0392b);
  color: white;
  font-size: 1rem;
  padding: 15px;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.3s ease;
  font-weight: bold;
  text-transform: uppercase;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 20px; 
  width: 100%;
}

.logout-button:hover {
  background: linear-gradient(135deg, #ff6b6b, #e74c3c);
  transform: scale(1.05);
}

  /* Content Area */
  .content {
    margin-left: 280px; /* Matches sidebar width */
    flex-grow: 1;
    padding: 30px;
    background-color: #ffffff;
    border-radius: 20px;
    width: calc(100% - 280px);
  }
  </style>
  