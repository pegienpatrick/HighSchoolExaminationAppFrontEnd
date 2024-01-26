<script setup>
import AuthProvider from '@/views/pages/authentication/AuthProvider.vue'
import logo from '@images/logo.svg?raw'
import authV1MaskDark from '@images/pages/auth-v1-mask-dark.png'
import authV1MaskLight from '@images/pages/auth-v1-mask-light.png'
import authV1Tree2 from '@images/pages/auth-v1-tree-2.png'
import authV1Tree from '@images/pages/auth-v1-tree.png'
import { useTheme } from 'vuetify'

import swal from 'sweetalert2'



import axios from 'axios'
// import Vue from 'vue'



const form = ref({
  fullname: '',
  gender: '',
  username: '',
  email: '',
  phone: '',
  password: '',
  confirmPassword: '',
  privacyPolicies: false,
})

const vuetifyTheme = useTheme()

let isLoading=false

const authThemeMask = computed(() => {
  return vuetifyTheme.global.name.value === 'light' ? authV1MaskLight : authV1MaskDark
})

const isPasswordVisible = ref(false)

let apiUrl=window.location.protocol+"//"+window.location.hostname+":8080"

let availableGenders=[];

axios.get(apiUrl+"/api/v1/user/possibleGenders").then((response)=>{
  console.log(response)
  console.log(availableGenders)
  // availableGenders=["Male"]
  // Vue.set(this, 'availableGenders', response.data);
  // console.log(availableGenders)
  // availableGenders.push(response.data)
  // console.log(availableGenders)
  availableGenders=response.data
  form.value.gender = availableGenders[-1];

});

const showSuccessAlert = async () => {
  try {
    const result = await swal.fire({
      title: 'Success!',
      text: 'Your registration was successful.',
      icon: 'success',
      confirmButtonText: 'Go to Login',
    });

    if (result.isConfirmed) {
      // Redirect to the login page using window.location.href
      window.location.href = '/';
      // router.push('/login')
    }
  } catch (error) {
    console.error('Error displaying SweetAlert:', error);
  }
};


const register=()=>{

  if(form.value.password!=form.value.confirmPassword)
  {
    form.value.registerError="passwords dont match"
    return;
  }
  
  console.log(JSON.stringify(form.value))
  axios.post(apiUrl+"/api/v1/user/registerUser",
    form.value
  ,).then((response)=>{
  console.log(response)

  form.value={}
  showSuccessAlert();




  }
  ).catch((error)=>
  {
    console.log(error);
    if(error.response.status==400)
      form.value.registerError=error.response.data.fielderrors
    else
      form.value.registerError=error.response.data;
    // for(var i=0;i<error.response.data.fielderrors.length;i++)
    // if(i==0)
    //   form.value.registerError="<li>"+Object.values(JSON.parse(error.response.data.fielderrors[i]))+"</li>";
    // else
    //   form.value.registerError+=" <li> "+Object.values(JSON.parse(error.response.data.fielderrors[i]))+"</li>";
  })
  
}




</script>

<template>
  <!-- eslint-disable vue/no-v-html -->

  <div class="auth-wrapper d-flex align-center justify-center pa-4">
    <VCard
      class="auth-card pa-4 pt-7"
      max-width="448"
    >
      <VCardItem class="justify-center">
        <template #prepend>
          <div class="d-flex">
            <div v-html="logo" />
          </div>
        </template>

        <VCardTitle class="font-weight-semibold text-2xl text-uppercase">
          PExam System
        </VCardTitle>
      </VCardItem>

      <VCardText class="pt-2">
        <h5 class="text-h5 font-weight-semibold mb-1">
          Success starts here 🚀
        </h5>
        <p class="mb-0">
          Make your Exam management easy and fun!
        </p>
      </VCardText>

      <VCardText>
      <VCol cols="12" class="text-center">
            <p class="text-h6 font-weight-semibold text-error">{{ form.registerError }}</p>
          </VCol>
           <VProgressCircular
                  v-if="isLoading"
                  indeterminate
                  color="blue"
                  size="24"
                  style="position: absolute; inset-block-start: 50%; inset-inline-start: 50%; transform: translate(-50%, -50%);"
                ></VProgressCircular>

        <VForm @submit.prevent="() => {register()}">

          <VRow>
            <!-- Fullname -->
            <VCol cols="12">
              <VTextField
                v-model="form.fullname"
                label="Full name"
                placeholder="Full Name"
              />
            </VCol>

            <!-- Gender -->
            <VCol cols="12">
              <!-- <VTextField
                v-model="form.username"
                label="Username"
                placeholder="Johndoe"
              /> -->
              <VSelect
                v-model:model-value="form.gender"
                :items="availableGenders"
                label="Gender"
              />

            </VCol>

            <!-- Username -->
            <VCol cols="12">
              <VTextField
                v-model="form.username"
                label="Username"
                placeholder="username"
              />
            </VCol>
            <!-- email -->
            <VCol cols="12">
              <VTextField
                v-model="form.email"
                label="Email"
                placeholder="ENter email"
                type="email"
              />
            </VCol>

            <!-- phone -->
            <VCol cols="12">
              <VTextField
                v-model="form.phone"
                label="Phone"
                placeholder="Enter Phone"
                type="tel"
              />
            </VCol>

            <!-- password -->
            <VCol cols="12">
              <VTextField
                v-model="form.password"
                label="Password"
                placeholder="············"
                :type="isPasswordVisible ? 'text' : 'password'"
                :append-inner-icon="isPasswordVisible ? 'ri-eye-off-line' : 'ri-eye-line'"
                @click:append-inner="isPasswordVisible = !isPasswordVisible"
              />
              </VCol>

              <VCol cols="12">
              <VTextField
                v-model="form.confirmPassword"
                label="Confirm Password"
                placeholder="············"
                :type="isPasswordVisible ? 'text' : 'password'"
                :append-inner-icon="isPasswordVisible ? 'ri-eye-off-line' : 'ri-eye-line'"
                @click:append-inner="isPasswordVisible = !isPasswordVisible"
              />
              <div class="d-flex align-center mt-1 mb-4">
                <VCheckbox
                  id="privacy-policy"
                  v-model="form.privacyPolicies"
                  inline
                />
                <VLabel
                  for="privacy-policy"
                  style="opacity: 1;"
                >
                  <span class="me-1">I agree to</span>
                  <a
                    href="javascript:void(0)"
                    class="text-primary"
                  >privacy policy & terms</a>
                </VLabel>
              </div>

              <VBtn
                block
                type="submit"
               
                @click.prevent="register"
              >
                Sign up
              </VBtn>
            </VCol>

            <!-- login instead -->
            <VCol
              cols="12"
              class="text-center text-base"
            >
              <span>Already have an account?</span>
              <RouterLink
                class="text-primary ms-2"
                to="login"
              >
                Sign in instead
              </RouterLink>
            </VCol>

            <VCol
              v-if="false"
              cols="12"
              class="d-flex align-center"
            >
              <VDivider />
              <span class="mx-4">or</span>
              <VDivider />
            </VCol>

            <!-- auth providers -->
            <VCol
            v-if="false"
              cols="12"
              class="text-center"
            >
              <AuthProvider />
            </VCol>
          </VRow>
        </VForm>
      </VCardText>
    </VCard>

    <VImg
      class="auth-footer-start-tree d-none d-md-block"
      :src="authV1Tree"
      :width="250"
    />

    <VImg
      :src="authV1Tree2"
      class="auth-footer-end-tree d-none d-md-block"
      :width="350"
    />

    <!-- bg img -->
    <VImg
      class="auth-footer-mask d-none d-md-block"
      :src="authThemeMask"
    />
  </div>
</template>

<style lang="scss">
@use "@core/scss/pages/page-auth.scss";
</style>
