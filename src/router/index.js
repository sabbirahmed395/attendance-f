import { createRouter, createWebHistory } from "vue-router";
import SideMenu from "../layouts/side-menu/Main.vue";
import DashboardOverview1 from "../views/dashboard-overview-1/Main.vue";

// Application Views
import Login from "../views/app/login/Main.vue";

import Dashboard from "../views/app/Dashboard/Main.vue";

import Programs from "../views/app/programs/Main.vue";
import ProgramForm from "../views/app/programs/Form.vue";

import Courses from "../views/app/courses/Main.vue";
import CourseForm from "../views/app/courses/Form.vue";
import CourseDetails from "../views/app/courses/CourseDetails.vue";

import Teachers from "../views/app/teachers/Main.vue";
import TeacherForm from "../views/app/teachers/Form.vue";
import TeacherDetails from "../views/app/teachers/TeacherDetails.vue";

import Students from "../views/app/students/Main.vue";
import StudentForm from "../views/app/students/Form.vue";
import StudentDetails from "../views/app/students/StudentDetails.vue";

import Batches from "../views/app/batches/Main.vue";
import BatchForm from "../views/app/batches/Form.vue";
import BatchDetails from "../views/app/batches/Details.vue";

import Classrooms from "../views/app/classrooms/Main.vue";
import ClassroomForm from "../views/app/classrooms/Form.vue";
import ClassroomDetails from "../views/app/classrooms/Details.vue";

import Users from "../views/app/users/Main.vue";
import UserForm from "../views/app/users/Form.vue";

import AttendanceRecords from "../views/app/records/AttendanceRecords.vue";
import Marks from "../views/app/records/Marks.vue";

const routes = [
  	{
		path: "/",
		component: SideMenu,
		children: [
			// programs
			{
				path: "/programs",
				name: "programs",
				component: Programs,
			},
			{
				path: '/programs/:id/edit',
				name: "edit-program",
				component: ProgramForm
			},
			{
				path: '/programs/create',
				name: "create-new-program",
				component: ProgramForm
			},
			// courses
			{
				path: "/courses",
				name: "courses",
				component: Courses,
			},
			{
				path: '/courses/:id/details',
				name: "details-course",
				component: CourseDetails
			},
			{
				path: '/courses/:id/edit',
				name: "edit-course",
				component: CourseForm
			},
			{
				path: '/courses/create',
				name: "create-new-course",
				component: CourseForm
			},
			// teachers
			{
				path: "/teachers",
				name: "teachers",
				component: Teachers,
			},
			{
				path: '/teachers/:id/details',
				name: "details-teacher",
				component: TeacherDetails
			},
			{
				path: '/teachers/:id/edit',
				name: "edit-teacher",
				component: TeacherForm
			},
			{
				path: '/teachers/create',
				name: "create-new-teacher",
				component: TeacherForm
			},
			// students
			{
				path: "/students",
				name: "students",
				component: Students,
			},
			{
				path: '/students/:id/details',
				name: "details-student",
				component: StudentDetails
			},
			{
				path: '/students/:id/edit',
				name: "edit-student",
				component: StudentForm
			},
			{
				path: '/students/create',
				name: "create-new-student",
				component: StudentForm
			},
      // batches
			{
				path: "/batches",
				name: "batches",
				component: Batches,
			},
			{
				path: '/batches/:id/details',
				name: "details-batch",
				component: BatchDetails
			},
			{
				path: '/batches/:id/edit',
				name: "edit-batch",
				component: BatchForm
			},
			{
				path: '/batches/create',
				name: "create-new-batch",
				component: BatchForm
			},
      // classroom
			{
				path: "/classrooms",
				name: "classrooms",
				component: Classrooms,
			},
			{
				path: '/classrooms/:id/details',
				name: "details-classroom",
				component: ClassroomDetails
			},
			{
				path: '/classrooms/:id/edit',
				name: "edit-classroom",
				component: ClassroomForm
			},
			{
				path: '/classrooms/create',
				name: "create-new-classroom",
				component: ClassroomForm
			},
			// users
			{
				path: "/users",
				name: "users",
				component: Users,
			},
			{
				path: '/users/:id/edit',
				name: "edit-user",
				component: UserForm
			},
			{
				path: '/users/create',
				name: "create-new-user",
				component: UserForm
			},
      {
        path: 'records/attendances',
        name: "attendance-records",
        component: AttendanceRecords
      },
      {
        path: "dashboard-overview-1",
        name: "side-menu-dashboard-overview-1",
        component: DashboardOverview1,
      },
      {
        path: "/",
        name: "dashboard",
        component: Dashboard,
      },
    ],
  },
  {
    path: "/login",
    name: "login",
    component: Login,
  },
 
];

const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior(to, from, savedPosition) {
    return savedPosition || { left: 0, top: 0 };
  },
});

export default router;
