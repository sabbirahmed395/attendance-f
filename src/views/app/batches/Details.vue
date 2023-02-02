<template>
  <div>
    <div class="intro-y flex items-center mt-8">
      <h2 class="text-lg font-medium mr-auto">Course Details</h2>
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
                <strong>Course Code:</strong> PGDIT-301
              </div>
              <div class="text-slate-500">
                <strong>Course Title:</strong> Web Programming
              </div>
            </div>
          </div>
          <div
            class="mt-6 lg:mt-0 flex-1 px-5 border-l border-r border-slate-200/60 dark:border-darkmode-400 border-t lg:border-t-0 pt-5 lg:pt-0"
          >
            <div class="font-medium text-center lg:text-left lg:mt-3">
              Contact Details
            </div>
            <div class="flex flex-col justify-center items-center lg:items-start mt-4">
              <div class="truncate sm:whitespace-normal flex items-center">
                <MailIcon class="w-4 h-4 mr-2" />
                {{ $f()[0].users[0].email }}
              </div>
              <div class="truncate sm:whitespace-normal flex items-center mt-3">
                <InstagramIcon class="w-4 h-4 mr-2" /> Instagram
                {{ $f()[0].users[0].name }}
              </div>
              <div class="truncate sm:whitespace-normal flex items-center mt-3">
                <TwitterIcon class="w-4 h-4 mr-2" /> Twitter
                {{ $f()[0].users[0].name }}
              </div>
            </div>
          </div>
          <div
            class="mt-6 lg:mt-0 flex-1 px-5 border-t lg:border-0 border-slate-200/60 dark:border-darkmode-400 pt-5 lg:pt-0"
          >
            <div class="font-medium text-center lg:text-left lg:mt-5">Sales Growth</div>
            <div class="flex items-center justify-center lg:justify-start mt-2">
              <div class="mr-2 w-20 flex">
                USP: <span class="ml-3 font-medium text-success">+23%</span>
              </div>
              <div class="w-3/4">
                <SimpleLineChart1 :height="55" class="-mr-5" />
              </div>
            </div>
            <div class="flex items-center justify-center lg:justify-start">
              <div class="mr-2 w-20 flex">
                STP: <span class="ml-3 font-medium text-danger">-2%</span>
              </div>
              <div class="w-3/4">
                <SimpleLineChart2 :height="55" class="-mr-5" />
              </div>
            </div>
          </div>
        </div>
        <TabList
          class="nav-link-tabs flex-col sm:flex-row justify-center lg:justify-start text-center"
        >
          <Tab :fullWidth="false" class="py-4 cursor-pointer">Details</Tab>
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
                <h2 class="font-medium text-base mr-auto">Teachers</h2>
              </div>
              <div class="p-5">
                <div
                  class="relative flex items-center mb-5"
                  v-for="(teacher, t) in teachers"
                  :key="t"
                >
                  <div class="w-12 h-12 flex-none image-fit">
                    <img
                      alt="IIT JU"
                      class="rounded-full"
                      src="@/assets/images/ju.png"
                    />
                  </div>
                  <div class="ml-4 mr-auto">
                    <a href="" class="font-medium">{{ teacher.teacher_id }}</a>
                    <div class="text-slate-500 mr-5 sm:mr-5">
                      <strong
                        >{{ teacher.title }} {{ teacher.first_name }}
                        {{ teacher.middle_name }} {{ teacher.last_name }}</strong
                      >, {{ teacher.designation }}
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <!-- END: Daily Sales -->
            <!-- BEGIN: Latest Tasks -->
            <div class="intro-y box col-span-12 lg:col-span-6">
              <div
                class="flex items-center px-5 py-5 sm:py-3 border-b border-slate-200/60 dark:border-darkmode-400"
              >
                <h2 class="font-medium text-base mr-auto">Students</h2>
              </div>
              <div class="p-5 overflow-y-auto h-96">
                <div
                  class="relative flex items-center mb-2 pb-2 border-b"
                  v-for="(student, s) in students"
                  :key="s"
                >
                  <div class="w-12 h-12 flex-none image-fit">
                    <img
                      alt="IIT JU"
                      class="rounded-full"
                      src="@/assets/images/ju.png"
                    />
                  </div>
                  <div class="ml-4 mr-auto">
                    <a href="" class="font-medium">{{ student.student_id }}</a>
                    <div class="text-slate-500 mr-5 sm:mr-5">
                      <strong
                        >{{ student.title }} {{ student.first_name }}
                        {{ student.middle_name }} {{ student.last_name }}</strong
                      >
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <!-- END: Latest Tasks -->
            <!-- BEGIN: General Statistic -->
            <div class="intro-y box col-span-12">
              <div
                class="flex items-center px-5 py-5 sm:py-3 border-b border-slate-200/60 dark:border-darkmode-400"
              >
                <h2 class="font-medium text-base mr-auto">General Statistics</h2>
                <Dropdown class="ml-auto sm:hidden">
                  <DropdownToggle class="w-5 h-5 block" href="javascript:;">
                    <MoreHorizontalIcon class="w-5 h-5 text-slate-500" />
                  </DropdownToggle>
                  <DropdownMenu class="w-40">
                    <DropdownContent>
                      <DropdownItem>
                        <FileIcon class="w-4 h-4 mr-2" /> Download XML
                      </DropdownItem>
                    </DropdownContent>
                  </DropdownMenu>
                </Dropdown>
                <button class="btn btn-outline-secondary hidden sm:flex">
                  <FileIcon class="w-4 h-4 mr-2" /> Download XML
                </button>
              </div>
              <div class="grid grid-cols-1 2xl:grid-cols-7 gap-6 p-5">
                <div class="2xl:col-span-2">
                  <div class="grid grid-cols-2 gap-6">
                    <div
                      class="col-span-2 sm:col-span-1 2xl:col-span-2 box dark:bg-darkmode-500 p-5"
                    >
                      <div class="font-medium">Net Worth</div>
                      <div class="flex items-center mt-1 sm:mt-0">
                        <div class="mr-4 w-20 flex">
                          USP:
                          <span class="ml-3 font-medium text-success">+23%</span>
                        </div>
                        <div class="w-5/6 overflow-auto">
                          <SimpleLineChart :height="51" />
                        </div>
                      </div>
                    </div>
                    <div
                      class="col-span-2 sm:col-span-1 2xl:col-span-2 box dark:bg-darkmode-500 p-5"
                    >
                      <div class="font-medium">Sales</div>
                      <div class="flex items-center mt-1 sm:mt-0">
                        <div class="mr-4 w-20 flex">
                          USP:
                          <span class="ml-3 font-medium text-danger">-5%</span>
                        </div>
                        <div class="w-5/6 overflow-auto">
                          <SimpleLineChart :height="51" />
                        </div>
                      </div>
                    </div>
                    <div
                      class="col-span-2 sm:col-span-1 2xl:col-span-2 box dark:bg-darkmode-500 p-5"
                    >
                      <div class="font-medium">Profit</div>
                      <div class="flex items-center mt-1 sm:mt-0">
                        <div class="mr-4 w-20 flex">
                          USP:
                          <span class="ml-3 font-medium text-danger">-10%</span>
                        </div>
                        <div class="w-5/6 overflow-auto">
                          <SimpleLineChart :height="51" />
                        </div>
                      </div>
                    </div>
                    <div
                      class="col-span-2 sm:col-span-1 2xl:col-span-2 box dark:bg-darkmode-500 p-5"
                    >
                      <div class="font-medium">Products</div>
                      <div class="flex items-center mt-1 sm:mt-0">
                        <div class="mr-4 w-20 flex">
                          USP:
                          <span class="ml-3 font-medium text-success">+55%</span>
                        </div>
                        <div class="w-5/6 overflow-auto">
                          <SimpleLineChart :height="51" />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="2xl:col-span-5 w-full">
                  <div class="flex justify-center mt-8">
                    <div class="flex items-center mr-5">
                      <div class="w-2 h-2 bg-primary rounded-full mr-3"></div>
                      <span>Product Profit</span>
                    </div>
                    <div class="flex items-center">
                      <div class="w-2 h-2 bg-slate-300 rounded-full mr-3"></div>
                      <span>Author Sales</span>
                    </div>
                  </div>
                  <div class="mt-8">
                    <StackedBarChart1 :height="420" />
                  </div>
                </div>
              </div>
            </div>
            <!-- END: General Statistic -->
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

const course = ref({});
const teachers = ref([]);
const students = ref([]);
const program = ref("");
const id = ref(null);

onMounted(() => {
  const route = useRoute();
  id.value = parseInt(route.path.split("/")[2]);
  console.log(id.value);
  if (id.value) {
    try {
      let res = http
        .get(`courses/${id.value}`, { params: { with: "teachers,students,program" } })
        .then((response) => {
          if (response.status === 200) {
            let responseData = response.data.data;

            course.value = Object.assign(
              {},
              {
                id: responseData.id,
                course_code: responseData.course_code,
                course_title: responseData.course_title,
                credit_hours: responseData.credit_hours,
              }
            );

            program.value = responseData.program.name;

            students.value = Object.assign({}, responseData.students);

            teachers.value = Object.assign({}, responseData.teachers);
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
  course,
  teachers,
  students,
});
</script>
