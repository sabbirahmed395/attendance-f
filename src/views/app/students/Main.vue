<template>
  <div>
    <h2 class="intro-y text-lg font-medium mt-10">Student List</h2>
    <div class="grid grid-cols-12 gap-6 mt-5">
      <div class="intro-y col-span-12 flex flex-wrap sm:flex-nowrap items-center mt-2">
        <button
          class="btn btn-primary shadow-md mr-2"
          v-if="isAdmin"
          @click="router.push({ name: 'create-new-student' })"
        >
          Add New Student
        </button>

        <div class="hidden md:block mx-auto text-slate-500" v-text="listComment"></div>
        <!-- <div class="w-full sm:w-auto mt-3 sm:mt-0 sm:ml-auto md:ml-0">
        <div class="w-56 relative text-slate-500">
          <input
            type="text"
            class="form-control w-56 box pr-10"
            placeholder="Search..."
          />
          <SearchIcon class="w-4 h-4 absolute my-auto inset-y-0 mr-3 right-0" />
        </div>
      </div> -->
      </div>
      <!-- BEGIN: Data List -->
      <div class="intro-y col-span-12 overflow-auto lg:overflow-visible">
        <table class="table table-report -mt-2">
          <thead>
            <tr>
              <th class="whitespace-nowrap">STUDENT ID</th>
              <th class="whitespace-nowrap">STUDENT NAME</th>
              <th class="whitespace-nowrap">BATCH</th>
              <th class="whitespace-nowrap">PROGRAM</th>
              <th class="text-center whitespace-nowrap" v-if="isAdmin">ACTIONS</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(student, k) in students" :key="k" class="intro-x">
              <td>
                <a
                  href=""
                  class="font-medium whitespace-nowrap"
                  @click="
                    router.push({ name: 'details-student', params: { id: student.id } })
                  "
                  >{{ student.student_id }}</a
                >
              </td>
              <td class="font-medium whitespace-nowrap">{{ student.name }}</td>
              <td class="font-medium whitespace-nowrap">#{{ student.batch }}</td>
              <td class="font-medium whitespace-nowrap">{{ student.program }}</td>
              <td class="table-report__action w-56" v-if="isAdmin">
                <div class="flex justify-center items-center">
                  <a
                    class="flex items-center mr-3"
                    href="javascript:;"
                    @click="
                      router.push({ name: 'edit-student', params: { id: student.id } })
                    "
                  >
                    <CheckSquareIcon class="w-4 h-4 mr-1" /> Edit
                  </a>
                  <a
                    class="flex items-center text-danger"
                    href="javascript:;"
                    @click="actionDelete(student.id)"
                  >
                    <Trash2Icon class="w-4 h-4 mr-1" /> Delete
                  </a>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <!-- END: Data List -->
      <!-- BEGIN: Pagination -->
      <div
        class="intro-y col-span-12 flex flex-wrap sm:flex-row sm:flex-nowrap items-center"
      >
        <v-pagination
          v-model="page"
          :pages="pageCount"
          :range-size="1"
          active-color="#014f3d60"
          @update:modelValue="getStudents"
        />
      </div>

      <!-- END: Pagination -->
    </div>

    <router-view></router-view>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { http } from "@/httpCommons";
import router from "@/router";
import VPagination from "@hennge/vue3-pagination";
import "@hennge/vue3-pagination/dist/vue3-pagination.css";
import Toastify from "toastify-js";

let page = ref(1);
let pageCount = ref(null);
let students = ref(null);
let meta = ref({ from: 0, to: 0, total: 0 });
let listComment = ref("");
const isTeacher = ref(false);
const isAdmin = ref(false);

onMounted(() => {
  getStudents();

  let user = JSON.parse(localStorage.getItem("auth"));

  if (user) {
    if (user.user_type == "teacher") {
      isTeacher.value = true;
      isAdmin.value = false;
    } else {
      isTeacher.value = false;
      isAdmin.value = true;
    }
  }
});

const getStudents = async () => {
  try {
    let res = await http.get("students", { params: { page: page.value } });
    students.value = res.data.data;
    meta.value = res.data.meta;
    pageCount.value = meta.value.last_page;
    listComment.value = `Showing ${meta.value.from} to ${meta.value.to} of ${meta.value.total} Students`;
  } catch (err) {
    console.log(err);
  }
};

const actionDelete = async (student_id) => {
  let deleteConsent = confirm("Are you sure you want to delete the student?");
  if (deleteConsent) {
    try {
      await http.delete(`students/${student_id}`).then((response) => {
        if (response.status == 200) {
          Toastify({
            text: response.data.message,
            duration: 3000,
            newWindow: true,
            close: true,
            gravity: "top",
            position: "right",
            backgroundColor: "#D32929",
            stopOnFocus: true,
          }).showToast();

          getStudents();
        }
      });
    } catch (err) {
      console.log(err);
    }
  }
};

defineExpose({
  students,
  meta,
  listComment,
  page,
  pageCount,
  actionDelete,
});
</script>
