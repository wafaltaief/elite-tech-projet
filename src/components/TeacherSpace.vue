<template>
  <div class="teacher-space">
    <div class="header">
      <h1 class="title">Teacher Space:</h1>
      <button class="logout-button" @click="logout">Logout</button>
    </div>

    <!-- Profile Section -->
    <div class="profile-section" v-if="profile">
      <h2>My Profile</h2>
      <ul class="profile-list">
        <li><strong>Name:</strong> {{ profile.username }}</li>
        <li><strong>Email:</strong> {{ profile.email }}</li>
        <li><strong>Phone:</strong> {{ profile.phone }}</li>
        <li><strong>Date of Birth:</strong> {{ profile.date_naiss }}</li>
      </ul>
    </div>
    <!-- Add Course Form -->
    <div class="add-course">
      <h2>Add a New Course</h2>
      <form @submit.prevent="addCourse">
        <div class="form-group">
          <label for="courseName">Course Name:</label>
          <input
            type="text"
            id="courseName"
            v-model="newCourse.name"
            placeholder="Enter course name"
            required
          />
        </div>

        <div class="form-group">
          <label for="courseCategory">Course Category:</label>
          <select v-model="newCourse.type" id="courseCategory" required>
            <option value="" disabled>Select course category</option>
            <option value="Mathematics">Mathematics</option>
            <option value="Science">Science</option>
            <option value="Literature">Literature</option>
            <option value="Programming">Programming</option>
          </select>
        </div>

        <div class="form-group">
          <label for="courseDescription">Course Description:</label>
          <textarea
            id="courseDescription"
            v-model="newCourse.description"
            placeholder="Enter course description"
            required
          ></textarea>
        </div>

        <div class="form-group">
          <label for="courseFormat">Course Format:</label>
          <select v-model="newCourse.format" id="courseFormat" required>
            <option value="" disabled>Select course format</option>
            <option value="Video">Video</option>
            <option value="PDF">PDF</option>
          </select>
        </div>

        <div class="form-group">
          <label>Duration:</label>
          <div class="duration-group">
            <input
              type="number"
              v-model="newCourse.durationValue"
              placeholder="Enter duration"
              required
            />
            <select v-model="newCourse.durationUnit">
              <option value="hours">Hours</option>
              <option value="weeks">Weeks</option>
            </select>
          </div>
        </div>

        <div class="form-group">
          <label for="startDate">Start Date:</label>
          <input type="date" id="startDate" v-model="newCourse.startDate" required />
        </div>

        <div class="form-group">
          <label for="endDate">End Date:</label>
          <input type="date" id="endDate" v-model="newCourse.endDate" required />
        </div>

        <button type="submit" class="add-button" :disabled="isLoading">
          {{ isLoading ? "Adding..." : "Add Course" }}
        </button>
      </form>
    </div>

    <!-- Manage Courses -->
    <div class="manage-courses" v-if="filteredCourses.length">
      <h2>My Courses</h2>
      <ul class="courses-list">
        <li v-for="course in filteredCourses" :key="course.id" class="course-item">
          <div class="course-info">
            <strong>{{ course.name }}</strong> ({{ course.type }}) - {{ course.format }} 
            ({{ course.startDate }} to {{ course.endDate }})
          </div>
          <div class="actions">
            <button @click="deleteCourse(course.id)" class="delete-button">Delete</button>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import { getAuth, signOut } from "firebase/auth";
import { collection, deleteDoc, getDoc, getDocs, doc } from "firebase/firestore";
import { db} from "../firebase"; 

export default {
  name: "TeacherSpace",
  data() {
    return {
      profile: { username: "", email: "", phone: "", date_naiss: "" },
      newCourse: { 
        name: "", 
        type: "", 
        format: "", 
        startDate: "", 
        endDate: "", 
        teacherId: "", 
        description: "",
        durationValue: "", 
        durationUnit: "hours", 
      },
      newLesson: { 
        title: "", 
        description: "", 
        instructor: "", 
        duration: "" 
      },
      courses: [],
      // lesson:[],
      isLoading: false,
    //   messages: [],
    //   newMessage: "",
    };
    
  },
  computed: {
    filteredCourses() {
      if (!this.profile) return [];
      return this.courses.filter((course) => course.teacherId === this.profile.id);
    },
  },
  async created() {
    await this.fetchProfile();
    await this.fetchCourses();
    // this.fetchMessages();
  },
  methods: {
    async fetchProfile() {
      try {
        const auth = getAuth();
        const user = auth.currentUser;
        if (user) {
          const docRef = doc(db, "users", user.uid);
          const docSnap = await getDoc(docRef);

          if (docSnap.exists()) {
            this.profile = docSnap.data();
            this.profile.id = user.uid; 
          } else {
            console.error("No such document!");
          }
        } else {
          this.$router.push("/login");
        }
      } catch (error) {
        console.error("Error fetching profile: ", error);
      }
    },
    async fetchCourses() {
      try {
        const coursesCollection = collection(db, "courses");
        const coursesSnapshot = await getDocs(coursesCollection);
        this.courses = coursesSnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
      } catch (error) {
        console.error("Error fetching courses: ", error);
      }
    },
    async addCourse() {
      try {
        this.isLoading = true;

        if (!this.newCourse.name || !this.newCourse.type || !this.newCourse.format || !this.newCourse.startDate || !this.newCourse.endDate || !this.newCourse.durationValue || !this.newCourse.description) {
          alert("Please fill in all fields.");
          this.isLoading = false;
          return;
        }

        alert("Course added successfully!");
        this.newCourse = { name: "", type: "", format: "", startDate: "", endDate: "", teacherId: "", description: "", durationValue: "", durationUnit: "hours" };
        await this.fetchCourses();
      } catch (error) {
        console.error("Error adding course:", error);
      } finally {
        this.isLoading = false;
      }
    },
    async deleteCourse(courseId) {
      try {
        await deleteDoc(doc(db, "courses", courseId));
        alert("Course deleted successfully!");
        this.courses = this.courses.filter((course) => course.id !== courseId);
      } catch (error) {
        console.error("Error deleting course: ", error);
      }
    },
    async logout() {
      try {
        const auth = getAuth();
        await signOut(auth);
        this.$router.push("/login");
      } catch (error) {
        console.error("Error during logout: ", error);
      }
    },
  },
};
</script>
<style scoped>
.teacher-space {
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  max-width: 900px;
  margin: 30px auto;
  padding: 25px;
  background: #f9f9f9;
  border-radius: 15px;
  box-shadow: 0 6px 12px rgba(0, 0, 0, 0.1);
}

.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
}

.title {
  font-size: 2.2rem;
  font-weight: bold;
  color: #2c3e50;
}

.logout-button {
  background-color: #e74c3c;
  color: white;
  border: none;
  padding: 10px 15px;
  border-radius: 8px;
  cursor: pointer;
  font-size: 1rem;
  transition: background-color 0.3s;
}

.logout-button:hover {
  background-color: #c0392b;
}

.profile-section {
  background-color: #ffffff;
  border-radius: 10px;
  padding: 15px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
  margin-bottom: 30px;
}

.profile-list {
  list-style: none;
  padding: 0;
}

.profile-list li {
  font-size: 1rem;
  margin-bottom: 10px;
  color: #34495e;
}

.add-course {
  margin-top: 20px;
  background-color: #ffffff;
  border-radius: 10px;
  padding: 20px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
}

.add-course h2 {
  margin-bottom: 20px;
  font-size: 1.5rem;
  color: #2c3e50;
}

.add-course form {
  display: flex;
  flex-direction: column;
}

.form-group {
  margin-bottom: 20px;
}

label {
  font-weight: 600;
  font-size: 1rem;
  margin-bottom: 8px;
  display: block;
  color: #2c3e50;
}

input, select, textarea {
  width: 100%;
  padding: 12px;
  font-size: 1rem;
  border: 1px solid #dcdfe6;
  border-radius: 8px;
  transition: border-color 0.3s;
}

input:focus, select:focus, textarea:focus {
  border-color: #3498db;
  outline: none;
  box-shadow: 0 0 5px rgba(52, 152, 219, 0.4);
}

textarea {
  resize: vertical;
  min-height: 100px;
}

button.add-button {
  background-color: #3498db;
  color: white;
  border: none;
  padding: 12px 20px;
  border-radius: 8px;
  cursor: pointer;
  font-size: 1rem;
  font-weight: bold;
  transition: background-color 0.3s;
}

button.add-button:hover {
  background-color: #2980b9;
}

button.add-button:disabled {
  background-color: #bdc3c7;
  cursor: not-allowed;
}

.courses-list {
  list-style: none;
  padding: 0;
  margin-top: 20px;
}

.course-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 15px;
  margin-bottom: 15px;
  background-color: #ffffff;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
}

.course-info {
  font-size: 1rem;
  color: #34495e;
}

.delete-button {
  background-color: #e74c3c;
  color: white;
  border: none;
  padding: 8px 12px;
  border-radius: 8px;
  cursor: pointer;
  font-size: 0.9rem;
  font-weight: bold;
  transition: background-color 0.3s;
}

.delete-button:hover {
  background-color: #c0392b;
}

.messages-section {
  margin-top: 30px;
  background-color: #ffffff;
  border-radius: 10px;
  padding: 20px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
}

.messages-section h2 {
  margin-bottom: 15px;
  font-size: 1.5rem;
  color: #2c3e50;
}

.messages-list {
  max-height: 250px;
  overflow-y: auto;
  margin-bottom: 15px;
  padding: 10px;
  background-color: #f7f7f7;
  border-radius: 8px;
  box-shadow: inset 0 2px 4px rgba(0, 0, 0, 0.05);
}

.messages-list ul {
  list-style: none;
  padding: 0;
}

.messages-list li {
  font-size: 0.95rem;
  margin-bottom: 10px;
  color: #34495e;
}

.send-message {
  display: flex;
  gap: 10px;
}

.send-message input {
  flex: 1;
  padding: 12px;
}

.send-message button {
  background-color: #3498db;
  color: white;
  border: none;
  padding: 10px 15px;
  border-radius: 8px;
  cursor: pointer;
  font-size: 1rem;
  transition: background-color 0.3s;
}

.send-message button:hover {
  background-color: #2980b9;
}
</style>