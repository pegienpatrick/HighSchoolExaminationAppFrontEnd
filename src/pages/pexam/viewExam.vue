<template>
  
  <div v-if="form.deleted==false">
    <VRow>
      <VCol>
        <VBtn
              :to="`/viewExaminations?year=${form.year}&term=${form.term}`"
              text="Current Term"
              
              >
              <VIcon
              icon="ri-table-line"
              />
              <VLabel></VLabel>
              view Current Term
              </VBtn>
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
              <VCol>
                <p><strong>Title :</strong></p> {{ form.title }}
              </VCol>
            </VRow>
            <VRow>


              <!-- 👉 Year -->
              <VCol md="6" cols="12">
                <p><strong>Year:</strong></p> {{ form.year }}
              </VCol>


               <!-- 👉 Year -->
               <VCol md="6" cols="12">
                <p><strong>Term : </strong></p>{{ form.term }}
              </VCol>

              <VCol md="6" cols="12">
                <p><strong>Created On : </strong></p>{{ form.date }}
              </VCol>


            </VRow>
            <VRow>
              <VCol>
                <VBtn
                text="Delete Exam"
                color="warning"
                @click="deleteExam"
                >
                <VIcon
                  icon="ri-eraser-line"
                ></VIcon>
                <VLabel
                text="Delete Exam"
                ></VLabel>

                </VBtn>
                </VCol>
                <VCol>
                  
                </VCol>
                <VCol>

                <VBtn
                text="Edit Title"
                color="secondary"
                @click="editExam"
                >
                <VIcon
                  icon="ri-edit-line"
                ></VIcon>
                <VLabel
                text="Edit Title"
                ></VLabel>

                </VBtn>
           
          </VCol>
          </VRow>
        
          </VForm>

        </VCardText>

      </VCard>

    </VCol>

  </VRow>


  <VRow v-for="f in form.grade" :key="f">
    <VCol>
      <VCard>
        <VCardTitle>
          <p><strong>Form {{ f }}</strong></p>
        </VCardTitle>
        <VCardText>
          <VRow>
            <VCol>
              <VBtn
              :to="`/marksSheet?exam=${examinationId}&stage=${f}`"
              text="Marks Entry"
              />
            </VCol>
            <VCol>
              <VBtn
              text="View Merit List"
              :to="`/viewMeritList?exam=${examinationId}&stage=${f}`"
              />
            </VCol>

            <VCol>
              <VBtn
              :to="`/generateMeritList?exam=${examinationId}&stage=${f}`"
              text="Generate Exam Results"
              />
            </VCol>

            <VCol>
              <VBtn
              text="Reports"
              :to="`/viewExamReports?examinationId=${examinationId}&stage=${f}`"
              />
            </VCol>

          </VRow>
          
          
        </VCardText>

      </VCard>
      
    </VCol>

  </VRow>




</div>

<VDialog
v-model="showForm.show"
class="modal fade small-modal"
cols="12"
max-width="600"
>
  <VRow>
    <VCol>
      <VCard title="Edit Exam Title">
        <VCardText>
          <VForm>
            <VRow>
              <VCol>
                <VTextField
                  label="New Exam Title"
                  v-model="showForm.title"

                />
              </VCol>
              </VRow>
              <VSpacer/>
              <v-spacer></v-spacer>
              <VCardActions>
                <VRow>
                  <VCol>
                    <VBtn
                    text="Update Title"
                    type="submit"
                    color="primary"
                    @click.prevent="updateTitle"
                    >
                    Update Title
                    </VBtn>
                  </VCol>
                  </VRow>
              </VCardActions>
          </VForm>
        </VCardText>

      </VCard>
    </VCol>
  </VRow>
</VDialog>

</template>

<script setup>
import axios from 'axios';
import Cookies from 'vue-cookies';
import { useRouter } from 'vue-router';

import Swal from 'sweetalert2';


const router = useRouter();

let apiUrl = window.location.protocol + "//" + window.location.hostname + ":8080";

     
let examinationId=router.currentRoute.value.query.examinationId;


const form=ref({
  
  "year": 2024,
  "term": '',
  "title": ""
})


let classes=['1','2','3','4'];

const loadExamInfo=()=>{

            axios.get(apiUrl + `/api/v1/examination/viewExamination/${examinationId}`, {
                        headers: {
                            Authorization: Cookies.get("Authorization")
                        },
                    })
                        .then((response) => {
                          form.value=response.data;
                        });
          }
  loadExamInfo();

  const deleteExam=()=>{
    Swal.fire({
        title: 'Delete Exam',
        text: 'Are you sure you want to delete this Exam?',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#d33',
        cancelButtonColor: '#3085d6',
        confirmButtonText: 'Yes, delete it!'
      }).then((result) => {

        if(result.isConfirmed)
        {
        const apiUrl = window.location.protocol + "//" + window.location.hostname + ":8080";

        axios.delete(apiUrl + `/api/v1/examination/delete/${examinationId}`, {
            headers: {
                Authorization: Cookies.get("Authorization")
            },
        })
            .then((response) => {
              console.log(response)

              router.go(-1)

            });
  }
});
  }

  const showForm=ref({
    show:false,
    num:'',
    title:''
  })


  const editExam=()=>{
      showForm.value.show=true;
      showForm.value.num=form.value.num;
      showForm.value.title=form.value.title;

  }
  

  const updateTitle=()=>{

    axios.put(apiUrl + `/api/v1/examination/updateExamTitle`,showForm.value, {
            headers: {
                Authorization: Cookies.get("Authorization")
            },
        }).then((response) => {
              console.log(response)
    
            showForm.value.show=false;
            loadExamInfo();
        }).catch((error)=>{
          console.log(error.respose);
        })
  }



</script>
