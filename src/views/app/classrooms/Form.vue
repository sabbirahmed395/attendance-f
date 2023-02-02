<template>
  <div>
    <div class="intro-y flex items-center mt-8">
      <h2 class="text-lg font-medium mr-auto">{{ formTitle }}</h2>
    </div>
    <div class="grid grid-cols-12 gap-6 mt-5">
      <div class="intro-y col-span-12 lg:col-span-3">
        <!-- BEGIN: Form Layout -->
        <div class="intro-y box p-5">
          <div>
            <label for="program_id" class="form-label">Programs <small>*</small></label>
            <select
              id="program_id"
              v-model="program_id"
              @change="actionFetchBatchesNCourses"
              class="w-full"
              style="border-radius: 5px"
            >
              <option>-- Select a program --</option>
              <option v-for="(program, k) in programs" :key="k" :value="program.id">
                {{ program.name }}
              </option>
            </select>
            <div class="text-danger mt-2" v-if="errors && errors.program_id">
              {{ errors.program_id[0] }}
            </div>
          </div>
          <div class="mt-3">
            <label for="batch_id" class="form-label">Batches <small>*</small></label>
            <select
              id="batch_id"
              v-model="batch_id"
              class="w-full"
              style="border-radius: 5px"
            >
              <option>-- Select a batch --</option>
              <option v-for="(batch, b) in batches" :key="b" :value="batch.id">
                #{{ batch.batch_no }}
              </option>
            </select>
            <div class="text-danger mt-2" v-if="errors && errors.batch_id">
              {{ errors.batch_id[0] }}
            </div>
          </div>
          <div class="mt-3">
            <label for="course_id" class="form-label">Courses <small>*</small></label>
            <select
              id="course_id"
              v-model="course_id"
              class="w-full"
              style="border-radius: 5px"
            >
              <option>-- Select a course --</option>
              <option v-for="(course, k) in courses" :key="k" :value="course.id">
                {{ course.course_code }} ~ {{ course.course_title }}
              </option>
            </select>
            <div class="text-danger mt-2" v-if="errors && errors.course_id">
              {{ errors.course_id[0] }}
            </div>
          </div>

          <div class="mt-3">
            <label for="status" class="form-label">Status <small>*</small></label>
            <select
              id="status"
              v-model="status"
              class="w-full"
              style="border-radius: 5px"
            >
              <option selected disabled>-- Select a status --</option>
              <option
                v-for="(status, s) in ['active', 'inactive']"
                :key="s"
                :value="status"
              >
                {{ status }}
              </option>
            </select>
            <div class="text-danger mt-2" v-if="errors && errors.status">
              {{ errors.status[0] }}
            </div>
          </div>
          <div class="text-right mt-5">
            <button type="button" class="btn btn-outline-secondary w-24 mr-1">
              Cancel
            </button>
            <button type="button" class="btn btn-primary w-24" @click="save">Save</button>
          </div>
        </div>
        <!-- END: Form Layout -->
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { http } from "@/httpCommons";
import router from "@/router";
import { useRoute } from "vue-router";
import Toastify from "toastify-js";

let program_id = ref("");
let course_id = ref("");
let batch_id = ref("");
let status = ref("active");
let errors = ref({});

let course = ref({});
let programs = ref({});
let batches = ref([]);
let courses = ref([]);

let formTitle = ref("");

let mode = ref("");
let id = ref(null);

const editorConfig = {
  toolbar: {
    items: ["bold", "italic", "link"],
  },
};
const editorData = ref("<p>Content of the editor.</p>");

onMounted(() => {
  http.get(`programs`, { params: { per_page: -1 } }).then((response) => {
    if (response.status === 200) {
      programs.value = response.data.data;
    }
  });

  const route = useRoute();
  id.value = parseInt(route.path.split("/")[2]);

  if (isNaN(id.value)) {
    formTitle.value = "Create New Classroom";
    mode.value = "create";
  } else {
    formTitle.value = "Edit Classroom";
    mode.value = "edit";
    try {
      let res = http
        .get(`classrooms/${id.value}`)
        .then((response) => {
          if (response.status === 200) {
            course.value = response.data.data;
            program_id.value = response.data.data.course.program_id;
            actionFetchBatchesNCourses();
            batch_id.value = response.data.data.batch_id;
            course_id.value = response.data.data.course_id;
            status.value = response.data.data.status;
          }
        })
        .catch((error) => {
          if (error.response.status === 404) {
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

const actionFetchBatchesNCourses = async () => {
  try {
    http.get(`programs/${program_id.value}/batches`).then((response) => {
      batches.value = Object.assign({}, response.data.data);
    });

    http.get(`programs/${program_id.value}/courses`).then((response) => {
      courses.value = Object.assign({}, response.data.data);
    });
  } catch (err) {
    console.log(err);
  }
};

const save = async () => {
  let formData = {};
  formData.program_id = program_id.value;
  formData.course_id = course_id.value;
  formData.batch_id = batch_id.value;
  formData.status = status.value;

  try {
    if (mode.value === "create") {
      let res = await http
        .post("classrooms", formData)
        .then((response) => {
          if (response.status === 201) {
            router.push({ name: "classrooms" });
          }
        })
        .catch((error) => {
          if (error.response.status === 422) {
            errors.value = error.response.data.errors;
            console.log(errors.value);
          }
          if (error.response.status === 400) {
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
    }

    if (mode.value === "edit") {
      let res = await http
        .put(`classrooms/${id.value}`, formData)
        .then((response) => {
          if (response.status === 200) {
            router.push({ name: "classrooms" });
          }
        })
        .catch((error) => {
          if (error.response.status === 422) {
            errors.value = error.response.data.errors;
            console.log(errors.value);
          }
          if (error.response.status === 400) {
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
    }
  } catch (err) {
    // console.log(err)
  }
};

defineExpose({
  program_id,
  course_id,
  batch_id,
  status,
  errors,
  course,
  programs,
  formTitle,
  actionFetchBatchesNCourses,
  save,
});
</script>
