import { createRouter, createWebHistory } from 'vue-router';
import HomePage from '../components/HomePage.vue';
import LoginPage from '../components/LoginPage.vue';
import SignupPage from '../components/SignupPage.vue';
// import AdminSpace from '../components/AdminSpace.vue';
import TeacherSpace from '../components/TeacherSpace.vue';
import StudentSpace from '../components/StudentSpace.vue';
import Formation from '@/components/Formation.vue';
import CourseDetails from "@/components/CourseDetails.vue";
import AdminDashboard from "../components/admin/AdminDashboard.vue";
import ManageLessons from "../components/admin/ManageLessons.vue";
import ManageUsers from "../components/admin/ManageUsers.vue";
import { requireAuth } from "./authGuard";

const routes = [
  // General Routes
  { path: '/', redirect: '/home' },
  { path: '/login', name: 'Login', component: LoginPage },
  { path: '/signup', name: 'SignUp', component: SignupPage },
  { path: '/home', name: 'HomePage', component: HomePage },
  {path: '/formation', name:'Formation',component:Formation},
  {
    path: "/course-details/:lessonId",
    name: "CourseDetails",
    component: CourseDetails,
    props: true, // Pass route params as props
  },

  // Role-based Routes
  //{
  //   path: '/admin-space',
  //   name: 'AdminSpace',
  //   component: AdminSpace,
  // },
  {
    path: '/teacher-space',
    name: 'TeacherSpace',
    component: TeacherSpace,
    beforeEnter: requireAuth
  },
  {
    path: '/student-space',
    name: 'StudentSpace',
    component: StudentSpace,
    beforeEnter: requireAuth
  },
  { path: "/admin", component: AdminDashboard ,beforeEnter: requireAuth},
  { path: "/admin/lessons", component: ManageLessons ,beforeEnter: requireAuth},
  { path: "/admin/users", component: ManageUsers ,beforeEnter: requireAuth},
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
