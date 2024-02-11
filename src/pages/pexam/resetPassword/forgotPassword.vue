<script setup>
import logo from '@images/logo.svg?raw';
import { useRoute } from 'vue-router';

import axios from 'axios';

import { useRouter } from 'vue-router';

const router = useRouter();

const route = useRoute()
const activeTab = ref(route.params.tab)

// tabs
const tabs = [
  {
    title: 'Email Reset',
    icon: 'ri-mail-fill',
    tab: 'emailReset',
  },
  {
    title: 'Sms Reset',
    icon: 'ri-chat-1-fill',
    tab: 'smsReset',
  }
]



let apiUrl=window.location.protocol+"//"+window.location.hostname+":8080"

const phoneNumberRules= [
        (v) => !!v || "Phone number is required",
        (v) =>
          /^\d+$/.test(v) || "Phone number should only contain digits",
        (v) => v.length === 10 || "Phone number should be 10 digits",
      ]


      const form=ref({
        username:'',
        email:'',
        phone:'',
        smsError:'',
        emailError:'',
        success:false,
        msg:''
      })

      let isLoading=false;


      const ispasswordResetCodeVisible = ref(false)
      const isNewPasswordVisible = ref(false)
      const isConfirmPasswordVisible = ref(false)
      const passwordResetCode = ref('')
      const newPassword = ref('')
      const confirmPassword = ref('')



      const emailResetPassword=()=>{
        
        axios.post(apiUrl+'/api/v1/user/emailForgotPassword',form.value)
        .then((response)=>{
          console.log(response);
          form.value.emailError='';
          form.value.success=true;
          form.value.msg=response.data;
        }).catch((error)=>{
          console.log(error);
          form.value.emailError=JSON.stringify(error.response.data)
        })
      }

      const smsResetPassword=()=>{
        
        axios.post(apiUrl+'/api/v1/user/smsForgotPassword',form.value)
        .then((response)=>{
          console.log(response);
          form.value.smsError=''
          form.value.success=true;
          form.value.msg=response.data;
        }).catch((error)=>{
          console.log(error);
          form.value.smsError=JSON.stringify(error.response.data)
        })
      }


      const updatePassword=()=>{
        
        axios.post(apiUrl+'/api/v1/user/passwordReset',
        {
          "username": form.value.username,
          "resetCode": passwordResetCode.value,
          "newPassword": newPassword.value,
          "confirmPassword": confirmPassword.value
        })
        .then((response)=>{
          console.log(response);
          alert(response.data)
          router.push("/login")
          
        }).catch((error)=>{
          console.log(error);
          alert(JSON.stringify(error.response.data))
          
        })

      }


</script>

<template>
  <VDialog
  v-model="form.success"
  >
   
    <VRow>
    <!-- SECTION: Change Password -->
    <VCol cols="12">
      <VCard>
        <VCardTitle>
          Reset Password
        </VCardTitle>
        <VForm>
          <VCardItem>
          <p>{{ form.msg }}</p>
        </VCardItem>
          <VCardText>
            <!-- 👉 Current Password -->
            <VRow class="mb-3">
              <VCol
                cols="12"
                md="6"
              >
                <!-- 👉 current password -->
                <VTextField
                  v-model="passwordResetCode"
                  :type="ispasswordResetCodeVisible ? 'text' : 'password'"
                  :append-inner-icon="ispasswordResetCodeVisible ? 'ri-eye-off-line' : 'ri-eye-line'"
                  autocomplete="on"
                  label="Password Reset Code"
                  placeholder=" 0 0 0 0 0 0 "
                  @click:append-inner="ispasswordResetCodeVisible = !ispasswordResetCodeVisible"
                />
              </VCol>
            </VRow>

            <!-- 👉 New Password -->
            <VRow>
              <VCol
                cols="12"
                md="6"
              >
                <!-- 👉 new password -->
                <VTextField
                  v-model="newPassword"
                  :type="isNewPasswordVisible ? 'text' : 'password'"
                  :append-inner-icon="isNewPasswordVisible ? 'ri-eye-off-line' : 'ri-eye-line'"
                  label="New Password"
                  autocomplete="on"
                  placeholder="············"
                  @click:append-inner="isNewPasswordVisible = !isNewPasswordVisible"
                />
              </VCol>

              <VCol
                cols="12"
                md="6"
              >
                <!-- 👉 confirm password -->
                <VTextField
                  v-model="confirmPassword"
                  :type="isConfirmPasswordVisible ? 'text' : 'password'"
                  :append-inner-icon="isConfirmPasswordVisible ? 'ri-eye-off-line' : 'ri-eye-line'"
                  autocomplete="on"
                  label="Confirm New Password"
                  placeholder="············"
                  @click:append-inner="isConfirmPasswordVisible = !isConfirmPasswordVisible"
                />
                
          </VCol>
        </VRow>


        </VCardText>

        <VCardText class="d-flex flex-wrap gap-4">
            <VBtn
            @click="updatePassword"
            >Reset Password</VBtn>

            
          </VCardText>

        </VForm>
        </VCard>
        </VCol>
        </VRow>
        
        
     
  </VDialog>
  



  <div>
    <VTabs
      v-model="activeTab"
      show-arrows
    >
      <VTab
        v-for="item in tabs"
        :key="item.icon"
        :value="item.tab"
      >
        <VIcon
          size="20"
          start
          :icon="item.icon"
        />
        {{ item.title }}
      </VTab>
    </VTabs>

    <VWindow
      v-model="activeTab"
      class="mt-5 disable-tab-transition"
      :touch="false"
    >
     
      <VWindowItem value="emailReset">
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
          Please Enter your Username and phone to send password reset code.
        </p>
      </VCardText>

      <VCardText>
        <VForm @submit="() => {preventDefault();emailResetPassword();return false;
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

           
            <VCol cols="12">
              <VTextField
                type="email"
                v-model="form.email"
                mask="email"
                label="Enter Email"
              />

              <!-- remember me checkbox -->
              <div class="d-flex align-center justify-space-between flex-wrap mt-1 mb-4">
                
              </div>

              <!-- login button -->
              <VBtn
                block
                type="submit"
                @click.prevent="emailResetPassword"
              >
                Send Reset Code
              </VBtn>
            </VCol>

            
                <VProgressCircular
                  v-if="isLoading"
                  indeterminate
                  color="blue"
                  size="24"
                  style="position: absolute; inset-block-start: 50%; inset-inline-start: 50%; transform: translate(-50%, -50%);"
                ></VProgressCircular>
              

            
            <VCol
              cols="12"
              class="text-center text-base"
            >
             
              <RouterLink
                class="text-primary ms-2"
                to="/login"
              >
                Back To Login
              </RouterLink>
            </VCol>

            <VCol
              v-if="false"
              cols="12"
              class="d-flex align-center"
            >
              <VDivider />
             
              <VDivider />
            </VCol>

          <VCol cols="12" class="text-center">
            <p class="text-h6 font-weight-semibold text-error">{{ form.emailError }}</p>
          </VCol>

            <!-- auth providers -->
            
           
          </VRow>
        </VForm>
      </VCardText>
    </VCard>

    
  </div>





        
      </VWindowItem>



     
      <VWindowItem value="smsReset">

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
          Please Enter your Username and email to send password reset code.
        </p>
      </VCardText>

      <VCardText>
        <VForm @submit="() => {preventDefault();smsResetPassword();return false;
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

           
            <VCol cols="12">
              <VTextField
                type="tel"
                :rules="phoneNumberRules"
                mask="phone"
                label="Phone Number"
                v-model="form.phone"
              />

              <!-- remember me checkbox -->
              <div class="d-flex align-center justify-space-between flex-wrap mt-1 mb-4">
                
              </div>

              <!-- login button -->
              <VBtn
                block
                type="submit"
                @click.prevent="smsResetPassword"
              >
                Send Reset Code
              </VBtn>
            </VCol>

            
                <VProgressCircular
                  v-if="isLoading"
                  indeterminate
                  color="blue"
                  size="24"
                  style="position: absolute; inset-block-start: 50%; inset-inline-start: 50%; transform: translate(-50%, -50%);"
                ></VProgressCircular>
              

            
            <VCol
              cols="12"
              class="text-center text-base"
            >
             
              <RouterLink
                class="text-primary ms-2"
                to="/login"
              >
                Back To Login
              </RouterLink>
            </VCol>

            <VCol
              v-if="false"
              cols="12"
              class="d-flex align-center"
            >
              <VDivider />
             
              <VDivider />
            </VCol>

          <VCol cols="12" class="text-center">
            <p class="text-h6 font-weight-semibold text-error">{{ form.smsError }}</p>
          </VCol>

            <!-- auth providers -->
            
           
          </VRow>
        </VForm>
      </VCardText>
    </VCard>

    
  </div>
        
      </VWindowItem>

     
    </VWindow>
  </div>
</template>

<style lang="scss">
@use "@core/scss/pages/page-auth.scss";
</style>
