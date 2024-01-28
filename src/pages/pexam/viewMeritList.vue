<script setup>

import axios from 'axios';

import Cookies from 'vue-cookies';

import { useRouter } from 'vue-router';

const router = useRouter();


const students=ref({
  data:[],
  headers:[],
  search:''
})

let apiUrl=window.location.protocol+"//"+window.location.hostname+":8080"
let examinationId=router.currentRoute.value.query.exam;
let stage=router.currentRoute.value.query.stage;
const activeUser=({
  userInfo:{}
})

let all=[]

let streamA=[]
let streamB=[]
let streamC=[]

let selectedStream='All';


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


axios.get(apiUrl+`/api/v1/meritList/viewMerit/${examinationId}/${stage}`,{
  headers:{
    'Content-Type': 'application/json',
    Authorization: Cookies.get("Authorization")
  },

})
.then((response) => {
    // Code for handling the response
    console.log(response)
    let studentsData=response.data;
    all=studentsData;
    students.value.data=studentsData;

    students.value.headers=[ 
{title:'Overall Pos',value: 'classRank'},
{title:'Stream',value: 'stream'}
,
{title:'Stream Pos',value: 'streamRank'},
{title:'Adm No',value: 'admNo'},
{title:'Student Name',value: 'studentName'}
    ];

    // for(const key in subjectMap)
    // {
    //   students.value.headers.push({title: subjectMap.get(key).subjectRep,value: 'subjectMarks' })
    // }
    subjectMap.forEach((value, key) => {
      students.value.headers.push({title: subjectMap.get(key).subjectRep , value: 'subjectMarks.'+key })
      students.value.headers.push({title: 'G' , value: 'subjectGrades.'+key })

    });

    students.value.headers.push({title : 'Aggr Points',value : 'points' })
    students.value.headers.push({title : 'Aggr Grade',value : 'aggregateGrade' })
    students.value.headers.push({title : 'Entry Marks',value : 'kcpeMarks' })


  

    console.log(students.value.headers)


    
  })
  .catch((error) => {
    // Code for handling the error
    console.log(error)
    if (error.response && error.response.status === 401||error.response.status === 403) {
      // Redirect to the login page
      // router.push('/login');
      window.open('/login','_blank')
    }

  })

let updateFilteredItems=''



const combiner=(items)=>{

let aller=[]

for(const key in items)
{
  if(key!='subjectmarks'&&key!='subjectgrades')
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

const stream=ref({
  selectedStream:'All'

})


const updateList=()=>{
  students.value.data=[]

  if(stream.value.selectedStream=='All'){
    students.value.data=all;
    return;
  }

  if(stream.value.selectedStream=='A'){
    if(streamA.length>0){
      students.value.data=streamA;
      return;
    }
  }

  if(stream.value.selectedStream=='B'){
    if(streamB.length>0){
      students.value.data=streamB;
      return;
    }
  }

  if(stream.value.selectedStream=='C'){
    if(streamC.length>0){
      students.value.data=streamC;
      return;
    }
  }

  axios.get(apiUrl+`/api/v1/meritList/viewMerit/${examinationId}/${stage}?stream=${stream.value.selectedStream}`,{
          headers:{
            'Content-Type': 'application/json',
            Authorization: Cookies.get("Authorization")
          },

        })
        .then((response) => {

          students.value.data=response.data;

          if(stream.value.selectedStream=='A'){
            streamA=response.data;
          }

          if(stream.value.selectedStream=='B'){
            streamB=response.data;
          }

          if(stream.value.selectedStream=='C'){
            streamC=response.data;
          }


        });




}

  
  






</script>
<template>
  <!-- <v-head>
    Students
  </v-head> -->
  <div>
    <v-row>
     
    <v-col>
      <v-select
        label="Select Stream "
        :items="['All','A','B','C']"
        v-model="stream.selectedStream"
      ></v-select>
    </v-col>
    <v-col>
      <VBtn
      text="Fetch Stream MeritList"
      @click="updateList"
      >

      </VBtn>
    </v-col>
  </v-row>
 <v-row>
    <!-- Custom search input -->
    <v-text-field v-model="students.search" label="Search" @input="updateFilteredItems"></v-text-field>


    


  <!-- Data Table -->
  <v-data-table
   :items="students.data" 
   class="elevation-1 custom-table" 
   striped
   :search="students.search"
   :headers="students.headers"
   >

   
     
  </v-data-table>


  </v-row>
  </div>
</template>

<style scoped>
/* Add your styles if needed */

.custom-table tbody tr:nth-child(odd) {
  background-color: #f5f5f5; /* Set the background color for odd rows */
}
</style>
