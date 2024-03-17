<template>
  <v-app>
    <v-container>
      
      <v-row>
        
        <v-col cols="12">
          
          <v-card elevation="3" >

            <div class="w-100 d-block align-center">
            <VAvatar
              :image="avatarImg"
              size="200" class="d-block"
              
            />
          </div>
            



            <v-card-title class="text-h6 font-weight-bold">Student Details</v-card-title>
            <v-card-text>
              <VCol cols="12">
  <VCard title="Student Details">

    


    


    
  




    <VCardText class="d-flex">

      

      <div v-if="studentDetails==null">
      <!-- display error -->
      <VRow class="w-100 d-block">
        <VCol>

          <VCol>
          <p><strong>Admission Number:</strong> {{ this.admNo }}</p>
        </VCol>
          
        </VCol>
      </VRow>
      <VRow class="w-100 d-block">
        <VCol>
          <VAlert>
            Record Not Found
          </VAlert>
        </VCol>
      </VRow>

      <VRow>
        <VCol>

          <VBtn
          to="/searchStudent"
          >
            <VIcon
            icon="ri-restart-line"
            />

            Search Again

          </VBtn>

        </VCol>
      </VRow>
    </div>



    

      <!-- 👉 Display Data -->
      <VRow v-if="studentDetails!=null">



    
        <!-- 👉 Admission Number -->
        <VCol md="6" cols="12">
          <p><strong>Admission Number:</strong> {{ studentDetails.admNo }}</p>
        </VCol>

        <!-- 👉 Surname -->
        <VCol md="6" cols="12">
          <p><strong>Surname:</strong> {{ studentDetails.surname }}</p>
        </VCol>

        <!-- 👉 First Name -->
        <VCol md="6" cols="12">
          <p><strong>First Name:</strong> {{ studentDetails.firstName }}</p>
        </VCol>

        <!-- 👉 Other Name -->
        <VCol md="6" cols="12">
          <p><strong>Other Name:</strong> {{ studentDetails.otherName }}</p>
        </VCol>

        <!-- 👉 Date of Birth -->
        <VCol md="6" cols="12">
          <p><strong>Date of Birth:</strong> {{ studentDetails.dateOfBirth }}</p>
        </VCol>

        <!-- 👉 Gender -->
        <VCol md="6" cols="12">
          <p><strong>Gender:</strong> {{ studentDetails.gender }}</p>
        </VCol>

        <!-- 👉 Birth Certificate Number -->
        <VCol md="6" cols="12">
          <p><strong>Birth Certificate Number:</strong> {{ studentDetails.birthCertno }}</p>
        </VCol>

        <!-- 👉 nemis Number -->
        <VCol md="6" cols="12">
          <p><strong>NEMIS Number:</strong> {{ studentDetails.nemisNo }}</p>
        </VCol>

        <!-- 👉 Stage(Form) -->
        <VCol md="6" cols="12">
          <p><strong>Stage (Form):</strong> {{ studentDetails.stage }}</p>
        </VCol>

        <!-- 👉 Stream -->
        <VCol md="6" cols="12">
          <p><strong>Stream:</strong> {{ studentDetails.stream }}</p>
        </VCol>

        <!-- 👉 KCPE Marks -->
        <VCol md="6" cols="12">
          <p><strong>KCPE Marks:</strong> {{ studentDetails.kcpeMarks }}</p>
        </VCol>

        <!-- 👉 Cohort -->
        <VCol md="6" cols="12">
          <p><strong>Cohort:</strong> {{ studentDetails.cohort }}</p>
        </VCol>
      </VRow>





    </VCardText>
  </VCard>
</VCol>

 <!-- Button to Edit Page -->
 <v-row justify="center" v-if="studentDetails!=null">
        <v-col>
          <v-btn @click="editStudent" color="primary">Edit Student</v-btn>
        </v-col>

        <v-col>
          
        </v-col>
        <v-col>
          <v-btn @click="deleteStudent" color="warning">Delete Student</v-btn>
        </v-col>
</v-row>


</v-card-text>
</v-card>
</v-col>
</v-row>


<VRow>
    <VCol>
    <VCard>
      <VCardTitle>
        Guardians
      </VCardTitle>
      <VCardText>

        <GuardianForm/>

      </VCardText>

    </VCard>
  </VCol>
  </VRow>


     
    </v-container>
  </v-app>
</template>





<script>
import axios from 'axios';
import Cookies from 'vue-cookies';

import Swal from 'sweetalert2';

import GuardianForm from '@/views/pages/pexam/GuardiansForm.vue';


export default {
  components:
  {
    GuardianForm,
  }
  ,
  data() {
    return {
      studentDetails: {},
      admNo:'',
      avatarImg:''

    };
  },
  mounted() {
    // Fetch student details when the component is mounted
    this.fetchStudentDetails();
    console.log("mounted")
    this.fetchStudentDetails();
  },
  methods: {
    fetchStudentDetails() {
   
        // Define the API URL
        const apiUrl = window.location.protocol + "//" + window.location.hostname + ":8080";

        // Get the admission number from the route parameters
        this.admNo = this.$route.query.admNo;

        // Fetch student details using Axios
        axios.get(apiUrl + `/api/v1/student/viewStudent/${this.admNo}`, {
            headers: {
                Authorization: Cookies.get("Authorization")
            },
        })
            .then((response) => {
                // Successfully fetched student details
                console.log(response);
                this.studentDetails = response.data.body;
                console.log(this.studentDetails);
                const originalDate = new Date(this.studentDetails.dateOfBirth);
  
                const day = String(originalDate.getDate()).padStart(2, '0');
                const month = String(originalDate.getMonth() + 1).padStart(2, '0');
                const year = originalDate.getFullYear();
                
                this.studentDetails.dateOfBirth = `${day}-${month}-${year}`;
            })
            .catch((error) => {
                // Error handling
                console.error('Error fetching student details:', error);
                console.log(error);

                // Check for unauthorized (401) or forbidden (403) status
                if (error.response && (error.response.status === 401 || error.response.status === 403)) {
                    // Redirect to the login page
                    // router.push('/login');
                    window.open('/login', '_blank');
                }
            });



            axios.get(apiUrl + `/api/v1/studentPhoto/getStudentPhoto/${this.admNo}`, {
    responseType: 'blob',
            headers: {
                Authorization: Cookies.get("Authorization")
            },
        })
            .then((response) => {
              const blob = new Blob([response.data], { type: 'application/png' });
              this.avatarImg= URL.createObjectURL(blob)
              
            })


    },
    editStudent() {
      // Redirect to the edit page, you need to define your edit route
      this.$router.push(`/editStudent?admNo=${this.studentDetails.admNo}`);
    },
    deleteStudent()
    {
      Swal.fire({
        title: 'Delete Student',
        text: 'Are you sure you want to delete this student?',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#d33',
        cancelButtonColor: '#3085d6',
        confirmButtonText: 'Yes, delete it!'
      }).then((result) => {

        if(result.isConfirmed)
        {
        const apiUrl = window.location.protocol + "//" + window.location.hostname + ":8080";

        axios.get(apiUrl + `/api/v1/student/deleteStudent/${this.admNo}`, {
            headers: {
                Authorization: Cookies.get("Authorization")
            },
        })
            .then((response) => {
              console.log(response)

              this.$router.push("/students");

            });
      }
      
      })

    }
  },
};
</script>

