import { createRouter, createWebHistory } from 'vue-router';
import { getAuth, onAuthStateChanged } from 'firebase/auth'
import HomePage from '../components/HomePage.vue';
import LoginPage from '../components/LoginPage.vue';
import SignupPage from '../components/SignupPage.vue';
import TeacherSpace from '../components/TeacherSpace.vue';
import StudentSpace from '../components/StudentSpace.vue';
import FormationPage from '@/components/FormationPage.vue';
import CourseDetails from "@/components/CourseDetails.vue";
import AdminDashboard from "../components/admin/AdminDashboard.vue";
import ManageLessons from "../components/admin/ManageLessons.vue";
import ManageUsers from "../components/admin/ManageUsers.vue";
import { requireAuth } from "./authGuard";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../firebase";
// Role-based authorization guard
const requireRole = (requiredRoles) => {
  return (to, from, next) => {
    const auth = getAuth()
    
    const waitForAuth = () => {
      return new Promise((resolve, reject) => {
        const unsubscribe = onAuthStateChanged(auth, async (user) => {
          unsubscribe()
          
          if (!user) {
            reject(new Error('Not authenticated'))
            return
          }
          
          try {
            // Fetch user role from Firestore or custom claims
            
              const userRef = doc(db, "users", user.uid);
              const userSnap = await getDoc(userRef);
              
              const userRole= userSnap.data().role;
              console.log('User role:', userRole);
            console.log('Required roles:', requiredRoles);

            if (requiredRoles.includes(userRole)) {
              resolve(true)
            } else {
              reject(new Error('Insufficient permissions'))
            }
          } catch (error) {
            reject(error)
          }
        })
      })
    }
    waitForAuth()
      .then(() => next())
      .catch((error) => {
        console.error('Role authorization failed:', error)
        next('/login')
      })
  }
}
const routes = [
  // General Routes
  { path: '/', redirect: '/home' },
  { path: '/login', name: 'Login', component: LoginPage },
  { path: '/signup', name: 'SignUp', component: SignupPage },
  { path: '/home', name: 'HomePage', component: HomePage },
  { path: '/formation/:courseId',
    name: 'formation',
    component: FormationPage,
    props: true,},
  {
  path: '/course/:courseId',  // Dynamic path with courseId parameter
  name: 'courseDetails',      // Name of the route
  component: CourseDetails, // Component to render
  props: true,  // Pass the route parameter as a prop
},
  {
    path: '/teacher-space',
    name: 'TeacherSpace',
    component: TeacherSpace,
    beforeEnter:[requireAuth,requireRole(['teacher'])] 
  },
  {
    path: '/student-space',
    name: 'StudentSpace',
    component: StudentSpace,
    beforeEnter: [requireAuth,requireRole(['student'])]
  },
  { path: "/admin", component: AdminDashboard ,beforeEnter: requireAuth},
  { path: "/admin/users", component: ManageLessons ,beforeEnter: requireAuth},
  { path: "/admin/users", component: ManageUsers ,beforeEnter:requireAuth},
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
