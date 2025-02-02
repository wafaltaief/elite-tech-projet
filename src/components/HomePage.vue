<!-- <template>
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
        <div
          class="course-card"
          v-for="course in courses"
          :key="course.id"
          @mouseenter="hover = course.id"
          @mouseleave="hover = null"
          :class="{ 'hovered': hover === course.id }"
        >
          <img :src="course.image" :alt="course.title" class="course-image" />
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
import webDevImg from "@/assets/image/dev.jpg";
import dataScienceImg from "@/assets/image/data-science.jpg";
import graphicDesignImg from "@/assets/image/graphic-design.jpg";
import machineLearningImg from "@/assets/image/machine-learning.jpg";
import Cybersecurity from "@/assets/image/Cybersecurity.jpg";
import BlocCryp from "@/assets/image/BlocCryp.jpg";
import MobileAppDevelopment from "@/assets/image/MobileApp.jpg";
import GameDevelopment from "@/assets/image/GameDev.jpg";
export default {
  name: "CoursesPage",
  data() {
    return {
      courses: [
        {
          id: 1,
          title: "Web Development",
          description: "Learn HTML, CSS, and JavaScript to build stunning websites.",
          image: webDevImg,
        },
        {
          id: 2,
          title: "Data Science",
          description: "Analyze data and gain insights using Python and R.",
          image: dataScienceImg,
        },
        {
          id: 3,
          title: "Graphic Design",
          description: "Master tools like Photoshop and Illustrator for creative design.",
          image: graphicDesignImg,
        },
        {
          id: 4,
          title: "Machine Learning",
          description: "Explore the world of AI and build predictive models.",
          image: machineLearningImg,
        },
        {
        id: 5,
        title: "Cybersecurity",
        description: "Learn how to protect systems and data from cyber threats.",
        image:Cybersecurity
      },
      {
        id: 6,
        title: "Blockchain & Cryptocurrency",
        description: "Understand blockchain technology and cryptocurrency trading.",
        image: BlocCryp
      },
      {
        id: 7,
        title: "Mobile App Development",
        description: "Create Android & iOS apps using Flutter and React Native.",
        image:MobileAppDevelopment
      },
      {
        id: 8,
        title: "Game Development",
        description: "Learn Unity and Unreal Engine to develop amazing games.",
        image:GameDevelopment
      }
    ],
    hover: null
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
  text-align: center;
}
header h1 {
  font-size: 2em;
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
  max-width: 900px;
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
  text-align: center;
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

/* Course image styling */
.course-image {
  width: 100%;
  height: 180px;
  object-fit: cover;
  border-radius: 10px;
  margin-bottom: 15px;
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
</style> -->

<template>
  <div class="courses-container">
    <header>
      <h1>Welcome to the Study Website</h1>
      <nav>
        <router-link to="/login" aria-label="Login Page">Login</router-link>
        <router-link to="/signup" aria-label="Sign Up Page">Sign Up</router-link>
      </nav>
    </header>

    <main>
      <h2>Available Courses</h2>

      <!-- Scroll buttons -->
      <div class="scroll-buttons">
        <button @click="scrollLeft" aria-label="Scroll Left">←</button>
        <button @click="scrollRight" aria-label="Scroll Right">→</button>
      </div>

      <!-- Courses list displayed horizontally -->
      <div class="courses-list" ref="courseList">
        <div
          class="course-card"
          v-for="course in courses"
          :key="course.id"
          @mouseenter="hover = course.id"
          @mouseleave="hover = null"
          :class="{ 'hovered': hover === course.id }"
        >
          <img :src="course.image" :alt="course.title" class="course-image" />
          <h3>{{ course.title }}</h3>
          <p>{{ course.description }}</p>
          <button @click="enroll(course.id)" aria-label="Enroll in course">Enroll</button>
        </div>
      </div>
    </main>

    <footer>
      <p>&copy; 2025 Study Website. All Rights Reserved.</p>
    </footer>
  </div>
</template>

<script>
import webDevImg from "@/assets/image/dev.jpg";
import dataScienceImg from "@/assets/image/data-science.jpg";
import graphicDesignImg from "@/assets/image/graphic-design.jpg";
import machineLearningImg from "@/assets/image/machine-learning.jpg";
import Cybersecurity from "@/assets/image/Cybersecurity.jpg";
import BlocCryp from "@/assets/image/BlocCryp.jpg";
import MobileAppDevelopment from "@/assets/image/MobileApp.jpg";
import GameDevelopment from "@/assets/image/GameDev.jpg";

export default {
  name: "FormationPage",
  data() {
    return {
      courses: [
        { id: 1, title: "Web Development", description: "Learn HTML, CSS, and JavaScript to build stunning websites.", image: webDevImg },
        { id: 2, title: "Data Science", description: "Analyze data and gain insights using Python and R.", image: dataScienceImg },
        { id: 3, title: "Graphic Design", description: "Master tools like Photoshop and Illustrator for creative design.", image: graphicDesignImg },
        { id: 4, title: "Machine Learning", description: "Explore the world of AI and build predictive models.", image: machineLearningImg },
        { id: 5, title: "Cybersecurity", description: "Learn how to protect systems and data from cyber threats.", image: Cybersecurity },
        { id: 6, title: "Blockchain & Cryptocurrency", description: "Understand blockchain technology and cryptocurrency trading.", image: BlocCryp },
        { id: 7, title: "Mobile App Development", description: "Create Android & iOS apps using Flutter and React Native.", image: MobileAppDevelopment },
        { id: 8, title: "Game Development", description: "Learn Unity and Unreal Engine to develop amazing games.", image: GameDevelopment }
      ],
      hover: null
    };
  },
  methods: {
    enroll(courseId) {
      this.$router.push({ name: 'formation', params: { courseId } });
    },
    scrollLeft() {
      const container = this.$refs.courseList;
      if (container.scrollLeft > 0) {
        container.scrollBy({ left: -400, behavior: "smooth" });
      }
    },
    scrollRight() {
      const container = this.$refs.courseList;
      if (container.scrollLeft < container.scrollWidth - container.clientWidth) {
        container.scrollBy({ left: 400, behavior: "smooth" });
      }
    }
  }
};
</script>

<style scoped>
/* Conteneur principal */
.courses-container {
  font-family: "Arial", sans-serif;
  display: flex;
  text-align: center;
  flex-direction: column;
  justify-content: space-between;
  min-height: 100vh;
  background: linear-gradient(to bottom, #ffffff, #f1f3f6);
}

/* Header */
header {
  background: #0056b3;
  color: white;
  padding: 20px 0;
}
header h1 {
  font-size: 2em;
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

/* Contenu principal */
main {
  max-width: 1000px;
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

/* Liste des cours (Affichage horizontal) */
.courses-list {
  display: flex;
  flex-wrap: nowrap;
  overflow-x: auto;
  gap: 20px;
  padding: 10px;
  scroll-behavior: smooth;
}

/* Cartes des cours */
.course-card {
  min-width: 400px;
  flex-shrink: 0;
  background: #f9f9f9;
  border: 1px solid #ddd;
  border-radius: 12px;
  padding: 25px;
  text-align: center;
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

/* Images */
.course-image {
  width: 100%;
  height: 150px;
  object-fit: cover;
  border-radius: 10px;
  margin-bottom: 15px;
}

/* Boutons de défilement */
.scroll-buttons {
  display: flex;
  justify-content: space-between;
  margin: 10px 0;
}

.scroll-buttons button {
  background: #007bff;
  color: white;
  border: none;
  padding: 10px 15px;
  border-radius: 8px;
  cursor: pointer;
  transition: background-color 0.3s ease, transform 0.2s ease;
}

.scroll-buttons button:hover {
  background: #0056b3;
  transform: scale(1.05);
}

/* Footer */
footer {
  text-align: center;
  background: #0056b3;
  color: white;
  padding: 10px 0;
  margin-top: 20px;
  font-size: 0.9em;
}
</style>
