<template>
  
  <div>
  <VRow>

    <VCol >
      <VCard>
        <VCardTitle>
          Subject Teachers
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
              <VCol>

                <VSelect
               
                label="Stream"
                :items="['A','B','C']"
                v-model="selection.stream"
                />
           
          </VCol>
          </VRow>
          <VRow>
            <VBtn
            text="Load Subject Teachers"
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
          <p><strong>Teachers</strong></p>
          <VRow>
            <VCol>
<!-- 
              <VSelect
              label="Class Teacher"
              :v-model="selections.data.classTeacher.teacher"
              :items="teachers.data"              
              >
              

                
              </VSelect> -->
              <!-- {{ console.log(teachers.allTeachers[selections.data.classTeacher.teacher]) }} -->
              <v-text-field
                v-model="teachers.allTeachers[selections.data.classTeacher.teacher]"
                label="Class Teacher"
                outlined
                dense
                solo-inverted
                ref="classTeacherTextField"
                @focus="showMenu($refs.classTeacherTextField,selections.data.classTeacher);filterMenu($refs.classTeacherTextField.value)"
                clearable=""
                @input="filterMenu($refs.classTeacherTextField.value)"
              ></v-text-field>
        
  <!-- <select v-model="selections.data.classTeacher.teacher" >
    <!-- Your options go here -->
    <!-- <option v-for="option in teachers.data" :key="option.value">{{ option.title }}</option>
  </select> --> 
  <!-- <v-select
    v-model="selections.data.classTeacher.teacher"
    :items="teachers.data"
    label="Select Item"
    outlined
    clearable
    value="item.value"
    text="item.key"
    
    return-object
   
  /> -->
</VCol>
</VRow>
<VRow>
  <VCol>
  <VBtn
  :text="selections.data.classTeacher.success==null?'Update Class Teacher':'Updated'"
  :color="selections.data.classTeacher.success==null?'primary':'secondary'"
  @click="updateSubjectTeacher(selections.data.classTeacher)"
  
  >

  </VBtn>
</VCol>
</VRow>
        </VCardTitle>
        <VCardText>

          
        <VRow 
        
        v-for="(subjectTeacher,subject) in selections.data.subjectTeachers"
        :key="subjectTeacher.subjectCode"
        >
          
          
          <VCol
         
          >
          {{ console.log(subjectTeacher.teacher) }}
          


          <v-text-field
                v-model="teachers.allTeachers[subjectTeacher.teacher==null?subjectTeacher.subjectCode:subjectTeacher.teacher]"
                :label="subject+' Teacher'"
                outlined
                dense
                solo-inverted
                :ref="`subject${subjectTeacher.subjectCode}`"
                @focus="showMenu2($refs['subject'+subjectTeacher.subjectCode], subjectTeacher); filterMenu($refs['subject'+subjectTeacher.subjectCode][0].value)"
                clearable
                @input="filterMenu($refs['subject'+subjectTeacher.subjectCode][0].value)"
              ></v-text-field>
          
            </VCol>
            
            <VCol >
                <VBtn
                :text="subjectTeacher.success==null?'Update':'Updated'"
                :color="subjectTeacher.success==null?'primary':'success'"
                @click="updateSubjectTeacher(subjectTeacher)"
                
                >

                </VBtn>
              </VCol>
            
            
            </VRow>

          

        
          
          
          
        </VCardText>

      </VCard>
      
    </VCol>

  </VRow>


  <v-menu
    v-model="menuVisible"
    :style="{ position: 'absolute', top: menuPosition.top + 'px', left: menuPosition.left + 'px' }"
    class="w-75"
  >
          <v-list>
            <v-list-item
              v-for="item in teachers.filtered"
              :key="item.title"
              @click="selectItem(item,nn.subjectTeacher)"
            >
              <v-list-item-content
              >
                <v-list-item-title>{{ item.title }}</v-list-item-title>
              </v-list-item-content>
            </v-list-item>
          </v-list>
        </v-menu>


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

        
    const teachers=ref({
      data:[],
      allTeachers:null,
      filtered:[]
    })

        axios.get(apiUrl + `/api/v1/subjectTeacher/allTeachers`, {
            headers: {
                Authorization: Cookies.get("Authorization")
            },
        })
          .then((response) => {
              console.log(response)
              teachers.value.allTeachers=response.data;
              for(const i in teachers.value.allTeachers)
                teachers.value.data.push({key:i,value:i,title:teachers.value.allTeachers[i],text:teachers.value.allTeachers[i]});

            });



            const loadData=()=>{

        
                axios.get(apiUrl + `/api/v1/subjectTeacher/viewSubjectTeachers/${selection.value.grade}/${selection.value.stream}`, {
                    headers: {
                        Authorization: Cookies.get("Authorization")
                    },
                })
                  .then((response) => {
                    console.log(response)
                    selections.value.data=response.data;
                    
                    
                  });
          }



            const updateSubjectTeacher=(conf)=>{
              axios.put(apiUrl+`/api/v1/subjectTeacher/updateSubjectTeacher`,conf,{
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

const nn=ref({
  searchText: '',
      menu: false,
      positionX: 0,
      positionY: 0,
      subjectTeacher:{}
})

var searchText= ''
     var menu=false
     var positionX=0
     var positionY= 0

     var filteredItems=teachers.value.data;


const filterItems=()=>{
  return teachers.value.data;
}

const selectItem=(item,subjectTeacher)=>{
  subjectTeacher.teacher=item.value;
}

           

const showMenu=(height,subjectTeacher)=>{
  const rect =  height.$el.getBoundingClientRect();
  nn.value.positionX = rect.left;
  nn.value.positionY = rect.top;
  nn.value.offsetY=rect.top;
  nn.value.subjectTeacher=subjectTeacher;
  
  nn.value.menu=true;
  nn.value.searchText=height.$el.value

  console.log(nn.value);

  const offsetX = rect.left;
  const offsetY = rect.top+40;

  // Set the menu position
  menuPosition.value = { top: offsetY, left: offsetX };

  // Show the menu
  menuVisible.value = true;

  console.log(menuPosition.value)

}

const showMenu2=(references,subjectTeacher)=>{
 
  var height=references[0]
  // console.log(height);
  // console.log(subjectTeacher);

  // const instance = getCurrentInstance();
  // const allRefs = instance.refs;
  // console.log('All refs:', allRefs);

  // Object.keys(allRefs).forEach(refName => {
  //   const refValue = allRefs[refName];
  //   console.log(`Ref ${refName}:`, refValue);
  // });


  const rect =  height.$el.getBoundingClientRect();
  nn.value.positionX = rect.left;
  nn.value.positionY = rect.top+window.scrollY+42;

  // nn.value.positionY = height.$el.offsetTop;
  // nn.value.positionX = height.$el.offsetLeft;
  // nn.value.offsetY=rect.top;
  nn.value.subjectTeacher=subjectTeacher;
  
  nn.value.menu=true;
  nn.value.searchText=height.$el.value

  console.log(nn.value);

  // const offsetX = rect.left;
  // const offsetY = rect.top+40;

  // // Set the menu position
  menuPosition.value = { top: nn.value.positionY, left: nn.value.positionX };

  // // Show the menu
  menuVisible.value = true;

  console.log(menuPosition.value)

}

const filterMenu=(searchText)=>{
  console.log(searchText)
  teachers.value.filtered=[]
  nn.value.searchText= searchText;
  for(const j in teachers.value.data){
    var i=teachers.value.data[j]
    if(i.title.toLowerCase().includes(searchText.toLowerCase()))
      teachers.value.filtered.push(i);
}

}
           
</script>
<style scoped>
.inputMarks{
  inline-size: 400;
}
</style>
