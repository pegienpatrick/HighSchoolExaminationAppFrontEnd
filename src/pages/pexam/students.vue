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
const activeUser=({
  userInfo:{}
})


axios.get(apiUrl+'/api/v1/student/allStudents',{
  headers:{
    'Content-Type': 'application/json',
    Authorization: Cookies.get("Authorization")
  },

})
.then((response) => {
    // Code for handling the response
    console.log(response)
    let studentsData=response.data;
    // console.log(studentsData.dateOfBirth)
    // for(var i=0;i<studentsData.length;i++)
    //   studentsData[i].dateOfBirth=new Date(studentsData.dateOfBirth[i]);
    // // console.log(studentsData.dateOfBirth)
    
    // students.value.headers=
    // students.value.headers.remove("num")
    // students.value.headers.remove("reserved")
    // students.value.headers.remove("guardians")
    const headersToRemove = ["num", "reserved", "guardians"];
    students.value.headers = Object.keys(studentsData[0]).filter(header => !headersToRemove.includes(header));
    // // console.log(students.value.headers)
    // for(var i=0;i<studentsData.length;i++)
    // {
    //   const originalDate = new Date(studentsData[i].dateOfBirth);
  
    //   const day = String(originalDate.getDate()).padStart(2, '0');
    //   const month = String(originalDate.getMonth() + 1).padStart(2, '0');
    //   const year = originalDate.getFullYear();
      
    //   studentsData[i].dateOfBirth = `${day}-${month}-${year}`;
    //   console.log(studentsData[i].dateOfBirth)
    // }

    for(var i=0;i<studentsData.length;i++)
    {
      const originalDate = new Date(studentsData[i].dateOfBirth);
  
      const day = String(originalDate.getDate()).padStart(2, '0');
      const month = String(originalDate.getMonth() + 1).padStart(2, '0');
      const year = originalDate.getFullYear();
      
      studentsData[i].dateOfBirth = `${day}-${month}-${year}`;
      console.log(studentsData[i].dateOfBirth)
      
      headersToRemove.forEach(header => {
        delete studentsData[i][header];
    });
    }

    students.value.data=studentsData;
    
    // console.log(students.value)
    // console.log(studentsData)
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



const matchesSearch=(item)=> {
      // Check if any of the desired headers contains the search query
      return students.value.data.some(header => {
        const value = String(item[header]).toLowerCase();
        return value.includes(search.toLowerCase());
      });
    };



  const viewStudent=(item)=> {
    router.push(`/viewStudent?admNo=${item.admNo}`)
  }

const selectedStream=ref({
  stage:'All',
  stream:'All'
})



</script>
<template>
  <!-- <v-head>
    Students
  </v-head> -->
  <div>
    <v-row>
      <v-col>
      <v-select
        label="Select Stage (Form)"
        :items="['All','1','2','3','4','Alumini']"
        v-model="selectedStream.stage"
      ></v-select>
    </v-col>
    <v-col>
      <v-select
        label="Select Stream "
        :items="['All','A','B','C']"
        v-model="selectedStream.stream"
      ></v-select>
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
   :items-per-page="selectedStream.stage=='All'?10:students.data.length"
   >
      <!-- <template v-slot:header="{ props }">
        <tr>
          {{ console.log(props }}
          <th v-for="h in props" :key="h.value">
            {{ h }}
          </th>
          <th>Actions</th>
        </tr>
      </template> -->
      <template v-slot:item="{ item }" >
        <!-- Add a button to each row for viewing the student -->
        <tr v-if="(selectedStream.stage=='All'||selectedStream.stage==item.stage)&&(selectedStream.stream=='All'||selectedStream.stream==item.stream)">
          <td v-for="h in students.headers" :key="h.value">
            {{ item[h] }}
            <!-- {{ value }} -->
          </td>
          <!-- <td v-for="(value, key) in item" :key="key">
            {{ value }}
          </td> -->
          <td>
            <v-btn @click="viewStudent(item)">View</v-btn>
          </td>
        </tr>
      </template>
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
