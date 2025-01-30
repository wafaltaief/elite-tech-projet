<template>
  <div class="admin-container">
    <div class="sidebar">
    <AdminPanel></AdminPanel>
    </div>
    <!-- Main Content -->
    <div class="content">
      <div class="header">
        <h1 class="title">Admin Dashboard</h1>
      </div>
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
import { getAuth, signOut } from "firebase/auth";
import AdminPanel from "./AdminPanel.vue";

export default {
  components: {
    AdminPanel
  },
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
/* Amélioration de l'interface pour correspondre à l'image */
.admin-container {
  display: flex;
  height: 100vh;
  font-family: 'Poppins', sans-serif;
  background-color: #f4f7fa;
}



/* Contenu principal */
.content {
  margin-left: 280px;
  flex-grow: 1;
  padding: 30px;
  background-color: #ffffff;
  border-radius: 20px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.05);
}

.header {
  display: flex;
  justify-content: center; /* Centers horizontally */
  align-items: center; /* Centers vertically */
  margin-bottom: 30px;
  height: 100px; /* Optional: adjust based on your design */
}

.title {
  font-size: 2.2rem;
  color: #2c3e50;
  font-weight: bold;
}


/* Tableau de bord */
.dashboard-cards {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 20px;
}

.card {
  background: white;
  padding: 20px;
  border-radius: 15px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.05);
  transition: transform 0.3s ease;
}

.card:hover {
  transform: scale(1.03);
}

@media (max-width: 768px) {
  .sidebar {
    width: 220px;
  }
  .content {
    margin-left: 220px;
  }
}
</style>