<script setup>
import axios from 'axios';

import Cookies from 'vue-cookies';



const accountData = {
  admNo: '',
  surname: '',
  firstName: '',
  otherName: '',
  dateOfBirth: '',
  birthCertno: '',
  ifmisNo: '',
  gender: '',
  stream: '',
  stage: '',
  kcpeMarks: '',
  cohort: '',

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

const prefInsert=ref({
  admNo:'',
  name:''
});





let prefInsertadmNo=''

const submitForm = async () => {

  console.log(accountDataLocal.value.gender)
  if(accountDataLocal.value.gender==''||accountDataLocal.value.gender==null){
    form.value.registerError='You must select gender'
    return;
  }
  isLoading=true;
 

  accountDataLocal.value.dateOfBirth=new Date(form.value.dateOfBirth)
  try {
    const response = await axios.post(apiUrl+'/api/v1/student/registerStudent', 
      accountDataLocal.value,
      {
        headers:{
          'Content-Type': 'application/json',
          Authorization: Cookies.get("Authorization")
        },
    });
    isLoading=false;
    prefInsert.value.admNo=response.data.admNo
    prefInsert.value.name=accountDataLocal.value.firstName+" "+accountDataLocal.value.surname;
    form.value.registerError=''
    console.log(prefInsert)
    resetForm();


    console.log('Success:', response.data);
    // You can handle success, e.g., show a success message or redirect to another page.
  } catch (error) {
   
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
                
                <VCol cols="12" v-if="prefInsert.admNo!=''">
                  <VCard
                  align-self="center"
                  >
                    <VCardText class="d-flex">
                      <v-row>
                        <v-col>
                      <VAlert>
                        Student saved successfully
                      </VAlert>
                    </v-col>
                      <v-row
                      align-self="center"
                      >
                      
                        <v-col
                        align-self="center"
                        >
                          Index : {{ prefInsert.admNo }}
                        </v-col>
                        <v-col
                        align-self="center"
                        >
                          {{ prefInsert.name }}
                        </v-col>
                        <v-col
                        align-self="center"
                        >
                          <v-btn
                          :to="`/viewStudent?adm=${prefInsert.admNo}`"
                          label="View Student"
                            color="primary"
                          >
                          View Student
                          </v-btn>
                        </v-col>
                        <v-col
                        align-self="center"
                        >
                          <v-btn
                          :to="`/studentGuardians?adm=${prefInsert.admNo}`"
                          label="Guardians"
                          color="secondary"
                          >
                          GUardians
                          </v-btn>
                        </v-col>
                      </v-row>
                      </v-row>

                      
                      
              

                    </VCardText>
                  </VCard>
                </VCol>

    <VCol cols="12">
      <VCard title="Student Details">
        <VCardText class="d-flex">
          
          <!-- 👉 Form -->
          <VForm class="mt-6">
            <VRow>
              <!-- 👉 Admission Number -->
              <VCol md="6" cols="12">
                <VTextField
                  v-model="accountDataLocal.admNo"
                  label="Admission Number"
                  type="number"
                />
              </VCol>

              <!-- 👉 Surname -->
              <VCol md="6" cols="12">
                <VTextField
                  v-model="accountDataLocal.surname"
                  label="Surname"
                />
              </VCol>

              <!-- 👉 First Name -->
              <VCol md="6" cols="12">
                <VTextField
                  v-model="accountDataLocal.firstName"
                  label="First Name"
                />
              </VCol>

              <!-- 👉 Other Name -->
              <VCol md="6" cols="12">
                <VTextField
                  v-model="accountDataLocal.otherName"
                  label="Other Name"
                />
              </VCol>

              <!-- 👉 Date of Birth -->
<VCol md="6" cols="12">
  <VTextField
    v-model="form.dateOfBirth"
    label="Date of Birth"
    type="date"
    placeholder="YYYY-MM-DD"
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

              <!-- 👉 Birth Certificate Number -->
              <VCol md="6" cols="12">
                <VTextField
                  v-model="accountDataLocal.birthCertno"
                  label="Birth Certificate Number"
                />
              </VCol>

              <!-- 👉 IFMIS Number -->
              <VCol md="6" cols="12">
                <VTextField
                  v-model="accountDataLocal.ifmisNo"
                  label="NEMIS Number"
                />
              </VCol>

              


              <!-- 👉 Stage(Form) -->
              <VCol md="6" cols="12">
                <VTextField
                  v-model="accountDataLocal.stage"
                  label="Stage (Form)"
                  type="number"
                />
              </VCol>

              <!-- 👉 Stream -->
              <!-- <VCol md="6" cols="12">
                <VTextField
                  v-model="accountDataLocal.stream"
                  label="Stream"
                />
              </VCol> -->
              <VCol md="6" cols="12">
                <VSelect
                  v-model="accountDataLocal.stream"
                  label="Stream"
                  :items="['A','B','C']"
                />
              </VCol>
              

              

              <!-- 👉 KCPE Marks -->
              <VCol md="6" cols="12">
                <VTextField
                  v-model="accountDataLocal.kcpeMarks"
                  label="KCPE Marks"
                  type="number"
                />
              </VCol>

              <!-- 👉 Cohort -->
              <VCol md="6" cols="12">
                <VTextField
                  v-model="accountDataLocal.cohort"
                  label="Cohort"
                  type="number"
                />
              </VCol>

              <!-- 👉 Form Actions -->
              <VCol cols="12" class="d-flex flex-wrap gap-4">
                <VBtn @click="submitForm">Submit</VBtn>

                <VBtn
                  color="secondary"
                  variant="outlined"
                  @click.prevent="resetForm"
                >
                  Reset
                </VBtn>
              </VCol>
            </VRow>
          </VForm>
        </VCardText>
      </VCard>
    </VCol>
  </VRow>
</template>

