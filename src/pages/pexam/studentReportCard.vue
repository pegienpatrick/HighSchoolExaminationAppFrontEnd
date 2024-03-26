<template>
  <v-app>
    <v-container>
      <v-row>
        <v-col cols="12">
          <v-card elevation="3">
            <v-card-title class="text-h6 font-weight-bold">Student Report Card</v-card-title>
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
          @click="searchAgain"
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

  
      </VRow>
      

    </VCardText>
    
    <a class="btn btn-primary" color="success" :download="pdfUrl.title" :href="pdfUrl.data">
      <VBtn
      text="Download"
      :loading="pdfUrl.progres>0&&pdfUrl.progres<100"
      >
     Download _
     
      <VIcon
      icon="ri-download-line"
      >

      </VIcon>

      </VBtn>
    </a>
    
  </VCard>
</VCol>

</v-card-text>
</v-card>
</v-col>
</v-row>

<VRow>
  <VCol>
    <VCard>
      <VCardItem>
        <!-- Progress bar to show loading progress -->
    <div v-if="pdfUrl.progres>0&&pdfUrl.progres<100" class="progress">
      <div class="progress-bar" role="progressbar" :style="{ width: progres + '%' }">
        {{ pdfUrl.progres }}%
      </div>
    </div>
      </VCardItem>
      <!-- <embed :src="pdfUrl" type="application/pdf" width="100%" height="600px" /> -->
      <!-- <iframe :src="pdfUrl" width="100%" height="600px" frameborder="0"></iframe> -->
      <VCardText>
      <!-- <embed :src="pdfUrl" type="application/pdf" width="100%" height="600px" /> -->
      <iframe :src="pdfUrl.data" width="100%" height="1000" frameborder="0" :title="pdfUrl.title"></iframe>
      <!-- <pdf src="./path/to/static/relativity.pdf"></pdf> -->
     

      
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

import { useRouter } from 'vue-router';



const router = useRouter();


const searchAgain=()=>{
      router.go(-1);
    }

export default {

  
  setup() {
    // Define reactive variables
    const studentDetails = ref({
      admNo:''
    });
    const admNo = ref('');
    const examinationId = ref('');
    const pdfUrl = ref({
      data:'',
      title:'',
      progres:1
    });
    const pdfData=ref(null);

    const router = useRouter();


    const searchAgain=()=>{
      router.go(-1);
    }

    // Fetch student details
    const fetchStudentDetails = () => {
      const apiUrl = window.location.protocol + '//' + window.location.hostname + ':8080';
      admNo.value = router.currentRoute.value.query.admNo;
      examinationId.value = router.currentRoute.value.query.examinationId;

      axios.get(apiUrl + `/api/v1/student/viewStudent/${admNo.value}`, {
        headers: {
          Authorization: Cookies.get('Authorization'),
        },
      })
      .then((response) => {
        studentDetails.value = response.data.body;
        // const originalDate = new Date(studentDetails.value.dateOfBirth);
        // const day = String(originalDate.getDate()).padStart(2, '0');
        // const month = String(originalDate.getMonth() + 1).padStart(2, '0');
        // const year = originalDate.getFullYear();
        // studentDetails.value.dateOfBirth = `${day}-${month}-${year}`;
      })
      .catch((error) => {
        console.error('Error fetching student details:', error);
        if (error.response && (error.response.status === 401 || error.response.status === 403)) {
          window.open('/login', '_blank');
        }
      });
    };


    // Load PDF
    const loadPdf = () => {
      const apiUrl = window.location.protocol + '//' + window.location.hostname + ':8080';
      const serverUrl = apiUrl + `/api/v1/reportCard/viewReportCard/${examinationId.value}/${admNo.value}`;
      
      
      axios.get(serverUrl, {
        responseType: 'blob',
        headers: {
          Authorization: Cookies.get('Authorization'),
        },
        onDownloadProgress: (progressEvent) => {
          const progress = Math.round((progressEvent.loaded * 100) / progressEvent.total);
          console.log(`Download progress: ${progress}%`);
          // Update your UI with the progress value if needed
          pdfUrl.value.progres=progress;
        },

      })
      .then(response => {
        // console.log(response)
        const blob = new Blob([response.data], { type: 'application/pdf' });
        

        const link = document.createElement('a');
        link.href = URL.createObjectURL(blob);
        
        link.download = studentDetails.value.admNo+studentDetails.value.name+examinationId+" Report Card.pdf"
        document.body.appendChild(link);
        // link.click();
        document.body.removeChild(link);

        // document.getElementById("datapoint").src=link.href;
        // document.getElementById("datapoint").title=link.download;
        pdfUrl.value.data=link.href;
        pdfUrl.value.title=link.download;
        // console.log(response)

      })
      .catch(error => {
        console.error('Error fetching PDF:', error);
      });
    }


    

    // searchAgain();

    // Lifecycle hook equivalent to mounted
    onMounted(() => {
      fetchStudentDetails();
      loadPdf();
    });

    // Return reactive variables and methods
    return {
      studentDetails,
      admNo,
      examinationId,
      pdfUrl,
      fetchStudentDetails,
      loadPdf,
      searchAgain
    };
  },
};
</script>
