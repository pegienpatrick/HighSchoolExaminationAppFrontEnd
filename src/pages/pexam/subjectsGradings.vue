<template>
  
  <div>

<VRow>
  <VCol>
    <VCard>
        <VCardTitle>Subjects Gradings</VCardTitle>
        <VRow style="float: inline-end;">
          <VCol>
        <VBtn
        text="Save Changes"
        class="f-right"
        style="float: inline-end;"
        @click="saveChanges"
        >

        </VBtn>
      </VCol>
      </VRow>
        <VCardText>

          <VDataTable
          :items="gradings.subjectGradings"
          :items-per-page="20"
          >

          <template v-slot:body="{ items }">
          
            <tr v-for="row in items" :key="row.id">
              
              <td>{{ row.subjectCode }}</td>
              <td>{{ row.subjectName }}</td>
              <td>{{ row.subjectRep }}</td>
              <td>
                <VTextField
                v-model="row.amarks"
                :placeholder="row.subjectRep+' A'"
                
                /></td>

                <td>
                <VTextField
                v-model="row.emarks"
                :placeholder="row.subjectRep+' E'"
               
                /></td>
              
            </tr>
        
          </template>

            
          </VDataTable>

        </VCardText>

    </VCard>

  </VCol>
</VRow>

</div>
</template>

<script setup>

import axios from 'axios';
import Cookies from 'vue-cookies';

const gradings=ref({
subjectGradings:[],
search:''
})

const router = useRouter();

let apiUrl = window.location.protocol + "//" + window.location.hostname + ":8080";

   
let examinationId=router.currentRoute.value.query.examinationId;


const form=ref({

data:[]

})


let classes=['1','2','3','4'];


axios.get(apiUrl + `/api/v1/grading/viewGradings`, {
          headers: {
              Authorization: Cookies.get("Authorization")
          },
      })
          .then((response) => {
            gradings.value.subjectGradings=response.data;
            
           
          });


  const saveChanges=()=>{
    
    console.log(gradings.value);
    
    axios.put(apiUrl + `/api/v1/grading/updateGrading`,gradings.value, {
          headers: {
              Authorization: Cookies.get("Authorization")
          },
      })
          .then((response) => {
            console.log(response);
            alert("Saved Successfully")
            
          });


  }




</script>


