<template>
  <v-app>
    <v-container>
      <v-row>
        <v-col cols="12">
          <v-card elevation="3">
            <v-card-title class="text-h6 font-weight-bold">Student Report Cards</v-card-title>
            <v-card-text>
              <VCol cols="12">
  <VCard title="Reports Cards">
    <VCardText class="d-flex">

    
      <!-- 👉 Display Data -->
      <VRow >
        <!-- 👉 Admission Number -->
        <VCol md="6" cols="12">
          <p><strong>Form :</strong> {{ stage.data }}</p>
        </VCol>

        <!-- 👉 Surname -->
        <VCol md="6" cols="12">
          <p><strong>Stream : </strong> {{ stage.stream }}</p>
        </VCol>

  
      </VRow>
      

    </VCardText>
    
    <a class="btn btn-primary" color="success" :download="pdfUrl.title" :href="pdfUrl.data">
      <VBtn
      text="Download"
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

export default {
  setup() {
    // Define reactive variables
    const studentDetails = ref({});
    const admNo = ref('');
    const examinationId = ref('');
    const pdfUrl = ref({
      data:'google.com',
      title:''
    });
    const stage=ref({
      data:'',
      stream: ''
    })
    
    const pdfData=ref(null);

    const router = useRouter();

    

    // Load PDF
    const loadPdf = () => {
      stage.value.data=router.currentRoute.value.query.stage;
      stage.value.stream=router.currentRoute.value.query.stream;
      examinationId.value=router.currentRoute.value.query.examinationId;
      const apiUrl = window.location.protocol + '//' + window.location.hostname + ':8080';
      const serverUrl = apiUrl + `/api/v1/reportCard/bulkReportCards/${examinationId.value}/${stage.value.data}?stream=${stage.value.stream}`;
      
      axios.get(serverUrl, {
        responseType: 'blob',
        headers: {
          Authorization: Cookies.get('Authorization'),
        },
      })
      .then(response => {
        const blob = new Blob([response.data], { type: 'application/pdf' });
        

        const link = document.createElement('a');
        link.href = URL.createObjectURL(blob);
        
        link.download =stage.value.data+stage.value.stream+examinationId.value+" Report Card.pdf"
        document.body.appendChild(link);
        // link.click();
        document.body.removeChild(link);

        // document.getElementById("datapoint").src=link.href;
        // document.getElementById("datapoint").title=link.download;
        pdfUrl.value.data=link.href;
        pdfUrl.value.title=link.download;

      })
      .catch(error => {
        console.error('Error fetching PDF:', error);
      });
    };

    // Lifecycle hook equivalent to mounted
    onMounted(() => {
      
      loadPdf();
    });

    // Return reactive variables and methods
    return {
      studentDetails,
      admNo,
      examinationId,
      pdfUrl,
     
      loadPdf,
      stage
    };
  },
};
</script>
