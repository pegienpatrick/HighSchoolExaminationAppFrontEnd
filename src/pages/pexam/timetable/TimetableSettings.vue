<template>


  <div>
    <VRow>
  
      <VCol >
        <VCard>
          <VCardTitle>
            Select Forms With Selected Subjects
          </VCardTitle>
          <VCardText>
  
            <VForm @submit="preventDefault();submitform();">
  
              
  
              <VRow>
                <VCol md="6" cols="12">
                  <VCheckbox v-for="f in classes" :key="f" :label="`Form ${f}`" v-model="form.grades" ></VCheckbox>
                </VCol>
              </VRow>
  
  
  
              <VRow>
                <VCol>
              <VBtn
              text="Update Changes"
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
    "title": "",
    grades:[],
    sel:{},
  
  })
  
  let classes=['1','2','3','4'];
  
  const submitForm=()=>{
    form.value.grades=[]
    for(const ff in form.value.sel)
      if(form.value.sel[ff])
      form.value.grades.push(ff);
  
    axios.post(apiUrl +"/api/v1/timetable/setSpecializedGrades",form.value, {
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

  axios.get(apiUrl +"/api/v1/timetable/getSpecializedGrades", {
            headers: {
                Authorization: Cookies.get("Authorization")
            },
        }).then((response) => {
                console.log(response);
                form.value.grades=response.data;
                console.log(form.value.grades)
        });


  
  
  
  
  </script>
  