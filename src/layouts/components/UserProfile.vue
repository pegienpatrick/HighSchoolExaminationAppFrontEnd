<script setup>
import avatar1 from '@images/avatars/avatar-1.png';
import axios from 'axios';

import { useRouter } from 'vue-router';

const router = useRouter();

import Cookies from 'vue-cookies';


// this.user={}
let apiUrl=window.location.protocol+"//"+window.location.hostname+":8080"
const activeUser=({
  userInfo:{}
})


axios.get(apiUrl+'/api/v1/user/userInfo',{
  headers:{
    'Content-Type': 'application/json',
    Authorization: Cookies.get("Authorization")
  },

})
.then((response) => {
    // Code for handling the response
    console.log(response)
    activeUser.userInfo=response.data
    console.log(activeUser)
  })
  .catch((error) => {
    // Code for handling the error
    console.log(error)
    if (error.response && error.response.status === 401||error.response.status === 403) {
      // Redirect to the login page
      router.push('/login');
    }

  })


  const logOut=()=>{

    axios.get(apiUrl+'/api/v1/user/logOut',{
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


</script>

<template>
  <VBadge
    dot
    location="bottom right"
    offset-x="3"
    offset-y="3"
    color="success"
    bordered
  >
    <VAvatar
      class="cursor-pointer"
      color="primary"
      variant="tonal"
    >
      <VImg :src="avatar1" />

      <!-- SECTION Menu -->
      <VMenu
        activator="parent"
        width="230"
        location="bottom end"
        offset="14px"
      >
        <VList>
          <!-- 👉 User Avatar & Name -->
          <VListItem>
            <template #prepend>
              <VListItemAction start>
                <VBadge
                  dot
                  location="bottom right"
                  offset-x="3"
                  offset-y="3"
                  color="success"
                >
                  <VAvatar
                    color="primary"
                    variant="tonal"
                  >
                    <VImg :src="avatar1" />
                  </VAvatar>
                </VBadge>
              </VListItemAction>
            </template>

            <VListItemTitle class="font-weight-semibold">
              {{ activeUser.userInfo.username }}
            </VListItemTitle>
            <VListItemSubtitle>{{ activeUser.userInfo.fname }}</VListItemSubtitle>
          </VListItem>
          <VDivider class="my-2" />

          <!-- 👉 Profile -->
          <VListItem link>
            <template #prepend>
              <VIcon
                class="me-2"
                icon="ri-user-line"
                size="22"
              />
            </template>

            <VListItemTitle>Profile</VListItemTitle>
          </VListItem>

          <!-- 👉 Settings -->
          <VListItem link>
            <template #prepend>
              <VIcon
                class="me-2"
                icon="ri-settings-4-line"
                size="22"
              />
            </template>

            <VListItemTitle>Settings</VListItemTitle>
          </VListItem>

         

          

          <!-- Divider -->
          <VDivider class="my-2" />

          <!-- 👉 Logout -->
          <VListItem @click="logOut">
            <template #prepend>
              <VIcon
                class="me-2"
                icon="ri-logout-box-r-line"
                size="22"
              />
            </template>

            <VListItemTitle>Logout</VListItemTitle>
          </VListItem>
        </VList>
      </VMenu>
      <!-- !SECTION -->
    </VAvatar>
  </VBadge>
</template>


