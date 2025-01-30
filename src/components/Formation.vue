<template>
    <div class="formation-container">
      <header>
        <h1>Formation Page</h1>
        <nav>
          <router-link to="/">Home</router-link>
          <router-link to="/courses">Courses</router-link>
        </nav>
      </header>
      <main>
        <h2>All Lessons</h2>
        <div class="lessons-list">
          <div
            class="lesson-card"
            v-for="lesson in lessons"
            :key="lesson.id"
            @mouseenter="hover = lesson.id"
            @mouseleave="hover = null"
            :class="{ 'hovered': hover === lesson.id }"
          >
            <h3>{{ lesson.title }}</h3>
            <p>{{ lesson.description }}</p>
            <p><strong>Instructor:</strong> {{ lesson.instructor }}</p>
            <p><strong>Duration:</strong> {{ lesson.duration }}</p>
            <button @click="viewDetails(lesson.id)">View Details</button>
          </div>
        </div>
      </main>
      <footer>
        <p>&copy; 2025 Study Website. All Rights Reserved.</p>
      </footer>
    </div>
  </template>
  
  <script>
import { db } from "../firebase";
import { collection, getDocs } from "firebase/firestore";

export default {
  name: "FormationPage",
  data() {
    return {
      lessons: [],
      hover: null,
    };
  },
  async created() {
    await this.fetchLessons();
  },
  methods: {
    async fetchLessons() {
      try {
        const lessonsCollection = collection(db, "lessons");
        const lessonsSnapshot = await getDocs(lessonsCollection);
        this.lessons = lessonsSnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
      } catch (error) {
        console.error("Error fetching lessons: ", error);
      }
    },
    viewDetails(lessonId) {
      alert(`Viewing details for lesson ID: ${lessonId}`);
    },
  },
};
  </script>
  
  <style scoped>
  .formation-container {
    font-family: "Arial", sans-serif;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    min-height: 100vh;
    background: linear-gradient(to bottom, #ffffff, #f1f3f6);
  }
  
  /* Header styling */
  header {
    background: #0056b3;
    color: white;
    padding: 20px 0;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    text-align: center;
  }
  header h1 {
    font-size: 2em;
    font-weight: bold;
    margin: 0;
  }
  nav {
    margin-top: 10px;
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
    color: #ffcc00;
  }
  
  /* Main content styling */
  main {
    max-width: 800px;
    margin: 30px auto;
    padding: 20px;
    background: white;
    border-radius: 12px;
    box-shadow: 0 6px 10px rgba(0, 0, 0, 0.1);
    animation: fadeIn 1s ease;
  }
  main h2 {
    font-size: 1.8em;
    color: #333;
    margin-bottom: 20px;
  }
  
  /* Lessons list styling */
  .lessons-list {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    gap: 20px;
  }
  
  /* Individual lesson card styling */
  .lesson-card {
    background: #f9f9f9;
    border: 1px solid #ddd;
    border-radius: 12px;
    padding: 20px;
    text-align: left;
    transition: transform 0.3s ease, box-shadow 0.3s ease;
    animation: slideIn 0.5s ease;
  }
  .lesson-card.hovered {
    transform: translateY(-5px);
    box-shadow: 0 8px 15px rgba(0, 0, 0, 0.15);
  }
  .lesson-card h3 {
    color: #0056b3;
    font-size: 1.5em;
    margin-bottom: 10px;
  }
  .lesson-card p {
    color: #6c757d;
    font-size: 1em;
    margin-bottom: 10px;
  }
  .lesson-card button {
    background: #007bff;
    color: white;
    font-weight: bold;
    padding: 10px 15px;
    border: none;
    border-radius: 8px;
    cursor: pointer;
    transition: background-color 0.3s ease, transform 0.2s ease;
  }
  .lesson-card button:hover {
    background: #0056b3;
    transform: scale(1.05);
  }
  
  /* Footer styling */
  footer {
    text-align: center;
    background: #0056b3;
    color: white;
    padding: 10px 0;
    margin-top: 20px;
    font-size: 0.9em;
    box-shadow: 0 -4px 6px rgba(0, 0, 0, 0.1);
  }
  footer p {
    margin: 0;
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
  
  @keyframes slideIn {
    from {
      transform: translateY(20px);
      opacity: 0;
    }
    to {
      transform: translateY(0);
      opacity: 1;
    }
  }
  </style>
  