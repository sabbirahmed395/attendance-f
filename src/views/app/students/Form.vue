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
            <label for="student_id" class="form-label">Student ID</label>
            <input
              id="student_id"
              v-model="student_id"
              type="text"
              class="form-control w-full"
              placeholder="Input student id here..."
            />
            <div class="text-danger mt-2" v-if="errors && errors.student_id">
              {{ errors.student_id[0] }}
            </div>
          </div>
          <div class="mt-3">
            <label for="program_id" class="form-label">Programs</label>
            <select
              id="program_id"
              v-model="program_id"
              @change="actionFetchBatches"
              class="w-full"
              style="border-radius: 5px"
            >
              <option>-- Select a Program --</option>
              <option v-for="(program, p) in programs" :key="p" :value="program.id">
                {{ program.name }}
              </option>
            </select>
            <div class="text-danger mt-2" v-if="errors && errors.program_id">
              {{ errors.program_id[0] }}
            </div>
          </div>
          <div class="mt-3">
            <label for="batch_id" class="form-label">Batches</label>
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
            <label for="title" class="form-label">Student Title</label>
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
            <label for="first_name" class="form-label">First Name</label>
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
            <label for="middle_name" class="form-label">Middle Name</label>
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
            <label for="last_name" class="form-label">Last Name</label>
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

          <!-- <div class="mt-3">
            <label>Description</label>
            <div class="mt-2">
              <ClassicEditor v-model="description" :config="editorConfig" />
            </div>
            <div class="text-danger mt-2" v-if="errors && errors.description">
              {{ errors.description[0] }}
            </div>
          </div> -->
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
let batch_id = ref("");
let student_id = ref("");
let title = ref("");
let first_name = ref("");
let middle_name = ref("");
let last_name = ref("");
// let description = ref("");
let errors = ref({});

let student = ref({});
let programs = ref([]);
let batches = ref([]);

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
    programs.value = Object.assign({}, response.data.data);
  });

  const route = useRoute();
  id.value = parseInt(route.path.split("/")[2]);

  if (isNaN(id.value)) {
    formTitle.value = "Create New Student";
    mode.value = "create";
  } else {
    formTitle.value = "Edit Student";
    mode.value = "edit";
    try {
      let res = http
        .get(`students/${id.value}`)
        .then((response) => {
          if (response.status === 200) {
            student.value = response.data.data;
            program_id.value = response.data.data.batch.program_id;
            actionFetchBatches();
            batch_id.value = response.data.data.batch_id;
            student_id.value = response.data.data.student_id;
            title.value = response.data.data.title;
            first_name.value = response.data.data.first_name;
            middle_name.value = response.data.data.middle_name;
            last_name.value = response.data.data.last_name;
            // description.value = response.data.data.description;
          }
        })
        .catch((error) => {
          console.log(error);
          if (error.response.status === 404) {
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

const actionFetchBatches = async () => {
  try {
    http.get(`programs/${program_id.value}/batches`).then((response) => {
      batches.value = Object.assign({}, response.data.data);
    });
  } catch (err) {
    console.log(err);
  }
};

const save = async () => {
  let formData = {};
  formData.batch_id = batch_id.value;
  formData.student_id = student_id.value;
  formData.title = title.value;
  formData.first_name = first_name.value;
  formData.middle_name = middle_name.value;
  formData.last_name = last_name.value;
  // formData.description = description.value;

  try {
    if (mode.value === "create") {
      let res = await http
        .post("students", formData)
        .then((response) => {
          if (response.status === 201) {
            router.push({ name: "students" });
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
        .put(`students/${id.value}`, formData)
        .then((response) => {
          if (response.status === 200) {
            router.push({ name: "students" });
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
  batch_id,
  student_id,
  title,
  first_name,
  middle_name,
  last_name,
  // description,
  errors,
  student,
  programs,
  batches,
  actionFetchBatches,
  formTitle,
  save,
});
</script>
