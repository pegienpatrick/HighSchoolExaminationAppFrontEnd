<template>


<div>
  <VRow>

    <VCol >
      <VCard>
        <VCardTitle>
          Creating New Exam
        </VCardTitle>
        <VCardText>

          <VForm @submit="preventDefault();submitform();">

            <VRow>
              <!-- 👉 Exam Title -->
              <VCol>
                <VTextField
                  placeholder="Exam Title (e.g Mid term Exam)"
                  label="Exam Title"
                  type="text"
                  required
                  v-model="form.title"
                />
              </VCol>
            </VRow>
            <VRow>


              <!-- 👉 Year -->
              <VCol md="6" cols="12">
                <VTextField
                  placeholder="Enter Year (e.g 2017)"
                  label="Year"
                  type="number"
                  min="2000"
                  v-model="form.year"
                />
              </VCol>


               <!-- 👉 Year -->
               <VCol md="6" cols="12">
                <VSelect
                  placeholder="Select Term"
                  label="Term"
                  :items="['1','2',3]"
                  required
                  v-model="form.term"
                />
              </VCol>


            </VRow>
            <VRow>
              <VCol>
            <VBtn
            text="Create Exam"
            type="Submit"
            @click.prevent="submitForm()"
            />
          </VCol>
          </VRow>
        
          </VForm>

        </VCardText>

      </VCard>

    </VCol>

  </VRow>




</div>
  
</template>

<script setup>

import { useRouter } from 'vue-router';

import axios from 'axios';
import Cookies from 'vue-cookies';

const router = useRouter();

let apiUrl = window.location.protocol + "//" + window.location.hostname + ":8080";

     


const form=ref({
  
  "year": 2024,
  "term": '',
  "title": ""

})


const submitForm=()=>{

  axios.post(apiUrl +"/api/v1/examination/newExamination",form.value, {
          headers: {
              Authorization: Cookies.get("Authorization")
          },
      }).then((response) => {
              console.log(response);
              // guardians.value.data=response.data;
              let exam=response.data.examinationId;
              router.push(`/viewExam?examinationId=${exam}`)

          })
        .catch((error)=>{
          console.log(error)

          var cont=""
          if(error.response.data.message)
            cont=error.response.data.message
          else
            cont=error.response.data;
          alert("error "+cont);

        })
      }




const submit=()=>{

}




</script>
