<script setup>
import VerticalNavGroup from '@layouts/components/VerticalNavGroup.vue';
import VerticalNavLink from '@layouts/components/VerticalNavLink.vue';
</script>

<template>

<!-- Dashboard -->
<VerticalNavLink
      :item="{
        title: 'DashBoard',
        to: '/dashboard',
        icon: 'ri-home-line',
      }"
    />

  <!-- Admin -->
  <VerticalNavGroup
    :item="{
      title: 'Admin',
      icon: 'ri-settings-4-line',
    }"
  >
    <VerticalNavLink
      :item="{
        title: 'All Users',
        to: '/users',
        icon: 'ri-user-line',
      }"
    />
     <!-- <VerticalNavLink
      :item="{
        title: 'Subjects',
        to: '/Users',
        icon: 'ri-book-2-line',
      }"
    />
     <VerticalNavLink
      :item="{
        title: 'Streams',
        to: '/Users',
        icon: 'ri-git-branch-line',
      }"
    /> -->

    <VerticalNavLink
      :item="{
        title: 'System Logs',
        to: '/systemLogs',
        icon: 'ri-file-list-2-line',
      }"
    />

    <!-- <VerticalNavLink
      :item="{
        title: 'School Settings',
        to: '/Users',
        icon: 'ri-settings-5-line',
      }"
    /> -->


    <VerticalNavLink
      :item="{
        title: 'Import Students',
        to: '/importStudents',
        icon: 'ri-file-list-2-line',
      }"
    />


  </VerticalNavGroup>

  <!-- Students -->
  <VerticalNavGroup
    :item="{
      title: 'Students',
      icon: 'ri-user-3-line',
    }"
  >
    <VerticalNavLink
      :item="{
        title: 'Admissions',
        to: '/admissions',
        icon: 'ri-add-circle-line',
      }"
    />
     <VerticalNavLink
      :item="{
        title: 'View Students',
        to: '/students',
        icon: 'ri-eye-line',
      }"
    />

    <VerticalNavLink
      :item="{
        title: 'search Student',
        to: '/searchStudent',
        icon: 'ri-search-line',
      }"
    />

     <VerticalNavLink
      :item="{
        title: 'Students Subjects',
        to: '/studentsubjects',
        icon: 'ri-article-line',
      }"
    />

    

  </VerticalNavGroup>

  <!-- Examinations -->
  <VerticalNavGroup
    :item="{
      title: 'Examinations',
      icon: 'ri-pencil-line',
    }"
  >
    <VerticalNavLink
      :item="{
        title: 'Create Examination',
        to: '/createExam',
        icon: 'ri-pencil-line',
      }"
    />
     <VerticalNavLink
      :item="{
        title: 'view Examinations',
        to: '/viewTerms',
        icon: 'ri-book-line',
      }"
    />
    <VerticalNavLink
      :item="{
        title: 'Subjects Grading',
        to: '/subjectsGrading',
        icon: 'ri-book-2-line',
      }"
    />
   
    <!-- <VerticalNavLink
      :item="{
        title: 'Results',
        to: '/Users',
        icon: 'ri-bar-chart-2-line',
      }"
    /> -->
  </VerticalNavGroup>

  <!-- SMS Service -->
  <VerticalNavGroup
    :item="{
      title: 'SMS Service',
      icon: 'ri-message-2-line',
    }"
  >
    
    <VerticalNavLink
      :item="{
        title: 'Sms Stats',
        to: '/smsStats',
        icon: 'ri-book-2-line',
      }"
    />
    <VerticalNavLink
      :item="{
        title: 'Send SMS',
        to: '/composeSMS',
        icon: 'ri-send-plane-2-line',
      }"
    />
    <VerticalNavLink
      :item="{
        title: 'SMS Logs',
        to: '/smsLogs',
        icon: 'ri-file-list-2-line',
      }"
    />

    <VerticalNavLink
      :item="{
        title: 'SMS Balance',
        to: '/smsBalance',
        icon: 'ri-money-dollar-box-line',
      }"
    />
  </VerticalNavGroup>

  <!-- User Profile -->
  <VerticalNavGroup
    :item="{
      title: 'TimeTables',
      icon: 'ri-time-line',
    }"
  >
    <VerticalNavLink
      :item="{
        title: 'Exams TimeTables',
        to: '/examTimeTable',
        icon: 'ri-pencil-line',
      }"
    />
    <VerticalNavLink
      :item="{
        title: 'Teaching Timetables',
        to: '/teachingTimeTable',
        icon: 'ri-book-line',
      }"
    />
    <VerticalNavLink
      :item="{
        title: 'Subject Teachers',
        to: '/subjectTeachers',
        icon: 'ri-ruler-line',
      }"
    />
  </VerticalNavGroup>

  <!-- User Profile -->
  <VerticalNavGroup
    :item="{
      title: 'User Profile',
      icon: 'ri-user-line',
    }"
  >
    <VerticalNavLink
      :item="{
        title: 'Edit Profile',
        to: '/profile',
        icon: 'ri-pencil-line',
      }"
    />
    <VerticalNavLink
      :item="{
        title: 'Change Password',
        to: '/profilePassword',
        icon: 'ri-lock-password-line',
      }"
    />
    <VerticalNavLink
      :item="{
        title: 'Notifications',
        to: '/notifications',
        icon: 'ri-notification-line',
      }"
    />
  </VerticalNavGroup>

</template>
