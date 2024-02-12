<script setup>
import axios from 'axios';

import { useRouter } from 'vue-router';

const router = useRouter();

import Cookies from 'vue-cookies';


// this.user={}
let apiUrl=window.location.protocol+"//"+window.location.hostname+":8080"


// const newProject = {
//   title: 'ExamSystem',
//   color: 'primary',
//   icon: 'ri-excel-line',
//   stats: '862',
//   change: -18,
//   subtitle: 'PExam System',
// }

const students=ref({
  title:'Students',
  subtitle: 'All Students',
  icon: 'ri-contacts-line',
  stats: '862',
  change: 100,
  color: 'primary'
})

const users=ref({
  title:'Users',
  subtitle: 'All Users',
  icon: 'ri-user-line',
  stats: '862',
  change: 100,
  color: 'primary'
})

const exams=ref({
  title:'Examinations',
  subtitle: 'All Examinations',
  icon: 'ri-bar-chart-2-line',
  stats: '862',
  change: 100,
  color: 'primary'
})


axios.get(apiUrl+'/api/v1/dashboard/stats',{
      headers:{
        'Content-Type': 'application/json',
        Authorization: Cookies.get("Authorization")
      },

    })
    .then((response) => {
      console.log(response)
      students.value.stats=response.data.students+""
      users.value.stats=response.data.users+""
      exams.value.stats=response.data.exams+""
      // students=response.data


    })





</script>

<template>
  <VRow class="match-height">
    

    <VCol
      cols="12"
     
    >
      <VRow class="match-height">
  

        <VCol
          cols="12"
          sm="4"
        >
          <CardStatisticsVertical v-bind="students" />
        </VCol>

        <VCol
          cols="12"
          sm="4"
        >
          <CardStatisticsVertical v-bind="users" />
        </VCol>

        <VCol
          cols="12"
          sm="4"
        >
          <CardStatisticsVertical v-bind="exams" />
        </VCol>

       
        
      </VRow>
    </VCol>

  </VRow>
</template>
