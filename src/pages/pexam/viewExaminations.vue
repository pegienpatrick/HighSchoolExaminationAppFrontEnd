<template>
  
  <div>
  <VRow>

    <VCol >
      <VCard>
        <VCardTitle>
          Term Examinations
        </VCardTitle>
        <VCardText>

          <VForm >

            <VRow>
              <!-- 👉 Year -->
           <VCol md="6" cols="12">
                <p><strong>Term : </strong></p>{{ term }}
              </VCol>
              
          <!-- 👉 Year -->
          <VCol md="6" cols="12">
                <p><strong>Year:</strong></p> {{ year }}
              </VCol>
          </VRow>

            <VRow>
              <!-- 👉 Exam Title -->
              <VCol>
                <p><strong>Total Exams :</strong></p> {{ form.data.length }}
              </VCol>
            </VRow>
            <VRow>
              <VCol>
                <VBtn
                text="Term Summary Exam"
                >
                  <VIcon
                  icon="ri-bar-chart-2-line"
                  ></VIcon>

                 
                  Term Summary Exam

                  
                </VBtn>

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
          <p><strong>{{ examination.title }}</strong></p>
        </VCardTitle>
        <VCardText>
          <VRow>

            


              

              <VCol md="6" cols="12">
                <p><strong>Created On : </strong></p>{{ examination.date }}
              </VCol>
               <!-- 👉 Year -->
               <VCol md="6" cols="12">
                <p><strong>Form : </strong></p>{{ examination.grade }}
              </VCol>

            
            <VCol>
              <VBtn
              :to="`/viewExam?examinationId=${examination.num}`"
              text="Open Examination"
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

let term=router.currentRoute.value.query.term;
let year=router.currentRoute.value.query.year;


const form=ref({
  
  data:[]

})


let classes=['1','2','3','4'];


axios.get(apiUrl + `/api/v1/examination/listTermExaminations?term=${term}&year=${year}`, {
            headers: {
                Authorization: Cookies.get("Authorization")
            },
        })
            .then((response) => {
              form.value.data=response.data;


            });




</script>
