<template>
  
  <div>

    <v-row>
      <v-col>
    <VCard>
      <v-card-text>
    <VRow>
      
            <VCol>
              <VBtn
             
              text="TimeTable Home"
              to="/teachingTimeTable"
              />
            </VCol>
            <VCol>
              <VBtn
             
              text="TimeTable Settings"
              to="/timetableSettings"
              />
            </VCol>
            <VCol>
              <VBtn
             
              text="Venues"
              to="/venues"
              />
            </VCol>

    </VRow>
    </v-card-text>
    </VCard>
    </v-col>
    </v-row>


  <VRow>

    <VCol >
      <VCard>
        <VCardTitle>
          Lessons Per Week
        </VCardTitle>
        <VCardText>

          <VForm >

           
            <VRow>
              <VCol>

<VSelect
label="Form (stage)"
:items="['1','2','3','4']"
v-model="selection.grade"
/>

</VCol>
          <!-- <VCol> -->
                <!-- <VSelect
                label="Stream"
                :items="['A','B','C']"
                v-model="selection.stream"
                /> -->
           
          <!-- </VCol> -->
          </VRow>
          <VRow>
            <VBtn
            text="Load Lessons"
            class="w-100"
            color="secondary"
            @click="loadData"
            >

            </VBtn>
          </VRow>
        
          </VForm>

        </VCardText>

      </VCard>

    </VCol>

  </VRow>


  <VRow>
    <VCol>
      <VCard v-if="selections.data!=null">
        <VCardTitle>
          <p><strong>Subjects</strong></p>
          


        </VCardTitle>
        <VCardText>

        
          
          
        <VRow 
        
        v-for="lessons in selections.data"
        :key="lessons.subjectCode"
       
        align="center"
        style="padding: 20px;"
        >
          
          
          <VCol
         min-width="500"
         style="min-inline-size: 200px;"
          >
         
          <v-text-field
                v-model="lessons.lessonsPerWeek"
                :label="'F'+lessons.grade+' '+lessons.subjectName+' Lessons Per Week'"
                outlined
                dense
                solo-inverted
              ></v-text-field>
          
            </VCol>
            <VCol style="min-inline-size: 200px;" min-width="500">
              <VSwitch
              label="Join Streams"
              v-model="lessons.joinStreams"
              ></VSwitch>
              
            </VCol>

            <VCol style="min-inline-size: 200px;" min-width="500">
              <VRow>
              <VSwitch
              label="Has Double"
              v-model="lessons.hasDouble"
              ></VSwitch>
            </VRow>
              <VRow v-if="lessons.hasDouble">
              <VCol>
              <VSelect 
              :label="'F'+lessons.grade+' '+lessons.subjectName+' Double Venue'"
              v-model="lessons.doubleVenue"
              :items="venues"
              item-title="name"
              >

              </VSelect>
            </VCol>


              
            </VRow>

              
              
            </VCol>

            <VCol style="min-inline-size: 200px;">
              <VRow>
              <VSwitch
              label="Has Dedicated Venue"
              v-model="lessons.hasDedicatedVenue"
              ></VSwitch>
            </VRow>

            <VRow v-if="lessons.hasDedicatedVenue">
              <VCol>
              <VSelect 
              :label="'F'+lessons.grade+' '+lessons.subjectName+' Dedicated Venue'"
              v-model="lessons.dedicatedVenues"
              :items="venues"
              item-title="name"
              >
              </VSelect>
            </VCol>
            </VRow>
              
            </VCol>
            
            <VCol style="min-inline-size: 200px;" >
                <VBtn
                :text="lessons.success==null?'Update':'Updated'"
                :color="lessons.success==null?'primary':'success'"
                @click="updateLessonsPerWeek(lessons)"
                
                >

                </VBtn>
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

import { ref } from 'vue';





const router = useRouter();

let apiUrl = window.location.protocol + "//" + window.location.hostname + ":8080";

     
const menuVisible = ref(false);
const menuPosition = ref({ top: 0, left: 0 });


const form=ref({
  
  optionals:[],
  optionalsReadable:new Map()

})



const formInfo=ref({
  data:[],
  filtered:[],
  search:"",
})


const selections=ref({
  data: null
})



let classes=['1','2','3','4'];

const selection=ref({
              grade:'1',
              stream:'A'
            })
            


       

        let old=[
        { text: 'Admission No', value: 'admNo' }
        ]
        
        const headers=ref({
          data:[]
        })

        
    



            const loadData=()=>{

        
                axios.get(apiUrl + `/api/v1/subjectPerWeek/getForGrade/${selection.value.grade}`, {
                    headers: {
                        Authorization: Cookies.get("Authorization")
                    },
                })
                  .then((response) => {
                    console.log(response)
                    selections.value.data=response.data;
                    
                    
                  });
          }



            const updateLessonsPerWeek =(conf)=>{
              axios.put(apiUrl+`/api/v1/subjectPerWeek/updateSubjectPerWeek`,conf,{
                headers: {
                      Authorization: Cookies.get("Authorization")
                  },
              }).then((response)=>{
                  console.log(response);
                  conf.success=true;
                  window.setTimeout(()=>{conf.success=null},2000)
              });
              


            }

onMounted(() => {
  // loadData();
  
})



// const updateSubjectTeacher=(subjectTeacher)=>{
//   console.log(subjectTeacher);
// }

const venues=ref(null)

const loadVenues=()=>{

axios.get(apiUrl+'/api/v1/venue/listVenues',{
                      headers: {
                          Authorization: Cookies.get("Authorization")
                      },
                  })
                      .then((response) => {
                        console.log(response.data);
                        venues.value=response.data;
                      });

}

loadVenues();

           


           
</script>
<style scoped>
.inputMarks{
  inline-size: 400;
}
</style>
