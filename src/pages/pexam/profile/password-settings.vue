<script setup>
import { useRoute } from 'vue-router';

import axios from 'axios';
import Cookies from 'vue-cookies';

import { useRouter } from 'vue-router';

const router = useRouter();




// this.user={}
let apiUrl=window.location.protocol+"//"+window.location.hostname+":8080"

const route = useRoute()
const activeTab = ref(route.params.tab)

// tabs
const tabs = [
 
  {
    title: 'Password Settings',
    icon: 'ri-lock-line',
    tab: 'security',
  },
  
]

const isCurrentPasswordVisible = ref(false)
const isNewPasswordVisible = ref(false)
const isConfirmPasswordVisible = ref(false)
const currentPassword = ref('')
const newPassword = ref('')
const confirmPassword = ref('')

const passwordRequirements = [
  'Minimum 8 characters long - the more, the better',
  'At least one lowercase character',
  'At least one number, symbol, or whitespace character',
]


const logoutAll=()=>{
  axios.get(apiUrl+'/api/v1/user/logOutAllDevices',{
      headers:{
        'Content-Type': 'application/json',
        Authorization: Cookies.get("Authorization")
      },

    })
    .then((response) => {
        // Code for handling the response
        console.log(response)
        router.push("/login")
        
      })
}



const updatePassword=()=>{
  
  axios.put(apiUrl+'/api/v1/user/updatePassword',{
    
  "oldPassword": currentPassword.value,
  "newPassword": newPassword.value,
  "confirmPassword": confirmPassword.value

  },{
      headers:{
        'Content-Type': 'application/json',
        Authorization: Cookies.get("Authorization")
      },

    })
    .then((response) => {
        // Code for handling the response
        console.log(response);
        alert(response.data);
    }).catch((error)=>{
      console.log(error);
      alert("Error: " + JSON.stringify(error.response.data));
    })

}






</script>

<template>
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
      

      <!-- Security -->
      <VWindowItem value="security">

        <VRow>
    <!-- SECTION: Change Password -->
    <VCol cols="12">
      <VCard title="Change Password">
        <VForm>
          <VCardText>
            <!-- 👉 Current Password -->
            <VRow class="mb-3">
              <VCol
                cols="12"
                md="6"
              >
                <!-- 👉 current password -->
                <VTextField
                  v-model="currentPassword"
                  :type="isCurrentPasswordVisible ? 'text' : 'password'"
                  :append-inner-icon="isCurrentPasswordVisible ? 'ri-eye-off-line' : 'ri-eye-line'"
                  autocomplete="on"
                  label="Current Password"
                  placeholder="············"
                  @click:append-inner="isCurrentPasswordVisible = !isCurrentPasswordVisible"
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

          <!-- 👉 Password Requirements -->
          <VCardText>
            <p class="text-base font-weight-medium mt-2">
              Password Requirements:
            </p>

            <ul class="d-flex flex-column gap-y-3">
              <li
                v-for="item in passwordRequirements"
                :key="item"
                class="d-flex"
              >
                <div>
                  <VIcon
                    size="7"
                    icon="ri-checkbox-blank-circle-fill"
                    class="me-3"
                  />
                </div>
                <span class="font-weight-medium">{{ item }}</span>
              </li>
            </ul>
          </VCardText>

          <!-- 👉 Action Buttons -->
          <VCardText class="d-flex flex-wrap gap-4">
            <VBtn
            @click="updatePassword"
            >Save changes</VBtn>

            <VBtn
              type="reset"
              color="secondary"
              variant="outlined"
            >
              Reset
            </VBtn>
          </VCardText>
        </VForm>
      </VCard>
    </VCol>
    <!-- !SECTION -->
    </VRow>

    <v-row>
      <v-row>
        <v-col>
          <v-card>
            <v-card-title>
              Logging out from all devices
            </v-card-title>
            <v-card-text>
              <v-row>
                <v-col>
                <p>
                  This could be used incase you forgot to logout on a suspicious device or you suspect your account could have been hacked
                </p>
              </v-col>
              </v-row>
            <v-row><v-col>
            <v-btn
            color="error"
            variant="outlined"
            @click="logoutAll"
            >
            <v-icon
            icon="ri-logout-box-r-line"
            >

            </v-icon>
              Logout Account from All Devices
            </v-btn>
          </v-col></v-row>
        </v-card-text>
          </v-card>
        </v-col>
      </v-row>
    </v-row>
        
      </VWindowItem>

     
    </VWindow>
  </div>
</template>
