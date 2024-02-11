<template>
  
  <div>
  <VRow>

    <VCol >
      <VCard>
        <VCardTitle>
          All Terms
        </VCardTitle>
        <VCardText>

          <VForm >

            <VRow>
              <!-- 👉 Exam Title -->
              <VCol>
                <p><strong>Total :</strong></p> {{ form.data.length }}
              </VCol>
            </VRow>
            <VRow>


             

            </VRow>
            <VRow>
              <VCol>
           
          </VCol>
          </VRow>
        
          </VForm>

        </VCardText>

      </VCard>

    </VCol>

  </VRow>


  <VRow v-for="examination in form.data" :key="examination.num">
    <VCol>
      <VCard>
        <VCardTitle>
          <!-- <p><strong>Form {{ examination.title }}</strong></p> -->
          <VRow>
           <!-- 👉 Year -->
           <VCol md="6" cols="12">
                <p><strong>Term : </strong></p>{{ examination.term }}
              </VCol>
              
          <!-- 👉 Year -->
          <VCol md="6" cols="12">
                <p><strong>Year:</strong></p> {{ examination.year }}
              </VCol>

            </VRow>
              
        </VCardTitle>
        <VCardText>
          <VRow>

             

              
            
            <VCol>
              <VBtn
              :to="`/viewExaminations?term=${examination.term}&year=${examination.year}`"
              text="Open Term"
              />
            </VCol>

            
            

          </VRow>
          
          
        </VCardText>

      </VCard>
      
    </VCol>

  </VRow>




</div>

</template>

<script setup>

import axios from 'axios';
import Cookies from 'vue-cookies';
import { useRouter } from 'vue-router';


const router = useRouter();

let apiUrl = window.location.protocol + "//" + window.location.hostname + ":8080";

     
let examinationId=router.currentRoute.value.query.examinationId;


const form=ref({
  
  data:[]

})


let classes=['1','2','3','4'];


axios.get(apiUrl + `/api/v1/examination/listTerms`, {
            headers: {
                Authorization: Cookies.get("Authorization")
            },
        })
            .then((response) => {
              form.value.data=response.data;


            });




</script>
