<template>
  <div class="courses-container">
    <header>
      <h1>Welcome to the Study Website</h1>
      <nav>
        <router-link to="/login">Login</router-link>
        <router-link to="/signup">Sign Up</router-link>
        <router-link to="/formation">Formation</router-link>
      </nav>
    </header>
    <main>
      <h2>Available Courses</h2>
      <div class="courses-list">
        <div class="course-card" v-for="course in courses" :key="course.id" @mouseenter="hover = course.id" @mouseleave="hover = null" :class="{ 'hovered': hover === course.id }">
          <h3>{{ course.title }}</h3>
          <p>{{ course.description }}</p>
          <button @click="enroll(course.id)">Enroll</button>
        </div>
      </div>
    </main>
    <footer>
      <p>&copy; 2025 Study Website. All Rights Reserved.</p>
    </footer>
  </div>
</template>

<script>
export default {
  name: "CoursesPage",
  data() {
    return {
      courses: [
        {
          id: 1,
          title: "Web Development",
          description:
            "Learn HTML, CSS, and JavaScript to build stunning websites.",
        },
        {
          id: 2,
          title: "Data Science",
          description: "Analyze data and gain insights using Python and R.",
        },
        {
          id: 3,
          title: "Graphic Design",
          description:
            "Master tools like Photoshop and Illustrator for creative design.",
        },
        {
          id: 4,
          title: "Machine Learning",
          description: "Explore the world of AI and build predictive models.",
        },
      ],
      hover: null,
    };
  },
  methods: {
    enroll(courseId) {
      alert(`You have enrolled in course ID: ${courseId}`);
    },
  },
};
</script>

<style scoped>
/* Global container styling */
.courses-container {
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

/* Courses list styling */
.courses-list {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 20px;
}

/* Individual course card styling */
.course-card {
  background: #f9f9f9;
  border: 1px solid #ddd;
  border-radius: 12px;
  padding: 20px;
  text-align: left;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  animation: slideIn 0.5s ease;
}
.course-card.hovered {
  transform: translateY(-5px);
  box-shadow: 0 8px 15px rgba(0, 0, 0, 0.15);
}
.course-card h3 {
  color: #0056b3;
  font-size: 1.5em;
  margin-bottom: 10px;
}
.course-card p {
  color: #6c757d;
  font-size: 1em;
  margin-bottom: 20px;
}
.course-card button {
  background: #007bff;
  color: white;
  font-weight: bold;
  padding: 10px 15px;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  transition: background-color 0.3s ease, transform 0.2s ease;
}
.course-card button:hover {
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
