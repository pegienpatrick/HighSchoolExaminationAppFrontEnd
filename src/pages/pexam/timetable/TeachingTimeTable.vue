<template>

  <div>
    <v-row>
      <v-col>
    <VCard>
      <v-card-text>
    <VRow>
      
            <VCol>
              <VBtn
             
              text="TimeTable Settings"
              to="/timetableSettings"
              />
            </VCol>
            <VCol>
              <VBtn
              text="Lessons Per Week"
              to="/lessonsPerWeek"
              />
            </VCol>

            <VCol>
              <VBtn
             @click="generateTimeTable"
              text="Generate New TimeTable"
                :loading="generating"
                :color="generating.value?'success':'primary'"
              />
            </VCol>

            <!-- <VCol>
              <VBtn
              text="Reports"
              :to="`/viewExamReports?examinationId=${examinationId}&stage=${stage}`"
              />
            </VCol> -->

    </VRow>
    <v-row>
    <v-spacer></v-spacer>
  </v-row>
  <v-row>
    <v-spacer></v-spacer>
  </v-row>
    <v-row>
      <v-col>
      <v-tabs
      
      v-model="activeTab"
      show-arrows
      >
        <v-tab
        text="Classes TimeTable"
        value="class"
        >

        </v-tab>

        <v-tab
        text="Teachers TimeTable"
        value="teacher"
        >

        </v-tab>

        <v-tab
        text="Venues TimeTable"
        value="venue"
        >

        </v-tab>
      </v-tabs>
    </v-col>

    </v-row>




      </v-card-text>
    </VCard>
  </v-col>
  </v-row>

  <v-row>
    <v-spacer></v-spacer>
  </v-row>
  <v-row>
    <v-spacer></v-spacer>
  </v-row>
  <v-row>
    <v-col>

    <VCard>
      <v-card-text>
    <VRow>
      
            <VCol>

              <VWindow
                v-model="activeTab"
                class="mt-5 disable-tab-transition"
                :touch="false"
              >

                <v-window-item value="class">
                  <a class="btn btn-primary" color="success" :download="pdfUrl.title1" :href="pdfUrl.data1">
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
                  <iframe :src="pdfUrl.data1" width="100%" height="1000" frameborder="0" :title="pdfUrl.title1"></iframe>
                </v-window-item>
                <v-window-item value="teacher">
                  <a class="btn btn-primary" color="success" :download="pdfUrl.title2" :href="pdfUrl.data2">
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
                  <iframe :src="pdfUrl.data2" width="100%" height="1000" frameborder="0" :title="pdfUrl.title2"></iframe>
                </v-window-item>
                <v-window-item value="venue">
                  <a class="btn btn-primary" color="success" :download="pdfUrl.title3" :href="pdfUrl.data3">
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
                  <iframe :src="pdfUrl.data3" width="100%" height="1000" frameborder="0" :title="pdfUrl.title3"></iframe>
                </v-window-item>

             

              </VWindow>

              </VCol>

            </VRow>
        </v-card-text>
    </VCard>
  </v-col>
  </v-row>


    
  </div>

</template>

<script setup>

import axios from 'axios';

import Cookies from 'vue-cookies';

import { useRouter } from 'vue-router';



const router = useRouter();


const activeTab=ref("class")

const generating=ref(false)

const pdfUrl = ref({
      data1:'',
      title1:'',
      data2:'',
      title2:'',
      data3:'',
      title3:''
    });



    const loadPdf1 = () => {
      const apiUrl = window.location.protocol + '//' + window.location.hostname + ':8080';
      const serverUrl = apiUrl + `/api/v1/timetable/classTimeTable`;
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
        link.download = " Class Time Table.pdf"
        document.body.appendChild(link);
        document.body.removeChild(link);

        pdfUrl.value.data1=link.href;
        pdfUrl.value.title1=link.download;

        loadPdf2();
      })
      .catch(error => {
        console.error('Error fetching PDF:', error);
      });
    }

    const loadPdf2 = () => {
      const apiUrl = window.location.protocol + '//' + window.location.hostname + ':8080';
      const serverUrl = apiUrl + `/api/v1/timetable/teachersTimeTable`;
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
        link.download = " Teachers Time Table.pdf"
        document.body.appendChild(link);
        document.body.removeChild(link);

        pdfUrl.value.data2=link.href;
        pdfUrl.value.title2=link.download;

        loadPdf3();
      })
      .catch(error => {
        console.error('Error fetching PDF:', error);
      });
    }

    const loadPdf3 = () => {
      const apiUrl = window.location.protocol + '//' + window.location.hostname + ':8080';
      const serverUrl = apiUrl + `/api/v1/timetable/venuesTimeTable`;
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
        link.download = " Venues Time Table.pdf"
        document.body.appendChild(link);
        document.body.removeChild(link);

        pdfUrl.value.data3=link.href;
        pdfUrl.value.title3=link.download;

      })
      .catch(error => {
        console.error('Error fetching PDF:', error);
      });
    }

    onMounted(() => {
      loadPdf1();
    });



    const generateTimeTable=()=>{
      generating.value=true;

      const apiUrl = window.location.protocol + '//' + window.location.hostname + ':8080';
      const serverUrl = apiUrl + `/api/v1/timetable/regenerate`;
      axios.get(serverUrl, {
        headers: {
          Authorization: Cookies.get('Authorization'),
        },
      })
      .then(response => {
        console.log(response)
        generating.value=false
        loadPdf1();

      })

    }



</script>
