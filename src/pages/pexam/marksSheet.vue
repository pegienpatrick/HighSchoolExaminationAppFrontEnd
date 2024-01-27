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
              <VCol md="6" cols="12">
                 {{ form.title }}  
              </VCol>
           
              <!-- 👉 Year -->
              <VCol md="6" cols="12">
                Year : {{ form.year }}
              </VCol>

              <VCol md="6" cols="12">
                Form {{ stage }}
              </VCol>

               <!-- 👉 Year -->
               <VCol md="6" cols="12">
                Term {{ form.term }}
              </VCol>


            </VRow>
            <VRow>
              <VCol>

                <VSelect
                label="Stream"
                placeholder="Select Stream"
                :items="['All','A','B','C']"
                value="All"
                />
           
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
          <p><strong>Marks</strong></p>
        </VCardTitle>
        <VCardText>

        <v-col>
          <v-text-field v-model="formInfo.search" label="Search" clearable></v-text-field>
        </v-col>

          <VDataTable
          :items="formInfo.filtered"
          :search="formInfo.search"
          class="elevation-1"
          striped
          :items-per-page="50"
          :headers="headers.data"
          >

          <template v-slot:item="{ item }">
            <tr :key="item.admNo">
              <td v-for="c in combiner(item)" :key="c.key" align="center"
              :width="160"
              dense
              >
                <!-- Display a simple value -->
                <span v-if="c.type === 1">{{ c.value }}</span>

                <!-- Display a VTextField for editing marks -->
                <VTextField
                  v-if="c.type === 2"
                  v-model="c.value.marks"
                  :placeholder="subjectMap.get(c.value.subjectCode).subjectRep"
                  class="w-100 inputMarks"
                  :label="subjectMap.get(c.value.subjectCode).subjectRep"
                  
                />
              </td>
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
import { useRouter } from 'vue-router';


const router = useRouter();

let apiUrl = window.location.protocol + "//" + window.location.hostname + ":8080";

     
let examinationId=router.currentRoute.value.query.exam;
let stage=router.currentRoute.value.query.stage;


const form=ref({
  
  "year": 2024,
  "term": '',
  "title": ""

})

const formInfo=ref({
  data:[],
  filtered:[],
  search:"",
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

        let old=[
        { text: 'Admission No', value: 'admNo' }
        ]
        
        const headers=ref({
          data:[]
        })

        let availableSubjects=[]
        const subjectMap = new Map();

        axios.get(apiUrl + `/api/v1/subjectSelection/availableSubjects`, {
            headers: {
                Authorization: Cookies.get("Authorization")
            },
        })
          .then((response) => {
              console.log(response)
              availableSubjects=response.data;
              availableSubjects.forEach(item => {
                subjectMap.set(item.subjectCode, { subjectName: item.subjectName, subjectRep: item.subjectRep })
              });
              console.log(subjectMap)
              console.log(subjectMap.get(101))

            });

        
        axios.get(apiUrl + `/api/v1/marks/viewMarksSheet/${examinationId}/${stage}`, {
            headers: {
                Authorization: Cookies.get("Authorization")
            },
        })
            .then((response) => {
              console.log(response)
              

              var tmp=Object.keys(response.data[0])
              console.log(tmp)
              for(var i=0;i<tmp.length-1;i++)
                headers.value.data.push({title: tmp[i],value : tmp[i],align: 'center' })
              //   headers.push(tmp[i])

              var tmp=Object.keys(response.data[0].marks)

              for(var i=0;i<tmp.length;i++)
                headers.value.data.push({title: subjectMap.get(parseInt(tmp[i])).subjectName,value : tmp[i] })
               
              // headers
              // response.data[0].marks[101].marks='89'

              console.log(headers.value.data)
              formInfo.value.data=response.data;
              formInfo.value.filtered=response.data;
              
            });


            const isNotJson=(str)=>{
              return str.length<10;

            }


            const combiner=(items)=>{

              let aller=[]
              
              for(const key in items)
              {
                if(key!='marks')
                  aller.push({value: items[key],key: key,type: 1});
                else{
                  for(const key2 in items[key] )
                  {
                    aller.push({value: items[key][key2],key: key2,type: 2});
                  }
                  
                }
                
              }


              return aller;

            }



            // 

           

          

         


            




</script>
<style scoped>
.inputMarks{
  inline-size: 400;
}
</style>
