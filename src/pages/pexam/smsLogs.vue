<template>
  <div>
    <VCard>
      <VCardTitle>
        LAst 200 Sms
      </VCardTitle>
      <VCardText>
        <VTextField
        label="Search Log"
        v-model="logs.search"
        >
          </VTextField>

        <VDataTable
        :items="logs.data"
        striped
        :search="logs.search"
        >

        </VDataTable>

      </VCardText>
    </VCard>
  </div>


</template>
<script setup>


import axios from 'axios';
import Cookies from 'vue-cookies';
import { useRouter } from 'vue-router';


const router = useRouter();

let apiUrl = window.location.protocol + "//" + window.location.hostname + ":8080";


const logs=ref({
  data:[],
  search:''
})


axios.get(apiUrl+"/api/v1/sms/latest",{
            headers: {
                Authorization: Cookies.get("Authorization")
            },
        }).then((response)=>{
          console.log(response);
          logs.value.data=response.data
        });








</script>
