export const routes = [
  { path: '/', redirect: '/dashboard' },
  {
    path: '/',
    component: () => import('@/layouts/default.vue'),
    children: [
      {
        path: 'dashboard',
        component: () => import('@/pages/pexam/DashBoard.vue'),
      },

      {
        path: 'admissions',
        component: () => import('@/pages/pexam/admissions.vue'),
      },
      {
        path: 'students',
        component: () => import('@/pages/pexam/students.vue'),
      },
      {
        path: 'viewStudent',
        component: () => import('@/pages/pexam/viewStudent.vue'),
      },
      {
        path: 'editStudent',
        component: () => import('@/pages/pexam/editStudent.vue'),
      },
      {
        path: 'searchStudent',
        component: () => import('@/pages/pexam/searchStudent.vue'),
      },
      {
        path: 'createExam',
        component: () => import('@/pages/pexam/createExam.vue'),
      },
      {
        path: 'viewExam',
        component: () => import('@/pages/pexam/viewExam.vue'),
      },
      {
        path: 'viewExaminations',
        component: () => import('@/pages/pexam/viewExaminations.vue'),
      },
      {
        path : 'marksSheet',
        component: () => import('@/pages/pexam/marksSheet.vue'),
      },
      {
        path : 'studentsubjects',
        component: () => import('@/pages/pexam/studentsubjects.vue'),
      }
      ,
      {
        path : 'importStudents',
        component: () => import('@/pages/pexam/importStudents.vue'),
      },
      {
        path : 'systemLogs',
        component: () => import('@/pages/pexam/systemLogs.vue'),
      },
      {
        path : 'subjectsGrading',
        component: () => import('@/pages/pexam/subjectsGradings.vue'),
      }
      ,
      {
        path: 'account-settings',
        component: () => import('@/pages/account-settings.vue'),
      },
      {
        path: 'typography',
        component: () => import('@/pages/typography.vue'),
      },
      {
        path: 'icons',
        component: () => import('@/pages/icons.vue'),
      },
      {
        path: 'cards',
        component: () => import('@/pages/cards.vue'),
      },
      {
        path: 'tables',
        component: () => import('@/pages/tables.vue'),
      },
      {
        path: 'form-layouts',
        component: () => import('@/pages/form-layouts.vue'),
      },
    ],
  },
  {
    path: '/',
    component: () => import('@/layouts/blank.vue'),
    children: [
      {
        path: 'login',
        component: () => import('@/pages/login.vue'),
      },
      {
        path: 'register',
        component: () => import('@/pages/register.vue'),
      },
      {
        path: '/:pathMatch(.*)*',
        component: () => import('@/pages/[...error].vue'),
      },
    ],
  },
]
