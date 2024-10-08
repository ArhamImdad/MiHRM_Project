<template>
    <div class="container-fluid dashboard-container">
      <div class="row no-gutters">
        <aside v-show="!sidebarHidden" class="col-12 col-md-3 col-lg-2 sidebar">
          <div class="sticky-button-container">
          <ul>
            <li v-if="hasPermission('User can add manager')">
              <router-link to="/dashboard/add-manager" @click="handleSidebarClick">
                <button class="sidebar-button">
                  <i class="fas fa-user-plus"></i>
                  <span>Add Managers</span>
                </button>
              </router-link>
            </li>
            <li v-if="hasPermission('User can view/accept/reject student requests')">
              <router-link to="/dashboard/student-requests" @click="handleSidebarClick">
                <button class="sidebar-button">
                  <i class="fas fa-user-graduate"></i>
                  <span>Student Requests</span>
                </button>
              </router-link>
            </li>
            <li v-if="hasPermission('User can view assigned quizzes to students')">
              <router-link to="/dashboard/create-quizzes" @click="handleSidebarClick">
                <button class="sidebar-button">
                  <i class="fas fa-clipboard-list"></i>
                  <span>Create Quiz</span>
                </button>
              </router-link>
            </li>
            <li v-if="hasPermission('User can assign quizzes to students')">
              <router-link to="/dashboard/assign-quizzes" @click="handleSidebarClick">
                <button class="sidebar-button">
                  <i class="fas fa-tasks"></i>
                  <span>Assign Quizzes</span>
                </button>
              </router-link>
            </li>
            <li v-if="hasPermission('User can view all quizes')">
              <router-link to="/dashboard/view-quizzes" @click="handleSidebarClick">
                <button class="sidebar-button">
                  <i class="fas fa-eye"></i>
                  <span>View All Quizzes</span>
                </button>
              </router-link>
            </li>
            <li v-if="hasPermission('User can view quiz results')">
              <router-link to="/dashboard/quiz-results" @click="handleSidebarClick">
                <button class="sidebar-button">
                  <i class="fas fa-chart-bar"></i>
                  <span>View Quiz Results</span>
                </button>
              </router-link>
            </li>
            <!-- <li v-if="hasPermission('User can view student details')">
              <router-link to="/dashboard/student-details" @click="handleSidebarClick">
                <button class="sidebar-button">
                  <i class="fas fa-info-circle"></i>
                  <span>View Student Details</span>
                </button>
              </router-link>
            </li> -->
            <!-- <li v-if="hasPermission('User can view assigned quizzes to students')">
              <router-link to="/dashboard/view-assigned-quizzes" @click="handleSidebarClick">
                <button class="sidebar-button">
                  <i class="fas fa-clipboard-list"></i>
                  <span>Assigned Quizzes</span>
                </button>
              </router-link>
            </li> -->
            <li v-if="hasPermission('User can view Assigned Quizzes')">
              <router-link to="/dashboard/student-assigned-quizzes" @click="handleSidebarClick">
                <button class="sidebar-button">
                  <i class="fas fa-clipboard-list"></i>
                  <span>Assigned Quizzes</span>
                </button>
              </router-link>
            </li>
            
            <!-- <li v-if="hasPermission('User can view Pending Quizzes')">
              <router-link to="/dashboard/student-pending-quizzes" @click="handleSidebarClick">
                <button class="sidebar-button">
                  <i class="fas fa-hourglass-half"></i>
                  <span>Pending Quizzes</span>
                </button>
              </router-link>
            </li> -->
            <!-- <li v-if="hasPermission('User can view Attempted Quizzes')">
              <router-link to="/dashboard/student-attempted-quizzes" @click="handleSidebarClick">
                <button class="sidebar-button">
                  <i class="fas fa-check-circle"></i>
                  <span>Attempted Quizzes</span>
                </button>
              </router-link>
            </li> -->
            <li v-if="hasPermission('User can view Assigned Quiz Results')">
              <router-link to="/dashboard/student-quiz-results" @click="handleSidebarClick">
                <button class="sidebar-button">
                  <i class="fas fa-poll"></i>
                  <span>Quiz Results</span>
                </button>
              </router-link>
            </li>
          </ul>
        </div>
        </aside>
        <main :class="['col-12', { 'hidden': sidebarHidden, 'col-md-9': !sidebarHidden, 'main-content': true }]">
          <button v-if="sidebarHidden" @click="showSidebar" class="back-button">
            <i class="fas fa-arrow-left"></i> Back
          </button>
          <h1 v-if="!greetingsHidden && !isSubrouteActive" @click="toggleGreetings">
            Greetings! What would you like to do today?
          </h1>
          <div v-if="!selectedComponent && !greetingsHidden && !isSubrouteActive" class="placeholder">
            <p>Please select an option from the sidebar to get started.</p>
          </div>
          <router-view></router-view>
        </main>
      </div>
    </div>
  </template>
  
  <script>
  import { ref, computed, onUnmounted } from 'vue';
  import { useStore } from 'vuex';
  import { useRoute } from 'vue-router';
  
  export default {
    setup() {
      const store = useStore();
      const route = useRoute();
      const selectedComponent = ref(null);
      const greetingsHidden = ref(false);
      const sidebarHidden = ref(false); // Default to false to show sidebar on load
  
      // Compute whether the current route is a subroute
      const isSubrouteActive = computed(() => {
        return route.path !== '/dashboard' && route.path.startsWith('/dashboard');
      });
  
      // Unified permission checking function
      const hasPermission = (permission) => {
        return store.getters['roles/hasPermission'](permission);
      };
      console.log("Storage",JSON.parse(localStorage.getItem('hasPermission')) );
      // Handle Sidebar
      const handleSidebarClick = () => {
        if (window.innerWidth < 768) {
          sidebarHidden.value = true; // Hide sidebar on small screens
        }
      };
      window.addEventListener('resize', () => {
        if (window.innerWidth >= 768) {
          sidebarHidden.value = false; // Ensure sidebar is visible on larger screens
        }
      });
      onUnmounted(() => {
        window.removeEventListener('resize', () => {
          if (window.innerWidth >= 768) {
            sidebarHidden.value = false;
          }
        });
      });
      const showSidebar = () => {
        sidebarHidden.value = false; // Show sidebar
      };
  
      const toggleGreetings = () => {
        greetingsHidden.value = !greetingsHidden.value;
      };
  
      return {
        selectedComponent,
        greetingsHidden,
        isSubrouteActive,
        sidebarHidden,
        hasPermission,
        handleSidebarClick,
        showSidebar,
        toggleGreetings,
      };
    },
  };
  </script>
  
  
  
  <style scoped>
  html, body {
      height: 100%;
      margin: 0;
  }
  
  .dashboard-container {
   
      height: 100vh; 
      
  }
  
  .sidebar {
      background-color: var(--black);
      padding: 15px;
      position: sticky; 
      height: auto;
      top: 0; 
     
  }
  .sticky-button-container {
      position: sticky; /* Sticky positioning */
      top: 0; /* Adjust top position as needed */
      background-color: var(--black); /* Match sidebar background */
      z-index: 10; /* Ensure it stays on top */
      padding: 15px 0; /* Padding to match sidebar */
  }
  
  button.sidebar-button {
      width: 100%;
      margin: 5px 0;
      padding: 10px;
      background-color: var(--black);
      color: white;
      border: none;
      cursor: pointer;
      transition: background-color 0.3s;
      display: flex;
      align-items: center;
      justify-content: flex-start; /* Align icon and text to the left */
  }
  
  button.sidebar-button i {
      margin-right: 10px;
      font-size: 1.2rem; 
  }
  
  button.sidebar-button span {
      flex-grow: 1;
  }
  
  button:hover {
      background-color: var(--deep-purple);
  }
  .sidebar a {
      text-decoration: none; 
      color: white; /* Set text color to white (or your desired color) */
  }
  button.sidebar-button span {
      flex-grow: 1; 
      display: flex; 
      align-items: center; /* Center text vertically */
  }
  .sidebar ul {
      padding: 0; 
      margin: 0;
  }
  
  .main-content {
      padding: 15px;
      display: flex; 
      flex-direction: column; 
      height: 100vh; 
      overflow: auto;
      margin-left: 70px;
  }
  
  .placeholder {
      flex: 1; 
      display: flex;
      justify-content: center;
      align-items: center;
      background-color: #f0f0f0; 
      color: #333; 
      text-align: center;
      border: 1px dashed #ccc; 
  }
  
  ul li {
      list-style: none;
  }
  
  button {
      width: 100%;
      margin: 5px 0;
      padding: 10px;
      background-color: var(--black);
      color: white; 
      border: none;
      cursor: pointer;
      transition: background-color 0.3s; 
  }
  
  button:hover {
      background-color: var(--deep-purple);
  }
  
  .back-button {
      width: 100px; 
      padding: 6px 10px; /* Adjust padding for a smaller button */
      background-color: var(--deep-purple);
      color: white; 
      border: none;
      border-radius: 4px; 
      cursor: pointer;
      transition: background-color 0.3s; 
      font-size: 0.9em; /* Smaller text */
  }
  
  .back-button i {
      font-size: 0.8em; /* Smaller icon */
      margin-right: 5px; /* Space between icon and text */
  }
  
  @media (max-width: 768px) {
      .sidebar {
          width: 100%; 
      }
  
      /* Show main content when sidebar is hidden */
      .main-content {
          display: flex; /* Change to flex to show content */
      }
  }
  </style>
  