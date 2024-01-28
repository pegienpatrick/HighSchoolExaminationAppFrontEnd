<template>


  <div>
    <VRow>
  
      <VCol >
        <VCard>
          <VCardTitle>
            Import Students
          </VCardTitle>
          <VCardText>
  
            <VForm @submit="preventDefault();submitform();">

              <h3 align-center>
            Import Csv File with this Format
          </h3>

  
              <VRow>
                <!-- 👉 Exam Title -->
                <VCol>
                 Adm No ( int )
                </VCol>
                <VCol>
                 Student Name(first,second,surname)
                </VCol>
                <VCol>
                  Gender
                </VCol>
                <VCol>
                  Form (number)
                </VCol>
                <VCol>
                  Stream
                </VCol>
              </VRow>
              <VRow>

  
  
              </VRow>
              <VRow>
                <VCol>
                  <VFileInput
                  label="Select Csv File"
                  placeholder="Select Csv File"
                  accept=".csv"
                  name="file"
                  v-model="uploader.file"
                  >
                    
                  </VFileInput>
                </VCol>
                <VCol>
              <VBtn
              text="Import Csv"
              type="submit"
              @click.prevent="submitForm(this)"
              />
            </VCol>
            </VRow>
          
            </VForm>
            <VRow v-if="uploader.res.split(',').length==1">
             
              <VCol>
                Errors : {{ uploader.res }}
              </VCol>
            </VRow>

            <div v-if="uploader.res.split(',').length>1">
            <VRow >
              
              <VCol>
                 {{ uploader.res.split(',')[0] }}
              </VCol>
            </VRow>
            <VRow>

              <VCol>
                {{ uploader.res.replace(uploader.res.split(',')[0],'') }}
              </VCol>
            </VRow>
          </div>
  
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


  const uploader=ref({
    file : [],
    res:''
  })
  
  
  const submitForm=(form)=>{

    const formData = new FormData();
    formData.append('file', uploader.value.file[0]);

axios.post(apiUrl+'/api/v1/import/importStudents', formData,{
  headers: {
          'Content-Type': 'multipart/form-data',
          'Authorization':Cookies.get("Authorization"),
        },
      })
.then((response) => {
  console.log('File uploaded successfully:', response);
  // Handle success response if needed
  uploader.value.res=(response.data);
})
.catch((error) => {
  console.error('Error uploading file:', error);
  // Handle error response if needed
  uploader.value.res=(error.response.data);
});

//      let formData = new FormData();
//     formData.append('file', uploader.value.file);
//     console.log(formData.values)

    

//     for (let pair of formData.entries()) {
//     console.log(pair[0]+":"+ pair[1]);
// }
  
//     axios.post(apiUrl +"/api/v1/import/importStudents",{ file : uploader.value.file }, {
//             headers: {
//                 'Content-Type' : 'multipart/form-data',
//                 Authorization: Cookies.get("Authorization"),
//                 'accept' : 'multipart/form-data'
//             },
//         }).then((response) => {
//                 console.log(response);
//                 // guardians.value.data=response.data;
//                 // let exam=response.data.examinationId;
//                 // router.push(`/viewExam?examinationId=${exam}`)
//                 uploader.value.res=response.data;
  
//             })
//           .catch((error)=>{
//             console.log(error)
  
//             var cont=""
//             if(error.response.data.message)
//               cont=error.response.data.message
//             else
//               cont=error.response.data;
              
//             uploader.value.res=cont;
//             // alert("error "+cont);
  
//           })
        }
  
  
  
  
  const submit=()=>{
  
  }
  
  
  
  
  </script>
  