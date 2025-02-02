<!-- <template>
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
   -->
   <template>
    <div class="courses-container">
  
      <main>
        <h1>Courses:</h1>
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
            <button @click="enroll(course.id)" aria-label="Enroll in course">detail</button>
          </div>
        </div>
      </main>
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
            image: Cybersecurity
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
            image: MobileAppDevelopment
          },
          {
            id: 8,
            title: "Game Development",
            description: "Learn Unity and Unreal Engine to develop amazing games.",
            image: GameDevelopment
          }
        ],
        hover: null
      };
    },
    methods: {
      enroll(courseId) {
        this.$router.push({ name: "courseDetails", params: { courseId: courseId } });
      }
    }
  };
  </script>
<style scoped>
.courses-container {
  font-family: 'Arial', sans-serif;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  min-height: 100vh;
  background: #f9f9f9;
}

/* Header Styling */
header {
  background-color: #0056b3;
  color: white;
  padding: 30px;
  text-align: center;
}

header h1 {
  font-size: 2.5rem;
  margin: 0;
}

/* Main content styling */
main {
  max-width: 1200px;
  margin: 40px auto;
  padding: 20px;
  background-color: white;
  border-radius: 12px;
  box-shadow: 0 6px 10px rgba(0, 0, 0, 0.1);
}

main h1 {
  font-size: 2rem;
  color: #333;
  margin-bottom: 30px;
}

/* Courses List Styling */
.courses-list {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 20px;
  padding: 20px;
}

/* Individual Course Card Styling */
.course-card {
  background-color: #f2f2f2;
  border: 1px solid #ddd;
  border-radius: 8px;
  overflow: hidden;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  text-align: center;
}

.course-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 8px 15px rgba(0, 0, 0, 0.2);
}

.course-image {
  width: 100%;
  height: 180px;
  object-fit: cover;
  border-bottom: 1px solid #ddd;
}

.course-card h3 {
  color: #333;
  font-size: 1.4rem;
  margin: 15px 0;
}

.course-card p {
  color: #6c757d;
  font-size: 1rem;
  margin-bottom: 15px;
}

.course-card button {
  background-color: #007bff;
  color: white;
  font-weight: bold;
  padding: 12px 20px;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  transition: background-color 0.3s ease, transform 0.2s ease;
}

.course-card button:hover {
  background-color: #0056b3;
  transform: scale(1.05);
}

/* Footer Styling */
footer {
  text-align: center;
  background-color: #0056b3;
  color: white;
  padding: 20px 0;
  font-size: 0.9rem;
  margin-top: 40px;
}

footer p {
  margin: 0;
}

/* Responsive Design for Mobile */
@media (max-width: 768px) {
  header h1 {
    font-size: 2rem;
  }

  main h1 {
    font-size: 1.5rem;
  }

  .courses-list {
    grid-template-columns: 1fr 1fr;
  }

  .course-card {
    margin: 0 auto;
  }
}

@media (max-width: 480px) {
  header h1 {
    font-size: 1.6rem;
  }

  main h1 {
    font-size: 1.3rem;
  }

  .courses-list {
    grid-template-columns: 1fr;
  }
}
</style>

  