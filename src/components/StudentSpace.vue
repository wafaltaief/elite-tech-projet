<template>
  <div class="student-space">
    <div class="header">
      <h1 class="title">Student Space :</h1>
      <button class="logout-button" @click="logout">Logout</button>
    </div>

    <!-- Profile Section -->
    <div class="profile-section" v-if="profile">
      <h2>My Profile</h2>
      <ul>
        <li><strong>Name:</strong> {{ profile.username }}</li>
        <li><strong>Email:</strong> {{ profile.email }}</li>
        <li><strong>Phone:</strong> {{ profile.phone }}</li>
        <li><strong>Date of Birth:</strong> {{ profile.date_naiss }}</li>
      </ul>
    </div>

    <!-- Courses Section -->
    <div class="courses-section" v-if="courses.length">
      <h2>My Courses</h2>
      <ul>
        <li v-for="(course, index) in courses" :key="index">
          {{ course }}
        </li>
      </ul>
    </div>

    <div class="messages-section">
      <h2>Messages</h2>
      <div class="messages-list">
        <ul>
          <li v-for="message in messages" :key="message.id">
            <strong>{{ message.senderName }}:</strong> {{ message.text }}
          </li>
        </ul>
      </div>
      <div class="send-message">
        <input 
          type="text" 
          v-model="newMessage" 
          placeholder="Type your message..." 
        />
        <button @click="sendMessage">Send</button>
      </div>
    </div>
  </div>
</template>

<!-- <script>
import { getAuth, signOut } from "firebase/auth";
import { collection, addDoc, onSnapshot, query, orderBy, doc, getDocs, getDoc } from "firebase/firestore";
import { db } from "../firebase"; // Import Firestore

export default {
  name: "StudentSpace",
  data() {
    return {
      profile: null, // Holds student profile data
      courses: [], // Holds student courses
      messages: [],
      newMessage: "",
    };
  },
  async created() {
    await this.fetchProfile();
    await this.fetchCourses();
    this.fetchMessages();
  },
  methods: {

    fetchMessages() {
      const messagesRef = query(
        collection(db, "messages"),
        orderBy("timestamp", "asc")
      );
      onSnapshot(messagesRef, (snapshot) => {
        this.messages = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
      });
    },
    async sendMessage() {
      if (!this.newMessage.trim()) return;

      const auth = getAuth();
      const user = auth.currentUser;

      if (user) {
        await addDoc(collection(db, "messages"), {
          text: this.newMessage,
          senderId: user.uid,
          senderName: this.profile.username,
          timestamp: Date.now(),
        });
        this.newMessage = "";
      }
    },
  },

    async fetchProfile() {
      try {
        const auth = getAuth();
        const user = auth.currentUser;

        if (user) {
          const docRef = doc(db, "users", user.uid); // Fetch user data by UID
          const docSnap = await getDoc(docRef);

          if (docSnap.exists()) {
            this.profile = docSnap.data();
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
        this.courses = coursesSnapshot.docs.map((doc) => doc.data().name); // Assuming each course document has a 'name' field
      } catch (error) {
        console.error("Error fetching courses: ", error);
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
        });
    },
};
</script> -->
<script>
import { getAuth, signOut } from "firebase/auth";
import { collection, addDoc, onSnapshot, query, orderBy, doc, getDocs, getDoc } from "firebase/firestore"; 
import { db } from "../firebase"; // Import Firestore

export default {
  name: "StudentSpace",
  data() {
    return {
      profile: null,
      courses: [],
      messages: [],
      newMessage: "",
    };
  },
  async created() {
    try {
      await this.fetchProfile(); // تأكد من جلب البيانات بشكل متسلسل
      await this.fetchCourses();
      this.fetchMessages();
    } catch (error) {
      console.error("Error during initialization:", error);
    }
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
        this.courses = coursesSnapshot.docs.map((doc) => doc.data().name);
      } catch (error) {
        console.error("Error fetching courses: ", error);
      }
    },

    fetchMessages() {
      const messagesRef = query(
        collection(db, "messages"),
        orderBy("timestamp", "asc")
      );
      onSnapshot(messagesRef, (snapshot) => {
        this.messages = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
      });
    },

    async sendMessage() {
      if (!this.newMessage.trim()) return;

      const auth = getAuth();
      const user = auth.currentUser;

      if (user) {
        await addDoc(collection(db, "messages"), {
          text: this.newMessage,
          senderId: user.uid,
          senderName: this.profile.username,
          timestamp: Date.now(),
        });
        this.newMessage = "";
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
        });
    },
  },
};
</script>

<style scoped>
.messages-section {
  margin-top: 20px;
}
.messages-list {
  max-height: 200px;
  overflow-y: auto;
  margin-bottom: 10px;
}
.send-message {
  display: flex;
  gap: 10px;
}
.student-space {
  font-family: 'Arial', sans-serif;
  max-width: 800px;
  margin: 20px auto;
  padding: 20px;
  background: #f9fafb;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
}

.title {
  font-size: 2rem;
  color: #333;
}

.logout-button {
  background-color: #e74c3c;
  color: white;
  border: none;
  padding: 10px 15px;
  border-radius: 5px;
  cursor: pointer;
}

.logout-button:hover {
  background-color: #c0392b;
}

.profile-section,
.courses-section {
  margin-bottom: 20px;
}

h2 {
  font-size: 1.5rem;
  color: #555;
  margin-bottom: 10px;
}

ul {
  list-style: none;
  padding: 0;
}

li {
  padding: 8px 0;
  border-bottom: 1px solid #ddd;
}

li:last-child {
  border-bottom: none;
}

strong {
  color: #333;
}
</style>
