<template>
  <div>
    <div class="intro-y flex items-center mt-8">
      <h2 class="text-lg font-medium mr-auto">Teacher Details</h2>
    </div>
    <TabGroup>
      <!-- BEGIN: Profile Info -->
      <div class="intro-y box px-5 pt-5 mt-5">
        <div
          class="flex flex-col lg:flex-row border-b border-slate-200/60 dark:border-darkmode-400 pb-5 -mx-5"
        >
          <div class="flex flex-1 px-5 items-center justify-center lg:justify-start">
            <div
              class="w-20 h-20 sm:w-24 sm:h-24 flex-none lg:w-32 lg:h-32 image-fit relative"
            >
              <img
                alt="IIT JU"
                class="rounded-full"
                src="@/assets/images/ju.png"
              />
              <div
                class="absolute mb-1 mr-1 flex items-center justify-center bottom-0 right-0 bg-primary rounded-full p-2"
              >
                <CameraIcon class="w-4 h-4 text-white" />
              </div>
            </div>
            <div class="ml-5">
              <div class="w-24 sm:w-40 truncate sm:whitespace-normal font-medium text-md">
                <strong>Teacher ID:</strong> {{ teacher.teacher_id }}
              </div>
              <div class="text-slate-500">
                <strong>Full Name:</strong> {{ teacher.title }} {{ teacher.first_name }}
                {{ teacher.middle_name }} {{ teacher.last_name }}
              </div>
            </div>
          </div>
          <div
            class="mt-6 lg:mt-0 flex-1 px-5 border-l border-r border-slate-200/60 dark:border-darkmode-400 border-t lg:border-t-0 pt-5 lg:pt-0"
          >
            <div class="font-medium text-center lg:text-left lg:mt-3">System Access</div>
            <div class="flex flex-col justify-center items-center lg:items-start mt-4">
              <div class="truncate sm:whitespace-normal flex items-center">
                Has Access into the system
              </div>
            </div>
          </div>
          <div
            class="mt-6 lg:mt-0 flex-1 px-5 border-t lg:border-0 border-slate-200/60 dark:border-darkmode-400 pt-5 lg:pt-0"
          >
            <div class="font-medium text-center lg:text-left lg:mt-5">Contact</div>
            <div class="flex flex-col justify-center items-center lg:items-start mt-4">
              <div
                class="truncate sm:whitespace-normal flex items-center"
                v-if="user && user.email"
              >
                <MailIcon class="w-4 h-4 mr-2" />
                {{ user.email }}
              </div>
              <div
                class="truncate sm:whitespace-normal flex items-center mt-3"
                v-if="user && user.mobile"
              >
                <PhoneIcon class="w-4 h-4 mr-2" />
                {{ user.mobile }}
              </div>
            </div>
          </div>
        </div>
        <TabList
          class="nav-link-tabs flex-col sm:flex-row justify-center lg:justify-start text-center"
        >
          <Tab :fullWidth="false" class="py-4 cursor-pointer">Courses</Tab>
        </TabList>
      </div>
      <!-- END: Profile Info -->
      <TabPanels class="intro-y mt-5">
        <TabPanel>
          <div class="grid grid-cols-12 gap-6">
            <!-- BEGIN: Daily Sales -->
            <div class="intro-y box col-span-12 lg:col-span-6">
              <div
                class="flex items-center px-5 py-5 sm:py-3 border-b border-slate-200/60 dark:border-darkmode-400"
              >
                <h2 class="font-medium text-base mr-auto">Assigned Courses</h2>
              </div>
              <div class="p-5">
                <div
                  class="relative flex items-center mb-5"
                  v-for="(course, c) in courses"
                  :key="c"
                >
                  <div class="w-12 h-12 flex-none image-fit">
                    <img
                      alt="IIT JU"
                      class="rounded-full"
                      src="@/assets/images/ju.png"
                    />
                  </div>
                  <div class="ml-4 mr-auto">
                    <a href="" class="font-medium">{{ course.course_code }}</a>
                    <div class="text-slate-500 mr-5 sm:mr-5">
                      {{ course.course_title }}
                    </div>
                  </div>
                  <div class="font-medium text-slate-600 dark:text-slate-500">
                    {{ course.credit_hours }}
                  </div>
                  <button
                    class="btn btn-sm btn-secondary w-24 ml-3 mr-1 mb-2"
                    v-if="attendanceTakingStatus"
                    @click="actionShowAttendenceBoard(course.id)"
                  >
                    Take Attendance
                  </button>
                </div>
              </div>
            </div>
            <!-- END: Daily Sales -->

            <!-- BEGIN: Latest Tasks -->
            <TabGroup
              class="intro-y box col-span-12 lg:col-span-6"
              v-if="attendanceBoardState"
            >
              <div
                class="flex items-center px-5 py-5 sm:py-3 border-b border-slate-200/60 dark:border-darkmode-400"
              >
                <h2 class="font-medium text-base mr-auto">Attendance Board</h2>
              </div>
              <div class="p-5">
                <h3 class="font-medium text-base mr-auto">Classrooms</h3>
                <div class="flex border-b-2 mb-2 pb-2">
                  <div
                    v-for="(classroom, c) in classrooms"
                    :key="c"
                    class="flex-auto mx-2 p-1 w-28 h-14 rounded border border-slate-300 cursor-pointer"
                    @click="
                      actionDisplayAllStudentByBatch(classroom.id, classroom.batch_id)
                    "
                  >
                    <a href="" class="font-medium">{{ classroom.name }}</a>
                    <div class="text-slate-500">{{ classroom.status }}</div>
                  </div>
                </div>
                <!-- <div
                  class="flex items-center mt-5"
                  v-for="(classroom, c) in classrooms"
                  :key="c"
                >
                  <div class="border-l-2 border-primary dark:border-primary pl-4">
                    <a href="" class="font-medium">{{ classroom.name }}</a>
                    <div class="text-slate-500">{{ classroom.status }}</div>
                  </div>
                </div> -->
                <div v-if="displayEnrolledStudent">
                  <div class="grid grid-cols-3 gap-4">
                    <div></div>
                    <div class="w-64 px-6">
                      <button
                        class="btn btn-sm btn-warning w-24 mr-1 mb-2"
                        @click="actionResetSelection"
                      >
                        Reset
                      </button>
                      <button
                        class="btn btn-sm btn-success w-24 mr-1 mb-2"
                        @click="actionConfirmAttendance"
                      >
                        Confirm
                      </button>
                    </div>
                    <div class="">
                      <div class="form-check form-switch ml-auto float-right">
                        <input
                          class="form-check-input"
                          type="checkbox"
                          v-model="toggleCheckedAll"
                          @change="actionToggleCheckedAll"
                        />
                      </div>
                    </div>
                  </div>
                  <!-- <div class="flex flex-col">
                    <div class="flex-1"></div>
                  </div>
                  <div class="flex">
                    <div class="flex-auto"></div>
                  </div> -->

                  <div class="relative w-56 mx-auto">
                    <div
                      class="absolute rounded-l w-10 h-full flex items-center justify-center bg-slate-100 border text-slate-500 dark:bg-darkmode-700 dark:border-darkmode-800 dark:text-slate-400"
                    >
                      <CalendarIcon class="w-4 h-4" />
                    </div>
                    <Litepicker
                      v-model="attendanceDate"
                      :options="{
                        autoApply: false,
                        showWeekNumbers: true,
                        dropdowns: {
                          minYear: 1990,
                          maxYear: null,
                          months: true,
                          years: true,
                        },
                      }"
                      class="form-control pl-12"
                    />
                  </div>

                  <div
                    class="flex items-center mt-5"
                    v-for="(student, s) in enrolledStudents"
                    :key="s"
                  >
                    <div class="border-l-2 border-primary dark:border-primary pl-4">
                      <a href="" class="font-medium">{{ student.name }}</a>
                      <div class="text-slate-500">{{ student.student_id }}</div>
                    </div>
                    <div class="form-check form-switch ml-auto">
                      <input
                        class="form-check-input"
                        type="checkbox"
                        v-model="student.checked"
                        v-bind:id="student.id"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </TabGroup>
            <!-- END: Latest Tasks -->
          </div>
        </TabPanel>
      </TabPanels>
    </TabGroup>
  </div>
</template>

<script setup>
import StackedBarChart1 from "@/components/stacked-bar-chart-1/Main.vue";
import SimpleLineChart from "@/components/simple-line-chart/Main.vue";
import SimpleLineChart1 from "@/components/simple-line-chart-1/Main.vue";
import SimpleLineChart2 from "@/components/simple-line-chart-2/Main.vue";

import { ref, onMounted, isProxy, toRaw } from "vue";
import { useRoute } from "vue-router";
import { http } from "@/httpCommons";
import Toastify from "toastify-js";

const teacher = ref({});
const courses = ref([]);
let rawCoursesData = [];
const user = ref({});
const id = ref(null);
const attendanceBoardState = ref(false);
const enrolledStudents = ref([]);
const attendanceDate = ref(new Date());
const toggleCheckedAll = ref(false);
let rawStudentData = {};
let attendanceCourseId = 0;
let classroom_id = null;
let assignableCourseBoardStatus = ref(false);
let classrooms = ref([]);
let displayEnrolledStudent = ref(false);
let attendanceTakingStatus = ref(false);

onMounted(() => {
  let user = JSON.parse(localStorage.getItem("auth"));

  if (user) {
    if (user.user_type == "teacher") {
      attendanceTakingStatus.value = true;
    }
  }

  const route = useRoute();
  id.value = parseInt(route.path.split("/")[2]);
  //   console.log(id.value);
  if (id.value) {
    try {
      let res = http
        .get(`teachers/${id.value}`, { params: { with: "courses" } })
        .then((response) => {
          if (response.status === 200) {
            let responseData = response.data.data;

            teacher.value = Object.assign(
              {},
              {
                id: responseData.id,
                teacher_id: responseData.teacher_id,
                title: responseData.title,
                first_name: responseData.first_name,
                middle_name: responseData.middle_name,
                last_name: responseData.last_name,
              }
            );

            rawCoursesData = responseData.courses;
            courses.value = Object.assign({}, responseData.courses);

            if (responseData.user_id) {
              user.value = Object.assign({}, responseData.user);
            }
          }
        })
        .catch((error) => {
          console.log(error);
          if (
            error &&
            error.response &&
            error.response.status &&
            error.response.status === 404
          ) {
            Toastify({
              text: error.response.data.message,
              duration: 3000,
              newWindow: true,
              //   close: true,
              gravity: "top",
              position: "right",
              backgroundColor: "#D32929",
              style: {
                padding: "8px 15px",
              },
              stopOnFocus: true,
            }).showToast();
          }
        });
    } catch (err) {
      // console.log(err)
    }
  }
});

const actionShowAttendenceBoard = async (course_id) => {
  attendanceBoardState.value = false;
  http
    .get(`courses/${course_id}/classrooms`)
    .then((response) => {
      if (response.data.data.length === 0) {
        Toastify({
          text: "No classroom found on this course",
          duration: 3000,
          newWindow: true,
          // close: true,
          gravity: "top",
          position: "right",
          backgroundColor: "#D32929",
          style: {
            padding: "8px 15px",
          },
          stopOnFocus: true,
        }).showToast();
      }

      if (response.data.data.length > 0) {
        classrooms.value = response.data.data;
        attendanceBoardState.value = true;
      }
    })
    .catch((err) => {
      console.log(err);
    });

  attendanceCourseId = course_id;
  enrolledStudents.value = [];
  // try {
  //   let res = http
  //     .get(`courses/${course_id}/students`)
  //     .then((response) => {
  //       if (response.status === 200) {
  //         let responseData = response.data.data;

  //         responseData.map((data) => {
  //           return (data.checked = false);
  //         });

  //         //   console.log(responseData);
  //         enrolledStudents.value = Object.assign({}, responseData);
  //         rawStudentData = responseData;

  //         attendanceBoardState.value = true;
  //         //   console.log(enrolledStudents.value);
  //       }
  //     })
  //     .catch((error) => {
  //       console.log(error);
  //       if (
  //         error &&
  //         error.response &&
  //         error.response.status &&
  //         error.response.status === 404
  //       ) {
  //         Toastify({
  //           text: error.response.data.message,
  //           duration: 3000,
  //           newWindow: true,
  //           // close: true,
  //           gravity: "bottom",
  //           position: "left",
  //           backgroundColor: "#D32929",
  //           style: {
  //             padding: "8px 15px",
  //           },
  //           stopOnFocus: true,
  //         }).showToast();
  //       }
  //     });
  // } catch (err) {
  //   // console.log(err)
  // }
};

const actionDisplayAllStudentByBatch = async (classroomId, batch_id) => {
  classroom_id = classroomId;
  http
    .get(`batches/${batch_id}/students`)
    .then((response) => {
      console.log(response.data.data);

      if (response.status === 200) {
        let responseData = response.data.data;

        responseData.map((data) => {
          return (data.checked = false);
        });

        //   console.log(responseData);
        enrolledStudents.value = Object.assign({}, responseData);
        rawStudentData = responseData;

        displayEnrolledStudent.value = true;
        //   console.log(enrolledStudents.value);
      }
    })
    .catch((error) => {
      console.log(error);
      if (
        error &&
        error.response &&
        error.response.status &&
        error.response.status === 404
      ) {
        Toastify({
          text: error.response.data.message,
          duration: 3000,
          newWindow: true,
          // close: true,
          gravity: "top",
          position: "right",
          backgroundColor: "#D32929",
          style: {
            padding: "8px 15px",
          },
          stopOnFocus: true,
        }).showToast();
      }
    });
};

const actionToggleCheckedAll = async () => {
  rawStudentData = rawStudentData.map((student) => {
    student.checked = toggleCheckedAll.value;
    return student;
  });

  enrolledStudents.value = Object.assign({}, rawStudentData);
};

const actionResetSelection = async () => {
  attendanceDate.value = new Date();
  toggleCheckedAll.value = false;

  actionToggleCheckedAll();
};

const actionConfirmAttendance = async () => {
  let formData = {};
  formData.classroom_id = classroom_id;
  formData.date = formatDate(attendanceDate.value);
  formData.students = rawStudentData;
  try {
    http.post("attendances/create", formData).then((response) => {
      Toastify({
        text: response.data.message,
        duration: 3000,
        newWindow: true,
        // close: true,
        gravity: "top",
        position: "right",
        backgroundColor: "#00FF00",
        style: {
          padding: "8px 15px",
        },
        stopOnFocus: true,
      }).showToast();
    });
  } catch (err) {
    console.log(err);
  }
};

function formatDate(date) {
  var d = new Date(date),
    month = "" + (d.getMonth() + 1),
    day = "" + d.getDate(),
    year = d.getFullYear();

  if (month.length < 2) month = "0" + month;
  if (day.length < 2) day = "0" + day;

  return [year, month, day].join("-");
}

defineExpose({
  teacher,
  courses,
  user,
  attendanceBoardState,
  attendanceDate,
  actionShowAttendenceBoard,
  classrooms,
  displayEnrolledStudent,
  actionDisplayAllStudentByBatch,
  actionResetSelection,
  actionConfirmAttendance,
  attendanceTakingStatus,
});
</script>
