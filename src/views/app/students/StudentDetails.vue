<template>
  <div>
    <div class="intro-y flex items-center mt-8">
      <h2 class="text-lg font-medium mr-auto">Student Details</h2>
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
                <strong>Student ID:</strong> {{ student.student_id }}
              </div>
              <div class="text-slate-500">
                <strong>Full Name:</strong> {{ student.title }} {{ student.first_name }}
                {{ student.middle_name }} {{ student.last_name }}
              </div>
            </div>
          </div>
          <div
            class="mt-6 lg:mt-0 flex-1 px-5 border-l border-r border-slate-200/60 dark:border-darkmode-400 border-t lg:border-t-0 pt-5 lg:pt-0"
          >
            <div class="font-medium text-center lg:text-left lg:mt-3">System Access</div>
            <div class="flex flex-col justify-center items-center lg:items-start mt-4">
              <div class="truncate sm:whitespace-normal flex items-center">
                No Access into the system
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
                <h2 class="font-medium text-base mr-auto">Enrolled Courses</h2>
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
                    <a href="" class="font-medium">{{ course.course.course_code }}</a>
                    <div class="text-slate-500 mr-5 sm:mr-5">
                      {{ course.course.course_title }}
                    </div>
                  </div>
                  <div class="font-medium text-slate-600 dark:text-slate-500">
                    {{ course.course.credit_hours }}
                  </div>
                </div>
              </div>
            </div>
            <!-- END: Daily Sales -->
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

import { ref, onMounted } from "vue";
import { useRoute } from "vue-router";
import { http } from "@/httpCommons";
import Toastify from "toastify-js";

const student = ref({});
const courses = ref([]);
const id = ref(null);

onMounted(() => {
  const route = useRoute();
  id.value = parseInt(route.path.split("/")[2]);
  console.log(id.value);
  if (id.value) {
    try {
      let res = http
        .get(`students/${id.value}`, { params: { with: "courses" } })
        .then((response) => {
          if (response.status === 200) {
            let responseData = response.data.data;

            student.value = Object.assign(
              {},
              {
                id: responseData.id,
                student_id: responseData.student_id,
                title: responseData.title,
                first_name: responseData.first_name,
                middle_name: responseData.middle_name,
                last_name: responseData.last_name,
              }
            );

            courses.value = Object.assign({}, responseData.enrolls);
            console.log(courses.value);
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
    } catch (err) {
      // console.log(err)
    }
  }
});

defineExpose({
  student,
  courses,
});
</script>
