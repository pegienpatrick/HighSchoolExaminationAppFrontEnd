<template>

<div>

  <v-row >

    <!-- <VBtn
      icon="mdi-account-plus"
      @click="formInfo.showForm = true"
      
    >
    <i class="mdi-account-plus"></i>
    Add Guardian
    </VBtn> -->

    <VCol>
    <VBtn  @click="formInfo={};formInfo.showForm = true;formInfo.editing=false;"
    color="primary"
    class="m-auto d-block"
    
    >
      <i class="ri-add-circle-line">  </i>  Add Guardian
    </VBtn>
  </VCol>

    <!-- Form Popup -->
    <VDialog v-model="formInfo.showForm" max-width="500px">
      <VCard>
        <VCardTitle>Add Guardian</VCardTitle>
        <VCardBody
        class="p-3"
        >
          <!-- Your form fields go here -->
          <VCol>
          <VTextField v-model="formInfo.fullName" label="Guardian Name"></VTextField>
        </VCol>
          <!-- Add more form fields as needed -->
        <VCol>
          <VTextField v-model="formInfo.idNo" label="Guardian Id"></VTextField>
        </VCol><VCol>
          <VTextField v-model="formInfo.email" label="Guardian Email" type="email"></VTextField>
        </VCol><VCol>
          <VTextField v-model="formInfo.phone" label="Guardian Phone" type="tel"></VTextField>
        </VCol><VCol>
          <!-- <VTextField v-model="formInfo.relationship" label="Guardian Name"></VTextField>
        </VCol><VCol> -->
          <VSelect
                  v-model="formInfo.gender"
                  label="Gender"
                  :items="['MALE', 'FEMALE', 'OTHER']"
                  placeholder="Select Gender"
                  required
                />
              </VCol><VCol>
                <VSelect
                  v-model="formInfo.relationship"
                  label="Relationship"
                  :items="['FATHER', 'MOTHER','SPONSOR', 'OTHER']"
                  placeholder="Select Relationship"
                  required
                />
              </VCol>

          <!-- Form Actions -->
          <div class="d-flex justify-end">
            <VBtn @click="submitForm">Submit</VBtn>
            <VBtn @click="closeForm">Cancel</VBtn>
          </div>
        </VCardBody>
      </VCard>
    </VDialog>

  </v-row>

  <VTable>
    <tbody :v-if="guardians.data!=undefined">

      <tr>
      <th>
        Id
      </th>
      <th>
       fullname
      </th>
      <th>
       gender
      </th>
      <th>
        phone
      </th>
      <th>
        email
      </th>
      <th>
       relationship
      </th>
      <th>
     edit
    </th>

    <th>
     remove
    </th>



  </tr>

    <tr v-for="guardian in guardians.data" :key="guardian.num"  >
      <td>
        {{ guardian.idNo }}
      </td>
      <td>
        {{ guardian.fullName }}
      </td>
      <td>
        {{ guardian.gender }}
      </td>
      <td>
        {{ guardian.phone }}
      </td>
      <td>
        {{ guardian.email }}
      </td>
      <td>
        {{ guardian.relationship }}
      </td>

      <td>
      <VBtn
        text="edit"
        icon="ri-edit-line"
        @click="editItem(guardian)"
        
      >
      <i class="ri-edit-line">  </i>
    
    </VBtn>
    </td>

    <td>
      <VBtn text="delete" @click="deleteItem(guardian)" icon="ri-close-line" color="danger"></VBtn>
    </td>



  </tr>
  </tbody>
  </VTable>

  
</div>

  
</template>

<script setup>

import axios from "axios";
import Cookies from 'vue-cookies';
import { useRouter } from 'vue-router';

const router = useRouter();


  let admNo = router.currentRoute.value.query.admNo;
 

  
const formInfo=ref({
  showForm : false,
    admNo: admNo,
  "fullName": "",
  "idNo": "",
  "gender": "",
  "phone": "",
  "email": "",
  "relationship": "",
  editing:false,
  num:''
})

  const closeForm=()=>{
    // showForm=false
    formInfo.value.showForm=false

  }

  const showForm=()=>{
    // showForm=false
    formInfo.value.showForm=true;

  }




      // Define the API URL
      let apiUrl = window.location.protocol + "//" + window.location.hostname + ":8080";

      // Get the admission number from the route parameters
      

      const guardians=ref({
        data:[]
      })

      const reloadGuardians=()=>{

      // Fetch student details using Axios
      axios.get(apiUrl + `/api/v1/guardian/viewStudentGuardians/${admNo}`, {
          headers: {
              Authorization: Cookies.get("Authorization")
          },
      }).then((response) => {
              console.log(response);
              guardians.value.data=response.data;

          });
        };

        reloadGuardians();




        const submitForm=()=>{
          formInfo.value.admNo=admNo
          let uploadUrl=apiUrl + `/api/v1/guardian/addGuardian`;
          if(formInfo.value.editing==true)
            uploadUrl=apiUrl + `/api/v1/guardian/updateGuardian/${formInfo.value.num}`
          axios[(formInfo.value.editing==true)?'put':'post'](uploadUrl,formInfo.value, {
              headers: {
                  Authorization: Cookies.get("Authorization")
              },
          }).then((response) => {
                  console.log(response);
                  guardians.value.data=response.data;
                  reloadGuardians();
                  closeForm();
                  // formInfo.value.idNo=''
                  // formInfo.value.fullName=''
                  // formInfo.value.relationship=''
                  // formInfo.value.gender=''
                  // formInfo.value.phone=''
                  // formInfo.value.email=''
                  formInfo.value={
                    editing: false,
                    showForm : false,
                    admNo: admNo
                    
                  }

              }).catch((error)=>{
                console.log(error)
                alert("error : "+error.response.data)
              })
        }



        const editItem=(guardian)=>{
          console.log(guardian)
          formInfo.value=guardian
          formInfo.value.editing= true
          // formInfo.showForm = true
          formInfo.admNo=admNo
          
          console.log(formInfo.value)
          showForm();


        };

        const deleteItem= (guardian) =>{
          console.log(guardian)
          if(confirm("Are you sure you want to delete?"))
          {
            axios.get(apiUrl + `/api/v1/guardian/deleteGuardian/${guardian.num}`, {
              headers: {
                  Authorization: Cookies.get("Authorization")
              },
          }).then((response) => {
            reloadGuardians();

          })
          }
          
          
        }


</script>
