import { defineStore } from "pinia";

export const useSideMenuStore = defineStore("sideMenu", {
  state: () => ({
    menu: [
      {
        icon: "BuildingIcon",
        pageName: "programs",
        title: "Programs",
        scopes: ["admin", "teacher"],
        subMenu: [
          {
            icon: "BuildingIcon",
            pageName: "programs",
            title: "Programs",
            scopes: ["admin", "teacher"],
          },
        //   {
        //     icon: "PlusIcon",
        //     pageName: "create-new-program",
        //     title: "Create New Program",
        //     scopes: ["admin"],
        //   },
        ],
      },
      {
        icon: "BookIcon",
        pageName: "courses",
        title: "Courses",
        scopes: ["admin", "teacher"],
        subMenu: [
          {
            icon: "BookIcon",
            pageName: "courses",
            title: "Courses",
            scopes: ["admin", "teacher"],
          },
        //   {
        //     icon: "PlusIcon",
        //     pageName: "create-new-course",
        //     title: "Create New Course",
        //     scopes: ["admin"],
        //   },
        ],
      },
      {
        icon: "SquareIcon",
        pageName: "batches",
        title: "Batches",
        scopes: ["admin", "teacher"],
        subMenu: [
          {
            icon: "SquareIcon",
            pageName: "batches",
            title: "Batches",
            scopes: ["admin", "teacher"],
          },
        //   {
        //     icon: "PlusIcon",
        //     pageName: "create-new-batch",
        //     title: "Create New Batch",
        //     scopes: ["admin"],
        //   },
        ],
      },
      {
        icon: "BoxIcon",
        pageName: "classrooms",
        title: "Classrooms",
        scopes: ["admin", "teacher"],
        subMenu: [
          {
            icon: "BoxIcon",
            pageName: "classrooms",
            title: "Classrooms",
            scopes: ["admin", "teacher"],
          },
        //   {
        //     icon: "PlusIcon",
        //     pageName: "create-new-classroom",
        //     title: "Create New Classroom",
        //     scopes: ["admin"],
        //   },
        ],
      },
      {
        icon: "UserCheckIcon",
        pageName: "teachers",
        title: "Teachers",
        scopes: ["admin", "teacher"],
        subMenu: [
          {
            icon: "UserCheckIcon",
            pageName: "teachers",
            title: "Teachers",
            scopes: ["admin", "teacher"],
          },
        //   {
        //     icon: "PlusIcon",
        //     pageName: "create-new-teacher",
        //     title: "Create New Teacher",
        //     scopes: ["admin"],
        //   },
        ],
      },
      {
        icon: "UsersIcon",
        pageName: "students",
        title: "Students",
        scopes: ["admin", "teacher"],
        subMenu: [
          {
            icon: "UsersIcon",
            pageName: "students",
            title: "Students",
            scopes: ["admin", "teacher"],
          },
        //   {
        //     icon: "PlusIcon",
        //     pageName: "create-new-student",
        //     title: "Create New Student",
        //     scopes: ["admin", "teacher"],
        //   },
        ],
      },
      {
        icon: "UserIcon",
        pageName: "users",
        title: "Users",
        scopes: ["admin"],
        subMenu: [
          {
            icon: "UserIcon",
            pageName: "users",
            title: "Users",
            scopes: ["admin"],
          },
        //   {
        //     icon: "PlusIcon",
        //     pageName: "create-new-user",
        //     title: "Create New User",
        //     scopes: ["admin"],
        //   },
        ],
      },
      {
        icon: "ListChecksIcon",
        pageName: "attendance-records",
        title: "Attendance Records",
        scopes: ["admin", "teacher"],
      },
    ],
  }),
});
