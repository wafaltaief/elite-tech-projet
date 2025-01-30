<template>
  <div>
    <!-- <AdminPanel></AdminPanel> -->
    <h2 class="subtitle">List of Users</h2>
    <button class="logout-button" @click="$router.go(-1)">Back</button>
    <table class="user-table">
      <thead>
        <tr>
          <th>Username</th>
          <th>Email</th>
          <th>Phone</th>
          <th>Date of Birth</th>
          <th>Role</th>
          <th v-if="hasTeachers">Specialty</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="user in users" :key="user.id">
          <td>{{ user.username }}</td>
          <td>{{ user.email }}</td>
          <td>{{ user.phone }}</td>
          <td>{{ user.date_naiss }}</td>
          <td>{{ user.role }}</td>
          <td v-if="user.role === 'teacher'">{{ user.specialty }}</td>
          <td v-if="user.role === 'admin'">Admin</td>
          <td v-if="user.role === 'student'">Student</td>
          <td>
            <button class="delete-button" @click="deleteUser(user.id)">Delete</button>
          </td>
        </tr>
      </tbody>
    </table>

    <div class="signup-container">
      <h1>Add User</h1>
      <form @submit.prevent="signUp">
        <div class="form-group" v-for="(field, index) in formFields" :key="index">
          <label :for="field.id">{{ field.label }}:</label>
          <input v-if="field.type !== 'select'" :type="field.type" :id="field.id" v-model="newUser[field.model]" />
          <select v-else :id="field.id" v-model="newUser[field.model]">
            <option v-for="option in field.options" :key="option" :value="option">{{ option }}</option>
          </select>
        </div>
        <button type="submit" class="add-button">Add</button>
      </form>
    </div>
  </div>
</template>

<script>
import { db } from "../../firebase";
import { collection, getDocs, deleteDoc, doc, addDoc } from "firebase/firestore";
// import AdminPanel from "./AdminPanel.vue";
export default {
  //   components: {
  //   AdminPanel
  // },
  data() {
    return {
      users: [],
      hasTeachers: false,
      newUser: {
        username: "",
        email: "",
        phone: "",
        date_naiss: "",
        role: "student",
        specialty: ""
      },
      formFields: [
        { label: "Username", id: "username", model: "username", type: "text" },
        { label: "Email", id: "email", model: "email", type: "email" },
        { label: "Phone", id: "phone", model: "phone", type: "text" },
        { label: "Date of Birth", id: "date_naiss", model: "date_naiss", type: "date" },
        { label: "Role", id: "role", model: "role", type: "select", options: ["admin", "teacher", "student"] },
        { label: "Specialty", id: "specialty", model: "specialty", type: "select", options: ["math", "informatics", "science", "eco-gestion"] }
      ]
    };
  },
  async created() {
    await this.fetchUsers();
  },
  methods: {
    async fetchUsers() {
      try {
        const usersCollection = collection(db, "users");
        const usersSnapshot = await getDocs(usersCollection);
        this.users = usersSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        this.hasTeachers = this.users.some(user => user.role === "teacher");
      } catch (error) {
        console.error("Error fetching users: ", error);
      }
    },
    async deleteUser(userId) {
      if (confirm("Are you sure you want to delete this user?")) {
        try {
          await deleteDoc(doc(db, "users", userId));
          this.users = this.users.filter(user => user.id !== userId);
          alert("User deleted successfully!");
        } catch (error) {
          console.error("Error deleting user: ", error);
        }
      }
    },
    async signUp() {
      try {
        const usersCollection = collection(db, "users");
        await addDoc(usersCollection, this.newUser);
        alert("User added successfully!");
        this.fetchUsers();
      } catch (error) {
        console.error("Error adding user: ", error);
      }
    }
  }
};
</script>

<style scoped>
.signup-container {
  width: 100%;
  max-width: 600px;
  background: #fff;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  margin: 20px auto;
}

.form-group {
  margin-bottom: 15px;
}

input, select {
  width: 100%;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
}

.add-button {
  background-color: #2ecc71;
  color: white;
  font-size: 1rem;
  padding: 10px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

.add-button:hover {
  background-color: #27ae60;
}
  /* Styles globaux pour l'interface */
  .admin-space {
    font-family: 'Roboto', sans-serif;
    padding: 20px;
    max-width: 1200px;
    margin: 0 auto;
    background-color: #f4f7fa;
    border-radius: 10px;
    box-shadow: 0 8px 16px rgba(0, 0, 0, 0.1);
  }
  
  .header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 30px;
  }
  
  .title {
    font-size: 2rem;
    color: #34495e;
  }
  
  .logout-button {
  position: absolute;
  top: 20px;
  right: 20px;
  background-color: #e74c3c;
  color: white;
  font-size: 1rem;
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s;
}

.logout-button:hover {
  background-color: #c0392b;
}

  .subtitle {
    text-align: center;
    font-size: 1.8rem;
    margin-bottom: 20px;
    color: #2c3e50;
    border-bottom: 2px solid #3498db;
    display: inline-block;
    padding-bottom: 5px;
  }
  
  table {
    width: 100%;
    border-collapse: collapse;
    margin: 20px 0;
    background-color: #ffffff;
    border-radius: 8px;
    overflow: hidden;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  }
  
  table th,
  table td {
    padding: 15px;
    text-align: left;
    border-bottom: 1px solid #ddd;
  }
  
  table th {
    background-color: #2c3e50;
    color: white;
    text-transform: uppercase;
    font-size: 0.9rem;
    font-weight: 700;
  }
  
  table td {
    color: #34495e;
    font-size: 0.9rem;
  }
  
  table tr:hover {
    background-color: #f2f6fc;
  }
  
  button {
    font-size: 0.9rem;
    padding: 8px 12px;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    transition: all 0.3s ease;
  }
  
  .add-button {
    background-color: #3498db;
    color: white;
    margin-top: 10px;
  }
  
  .add-button:hover {
    background-color: #2980b9;
  }
  
  .delete-button {
    background-color: #e74c3c;
    color: white;
  }
  
  .delete-button:hover {
    background-color: #c0392b;
  }
  
  .detail-button {
    background-color: #3498db;
    color: white;
    padding: 8px 12px;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    transition: background-color 0.3s;
  }
  
  .detail-button:hover {
    background-color: #2980b9;
  }
  
  
  .add-course {
    margin-top: 30px;
    padding: 20px;
    background-color: #ffffff;
    border-radius: 8px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  }
  
  .add-course h3 {
    font-size: 1.5rem;
    color: #34495e;
    margin-bottom: 20px;
  }
  
  .add-course input,
  .add-course select {
    width: calc(33.33% - 10px);
    margin-right: 15px;
    padding: 10px;
    border: 1px solid #ccc;
    border-radius: 5px;
    font-size: 1rem;
    background-color: #fff;
  }
  
  .add-course input:last-of-type,
  .add-course select:last-of-type {
    margin-right: 0;
  }
  
  .add-course input:focus,
  .add-course select:focus {
    border-color: #3498db;
    outline: none;
  }
  
  /* Styles spécifiques pour le champ select */
  .add-course select {
    appearance: none;
    background-image: url("data:image/svg+xml;charset=UTF-8,%3Csvg xmlns='http://www.w3.org/2000/svg' width='10' height='10' viewBox='0 0 10 10'%3E%3Cpolygon points='0,0 10,0 5,5' fill='%3498db'/%3E%3C/svg%3E");
    background-repeat: no-repeat;
    background-position: right 10px center;
    background-size: 12px 12px;
  }
  
  .add-course select:hover {
    cursor: pointer;
  }
  
  .add-course select:disabled {
    background-color: #e8e8e8;
    color: #999;
  }
  
  @media (max-width: 768px) {
    .add-course input,
    .add-course select {
      width: calc(100% - 10px);
      margin-bottom: 10px;
    }
  
    .add-course input:last-of-type,
    .add-course select:last-of-type {
      margin-bottom: 0;
    }
  }
  </style>