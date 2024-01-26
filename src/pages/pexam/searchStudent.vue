<template>
  <div>

    <VCard>
      <VCardTitle>
        Search Student
      </VCardTitle>
      <VCardText>
        <VRow>
          <VCol>
            <VTextField
            label="Enter Student Admission"
            v-model="info.search"
            >

            </VTextField>

          </VCol>
          
        </VRow>

        <VRow>
          <VCol class="w-50">

            <VBtn
            text="Search Student"
            @click="searchStudent"
            >
            Search Student      
             <VIcon
            icon="ri-search-line"
            class="p-2"
            ></VIcon>

            </VBtn>

          </VCol>

        </VRow>

      </VCardText>
    </VCard>
  </div>
  
</template>

<script setup>

import { useRouter } from 'vue-router';

const router = useRouter();

const info=ref({
  search:''
})
// const search=''

const searchStudent=()=>{
  console.log("searching "+info.value.search)

  if(info.value.search.length>0)
    router.push(`/viewStudent?admNo=${info.value.search}`)

}

</script>
