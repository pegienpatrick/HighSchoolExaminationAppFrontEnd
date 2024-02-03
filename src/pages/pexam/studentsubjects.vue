<template>
  
  <div>
  <VRow>

    <VCol >
      <VCard>
        <VCardTitle>
          Subjects Selections
        </VCardTitle>
        <VCardText>

          <VForm >

           
            <VRow>
              <VCol>

<VSelect
label="Form (stage)"
placeholder=""
:items="['All','1','2','3','4']"
v-model="selector.grade"
@click:append="updateGrade"

/>

</VCol>
              <VCol>

                <VSelect
                label="Stream"
                placeholder="Select Stream"
                :items="['All','A','B','C']"
                v-model="selector.stream"
                @change="updateGrade"
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
          :items="selections.data"
          :search="formInfo.search"
          class="elevation-1 w-100 d-block"
          striped
          :items-per-page="20"
          :headers="headers.data"
         
         

          >

          <template v-slot:item="{ item }">
            <tr :key="item.admNo"
            
            >
              <td v-for="c in headers.data" :key="c.key" align="center"
              >
              
             
                <!-- Display a simple value -->
                <span v-if="c.type == 1">{{ item[c.key] }}</span>
                <!-- Display a VTextField for editing marks -->
                <VSelect
                  v-if="c.type == 2&&c.title=='Subjects'&& c.title!='Action'"
                  v-model="item.subjectSelection[c.value]"
                  :label="item.admNo+'('+c.title"
                  class="w-100 inputMarks"
                  :items="[{title:'All',value:false},{title:'Selection',value:true}]"
                />

                <VSelect
                  v-if="c.type == 2 && c.title!='Subjects' && c.title!='Action'"
                  v-model="item.subjectSelection[c.value]"
                  class="w-100"
                  :label="item.admNo+'('+c.title"
                  :items="form.optionalsReadable.get(c.value)"
                />

                <VBtn
                
                  v-if="c.title=='Action'"
                  :color="item.success!=null?'success':'primary'"
                  :text="item.success!=null?'Updated':'Update'"
                  @click.prevent="updateSelection(item)"
                ></VBtn>



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
  
  optionals:[],
  optionalsReadable:new Map()

})



const formInfo=ref({
  data:[],
  filtered:[],
  search:"",
})


const selections=ref({
  data: []
})


let classes=['1','2','3','4'];


        axios.get(apiUrl + `/api/v1/subjectSelection/optionalSubjects`, {
            headers: {
                Authorization: Cookies.get("Authorization")
            },
        })
            .then((response) => {
              console.log(response)
              form.value.optionals=response.data;
              for(const s in form.value.optionals){
                var ar2=[]
                ar2.push({title:'None',value:-1})
                for(const s2 in form.value.optionals[s])
                  ar2.push({title:form.value.optionals[s][s2].subjectName,value:parseInt(form.value.optionals[s][s2].subjectCode)})
                

                console.log(s)
                form.value.optionalsReadable.set(s,ar2)
              }

              console.log(form.value.optionals)
              console.log(form.value.optionalsReadable);
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

        
        axios.get(apiUrl + `/api/v1/subjectSelection/studentSelections`, {
            headers: {
                Authorization: Cookies.get("Authorization")
            },
        })
            .then((response) => {
              console.log(response)
              selections.value.data=response.data

              var tmp;

              tmp=Object.keys(selections.value.data[0])
              for(var i=0;i<tmp.length-1;i++)
                headers.value.data.push({title: tmp[i],value : tmp[i],align: 'center',key: tmp[i],type:1 })
              //   headers.push(tmp[i])

              var tmp2=Object.keys(response.data[0].subjectSelection)

              for(var i=0;i<tmp2.length;i++){
                var header2=tmp2[i];
                var title="   "+header2+"  (Select One)  ";
                if(header2=='hasSelected')
                  title='Subjects'

                if(header2!='studentId')
                  headers.value.data.push({title: title,value : header2,key: 'subjectSelection.'+header2,type:2 })
              }

              headers.value.data.push({title: 'Action',value : 'action' })
              
            });


            const isNotJson=(str)=>{
              return str.length<10;

            }


            const combiner=(items)=>{

              let aller=[]
              
              for(const key in items)
              {
                if(key!='subjectSelection')
                  aller.push({value: items[key],key: key,type: 1});
                else{
                  for(const key2 in items[key] )
                  {
                    for(const key3 in headers.value.data)
                      if(headers.value.data[key3].value==key2)
                        aller.push({value: items[key][key2],key: key2,type: 2});
                  }
                  
                }
                
              }


              return aller;

            }



            // 


            const updateMarks=(marks)=>{
              console.log(marks)
              axios.put(apiUrl + `/api/v1/marks/updateMarks`,marks, {
                  headers: {
                      Authorization: Cookies.get("Authorization")
                  },
              })
                  .then((response) => {
                    console.log(response);
                  });
            }


            const readArray=(arrayv,key) => {
            
              console.log(arrayv)
              console.log("getting "+key)

              var value=arrayv.get(key)
              console.log(value);

              return value;

            }


            const updateSelection=(conf)=>{

              console.log(conf);
              axios.put(apiUrl+`/api/v1/subjectSelection/updateSelection`,conf.subjectSelection,{
                headers: {
                      Authorization: Cookies.get("Authorization")
                  },
              }).then((response)=>{
                  console.log(response);
                  conf.success=true;
                  window.setTimeout(()=>{conf.success=null},2000)
              });
              


            }


            const selector=ref({
              grade:'All',
              stream:'All'
            })


            const updateGrade=()=>{
              console.log("grading")
            }

           


            

                      

     


          

         


            




</script>
<style scoped>
.inputMarks{
  inline-size: 400;
}
</style>
