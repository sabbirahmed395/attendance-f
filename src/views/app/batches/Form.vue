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
            <label for="batch_no" class="form-label">Batch No.</label>
            <input
              id="batch_no"
              v-model="batch_no"
              type="text"
              class="form-control w-full"
              placeholder="Input batch no here..."
            />
            <div class="text-danger mt-2" v-if="errors && errors.batch_no">
              {{ errors.batch_no[0] }}
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
let batch_no = ref("");
let errors = ref({});

let batch = ref({});
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
    formTitle.value = "Create New Batch";
    mode.value = "create";
  } else {
    formTitle.value = "Edit Batch";
    mode.value = "edit";
    try {
      let res = http
        .get(`batches/${id.value}`)
        .then((response) => {
          if (response.status === 200) {
            batch.value = response.data.data;
            program_id.value = response.data.data.program_id;
            batch_no.value = response.data.data.batch_no;
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
  formData.batch_no = batch_no.value;

  try {
    if (mode.value === "create") {
      let res = await http
        .post("batches", formData)
        .then((response) => {
          if (response.status === 201) {
            router.push({ name: "batches" });
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
        .put(`batches/${id.value}`, formData)
        .then((response) => {
          if (response.status === 200) {
            router.push({ name: "batches" });
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
  batch_no,
  errors,
  batch,
  programs,
  formTitle,
  save,
});
</script>
