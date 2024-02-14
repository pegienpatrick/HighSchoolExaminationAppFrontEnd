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
             
              text="TimeTable Settings"
              to="/timetableSettings"
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
         Learning Venues
         <VRow>
              <VCol>
              <VBtn
              @click="newVenue"
              >
                <VIcon
                icon="ri-add-line"
                
                />
                Add New Venue
              </VBtn>
              </VCol>
        </VRow>
        </VCardTitle>
        <VCardText>

          <VForm >

           <VRow style=" font-weight:bold " >
            <VCol>
                Venue Name
              </VCol>
              <VCol>
                Venue Capacity
              </VCol>
              <VCol>
                Edit
              </VCol>
              <VCol>
                Delete
              </VCol>
           </VRow>
            <VRow v-for="venue in venues" :key="venue.num">
              <VCol>
                {{ venue.name }}
              </VCol>
              <VCol>
                {{ venue.capacity }}
              </VCol>
              <VCol>
                <VBtn
                icon="ri-edit-line"
                @click="editVenue(venue)"
                />
              </VCol>
              <VCol>
                <VBtn
                icon="ri-eraser-line"
                color="error"
                @click="deleteVenue(venue)"
                />
              </VCol>
        </VRow>
      </VForm>
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
      <VCard title="Venue Information">
        <VCardText>
          <VForm>
            <VRow>
              <VCol>
                <VTextField
                  label="Venue Name"
                  v-model="showForm.name"
                />
              </VCol>
              </VRow>
              <VSpacer/>
              <v-spacer></v-spacer>
              <VRow>
              <VCol>
                <VTextField
                  label="Venue Capacity"
                  v-model="showForm.capacity"
                  type="number"
                />
              </VCol>
              </VRow>
              <VRow>
                <VCol>
              <VSpacer/>
              <v-spacer></v-spacer>
            </VCol>
            </VRow>
              <VCardActions>
                <VRow>
                    <VCol color="primary">
                        <VBtn text="Submit" type="submit" @click.prevent="submitVenue" color="white"  class="btn btn-primary w-100" style="background:blue;color:white">
                            Submit
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
import Swal from 'sweetalert2';
import Cookies from 'vue-cookies';
import { useRouter } from 'vue-router';



const router = useRouter();

let apiUrl = window.location.protocol + "//" + window.location.hostname + ":8080";



const showForm=ref({
  show:false
})

const venues=ref(null)

const newVenue=()=>{
  console.log(showForm.value)
  showForm.value.show=true;
  showForm.value.name='';
  showForm.value.capacity=''
  showForm.value.num=null;
}

const submitVenue=()=>{
  // showForm.value.show=false;

if(showForm.value.num==null)
{
  axios.post(apiUrl+'/api/v1/venue/addVenue',showForm.value,{
                        headers: {
                            Authorization: Cookies.get("Authorization")
                        },
                    })
                        .then((response) => {
                          console.log(response.data);
                          showForm.value.show=false;
                          loadVenues();
                        }).catch((error)=>{
                          alert(JSON.stringify(error.response.data));
                        })
}
else{
  axios.put(apiUrl+'/api/v1/venue/updateVenue',showForm.value,{
                        headers: {
                            Authorization: Cookies.get("Authorization")
                        },
                    })
                        .then((response) => {
                          console.log(response.data);
                          showForm.value.show=false;
                          loadVenues();
                        }).catch((error)=>{
                          alert(JSON.stringify(error.response.data));
                        })
}

}

const loadVenues=()=>{

  axios.get(apiUrl+'/api/v1/venue/listVenues',{
                        headers: {
                            Authorization: Cookies.get("Authorization")
                        },
                    })
                        .then((response) => {
                          console.log(response.data);
                          venues.value=response.data;
                        });
  
}

loadVenues();


const editVenue=(venue)=>{
  showForm.value=venue;
  // console.log(showForm.value)
  showForm.value.show=true;
  // showForm.value.name='';
  // showForm.value.capacity=''
  // showForm.value.num=null;
}


const deleteVenue=(venue)=>{
    Swal.fire({
        title: 'Delete Venue '+venue.name,
        text: 'Are you sure you want to delete this Venue?',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#d33',
        cancelButtonColor: '#3085d6',
        confirmButtonText: 'Yes, delete it!'
      }).then((result) => {

        if(result.isConfirmed)
        {
        const apiUrl = window.location.protocol + "//" + window.location.hostname + ":8080";

        axios.delete(apiUrl + `/api/v1/venue/deleteVenue/${venue.num}`, {
            headers: {
                Authorization: Cookies.get("Authorization")
            },
        })
            .then((response) => {
              console.log(response)

              loadVenues();

            });
  }
});
  }

</script>
