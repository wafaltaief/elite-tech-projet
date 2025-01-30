<!-- <template>
  <div class="login-container">
    <h1>Login</h1>
    <form @submit.prevent="login">
      <div class="form-group">
        <label for="email">Email:</label>
        <input type="email" id="email" v-model="email" />
      </div>
      <div class="form-group">
        <label for="password">Password:</label>
        <input type="password" id="password" v-model="password" />
      </div>
      <button type="submit">Login</button>
    </form>
    <router-link to="/signup">Don't have an account? Sign up</router-link>
  </div>
</template>

<script>
import { auth } from "../firebase"; // Import Firebase Authentication
import { signInWithEmailAndPassword } from "firebase/auth";
import { getDoc, doc } from "firebase/firestore";
import { db } from "../firebase"; // Import Firestore

export default {
  data() {
    return {
      email: '',
      password: '',
    };
  },
  methods: {
    async login() {
      if (!this.email || !this.password) {
        alert('Please fill in both fields.');
        return;
      }

      try {
        // Authenticate with Firebase
        const userCredential = await signInWithEmailAndPassword(auth, this.email, this.password);
        const user = userCredential.user;

        // Fetch user data from Firestore
        const userDoc = await getDoc(doc(db, "users", user.uid));
        if (userDoc.exists()) {
          const userData = userDoc.data();

          // Store the user data (you can also store this in Vuex or localStorage)
          localStorage.setItem('user', JSON.stringify({
            uid: user.uid,
            username: userData.username,
            email: userData.email,
            role: userData.role,
            phone: userData.phone,
            date_naiss: userData.date_naiss,
          }));

          alert('Login successful!');
          this.$router.push('/home');  // Redirect to the homepage or dashboard after successful login
        } else {
          alert('No user data found in Firestore.');
        }
      } catch (error) {
        console.error('Error during login:', error.message);
        alert('Login failed: ' + error.message);
      }
    },
  },
};
</script>

<style scoped>
.login-container {
  max-width: 400px;
  margin: 50px auto;
  padding: 20px;
  background: white;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}
.form-group {
  margin-bottom: 15px;
}
label {
  display: block;
  margin-bottom: 5px;
}
input {
  width: 100%;
  padding: 8px;
  box-sizing: border-box;
}
button {
  background-color: #28a745;
  color: white;
  border: none;
  padding: 10px 15px;
  cursor: pointer;
  border-radius: 5px;
}
button:hover {
  background-color: #218838;
}
</style> -->
<template>
    <div>
    <header>
      <h1>Welcome to the Study Website</h1>
      <nav>
        <router-link to="/signup">Sign Up</router-link>
        <router-link to="/home">home</router-link>
      </nav>
    </header>
  </div>
  <div class="login-container">
    <h1>Login</h1>
    <form @submit.prevent="login">
      <div class="form-group">
        <label for="email">Email:</label>
        <input type="email" id="email" v-model="email" />
      </div>
      <div class="form-group">
        <label for="password">Password:</label>
        <input type="password" id="password" v-model="password" />
      </div>
      <button type="submit">Login</button>
    </form>
    <router-link to="/signup">Don't have an account? Sign Up</router-link>
  </div>
</template>

<script>
import { auth } from "../firebase"; // Import Firebase Authentication
import { signInWithEmailAndPassword } from "firebase/auth";
import { getDoc, doc } from "firebase/firestore";
import { db } from "../firebase"; // Import Firestore

export default {
  data() {
    return {
      email: '',
      password: '',
    };
  },
  methods: {
    async login() {
      try {
        // Sign in the user using Firebase Auth
        const userCredential = await signInWithEmailAndPassword(auth, this.email, this.password);
        const user = userCredential.user;

        // Fetch the user's data from Firestore
        const userDoc = await getDoc(doc(db, "users", user.uid));
        if (userDoc.exists()) {
          const userData = userDoc.data();
          const userRole = userData.role; // Get the role from Firestore

          // Redirect based on the role
          if (userRole === 'admin') {
            this.$router.push('/admin');
          } else if (userRole === 'teacher') {
            this.$router.push('/teacher-space');
          } else if (userRole === 'student') {
            this.$router.push('/student-space');
          } else {
            alert('Unknown role');
          }
        } else {
          alert('User data not found in Firestore');
        }
      } catch (error) {
        alert('Login failed: ' + error.message);
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

/* Container Styling */
.login-container {
  max-width: 500px;
  margin: 80px auto;
  padding: 30px;
  background: #fff;
  border-radius: 12px;
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.2);
  animation: slideUp 1s ease;
  font-family: 'Arial', sans-serif;
}

/* Page Title */
.login-container h1 {
  text-align: center;
  font-size: 2.4em;
  font-weight: bold;
  color: #333;
  margin-bottom: 25px;
}

/* Form Group Styling */
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

input {
  width: 100%;
  padding: 12px;
  font-size: 1rem;
  border: 1px solid #ddd;
  border-radius: 8px;
  outline: none;
  transition: border-color 0.3s ease, box-shadow 0.3s ease;
}

input:focus {
  border-color: #007bff;
  box-shadow: 0 0 8px rgba(0, 123, 255, 0.5);
}

/* Button Styling */
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
  transition: background-color 0.3s , transform 0.2s ;
}

button:hover {
  background: linear-gradient(90deg, #0056b3, #00aaff);
  transform: translateY(-2px);
}
button:active {
  background-color: #003d80;
}

/* button:disabled {
  background-color: #adb5bd;
  cursor: not-allowed;
} */

/* Router Link Styling */
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
  .login-container {
    padding: 20px;
  }

  h1 {
    font-size: 1.8em;
  }

  input, button {
    font-size: 0.9rem;
  }
}
</style>
