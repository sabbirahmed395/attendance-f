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
          <div class="mt-3">
            <label for="email" class="form-label">Email</label>
            <input
              id="email"
              v-model="email"
              type="text"
              class="form-control w-full"
              placeholder="user@example.com"
            />
            <div class="text-danger mt-2" v-if="errors && errors.email">
              {{ errors.email[0] }}
            </div>
          </div>
          <div class="mt-3">
            <label for="password" class="form-label">Password</label>
            <input
              id="password"
              v-model="password"
              type="password"
              class="form-control w-full"
              placeholder="password"
            />
            <div class="text-danger mt-2" v-if="errors && errors.password">
              {{ errors.password[0] }}
            </div>
          </div>
          <div class="mt-3">
            <label for="mobile" class="form-label">Mobile</label>
            <input
              id="mobile"
              v-model="mobile"
              type="text"
              class="form-control w-full"
              placeholder="01xxxxxxxxx"
            />
            <div class="text-danger mt-2" v-if="errors && errors.mobile">
              {{ errors.mobile[0] }}
            </div>
          </div>
          <div class="mt-3">
            <label for="gender" class="form-label">Gender</label>
            <select
              id="gender"
              v-model="gender"
              class="w-full"
              style="border-radius: 4px"
            >
              <option selected disabled>-- Select a gender --</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
            </select>
            <div class="text-danger mt-2" v-if="errors && errors.designation">
              {{ errors.designation[0] }}
            </div>
          </div>
          <div class="mt-3">
            <label for="user_type" class="form-label">User Type</label>
            <select
              id="user_type"
              v-model="user_type"
              class="w-full"
              style="border-radius: 4px"
            >
              <option selected disabled>-- Select an user type --</option>
              <option value="admin">Admin</option>
              <option value="teacher">Teacher</option>
            </select>
            <div class="text-danger mt-2" v-if="errors && errors.user_type">
              {{ errors.user_type[0] }}
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

let teacher_id = ref("");
let user_id = ref("");
let first_name = ref("");
let last_name = ref("");
let email = ref("");
let password = ref("");
let mobile = ref("");
let gender = ref("");
let user_type = ref("");
let errors = ref({});

let user = ref({});

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
  first_name.value = localStorage.getItem("creating_user_first_name");
  last_name.value = localStorage.getItem("creating_user_last_name");
  user_type.value = localStorage.getItem("creating_user_type");
  teacher_id.value = localStorage.getItem("creating_user_id");

  const route = useRoute();
  id.value = parseInt(route.path.split("/")[2]);

  if (isNaN(id.value)) {
    formTitle.value = "Create New User";
    mode.value = "create";
  } else {
    formTitle.value = "Edit User";
    mode.value = "edit";
    try {
      let res = http
        .get(`users/${id.value}`)
        .then((response) => {
          if (response.status === 200) {
            user.value = response.data.data;
            first_name.value = response.data.data.first_name;
            last_name.value = response.data.data.last_name;
            email.value = response.data.data.email;
            mobile.value = response.data.data.mobile;
            gender.value = response.data.data.gender;
            user_type.value = response.data.data.user_type;
          }
        })
        .catch((error) => {
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

const save = async () => {
  let formData = {};
  if (teacher_id.value && teacher_id.value.length > 0) {
    formData.teacher_id = teacher_id.value;
  }
  formData.first_name = first_name.value;
  formData.last_name = last_name.value;
  formData.email = email.value;
  formData.password = password.value;
  formData.mobile = mobile.value;
  formData.gender = gender.value;
  formData.user_type = user_type.value;

  console.log(formData);
  try {
    if (mode.value === "create") {
      let res = await http
        .post("users", formData)
        .then((response) => {
          if (response.status === 201) {
            localStorage.removeItem("creating_user_first_name");
            localStorage.removeItem("creating_user_last_name");
            localStorage.removeItem("creating_user_type");
            localStorage.removeItem("creating_user_id");
            router.push({ name: "users" });
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
        .put(`users/${id.value}`, formData)
        .then((response) => {
          if (response.status === 200) {
            router.push({ name: "users" });
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
  user_id,
  teacher_id,
  first_name,
  last_name,
  email,
  password,
  mobile,
  gender,
  user_type,
  errors,
  user,
  formTitle,
  save,
});
</script>
