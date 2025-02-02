<template>
    <div>
      <!-- <div class="sidebar"><AdminPanel></AdminPanel></div> -->
    <div class="content">
      <div class="header-container">
        <!-- <button class="logout-button" @click="$router.go(-1)">Back</button> -->
        <h2 class="subtitle">Manage Lessons</h2>
      </div>
      <button class="logout-button" @click="$router.go(-1)">Back</button>

      <table class="lesson-table">
        <button class="logout-button" @click="$router.go(-1)">Back</button>
        <thead>
          <tr>
            <th>Title</th>
            <th>Instructor</th>
            <th>Duration</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="lesson in lessons" :key="lesson.id">
            <td>{{ lesson.title }}</td>
            <td>{{ lesson.instructor }}</td>
            <td>{{ lesson.duration }}</td>
            <td>
              <button class="detail-button" @click="viewCourseDetails(lesson.id)">Detail</button>
              <button class="delete-button" @click="deleteLesson(lesson.id)">Delete</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    </div>
  </template>
  
  <script>
  import { db } from "../../firebase";
  import { collection, getDocs, deleteDoc, doc } from "firebase/firestore";
// import AdminPanel from "./AdminPanel.vue";
  
  export default {
  //   components: {
  //   AdminPanel
  // },
    data() {
      return {
        lessons: [],
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
      async deleteLesson(lessonId) {
        if (confirm("Are you sure you want to delete this lesson?")) {
          try {
            await deleteDoc(doc(db, "lessons", lessonId));
            this.lessons = this.lessons.filter((lesson) => lesson.id !== lessonId);
            alert("Lesson deleted successfully!");
          } catch (error) {
            console.error("Error deleting lesson: ", error);
          }
        }
      },
      viewCourseDetails(lessonId) {
        this.$router.push({ name: "CourseDetails", params: { lessonId } });
      },
    },
  };
  </script>
  <style scoped>


/* .header-container {
  width: 40%;
	height: 100%;
	float: left;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
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
    color: #2c3e50;
    border-bottom: 2px solid #3498db;
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
  } */
/* Layout Container */

/* Container principal */
.container {
  display: flex;
  height: 100vh;
}

/* Sidebar */
.sidebar {
  width: 250px;
  background-color: #2c3e50;
  padding: 20px;
  color: white;
  min-height: 100vh;
  position: fixed;
  left: 0;
  top: 0;
  bottom: 0;
}

/* Contenu principal */
.content {
  margin-left: 200px; /* Pour éviter que le contenu ne passe sous la sidebar */
  flex-grow: 1;
  padding: 20px;
  background-color: #f8f9fa;
  width: calc(100% - 250px);
}

/* En-tête */
.header-container {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 100px;
}

.back-button {
  background-color: #e74c3c;
  color: white;
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

.back-button:hover {
  background-color: #c0392b;
}

/* Table */
table {
  margin-left: 70px;
  width: 90%;
  border-collapse: collapse;
  background-color: white;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

th, td {
  padding: 15px;
  text-align: left;
  border-bottom: 1px solid #ddd;
}

th {
  background-color: #2c3e50;
  color: white;
}

.detail-button {
  background-color: #3498db;
  color: white;
}

.delete-button {
  background-color: #e74c3c;
  color: white;
}

.detail-button:hover {
  background-color: #2980b9;
}

.delete-button:hover {
  background-color: #c0392b;
}
</style>
