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
            <label for="program_id" class="form-label">Programs</label>
            <select
              id="program_id"
              v-model="program_id"
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
            <label for="course_code" class="form-label">Course Code</label>
            <input
              id="course_code"
              v-model="course_code"
              type="text"
              class="form-control w-full"
              placeholder="Input course code here..."
            />
            <div class="text-danger mt-2" v-if="errors && errors.course_code">
              {{ errors.course_code[0] }}
            </div>
          </div>
          <div class="mt-3">
            <label for="course_title" class="form-label">Course Title</label>
            <input
              id="course_title"
              v-model="course_title"
              type="text"
              class="form-control w-full"
              placeholder="Input course title here..."
            />
            <div class="text-danger mt-2" v-if="errors && errors.course_title">
              {{ errors.course_title[0] }}
            </div>
          </div>
          <div class="mt-3">
            <label for="credit_hour" class="form-label">Credit Hour</label>
            <input
              id="credit_hour"
              v-model="credit_hours"
              type="text"
              class="form-control w-full"
              placeholder="Credit hours"
            />
            <div class="text-danger mt-2" v-if="errors && errors.credit_hours">
              {{ errors.credit_hours[0] }}
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
let course_code = ref("");
let course_title = ref("");
let credit_hours = ref("");
let errors = ref({});

let course = ref({});
let programs = ref({});

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
    formTitle.value = "Create New Course";
    mode.value = "create";
  } else {
    formTitle.value = "Edit Course";
    mode.value = "edit";
    try {
      let res = http
        .get(`courses/${id.value}`)
        .then((response) => {
          if (response.status === 200) {
            course.value = response.data.data;
            program_id.value = response.data.data.program_id;
            course_code.value = response.data.data.course_code;
            course_title.value = response.data.data.course_title;
            credit_hours.value = response.data.data.course_credit;
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

const save = async () => {
  let formData = {};
  formData.program_id = program_id.value;
  formData.course_code = course_code.value;
  formData.course_title = course_title.value;
  formData.credit_hours = credit_hours.value;

  try {
    if (mode.value === "create") {
      let res = await http
        .post("courses", formData)
        .then((response) => {
          if (response.status === 201) {
            router.push({ name: "courses" });
          }
        })
        .catch((error) => {
          if (error.response.status === 422) {
            errors.value = error.response.data.errors;
            console.log(errors.value);
          }
        });
    }

    if (mode.value === "edit") {
      let res = await http
        .put(`courses/${id.value}`, formData)
        .then((response) => {
          if (response.status === 200) {
            router.push({ name: "courses" });
          }
        })
        .catch((error) => {
          if (error.response.status === 422) {
            errors.value = error.response.data.errors;
            console.log(errors.value);
          }
        });
    }
  } catch (err) {
    // console.log(err)
  }
};

defineExpose({
  program_id,
  course_code,
  course_title,
  credit_hours,
  errors,
  course,
  programs,
  formTitle,
  save,
});
</script>
