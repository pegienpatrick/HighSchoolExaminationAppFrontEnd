<template>
  <div>
    <VCard>
      <VCardTitle>
        Compose New SMS
      </VCardTitle>
      <VCardText>

        <VRow>
          <VCol>
            <VTextarea
            label="Type Your Message"
            counter
            pages
            v-model="form.message"
            ></VTextarea>

          </VCol>

        </VRow>

        <VRow>
          <VCol>
            <VLabel>
              Select to Individual Student
            </VLabel>
          </VCol>
        </VRow>

        <VRow>
          <VCol>
            <VTextField
            label="Send to a Student"
            placeholder="Enter Admission Number"
            v-model="form.admNo"
            >

            </VTextField>
                        
          </VCol>
          <VCol>
            <VBtn
            text="Send to Admission Number"
            @click="sendtoAdm"
            >

            </VBtn>
          </VCol>
        </VRow>

        <VRow>
          <VCol>
            <VLabel>
              Send to a Class or Stream
            </VLabel>
          </VCol>
        </VRow>

        <VRow>
          <VCol>
            <VSelect
            label="Form"
            :items="['1','2','3','4']"
            v-model="form.form"
            >

            </VSelect>
            
          </VCol>

          <VCol>
            <VSelect
            label="Stream"
            :items="['All','A','B','C']"
            v-model="form.stream"
            >
            </VSelect>
            
          </VCol>
        </VRow>
        <VRow>
        <VCol>
           <VBtn
           width="100%"
           text="Send Message"
           @click="sendToClass"
           ></VBtn>

            
          </VCol>
        </VRow>


      </VCardText>
    </VCard>
  </div>
</template>
<script setup>


import axios from 'axios';
import Cookies from 'vue-cookies';
import { useRouter } from 'vue-router';


const router = useRouter();

let apiUrl = window.location.protocol + "//" + window.location.hostname + ":8080";

const form=ref({
  admNo:'',
  phone:'x',
  form:'',
  stream:'All',
  message:''
})

const sendtoAdm=()=>{
  axios.post(apiUrl + `/api/v1/sms/smsGuardians`,form.value, {
            headers: {
                Authorization: Cookies.get("Authorization")
            },
        }).then((response)=>{
          console.log(response);
          // bal.value.data=response.data;
          alert(response.data)
          // router.push("/smsStats")
        }).catch((error)=>{
          console.log(error);
          // bal.value.data=error.response.data;
          alert("error sending:"+error.response.data);
        })
}

const sendToClass=()=>{
  axios.post(apiUrl + `/api/v1/sms/smsClassGuardians/${form.value.form}/${form.value.stream}`,form.value.message, {
            headers: {
                Authorization: Cookies.get("Authorization")
            },
        }).then((response)=>{
          console.log(response);
          // bal.value.data=response.data;
          alert(response.data);
          // router.push("/smsStats")
          
        }).catch((error)=>{
          console.log(error);
          // bal.value.data=error.response.data;
          alert("error sending:"+error.response.data);
        })
}




</script>
