<template>
  
  <div>
    <VRow>
      <VCol>
        <VBtn
              :to="`/viewExam?examinationId=${examinationId}&stage=${stage}`"
              text="Exam Home"
              
              >
              <VIcon
              icon="ri-home-line"
              />
              <VLabel></VLabel>
              Exam Home
              </VBtn>
      </VCol>
            <VCol>
              <VBtn
              :to="`/editMarksSheet?exam=${examinationId}&stage=${stage}`"
              text="Edit Marks"
              />
            </VCol>
            <VCol>
              <VBtn
              text="View Merit List"
              :to="`/viewMeritList?exam=${examinationId}&stage=${stage}`"
              />
            </VCol>

            <VCol>
              <VBtn
              :to="`/generateMeritList?exam=${examinationId}&stage=${stage}`"
              text="Generate Exam Results"
              />
            </VCol>

            <VCol>
              <VBtn
              text="Reports"
              :to="`/viewExamReports?examinationId=${examinationId}&stage=${stage}`"
              />
            </VCol>

          </VRow>
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
                
                v-model="selectedStream.data"
                
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
          <VRow>
            <VCol>
              <VBtn
              text="Edit Marks"
              :to="`/editMarksSheet?exam=${examinationId}&stage=${stage}`"
              ></VBtn>

          </VCol>
          </VRow>
          </VCardTitle>
        <VCardText>

        <v-col>
          <v-text-field v-model="formInfo.search" label="Search" clearable></v-text-field>
        </v-col>

          <VDataTable
          :items="selectedStream.data=='All'?formInfo.data:filterChanges()"
          :search="formInfo.search"
          class="elevation-1"
          striped
         
          :headers="headers.data"
          >

         
        

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


const selectedStream=ref({
  data:'All'
})




const selectedH=ref({
  data:[],
  showForm:false
})


const form=ref({
  
  "year": 2024,
  "term": '',
  "title": ""

})

const pendingUpdate=ref({
  data:[]
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
              for(var i=0;i<tmp.length-1;i++){
                if(tmp[i]!='examination')
                  headers.value.data.push({title: tmp[i],value : tmp[i],align: 'center',show: true,type:1,key:tmp[i] })
              }
              //   headers.push(tmp[i])

              var tmp=Object.keys(response.data[0].marks)
             

              for(var i=0;i<tmp.length;i++)
                headers.value.data.push({title: subjectMap.get(parseInt(tmp[i])).subjectName+'('+tmp[i]+')',value : 'marks.'+tmp[i]+'.marks',show: false,type:2,key : 'marks.'+tmp[i]+'.marks',sortable: true })
               
               
              // headers
              // response.data[0].marks[101].marks='89'

              console.log(headers.value.data)
              formInfo.value.data=response.data;
              formInfo.value.filtered=response.data;
              selectedH.value.data=headers;
              
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


            const  updateMarks=(marks)=>{
              // console.log(marks)
              // const ind=pendingUpdate.data;
              // pendingUpdate.value.data.push(marks);
              
              axios.put(apiUrl + `/api/v1/marks/updateMarks`,marks, {
                  headers: {
                      Authorization: Cookies.get("Authorization")
                  },
              })
                  .then((response) => {
                    console.log(response);
                    // pendingUpdate.value.data.splice(ind,1);
                  }).catch((error)=>{
                    console.log(error);
                    pendingUpdate.value.data.push(marks);
                    
                  })
            }

            const retryUpdating = async () => {
                  var toRemove = [];

                  for (var i = 0; i < pendingUpdate.value.data.length; i++) {
                      const mark = pendingUpdate.value.data[i];

                      try {
                          const response = await axios.put(apiUrl + `/api/v1/marks/updateMarks`, mark, {
                              headers: {
                                  Authorization: Cookies.get("Authorization")
                              },
                          });

                          if (response.status === 200 || response.ok) {
                              toRemove.push(i);
                          }
                      } catch (error) {
                          console.error(error);
                      }
                  }

                  // Using reverse order to avoid index shifting when removing elements
                  toRemove.reverse().forEach(index => {
                      pendingUpdate.value.data.splice(index, 1);
                  });
              };


           

     

        const handleArrowKey=(rowIndex, columnName, direction) => {
          moveFocus(rowIndex, columnName, direction);
        }

        const moveFocus=(rowIndex, columnName, direction) => {
          const nextRowIndex = direction === 'up' ? rowIndex - 1 : rowIndex + 1;
          if (nextRowIndex >= 0 && nextRowIndex < formInfo.value.filtered.length) {
            const nextInputSelector = `input[data-index="${nextRowIndex}"][data-column="${columnName}"]`;
            const nextInput = document.querySelector(nextInputSelector);
            if (nextInput) {
              nextInput.focus();
            }
          }
        }



        const showForm=()=>{
          selectedH.value.showForm=true;
        }

        const closeDialog=()=>{
          selectedH.value.showForm=false;
        }



        const isShowable=(item)=>{
          console.log(key+" showable ");
          return true;
        }
          



        const filterChanges=()=>{
          console.log("filtering")
          formInfo.value.filtered=[]
          for(var k=0;k<formInfo.value.data.length;k++)
            if(formInfo.value.data[k].stream==selectedStream.value.data)
              formInfo.value.filtered.push(formInfo.value.data[k]);


          console.log(formInfo.value.filtered)
          return formInfo.value.filtered;
        }

         


            




</script>
<style scoped>
.inputMarks{
  inline-size: 400;
}
</style>
