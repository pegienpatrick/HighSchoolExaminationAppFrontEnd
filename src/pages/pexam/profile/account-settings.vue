<script setup>
import { useRouter } from 'vue-router';

import axios from 'axios';
import Cookies from 'vue-cookies';


const router = useRouter();





const accountData = {
  avatarImg:''

}

const form=ref({
  registerError:'',
  dateOfBirth:''
})

let isLoading=false;


const refInputEl = ref()
const accountDataLocal = ref(structuredClone(accountData))
const isAccountDeactivated = ref(false)

const resetForm = () => {
  accountDataLocal.value = structuredClone(accountData)
}

const changeAvatar = file => {
  const fileReader = new FileReader()
  const { files } = file.target
  if (files && files.length) {
    fileReader.readAsDataURL(files[0])
    fileReader.onload = () => {
      if (typeof fileReader.result === 'string')
        accountDataLocal.value.avatarImg = fileReader.result
    }
  }
}

// reset avatar image
const resetAvatar = () => {
  accountDataLocal.value.avatarImg = accountData.avatarImg
}

let apiUrl=window.location.protocol+"//"+window.location.hostname+":8080"








let saveSuccess=ref({
  data: 0
});


const submitForm = async () => {
  accountDataLocal.value.fullname=accountDataLocal.value.fname;
  
  console.log(accountDataLocal.value.gender)
  if(accountDataLocal.value.gender==''||accountDataLocal.value.gender==null){
    form.value.registerError='You must select gender'
    return;
  }
  isLoading=true;
 

  
  try {
    const response = await axios.put(apiUrl+`/api/v1/user/updateUser`, 
      accountDataLocal.value,
      {
        headers:{
          'Content-Type': 'application/json',
          Authorization: Cookies.get("Authorization")
        },
    });
    isLoading=false;
    form.value.registerError=''
    
   
    saveSuccess.value.data=new Date().getTime();
    setTimeout(()=>{saveSuccess.value.data=0},3000)


    console.log('Success:', response.data);
    // You can handle success, e.g., show a success message or redirect to another page.
  } catch (error) {
    saveSuccess.value.data=0;
   
    isLoading=false;
    // console.error('Error:', error);
    console.log(error.response)
    // You can handle errors, e.g., show an error message to the user.
    form.value.registerError=error.response.data;
    if(error.response.status==403)
      window.open('/', '_blank');
    
    if(error.response.status==400){
      try{
        form.value.registerError=''
        for (const [key, value] of Object.entries(JSON.parse(error.response.data.message).fielderrors)) {
          form.value.registerError += ` ${value}`+"\n";
        }

      }catch(error2)
      {
        form.value.registerError=error.response.data
      }
  }
    else
      form.value.registerError=error.response.data;

    console.log(form.value.registerError)
  }
};







axios.get(apiUrl + `/api/v1/user/userInfo`, {
            headers: {
                Authorization: Cookies.get("Authorization")
            },
        })
            .then((response) => {
                // Successfully fetched student details
                console.log(response);
                              

                accountDataLocal.value=response.data;
            })
            .catch((error) => {
                // Error handling
                console.error('Error fetching student details:', error);
                console.log(error);

                // Check for unauthorized (401) or forbidden (403) status
                if (error.response && (error.response.status === 401 || error.response.status === 403)) {
                    // Redirect to the login page
                    // router.push('/login');
                    window.open('/login', '_blank');
                }
            })


  axios.get(apiUrl + `/api/v1/UserPhoto/getUserPhoto`, {
    responseType: 'blob',
            headers: {
                Authorization: Cookies.get("Authorization")
            },
        })
            .then((response) => {
              const blob = new Blob([response.data], { type: 'application/png' });
              accountData.avatarImg= URL.createObjectURL(blob)
              resetAvatar();
            })



            const uploading=ref({
              success:false
            })

            const uploadStudentPhoto=()=>{

              console.log(refInputEl.value.value);
              const formData = new FormData();
              formData.append('file',refInputEl.value.files[0] );
              console.log(Object.keys(formData))
              console.log(Object.values(formData))

              axios.post(apiUrl+`/api/v1/UserPhoto/uploadUserPhoto`, formData,{
                headers: {
                        'Content-Type': 'multipart/form-data',
                        'Authorization':Cookies.get("Authorization"),
                      },
                    })
              .then((response) => {

                uploading.value.success=true;
                  window.setTimeout(()=>{uploading.value.success=false},3000)

              });

            }

  



</script>

<template>
  <VRow>
    <VCol cols="12" class="text-center">
            <p class="text-h6 font-weight-semibold text-error">{{ form.registerError }}</p>
          </VCol>
           <VProgressCircular
                  v-if="isLoading"
                  indeterminate
                  color="blue"
                  size="24"
                  style="position: absolute; inset-block-start: 50%; inset-inline-start: 50%; transform: translate(-50%, -50%);"
                ></VProgressCircular>

                <VAlert v-if="saveSuccess.data>0">
                  Updated Successsfully
                </VAlert>
                      

    <VCol cols="12">
      <VCard>

        <v-card-title>
          <v-icon
          icon="ri-group-line"
          ></v-icon>
          Edit Account Details
        </v-card-title>
        <v-spacer></v-spacer>
        <v-spacer></v-spacer>

        <VCardText class="d-flex">
          <!-- 👉 Avatar -->
          <VAvatar
            rounded="lg"
            size="100"
            class="me-6"
            :image="accountDataLocal.avatarImg"
          />

          <!-- 👉 Upload Photo -->
          <form class="d-flex flex-column justify-center gap-5">
            <div class="d-flex flex-wrap gap-2">
              <VBtn
                color="primary"
                @click="refInputEl?.click()"
                variant="outlined"
              >
                <VIcon
                  icon="ri-upload-cloud-line"
                  class="d-sm-none"
                />
                <span class="d-none d-sm-block">Select new photo</span>
              </VBtn>

              <input
                ref="refInputEl"
                type="file"
                name="file"
                accept=".jpeg,.png,.jpg,GIF"
                hidden
                @input="changeAvatar"
              >

              <VBtn
                type="reset"
                color="error"
                variant="outlined"
                @click="resetAvatar"
              >
                <span class="d-none d-sm-block">Reset</span>
                <VIcon
                  icon="ri-refresh-line"
                  class="d-sm-none"
                />
              </VBtn>
            </div>

            <p class="text-body-1 mb-0">
              Allowed JPG, GIF or PNG. Max size of 800K
            </p>
            <VBtn
                :color="uploading.success?'success':'primary'"
                @click="uploadStudentPhoto"
                v-model="uploading.success"
              >
                <VIcon
                  icon="ri-upload-cloud-line"
                  class="d-sm-none"
                />
                <span class="d-none d-sm-block" >{{ uploading.success?"Uploaded Successfully":"Upload photo" }}</span>
              </VBtn>
          </form>
        </VCardText>

        <VDivider />




        <VCardText class="d-flex">
          
          <!-- 👉 Form -->
          <VForm class="mt-6">
            <VRow>
              
              <VCol md="6" cols="12">
                <VTextField
                  v-model="accountDataLocal.fname"
                  label="Full Name"
                  type="text"
                />
              </VCol>

              
              <VCol md="6" cols="12">
                <VTextField
                  v-model="accountDataLocal.username"
                  label="Username"
                />
              </VCol>

             

         

<!-- 👉 Gender -->
<VCol md="6" cols="12">
                <VSelect
                  v-model="accountDataLocal.gender"
                  label="Gender"
                  :items="['MALE', 'FEMALE', 'OTHER']"
                  placeholder="Select Gender"
                  required
                />
              </VCol>

              
             

            
            
              <VCol md="6" cols="12">
                <VTextField
                  v-model="accountDataLocal.email"
                  label="Email"
                  type="email"
                />
              </VCol>

              <!-- 👉 Cohort -->
              <VCol md="6" cols="12">
                <VTextField
                  v-model="accountDataLocal.phone"
                  label="Phone"
                  type="tel"
                />
              </VCol>
             
             

              <!-- 👉 Form Actions -->
              <VCol cols="12" class="d-flex flex-wrap gap-4">
                <VBtn @click="submitForm">Save Changes</VBtn>

                <!-- <VBtn
                  color="secondary"
                  variant="outlined"
                  @click.prevent="resetForm"
                >
                  Reset
                </VBtn> -->
              </VCol>
            </VRow>
          </VForm>
        </VCardText>
      </VCard>
    </VCol>
  </VRow>




</template>

