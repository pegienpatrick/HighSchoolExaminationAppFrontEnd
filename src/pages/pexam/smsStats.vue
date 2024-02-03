<template>
  <div>
    <VCard>
      <VCardTitle>
        SMS Balance
      </VCardTitle>
      <VCardText>

        <VRow>
          <VCol>
            Remaining SMS Credits : <strong> {{ bal.data }} </strong>
          </VCol>
        </VRow>

        <VRow>

          <!-- <VCol>
            To Recharge, top up your Account via
          </VCol> -->
        </VRow>
        <VRow>
          <VCol>
            SMS Sent Today : <strong>{{ bal.sent }}</strong>
            </VCol>
        </VRow>
        <VRow>
          <VCol>
            Total SMS Failed:<strong> {{ bal.failed }}</strong>
          </VCol>
        </VRow>



      </VCardText>


    </VCard>

  </div>


</template>
<script setup>

const bal=ref({
  data:'',
  sent:'',
  failed:''
})

import axios from 'axios';
import Cookies from 'vue-cookies';
import { useRouter } from 'vue-router';


const router = useRouter();

let apiUrl = window.location.protocol + "//" + window.location.hostname + ":8080";

     

const form=ref({
  
  "year": 2024,
  "term": '',
  "title": ""

})


axios.get(apiUrl + `/api/v1/sms/balance`, {
            headers: {
                Authorization: Cookies.get("Authorization")
            },
        }).then((response)=>{
          console.log(response);
          bal.value.data=response.data;
        }).catch((error)=>{
          console.log(error);
          bal.value.data="Unable to Fetch(check internet)"
        })


        axios.get(apiUrl + `/api/v1/sms/countFailed`, {
            headers: {
                Authorization: Cookies.get("Authorization")
            },
        }).then((response)=>{
          console.log(response);
          bal.value.failed=response.data;
        }).catch((error)=>{
          console.log(error);
          bal.value.failed="Unable to Fetch(check internet)"
        })


        axios.get(apiUrl + `/api/v1/sms/countSentToday`, {
            headers: {
                Authorization: Cookies.get("Authorization")
            },
        }).then((response)=>{
          console.log(response);
          bal.value.sent=response.data;
        }).catch((error)=>{
          console.log(error);
          bal.value.sent="Unable to Fetch(check internet)"
        })





</script>
