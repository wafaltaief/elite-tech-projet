<template>
    <div class="course-details">
      <h1>Course Details</h1>
      <p><strong>Title:</strong> {{ lesson.title }}</p>
      <p><strong>Description:</strong> {{ lesson.description }}</p>
      <p><strong>Instructor:</strong> {{ lesson.instructor }}</p>
      <p><strong>Duration:</strong> {{ lesson.duration }}</p>
      <button class="logout-button" @click="$router.go(-1)">Back</button>
    </div>
  </template>
  
  <script>
  import { doc, getDoc } from "firebase/firestore";
  import { db } from "../firebase";
  
  export default {
    props: ["lessonId"],
    data() {
      return {
        lesson: {},
      };
    },
    async created() {
      await this.fetchLessonDetails();
    },
    methods: {
      async fetchLessonDetails() {
        try {
          const lessonRef = doc(db, "lessons", this.lessonId);
          const lessonSnap = await getDoc(lessonRef);
          if (lessonSnap.exists()) {
            this.lesson = lessonSnap.data();
          } else {
            alert("Lesson not found!");
            this.$router.push("/");
          }
        } catch (error) {
          console.error("Error fetching lesson details: ", error);
          alert("Failed to load lesson details. Please try again.");
        }
      },
    },
  };
  </script>
  
  <style scoped>
  .course-details {
    font-family: 'Roboto', sans-serif;
    padding: 20px;
    max-width: 600px;
    margin: 0 auto;
    background-color: #f4f7fa;
    border-radius: 10px;
    box-shadow: 0 8px 16px rgba(0, 0, 0, 0.1);
  }
  
  h1 {
    color: #34495e;
  }
  
  p {
    font-size: 1rem;
    margin: 10px 0;
  }
  
  button {
    background-color: #3498db;
    color: white;
    padding: 10px 20px;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    transition: background-color 0.3s;
  }
  
  button:hover {
    background-color: #2980b9;
  }
  </style>
  