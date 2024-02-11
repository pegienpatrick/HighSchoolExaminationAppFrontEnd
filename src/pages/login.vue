<script setup>
import AuthProvider from '@/views/pages/authentication/AuthProvider.vue'
import logo from '@images/logo.svg?raw'
import authV1MaskDark from '@images/pages/auth-v1-mask-dark.png'
import authV1MaskLight from '@images/pages/auth-v1-mask-light.png'
import authV1Tree2 from '@images/pages/auth-v1-tree-2.png'
import authV1Tree from '@images/pages/auth-v1-tree.png'
import { useTheme } from 'vuetify'

import axios from 'axios'
import { ref } from 'vue'

import Cookies from 'vue-cookies'
import { useRouter } from 'vue-router'

const router = useRouter();

// router.push("/")
// router.push("/login")



const form = ref({
  username: '',
  password: '',
  remember: true,
  loginError:''
})


const vuetifyTheme = useTheme()

const authThemeMask = computed(() => {
  return vuetifyTheme.global.name.value === 'light' ? authV1MaskLight : authV1MaskDark
})

const isPasswordVisible = ref(false)


let apiUrl=window.location.protocol+"//"+window.location.hostname+":8080"


let isLoading=false


const login = async () => {
  // preventDefault();
  
  try {
    // console.log(form)
    // console.log({
    //   "username": form.value.username,
    //   "password": form.value.password,
    // })
      isLoading=true;
    const response = await axios.post(apiUrl+'/api/v1/user/login', {
      username: form.value.username,
      password: form.value.password,
    });
  
    // Assuming the login is successful, you might want to handle the response
    console.log(response.data);

    Cookies.set('Authorization', response.data.authorization, '7d');
    // Redirect to home or anothe

    
    router.push('/');
    isLoading=false;
  } catch (error) {

    console.error('Login failed:', error);

    // Handle login failure, show error message, etc.
    if(error.response.status==500)
      form.value.loginError=error.response.data.errors
    else if(error.response.status==400)
      form.value.loginError=error.response.data.message;
    else
      form.value.loginError='Incorrect Login Information';


    isLoading=false;
    
  }
};







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
          Welcome to PExam System! 👋🏻
        </h5>
        <p class="mb-0">
          Please sign-in to your account
        </p>
      </VCardText>

      <VCardText>
        <VForm @submit="() => {preventDefault();login()
        }">
          <VRow>
            <!-- username -->
            <VCol cols="12">
              <VTextField
                v-model="form.username"
                label="username"
                type="text"
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

              <!-- remember me checkbox -->
              <div class="d-flex align-center justify-space-between flex-wrap mt-1 mb-4">
                <VCheckbox
                  v-model="form.remember"
                  label="Remember me"
                />

                <a
                  class="ms-2 mb-1"
                  href="/forgotPassword"
                >
                  Forgot Password?
                </a>
              </div>

              <!-- login button -->
              <VBtn
                block
                type="submit"
                to="/login"
                @click="login"
                
              >
                Login
              </VBtn>
            </VCol>

            
                <VProgressCircular
                  v-if="isLoading"
                  indeterminate
                  color="blue"
                  size="24"
                  style="position: absolute; inset-block-start: 50%; inset-inline-start: 50%; transform: translate(-50%, -50%);"
                ></VProgressCircular>
              

            <!-- create account -->
            <VCol
              cols="12"
              class="text-center text-base"
            >
              <span>New on our System?</span>
              <RouterLink
                class="text-primary ms-2"
                to="/register"
              >
                Create an account
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

          <VCol cols="12" class="text-center">
            <p class="text-h6 font-weight-semibold text-error">{{ form.loginError }}</p>
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

<!-- <script>




const router2 = useRouter();


console.log(router2)

// if(router2.currentRoute!="/login")
//   router2.push("/login")

const money=9;
</script> -->
