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
            <label for="teacher_id" class="form-label">Teacher ID <small>*</small></label>
            <input
              id="teacher_id"
              v-model="teacher_id"
              type="text"
              class="form-control w-full"
              placeholder="Input teacher id here..."
            />
            <div class="text-danger mt-2" v-if="errors && errors.teacher_id">
              {{ errors.teacher_id[0] }}
            </div>
          </div>
          <div class="mt-3">
            <label for="crud-form-2" class="form-label">Course</label>
            <TomSelect id="crud-form-2" v-model="course_ids" class="w-full" multiple>
              <option selected disabled>-- Select a course --</option>
              <option :value="course.id" v-for="(course, c) in courses" :key="c">
                {{ course.course_code }} {{ course.course_title }}
              </option>
            </TomSelect>
            <div class="text-danger mt-2" v-if="errors && errors.course_ids">
              {{ errors.course_ids[0] }}
            </div>
          </div>
          <div class="mt-3">
            <label for="title" class="form-label">Teacher Title</label>
            <input
              id="title"
              v-model="title"
              type="text"
              class="form-control w-full"
              placeholder="Md./ Dr./ Prof. etc."
            />
            <div class="text-danger mt-2" v-if="errors && errors.title">
              {{ errors.title[0] }}
            </div>
          </div>
          <div class="mt-3">
            <label for="first_name" class="form-label">First Name <small>*</small></label>
            <input
              id="first_name"
              v-model="first_name"
              type="text"
              class="form-control w-full"
              placeholder="First name"
            />
            <div class="text-danger mt-2" v-if="errors && errors.first_name">
              {{ errors.first_name[0] }}
            </div>
          </div>
          <div class="mt-3">
            <label for="middle_name" class="form-label"
              >Middle Name <small>*</small></label
            >
            <input
              id="middle_name"
              v-model="middle_name"
              type="text"
              class="form-control w-full"
              placeholder="Middle name"
            />
            <div class="text-danger mt-2" v-if="errors && errors.middle_name">
              {{ errors.middle_name[0] }}
            </div>
          </div>
          <div class="mt-3">
            <label for="last_name" class="form-label">Last Name <small>*</small></label>
            <input
              id="last_name"
              v-model="last_name"
              type="text"
              class="form-control w-full"
              placeholder="Last name"
            />
            <div class="text-danger mt-2" v-if="errors && errors.last_name">
              {{ errors.last_name[0] }}
            </div>
          </div>
          <div class="mt-3">
            <label for="crud-form-2" class="form-label"
              >Designation <small>*</small></label
            >
            <TomSelect id="crud-form-2" v-model="designation" class="w-full">
              <option selected disabled>-- Select a designation --</option>
              <option value="professor">Professor</option>
              <option value="associate professor">Associate Professor</option>
              <option value="assistant professor">Assistant Professor</option>
              <option value="lecturer">Lecturer</option>
            </TomSelect>
            <div class="text-danger mt-2" v-if="errors && errors.designation">
              {{ errors.designation[0] }}
            </div>
          </div>
          <div class="mt-3">
            <label>Description</label>
            <div class="mt-2">
              <ClassicEditor v-model="description" :config="editorConfig" />
            </div>
            <div class="text-danger mt-2" v-if="errors && errors.description">
              {{ errors.description[0] }}
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

let course_ids = ref([]);
let courses = ref([]);
let teacher_id = ref("");
let title = ref("");
let first_name = ref("");
let middle_name = ref("");
let last_name = ref("");
let designation = ref("");
let description = ref("");
let errors = ref({});

let teacher = ref({});

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
  http.get("courses", { params: { per_page: -1 } }).then((response) => {
    console.log(response.data);
    courses.value = response.data.data;
  });

  const route = useRoute();
  id.value = parseInt(route.path.split("/")[2]);

  if (isNaN(id.value)) {
    formTitle.value = "Create New Teacher";
    mode.value = "create";
  } else {
    formTitle.value = "Edit Teacher";
    mode.value = "edit";
    try {
      let res = http
        .get(`teachers/${id.value}`, { params: { with: "courses" } })
        .then((response) => {
          if (response.status === 200) {
            // console.log(response.data.data);
            course_ids.value = response.data.data.courses.map((course) => {
              return course.id;
            });
            teacher.value = response.data.data;
            teacher_id.value = response.data.data.teacher_id;
            title.value = response.data.data.title;
            first_name.value = response.data.data.first_name;
            middle_name.value = response.data.data.middle_name;
            last_name.value = response.data.data.last_name;
            designation.value = response.data.data.designation;
            description.value = response.data.data.description;
          }
        })
        .catch((error) => {
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

const save = async () => {
  let formData = {};
  formData.course_id = course_ids.value;
  formData.teacher_id = teacher_id.value;
  formData.title = title.value;
  formData.first_name = first_name.value;
  formData.middle_name = middle_name.value;
  formData.last_name = last_name.value;
  formData.designation = designation.value;
  formData.description = description.value;

  console.log(formData);
  try {
    if (mode.value === "create") {
      let res = await http
        .post("teachers", formData)
        .then((response) => {
          if (response.status === 201) {
            router.push({ name: "teachers" });
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
        .put(`teachers/${id.value}`, formData)
        .then((response) => {
          if (response.status === 200) {
            router.push({ name: "teachers" });
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
  teacher_id,
  title,
  first_name,
  middle_name,
  last_name,
  designation,
  description,
  errors,
  teacher,
  formTitle,
  courses,
  course_ids,
  save,
});
</script>
