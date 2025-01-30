<template>
  <div>
    <header>
      <h1>Welcome to the Study Website</h1>
      <nav>
        <router-link to="/login">Login</router-link>
        <router-link to="/home">home</router-link>
      </nav>
    </header>
  </div>
  <div class="signup-container">
    <h1>Sign Up</h1>
    <form @submit.prevent="signUp">
      <!-- First Name -->
      <div class="form-group">
        <label for="firstName">First Name:</label>
        <input type="text" id="firstName" v-model="firstName" />
      </div>

      <!-- Last Name -->
      <div class="form-group">
        <label for="lastName">Last Name:</label>
        <input type="text" id="lastName" v-model="lastName" />
      </div>

      <!-- Username -->
      <div class="form-group">
        <label for="username">Username:</label>
        <input type="text" id="username" v-model="username" />
      </div>

      <!-- Email -->
      <div class="form-group">
        <label for="email">Email:</label>
        <input type="email" id="email" v-model="email" />
      </div>

      <!-- Phone -->
      <div class="form-group">
        <label for="phone">Phone:</label>
        <input type="text" id="phone" v-model="phone" />
      </div>

      <!-- Date of Birth -->
      <div class="form-group">
        <label for="date_naiss">Date of Birth:</label>
        <input type="date" id="date_naiss" v-model="date_naiss" />
      </div>

      <!-- Role -->
      <div class="form-group">
        <label for="role">Role:</label>
        <select id="role" v-model="role">
          <option value="admin">Admin</option>
          <option value="teacher">Teacher</option>
          <option value="student">Student</option>
        </select>
      </div>

      <!-- Specialty Field for Teachers -->
      <div v-if="role === 'teacher'" class="form-group">
        <label for="specialty">Specialty:</label>
        <select id="specialty" v-model="specialty">
          <option value="math">Mathematics</option>
          <option value="informatics">Informatics</option>
          <option value="science">Science</option>
          <option value="eco-gestion">Economics & Management</option>
        </select>
      </div>

      <!-- Password -->
      <div class="form-group">
        <label for="password">Password:</label>
        <input type="password" id="password" v-model="password" />
      </div>

      <!-- Confirm Password -->
      <div class="form-group">
        <label for="confirmPassword">Confirm Password:</label>
        <input type="password" id="confirmPassword" v-model="confirmPassword" />
      </div>

      <button type="submit">Sign Up</button>
    </form>
    <router-link to="/login">Already have an account? Login</router-link>
  </div>
</template>

<script>
import { auth, db } from "../firebase"; // Import Firebase and Firestore
import { createUserWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";

export default {
  data() {
    return {
      firstName: '',
      lastName: '', 
      username: '',
      email: '',
      phone: '',
      date_naiss: '',
      role: '',
      specialty: '',
      password: '',
      confirmPassword: '',
    };
  },
  methods: {
    async signUp() {
      // Frontend validation
      if (
        !this.firstName ||
        !this.lastName ||
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

      try {
        // Create user in Firebase Auth
        const userCredential = await createUserWithEmailAndPassword(
          auth,
          this.email,
          this.password
        );
        const user = userCredential.user;

        // Save user data to Firestore
        const userData = {
          firstName: this.firstName,
          lastName: this.lastName,
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

        alert("Signup successful! You can now login.");
        this.$router.push("/login");
      } catch (error) {
        console.error("Error signing up:", error.message);
        alert(`Signup failed: ${error.message}`);
      }
    },
  },
};
</script>

<style scoped>
header {
  background: linear-gradient(90deg, #007bff, #00c6ff);
  color: white;
  padding: 15px 0;
  margin-bottom: 20px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  animation: fadeIn 1.5s ease;
}
header h1 {
  margin: 0;
  font-size: 2em;
  text-align: center;
}
nav {
  margin-top: 10px;
  text-align: center;
}
nav a {
  color: white;
  text-decoration: none;
  margin: 0 15px;
  font-weight: bold;
  font-size: 1.2em;
  transition: color 0.3s ease;
}
nav a:hover {
  text-decoration: underline;
  color: #071cff;
}

/* Signup container */
.signup-container {
  max-width: 500px;
  margin: 80px auto;
  padding: 30px;
  background: #fff;
  border-radius: 12px;
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.2);
  animation: slideUp 1s ease;
}
.signup-container h1 {
  text-align: center;
  font-size: 2.4em;
  font-weight: bold;
  color: #333;
  margin-bottom: 25px;
}

/* Form styling */
.form-group {
  margin-bottom: 20px;
}
label {
  display: block;
  font-size: 1rem;
  font-weight: bold;
  color: #555;
  margin-bottom: 8px;
}
input,
select {
  width: 100%;
  padding: 12px;
  font-size: 1rem;
  border: 1px solid #ddd;
  border-radius: 8px;
  outline: none;
  transition: border-color 0.3s, box-shadow 0.3s;
}
input:focus,
select:focus {
  border-color: #007bff;
  box-shadow: 0 0 8px rgba(0, 123, 255, 0.5);
}
button {
  width: 100%;
  padding: 15px;
  font-size: 1.1rem;
  font-weight: bold;
  background: linear-gradient(90deg, #007bff, #00c6ff);
  color: white;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  transition: background-color 0.3s, transform 0.3s;
}
button:hover {
  background: linear-gradient(90deg, #0056b3, #00aaff);
  transform: translateY(-2px);
}
button:active {
  background: #003d80;
}
a {
  display: block;
  text-align: center;
  margin-top: 20px;
  color: #007bff;
  text-decoration: none;
  font-size: 1rem;
}
a:hover {
  color: #0056b3;
}

/* Animations */
@keyframes fadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

@keyframes slideUp {
  from {
    transform: translateY(20px);
    opacity: 0;
  }
  to {
    transform: translateY(0);
    opacity: 1;
  }
}

/* Responsive Design */
@media (max-width: 480px) {
  .signup-container {
    padding: 20px;
  }
  h1 {
    font-size: 1.8em;
  }
  input,
  select,
  button {
    font-size: 0.9rem;
  }
}

</style>
