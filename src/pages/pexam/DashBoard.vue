<script setup>

const newProject = {
  title: 'ExamSystem',
  color: 'primary',
  icon: 'ri-file-word-2-line',
  stats: '862',
  change: -18,
  subtitle: 'PExam System',
}
</script>

<template>
  <VRow class="match-height">
    

    <VCol
      cols="12"
      md="4"
    >
      <VRow class="match-height">
  

        <VCol
          cols="12"
          sm="6"
        >
          <CardStatisticsVertical v-bind="newProject" />
        </VCol>

       
        
      </VRow>
    </VCol>

  </VRow>
</template>
