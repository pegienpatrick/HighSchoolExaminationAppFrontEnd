<template>
  
  <div>
  <VRow>

    <VCol >
      <VCard>
        <VCardTitle>
          Exam Reports
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

              <VCol md="6" cols="12">
                <p><strong>Form : </strong></p>{{ stage }}
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


  <VRow>
    <VCol>

      <VCard>
        <VCardTitle>
          Student Reports
        </VCardTitle>
        <VCardText>
          <VRow>
            <VCol>
              <VTextField
              label="Enter Student Admission Number"
              v-model="stream.selectedAdm"
              >

              </VTextField>
              
            </VCol>
            <VCol>
              <VBtn
              text="Open Student Report"
              @click="openStudentReport"
              >

              </VBtn>
            </VCol>

            <VCol>
              <VBtn
              text="Send Report SMS"
              @click="sendStudentReport"
              color="success"
              >

              </VBtn>
            </VCol>
          </VRow>
          
        </VCardText>

      </VCard>
    </VCol>

  </VRow>




  <VRow>
    <VCol>

      <VCard>
        <VCardTitle>
          Bulk  Reports
        </VCardTitle>
        <VCardText>
          <v-row>
     
     <v-col>
       <v-select
         label="Select Stream "
         :items="['All','A','B','C']"
         v-model="stream.selectedStream"
       ></v-select>
     </v-col>
     <v-col>
       <VBtn
       text="Fetch Students Reports"
       @click="bulkReports()"
       >
 
       </VBtn>
     </v-col>


     <v-col>
       <VBtn
       text="Send Student Reports SMS"
       @click="smsReports"
       color="success"
       >
 
       </VBtn>
     </v-col>
   </v-row>
          
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
let stage=router.currentRoute.value.query.stage;


const form=ref({
  
  "year": 2024,
  "term": '',
  "title": ""

})

const stream=ref({
  selectedStream:'All',
  selectedAdm:''

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




            const openStudentReport=()=>{
              router.push(`/studentReportCard?examinationId=${examinationId}&admNo=${stream.value.selectedAdm}`)
            }



            const bulkReports=()=>{
              router.push(`/studentReportCards?examinationId=${examinationId}&stage=${stage}&stream=${stream.value.selectedStream}`)
            }

            const sendStudentReport=()=>{
              axios.get(apiUrl + `/api/v1/reportCard/smsReportCard/${examinationId}/${stream.value.selectedAdm}`, {
                  headers: {
                      Authorization: Cookies.get("Authorization")
                  },
              }).then((response)=>{
                console.log(response);
                // bal.value.data=response.data;
                alert(response.data)
                router.push("/smsStats")
              }).catch((error)=>{
                console.log(error);
                // bal.value.data=error.response.data;
                alert("error sending:"+error.response.data);
              })

              
            }

            const smsReports=()=>{
              // /api/v1/reportCard/smsReportCard/{examination}/{student}

              const serverUrl = apiUrl + `/api/v1/reportCard/smsReportCards/${examinationId}/${stage}?stream=${stream.value.selectedStream}`;
    

              axios.get(serverUrl, {
                  headers: {
                      Authorization: Cookies.get("Authorization")
                  },
              }).then((response)=>{
                console.log(response);
                // bal.value.data=response.data;
                alert(response.data);
                router.push("/smsStats")
                
              }).catch((error)=>{
                console.log(error);
                // bal.value.data=error.response.data;
                alert("error sending:"+error.response.data);
              })
              
            }




</script>
