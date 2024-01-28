<template>

  <div>

    <VRow>
      <VCol>
        <VCard>
            <VCardTitle>Last 200 Logs</VCardTitle>
            <VCardText>
              <VTextField
              label="Search"
              v-model="logs.search"
              />

              <VDataTable
              :items="logs.data"
              :search="logs.search"
              >

              </VDataTable>

            </VCardText>

        </VCard>

      </VCol>
    </VRow>

  </div>
  
</template>

<script setup>

import axios from 'axios';
import Cookies from 'vue-cookies';

const logs=ref({
  data:[],
  search:''
})







const router = useRouter();

let apiUrl = window.location.protocol + "//" + window.location.hostname + ":8080";

     
let examinationId=router.currentRoute.value.query.examinationId;


const form=ref({
  
  data:[]

})


let classes=['1','2','3','4'];


axios.get(apiUrl + `/api/v1/logs/listLogs`, {
            headers: {
                Authorization: Cookies.get("Authorization")
            },
        })
            .then((response) => {
              logs.value.data=response.data;
              
              for(var i=0;i<logs.value.data.length;i++)
              {
                var date1=new Date(logs.value.data[i].date);
                logs.value.data[i].date=date1
              }
            });




</script>
