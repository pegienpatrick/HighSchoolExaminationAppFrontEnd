<template>


  <div>

    <v-row>
      <v-col>
    <VCard>
      <v-card-text>
    <VRow>
      
            <VCol>
              <VBtn
             
              text="TimeTable Home"
              to="/teachingTimeTable"
              />
            </VCol>
            
            <VCol>
              <VBtn
             
              text="Venues"
              to="/venues"
              />
            </VCol>

    </VRow>
    </v-card-text>
    </VCard>
    </v-col>
    </v-row>



    <VRow>
  
      <VCol >
        <VCard>
          <VCardTitle>
            Select Forms With Selected Subjects
          </VCardTitle>
          <VCardText>
  
            <VForm @submit="preventDefault();submitform();">
  
              
  
              <VRow>
                <VCol md="6" cols="12">
                  <VCheckbox v-for="f in classes" :key="f" :label="`Form ${f}`" v-model="form.sel[parseInt(f)-1]" ></VCheckbox>
                </VCol>
              </VRow>
  
  
  
              <VRow>
                <VCol>
              <VBtn
              :text="form.success==null?'Update Changes':'Updated'"
              :color="form.success==null?'primary':'success'"
              
              type="Submit"
              @click.prevent="submitForm()"
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
          <VCardItem>
            <VRow>
      <VCol>
        
      </VCol>
    </VRow>
          </VCardItem>
          <VCardText>
                  <VRow>
              <VCol>
                <VForm>
                  <VRow>
                  
                    <VCol cols="12" md="4">
                      <VTextField
                      label="Lessons Per Day"
                      type="number"
                      v-model="lform.lessons"
                      />
                      
                    </VCol>
                  
                
                    <VCol cols="12" md="4">
                      <VTextField
                      type="number"
                      label="Lesson Duration"
                      v-model="lform.duration"

                      />
                      
                    </VCol>
                    <VCol cols="12" md="4">
                      <VTextField
                      label="Lessons Start At"
                      type="time"
                      v-model="lform.startTime"
                      />
                    </VCol>
                  </VRow>
                  <VRow>
                    <VCol>
                      <VBtn
                     
                      
                      class="w-100"
                      variant="outlined"
                      :text="lform.success==null?'Save Changes':'Updated'"
                      :color="lform.success==null?'primary':'success'"
                      @click="saveLessons"
                      />
                    </VCol>
                  </VRow>
            
                </VForm>
                
              </VCol>
            </VRow>
          </VCardText>

        </VCard>
        
      </VCol>
    </VRow>
  

    <VRow>
      <VCol>
        <VCard>
          <VCardTitle>Lessons Arrangement</VCardTitle>
          <VCardItem>
            <VBtn
            prepend-icon="ri-add-line"
           text="Add New Break"
           @click="addBreak"
           
            >
              
            </VBtn>
          </VCardItem>
        
        <VCardText>
          
          <v-layout style="overflow: auto;">
            <v-flex v-for="(item, index) in slots" :key="index" class="item" v-draggable="'.item'">
              <VCard>
                <VCardTitle>{{ item.title }}</VCardTitle>
                
                <VCardText>
                  <span>
                  {{ item.start }} - {{ item.end }}
                  </span>
                </VCardText>
                <VCardText>
                  <p>
                  {{ item.duration }} minutes
                </p>
                </VCardText>
                <VCardText>
                  {{ item.slotType }}
                </VCardText>

                <VCardItem v-if="item.slotType=='BREAK'" class="d-block" style="display: block;">
                  <VRow>
                    <VCol cols="6">
                      <VIcon
                        icon="ri-arrow-left-line"
                        @click="move('left',item.num)"
                      />
                    </VCol>

                    <VCol cols="6">
                      <VIcon
                        icon="ri-arrow-right-line"
                        @click="move('right',item.num)"
                      />
                    </VCol>
              
              </VRow>
              <VRow>
                <VCol>
                  <VIcon
                        icon="ri-eraser-line"
                        @click="deleteSlot(item)"
                        color="error"
                      />
                </VCol>
                <VCol>
                  <VIcon
                        icon="ri-edit-line"
                        @click="editSlot(item)"
                      />
                </VCol>
              </VRow>
                </VCardItem>



              </VCard>
              
            </v-flex>
          </v-layout>
        
        </VCardText>


        
      </VCard>
        
      </VCol>
    </VRow>
  
  
  
  </div>
  <VDialog
v-model="popup.show"
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
                  label="New Title"
                  v-model="popup.item.title"

                />
              </VCol>
              </VRow>
              <VRow>
              <VCol>
                <VTextField
                  label="Duration (minutes)"
                  v-model="popup.item.duration"
                />
              </VCol>
              </VRow>
              <VSpacer/>
              <v-spacer></v-spacer>
              <VRow>
                  <VCol>
                    </VCol>
                    </VRow>
                
              <VCardActions>
                <VRow>
                  <VCol>
                    <!-- <VBtn
                    text="Update"
                    type="submit"
                    color="primary"
                    @click.prevent="updateTitle"
                    >
                    Update Title
                    </VBtn> -->

                    <VBtn
                     
                      
                      class="w-100"
                      variant="outlined"
                      :text="popup.success==null?'Save Changes':'Updated'"
                      :color="popup.success==null?'primary':'success'"
                      @click="saveSlot"
                      />
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
  
  import { useRouter } from 'vue-router';
  
  import axios from 'axios';
import Cookies from 'vue-cookies';

import Swal from 'sweetalert2';


  
  const router = useRouter();
  
  let apiUrl = window.location.protocol + "//" + window.location.hostname + ":8080";
  
       
  
  
  const form=ref({
    
    "year": 2024,
    "term": '',
    "title": "",
    grades:[],
    sel:[],
    success:null
  
  })
  
  let classes=['1','2','3','4'];


  const popup=ref({
    show:false,
    item:null
  })

  const editSlot=(item)=>{
    popup.value.show=true;
    popup.value.item=item;
  }

  const deleteSlot=(item)=>{

    Swal.fire({
        title: 'Delete Break',
        text: 'Are you sure you want to delete this Break?',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#d33',
        cancelButtonColor: '#3085d6',
        confirmButtonText: 'Yes, delete it!'
      }).then((result) => {

        if(result.isConfirmed)
        {
          axios.delete(apiUrl +`/api/v1/slots/delete/${item.num}`, {
                  headers: {
                      Authorization: Cookies.get("Authorization")
                  },
              }).then((response) => {
                      console.log(response);
                      loadSlots();
              })
        }
      });

  }


  
  const submitForm=()=>{
    form.value.grades=[]
    for(var ff=0;ff<classes.length;ff++)
      if(form.value.sel[parseInt(ff)])
        form.value.grades.push(parseInt(ff)+1);

      console.log(form.value.grades)
  
    axios.post(apiUrl +"/api/v1/timetable/setSpecializedGrades",form.value.grades, {
            headers: {
                Authorization: Cookies.get("Authorization")
            },
        }).then((response) => {
                console.log(response);
                form.value.success=true;
                window.setTimeout(()=>{form.value.success=null},2000)
  
            })
          .catch((error)=>{
            console.log(error)
  
            var cont=""
            if(error.response.data.message)
              cont=error.response.data.message
            else
              cont=error.response.data;
            alert("error "+cont);
  
          })
        }
  
  
  
  
  const submit=()=>{
  
  }

  axios.get(apiUrl +"/api/v1/timetable/getSpecializedGrades", {
            headers: {
                Authorization: Cookies.get("Authorization")
            },
        }).then((response) => {
                console.log(response);
                form.value.sel=[false,false,false,false]
                form.value.grades=response.data;
                for(var i=0;i<form.value.grades.length;i++)
                  form.value.sel[form.value.grades[i]-1]=true
                  
                console.log(form.value.grades)
                console.log(form.value.sel)
        });

  const slots=ref([])


    const loadSlots=()=>{
      axios.get(apiUrl +"/api/v1/slots/listSlots", {
            headers: {
                Authorization: Cookies.get("Authorization")
            },
        }).then((response) => {
                console.log(response);
                slots.value=response.data;
        })
    }


    loadSlots();




    const addBreak=()=>{
      const { value: inputValue } = Swal.fire({
        title: 'Enter Break Title',
        input: 'text',
        inputLabel: 'Break Title',
        inputPlaceholder: 'Type here...',
        showCancelButton: true
      }).then((inputValue)=>{

        if (inputValue) {
        // Swal.fire(`You entered: ${inputValue}`);
        axios.get(apiUrl +"/api/v1/slots/addBreak?title="+inputValue.value, {
            headers: {
                Authorization: Cookies.get("Authorization")
            },
        }).then((response) => {
                console.log(response);
                loadSlots();
        })
      }

      })

      
    }
  

    const move=(direction,num)=>{
      axios.get(apiUrl +`/api/v1/slots/move/${num}/${direction}`, {
            headers: {
                Authorization: Cookies.get("Authorization")
            },
        }).then((response) => {
                console.log(response);
                loadSlots();
        })
    }


    const lform=ref({
        success:null
    })
  
    const loadInitialData=()=>
    {
      axios.get(apiUrl +`/api/v1/slots/lessonsPerDay`, {
            headers: {
                Authorization: Cookies.get("Authorization")
            },
        }).then((response) => {
                console.log(response);
                lform.value=response.data;
        })
    }
  
    loadInitialData();



    const saveLessons=()=>{
      if(lform.value.startTime.length<8)
        lform.value.startTime+=':00'
      console.log(lform.value)
      axios.put(apiUrl +`/api/v1/slots/lessonsPerDay`,lform.value, {
            headers: {
                Authorization: Cookies.get("Authorization")
            },
        }).then((response) => {
                console.log(response);
                lform.value.success=true;
                window.setTimeout(()=>{lform.value.success=null},2000)
                loadSlots();
        })
    }


    const saveSlot=()=>{
      
      console.log(popup.value)
      axios.put(apiUrl +`/api/v1/slots/updateSlot`,popup.value.item, {
            headers: {
                Authorization: Cookies.get("Authorization")
            },
        }).then((response) => {
                console.log(response);
                popup.value.show=false;
                popup.value.success=true;
                window.setTimeout(()=>{popup.value.success=null},2000)
                loadSlots();
        })
    }
  
  </script>
  <style>
  .item {
    width: 200px;
    height: auto;
    background-color: lightblue;
    margin: 10px;
    text-align: center;
    line-height: auto;
    box-sizing: border-box;
  }


  
  </style>
