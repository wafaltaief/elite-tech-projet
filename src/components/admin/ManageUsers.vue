<template>
  <div>
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
        <div class="form-group">
          <label for="username">Username:</label>
          <input type="text" id="username" v-model="username" />
        </div>

        <div class="form-group">
          <label for="email">Email:</label>
          <input type="email" id="email" v-model="email" />
        </div>

        <div class="form-group">
          <label for="phone">Phone:</label>
          <input type="text" id="phone" v-model="phone" />
        </div>

        <div class="form-group">
          <label for="date_naiss">Date of Birth:</label>
          <input type="date" id="date_naiss" v-model="date_naiss" />
        </div>

        <div class="form-group">
          <label for="role">Role:</label>
          <select id="role" v-model="role">
            <option value="admin">Admin</option>
            <option value="teacher">Teacher</option>
            <option value="student">Student</option>
          </select>
        </div>

        <div v-if="role === 'teacher'" class="form-group">
          <label for="specialty">Specialty:</label>
          <select id="specialty" v-model="specialty">
            <option value="math">Mathematics</option>
            <option value="informatics">Informatics</option>
            <option value="science">Science</option>
            <option value="eco-gestion">Economics & Management</option>
          </select>
        </div>

        <div class="form-group">
          <label for="password">Password:</label>
          <input type="password" id="password" v-model="password" />
        </div>

        <div class="form-group">
          <label for="confirmPassword">Confirm Password:</label>
          <input type="password" id="confirmPassword" v-model="confirmPassword" />
        </div>

        <button type="submit" :disabled="loading">Add</button>
      </form>
    </div>
  </div>
</template>

<script>
import { auth, db } from "../../firebase"; // Import Firebase and Firestore
import { createUserWithEmailAndPassword } from "firebase/auth";
import { collection, getDocs, deleteDoc, doc, setDoc, query, where } from "firebase/firestore";

export default {
  data() {
    return {
      username: '',
      email: '',
      phone: '',
      date_naiss: '',
      role: '',
      specialty: '',
      password: '',
      confirmPassword: '',
      users: [],
      hasTeachers: false,
      loading: false,
    };
  },
  async created() {
    await this.fetchUsers();
  },
  methods: {
    async signUp() {
      // Frontend validation
      if (
        !this.username ||
        !this.email ||
        !this.phone ||
        !this.date_naiss ||
        !this.role ||
        !this.password ||
        !this.confirmPassword ||
        (this.role === "teacher" && !this.specialty)
      ) {
        alert("Please fill in all fields.");
        return;
      }

      if (this.password !== this.confirmPassword) {
        alert("Passwords do not match.");
        return;
      }

      this.loading = true; // Show loading state

      try {
        // Check if username or email exists
        const usernameQuery = query(collection(db, "users"), where("username", "==", this.username));
        const emailQuery = query(collection(db, "users"), where("email", "==", this.email));

        const usernameSnapshot = await getDocs(usernameQuery);
        const emailSnapshot = await getDocs(emailQuery);

        if (!usernameSnapshot.empty) {
          alert("Username already exists.");
          return;
        }

        if (!emailSnapshot.empty) {
          alert("Email already exists.");
          return;
        }

        // Create user in Firebase Auth
        const userCredential = await createUserWithEmailAndPassword(
          auth,
          this.email,
          this.password
        );
        const user = userCredential.user;

        // Save user data to Firestore
        const userData = {
          username: this.username,
          email: this.email,
          phone: this.phone,
          date_naiss: this.date_naiss,
          role: this.role,
        };

        if (this.role === "teacher") {
          userData.specialty = this.specialty;
        }

        await setDoc(doc(db, "users", user.uid), userData);

        alert("User created successfully!");
        this.resetForm();
        this.fetchUsers(); // Refresh the list of users
      } catch (error) {
        console.error("Error signing up:", error.message);
        alert(`Failed: ${error.message}`);
      } finally {
        this.loading = false; // Hide loading state
      }
    },

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

    resetForm() {
      this.username = '';
      this.email = '';
      this.phone = '';
      this.date_naiss = '';
      this.role = '';
      this.specialty = '';
      this.password = '';
      this.confirmPassword = '';
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