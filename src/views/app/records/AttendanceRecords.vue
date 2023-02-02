<template>
  <div class="grid grid-cols-12 gap-6">
    <div class="col-span-12 2xl:col-span-10">
      <div class="grid grid-cols-12 gap-6">
        <!-- BEGIN: General Report -->
        <div class="col-span-12 mt-8">
          <div class="intro-y flex items-center h-10">
            <h2 class="text-lg font-medium truncate mr-5">Attendance Report</h2>
            <a href="" class="ml-auto flex items-center text-primary">
              <RefreshCcwIcon class="w-4 h-4 mr-3" /> Reload Data
            </a>
          </div>
          <div class="intro-y col-span-12 overflow-scroll lg:overflow-visible">
            <table
              class="table table-report -mt-2"
              v-if="attendanceRows && attendanceRows.length > 0"
            >
              <thead>
                <tr>
                  <th class="whitespace-nowrap rotate-90">Student ID</th>
                  <th
                    class="whitespace-normal rotate-90"
                    v-for="(attendanceDate, ad) in attendanceDates"
                    :key="ad"
                  >
                    {{ attendanceDate }}
                  </th>
                  <th class="whitespace-normal rotate-90">Total Present</th>
                  <th class="whitespace-normal rotate-90">Percentages</th>
                  <th class="whitespace-normal rotate-90">Marks</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="(attendance, a) in attendanceRows" :key="a" class="intro-x">
                  <td class="font-medium whitespace-normal border">{{ students[a] }}</td>
                  <td
                    class="font-medium whitespace-normal border"
                    v-for="(data, d) in attendance"
                    :key="d"
                  >
                    <template v-if="parseInt(data) == 1">
                      <input type="checkbox" checked onclick="return false;" />
                    </template>
                    <template v-else>
                      <input type="checkbox" onclick="return false;" />
                    </template>
                  </td>
                  <td class="font-medium whitespace-normal border">
                    {{ marks[a].attendance }}
                  </td>
                  <td class="font-medium whitespace-normal border">
                    {{ marks[a].percentage }}
                  </td>
                  <td class="font-medium whitespace-normal border">
                    {{ marks[a].mark }}
                  </td>
                </tr>
              </tbody>
            </table>
            <template v-else>
              <div
                class="alert alert-dismissible show box bg-primary text-white flex items-center mb-6"
                role="alert"
              >
                <span>Please select a classroom from the right side of the page.</span>
              </div>
            </template>
          </div>
        </div>
        <!-- END: General Report -->
      </div>
    </div>
    <div class="col-span-12 2xl:col-span-2">
      <div class="2xl:border-l -mb-10 pb-10">
        <div class="2xl:pl-6 grid grid-cols-12 gap-x-6 2xl:gap-x-0 gap-y-6">
          <!-- BEGIN: Transactions -->
          <div
            class="col-span-12 md:col-span-6 xl:col-span-4 2xl:col-span-12 mt-3 2xl:mt-8"
          >
            <div class="intro-x flex items-center h-10">
              <h2 class="text-lg font-medium truncate mr-5">Classrooms</h2>
            </div>
            <div class="mt-5">
              <div
                v-for="(classroom, c) in classrooms"
                :key="c"
                class="intro-x"
                @click="actionFetchClassSessionAlongWithAttendanceNMarks(classroom.id)"
              >
                <div class="box px-5 py-3 mb-3 flex items-center zoom-in">
                  <div class="w-10 h-10 flex-none image-fit rounded-full overflow-hidden">
                    <img alt="IIT JU" src="@/assets/images/logo.svg" />
                  </div>
                  <div class="ml-4 mr-auto">
                    <div class="font-medium">
                      {{ classroom.name }}
                    </div>
                    <div class="text-slate-500 text-s mt-0.5">
                      {{ classroom.course.course_title }}
                    </div>
                    <div class="text-slate-500 text-xs mt-0.5">
                      {{ classroom.course.program.name }}
                    </div>
                  </div>
                </div>
              </div>
              <a
                href=""
                v-if="false"
                class="intro-x w-full block text-center rounded-md py-3 border border-dotted border-slate-400 dark:border-darkmode-300 text-slate-500"
                >View More</a
              >
            </div>
          </div>
          <!-- END: Transactions -->
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, provide, onMounted } from "vue";
import ReportLineChart from "@/components/report-line-chart/Main.vue";
import ReportDonutChart from "@/components/report-donut-chart/Main.vue";
import ReportPieChart from "@/components/report-pie-chart/Main.vue";
import ReportMap from "@/components/report-map/Main.vue";
import ReportDonutChart1 from "@/components/report-donut-chart-1/Main.vue";
import SimpleLineChart1 from "@/components/simple-line-chart-1/Main.vue";
import { http } from "@/httpCommons";
import Toastify from "toastify-js";

const salesReportFilter = ref();
const importantNotesRef = ref();

const classrooms = ref([]);
let rawClassroomsData = [];
const attendanceDates = ref([]);
const attendanceRows = ref([]);
const students = ref([]);
const marks = ref([]);

provide("bind[importantNotesRef]", (el) => {
  importantNotesRef.value = el;
});

const prevImportantNotes = () => {
  const el = importantNotesRef.value;
  el.tns.goTo("prev");
};

const nextImportantNotes = () => {
  const el = importantNotesRef.value;
  el.tns.goTo("next");
};

onMounted(() => {
  http.get("classrooms", { params: { per_page: -1 } }).then((response) => {
    classrooms.value = response.data.data;
    rawClassroomsData = response.data.data;
  });
});

const actionFetchClassSessionAlongWithAttendanceNMarks = async (classroom_id) => {
  http
    .get(`classrooms/${classroom_id}/class_sessions`, {
      params: { with: "attendances" },
    })
    .then((response) => {
      attendanceRows.value = response.data.data.attendance;
      attendanceDates.value = response.data.data.date;
      students.value = response.data.data.students;
      marks.value = response.data.data.marks;

      if (response.data.data.total_class_session == 0) {
        Toastify({
          text: "No attendance found!",
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
};

defineExpose({
  classrooms,
  actionFetchClassSessionAlongWithAttendanceNMarks,
  attendanceDates,
  attendanceRows,
  marks,
});
</script>
