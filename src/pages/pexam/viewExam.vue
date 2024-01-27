<template>
  
  <div>
  <VRow>

    <VCol >
      <VCard>
        <VCardTitle>
          Exarm Information
        </VCardTitle>
        <VCardText>

          <VForm >

            <VRow>
              <!-- 👉 Exam Title -->
              <VCol>
                <p><strong>Title :</strong></p> {{ form.title }}
              </VCol>
            </VRow>
            <VRow>


              <!-- 👉 Year -->
              <VCol md="6" cols="12">
                <p><strong>Year:</strong></p> {{ form.year }}
              </VCol>


               <!-- 👉 Year -->
               <VCol md="6" cols="12">
                <p><strong>Term : </strong></p>{{ form.term }}
              </VCol>

              <VCol md="6" cols="12">
                <p><strong>Created On : </strong></p>{{ form.date }}
              </VCol>


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


  <VRow v-for="f in classes" :key="f">
    <VCol>
      <VCard>
        <VCardTitle>
          <p><strong>Form {{ f }}</strong></p>
        </VCardTitle>
        <VCardText>
          <VRow>
            <VCol>
              <VBtn
              :to="`/marksSheet?exam=${examinationId}&stage=${f}`"
              text="Marks Entry"
              />
            </VCol>
            <VCol>
              <VBtn
              text="View Merit List"
              />
            </VCol>

            <VCol>
              <VBtn
              text="Generate Merit List"
              />
            </VCol>

            <VCol>
              <VBtn
              text="Reports"
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
  
  "year": 2024,
  "term": '',
  "title": ""

})


let classes=['1','2','3','4'];


axios.get(apiUrl + `/api/v1/examination/viewExamination/${examinationId}`, {
            headers: {
                Authorization: Cookies.get("Authorization")
            },
        })
            .then((response) => {
              form.value=response.data;


            });




</script>
