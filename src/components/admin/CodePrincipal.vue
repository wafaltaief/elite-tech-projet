<template>
    <div class="admin-space">
      <div class="header">
        <h1 class="title">Admin Dashboard</h1>
        <button class="logout-button" @click="logout">Logout</button>
      </div>
  
      <!-- <h2 class="subtitle">Add New Lesson</h2>
      <form @submit.prevent="addLesson" class="add-lesson-form">
        <input type="text" v-model="newLesson.title" placeholder="Lesson Title" required />
        <textarea v-model="newLesson.description" placeholder="Lesson Description" required></textarea>
        <input type="text" v-model="newLesson.instructor" placeholder="Instructor Name" required />
        <input type="text" v-model="newLesson.duration" placeholder="Duration (e.g., 4 weeks)" required />
        <button type="submit" class="add-button">Add Lesson</button>
      </form> -->
  
      <h2 class="subtitle">Manage Lessons</h2>
      <table class="lesson-table">
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
  
      <!-- User Management -->
      <h2 class="subtitle">List of Users</h2>
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
            <td>
              <label v-if="user.role === 'teacher'">{{ user.specialty }}</label>
              <label v-if="user.role === 'student'">Student</label>
              <label v-if="user.role === 'admin'">Admin</label>
            </td>
            <td>
              <button class="delete-button" @click="deleteUser(user.id)">Delete</button>
            </td>
          </tr>
        </tbody>
      </table>
  
      <!-- Course Management -->
      <h2 class="subtitle">Manage Courses</h2>
      <table class="course-table">
        <thead>
          <tr>
            <th>Course Name</th>
            <th>Teacher</th>
            <th>Duration</th>
            <th>Start Date</th>
            <th>End Date</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="course in courses" :key="course.id">
            <td>{{ course.name }}</td>
            <td>{{ course.teacherName }}</td>
            <td>{{ course.duration }} hours</td>
            <td>{{ course.start_date }}</td>
            <td>{{ course.end_date }}</td>
            <td>
              <button class="delete-button" @click="deleteCourse(course.id)">Delete</button>
            </td>
          </tr>
        </tbody>
      </table>
  </template>
  
  <script>
  import { db } from "../firebase";
  import { collection, getDocs, deleteDoc, doc,addDoc } from "firebase/firestore";
  import { getAuth, signOut } from "firebase/auth";
  
  export default {
    data() {
      return {
        users: [],
        courses: [],
        teachers: [],
        lessons: [],
        hasTeachers: false,
        newLesson: {
          title: "",
          description: "",
          instructor: "",
          duration: "",
        },
      };
    },
    async created() {
      await this.fetchUsers();
      await this.fetchCourses();
      await this.fetchLessons();
    },
    methods: {
  
      viewCourseDetails(lessonId) {
      // Navigate to the course details page with the lesson ID
      this.$router.push({ name: "CourseDetails", params: { lessonId } });
    },
  
      async fetchLessons() {
        try {
          const lessonsCollection = collection(db, "lessons");
          const lessonsSnapshot = await getDocs(lessonsCollection);
  
          // Map Firestore documents to lessons array
          this.lessons = lessonsSnapshot.docs.map(doc => ({
            id: doc.id, // Include Firestore document ID
            ...doc.data(),
          }));
        } catch (error) {
          console.error("Error fetching lessons: ", error);
          alert("Failed to load lessons. Please try again.");
        }
      },
  
  
      async fetchUsers() {
        try {
          const usersCollection = collection(db, "users");
          const usersSnapshot = await getDocs(usersCollection);
          const usersList = usersSnapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
          }));
          this.users = usersList;
          this.teachers = this.users.filter((user) => user.role === "teacher");
          this.hasTeachers = this.teachers.length > 0;
        } catch (error) {
          console.error("Error fetching users: ", error);
          alert("Failed to load users. Please try again.");
        }
      },
      async fetchCourses() {
        try {
          const coursesCollection = collection(db, "courses");
          const coursesSnapshot = await getDocs(coursesCollection);
  
          // Fetch all users to resolve teacher names
          const usersCollection = collection(db, "users");
          const usersSnapshot = await getDocs(usersCollection);
          const usersMap = new Map(
            usersSnapshot.docs.map((doc) => [doc.id, doc.data()])
          );
  
          const coursesList = coursesSnapshot.docs.map((doc) => {
            const courseData = doc.data();
            return {
              id: doc.id,
              ...courseData,
              teacherName: usersMap.get(courseData.teacherId)?.username || "Unknown", // Resolve teacher name
            };
          });
          this.courses = coursesList;
        } catch (error) {
          console.error("Error fetching courses: ", error);
          alert("Failed to load courses. Please try again.");
        }
      },
  
      async deleteCourse(courseId) {
        if (confirm("Are you sure you want to delete this course?")) {
          try {
            await deleteDoc(doc(db, "courses", courseId));
            this.courses = this.courses.filter((course) => course.id !== courseId);
            alert("Course deleted successfully!");
          } catch (error) {
            console.error("Error deleting course: ", error);
            alert("Failed to delete course. Please try again.");
          }
        }
      },
  //     async addLesson(lesson) {
  //   try {
  //     const lessonsCollection = collection(db, "lessons");
  //     const docRef = await addDoc(lessonsCollection, this.newLesson);
  //     await addDoc(lessonsCollection, lesson);
  //     this.lessons.push(lesson); 
  //     this.lessons.push({ id: docRef.id, ...this.newLesson });
  //     alert("Lesson added successfully!");
  //     this.newLesson = { title: "", description: "", instructor: "", duration: "" };
  //   } catch (error) {
  //     console.error("Error adding lesson: ", error);
  //     alert("Failed to add lesson. Please try again.");
  //   }
  // },
  
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
      async deleteUser(userId) {
        if (confirm("Are you sure you want to delete this user?")) {
          try {
            await deleteDoc(doc(db, "users", userId));
            this.users = this.users.filter((user) => user.id !== userId); // Remove the deleted user from the users array
            alert("User deleted successfully!");
          } 
          catch (error) {
            console.error("Error deleting user: ", error);
            alert("Failed to delete user. Please try again.");
          }
        }
      },
  
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
  