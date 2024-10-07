<template>
    <div class="container mt-5">
      <h3 class="text-black">Attendance</h3>
      <nav aria-label="breadcrumb">
        <ol class="breadcrumb">
          <li class="breadcrumb-item"><a href="#">Dashboard</a></li>
          <li class="breadcrumb-item active" aria-current="page">Attendance</li>
        </ol>
      </nav>

      <!-- Filters -->
      <div class="row mb-3">
        <div class="col">
          <input v-model="filters.name" type="text" class="form-control" placeholder="Employee Name" />
        </div>
        <div class="col">
          <select v-model="filters.month" class="form-select">
            <option disabled value="">Select Month</option>
            <option v-for="month in months" :key="month.value" :value="month.value">{{ month.name }}</option>
          </select>
        </div>
        <div class="col">
          <select v-model="filters.year" class="form-select">
            <option disabled value="">Select Year</option>
            <option v-for="year in years" :key="year" :value="year">{{ year }}</option>
          </select>
        </div>
        <div class="col">
          <button @click="search" class="btn --basic-button w-100">Search</button>
        </div>
      </div>

      <!-- Attendance Table -->
      <table class="table table-bordered text-center">
        <thead>
          <tr>
            <th>Employee</th>
            <th v-for="day in days" :key="day">{{ day }}</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="employee in filteredEmployees" :key="employee.id">
            <td>
              <img :src="employee.image" :alt="employee.name" class="employee-img me-2" />
              {{ employee.name }}
            </td>
            <td v-for="(icon, index) in employee.icons" :key="index" class="position-relative">
              <!-- Correct/Wrong Icon -->
              <i
                v-if="icon"
                :class="getIconClass(icon)"
                @click="handleIconClick(employee, index)"
                class="action-icon"
                title="View Details"
              ></i>
            </td>
          </tr>
        </tbody>
      </table>

      <!-- Modal for Employee Check-In/Out Details -->
      <div v-if="showModal" class="modal-overlay" @click.self="closeModal">
        <div class="modal-content">
          <button @click="closeModal" class="close-button">&times;</button>
          <!-- EmployeesCheckInOut component inside modal -->
          <EmployeeCheckInOut :employee="selectedEmployee" :day="selectedDay" />
        </div>
      </div>
    </div>
  </template>

  <script setup>
  import { ref, computed } from "vue";
  import EmployeeCheckInOut from "./EmployeeCheckInOut.vue";
  // Filters for searching
  const filters = ref({
    name: "",
    month: "",
    year: "",
  });

  // Define days, months, and years
  const days = Array.from({ length: 15 }, (_, i) => i + 1); // Days 1-15
  const months = [
    { name: "January", value: 1 },
    { name: "February", value: 2 },
    { name: "March", value: 3 },
    { name: "April", value: 4 },
    { name: "May", value: 5 },
    { name: "June", value: 6 },
    { name: "July", value: 7 },
    { name: "August", value: 8 },
    { name: "September", value: 9 },
    { name: "October", value: 10 },
    { name: "November", value: 11 },
    { name: "December", value: 12 },
  ];
  const years = [2024, 2023, 2022, 2021, 2020];

  // Sample employees data with random icons
  const employees = ref([
    {
      id: 1,
      name: "John Doe",
      image: "https://via.placeholder.com/40",
      icons: generateRandomIcons(15),
    },
    {
      id: 2,
      name: "Richard Miles",
      image: "https://via.placeholder.com/40",
      icons: generateRandomIcons(15),
    },
    // Add more employees as needed...
  ]);

  // Function to generate an array of random 'correct' or 'wrong' icons
  function generateRandomIcons(length) {
    const icons = [];
    for (let i = 0; i < length; i++) {
      // 50% chance to have an icon
      if (Math.random() < 0.5) {
        icons.push(null); // No icon for this day
      } else {
        // 50% chance for 'correct' or 'wrong'
        icons.push(Math.random() < 0.5 ? "correct" : "wrong");
      }
    }
    return icons;
  }

  // Modal state
  const showModal = ref(false);
  const selectedEmployee = ref(null);
  const selectedDay = ref(null);

  // Computed property for filtering employees
  const filteredEmployees = computed(() => {
    return employees.value.filter((employee) => {
      const matchesName = !filters.value.name ||
        employee.name.toLowerCase().includes(filters.value.name.toLowerCase());
      const matchesMonth = !filters.value.month || true; // Extend logic as needed
      const matchesYear = !filters.value.year || true;
      return matchesName && matchesMonth && matchesYear;
    });
  });

  // Search function (to be extended with actual filtering logic)
  const search = () => {
    console.log("Search triggered with filters:", filters.value);
    // Since we're using dummy data, no action is taken here.
  };

  // Function to get the appropriate icon class based on the icon type
  const getIconClass = (iconType) => {
    if (iconType === "correct") {
      return "fas fa-check-circle text-success"; // Adjust classes as needed
    } else if (iconType === "wrong") {
      return "fas fa-times-circle text-danger";
    }
    return "";
  };

  // Handle icon click based on the icon type
  const handleIconClick = (employee, dayIndex) => {
    const iconType = employee.icons[dayIndex];
    if (iconType === "correct") {
      openModal(employee, dayIndex + 1);
    } else if (iconType === "wrong") {
      // Dummy functionality for wrong icon click
      alert(`Wrong icon clicked for ${employee.name} on Day ${dayIndex + 1}`);
    }
  };

  // Open modal with selected employee and day
  const openModal = (employee, day) => {
    selectedEmployee.value = employee;
    selectedDay.value = day;
    showModal.value = true;
  };

  // Close modal
  const closeModal = () => {
    showModal.value = false;
    selectedEmployee.value = null;
    selectedDay.value = null;
  };
  </script>

  <style scoped>
  .employee-img {
    width: 40px;
    height: 40px;
    border-radius: 50%;
    object-fit: cover;
  }

  .modal-overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.7);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 1000;
  }

  .modal-content {
    background-color: white;
    padding: 20px;
    border-radius: 10px;
    position: relative;
    max-width: 90%;
    max-height: 90%;
    overflow-y: auto;
  }

  .close-button {
    position: absolute;
    top: 10px;
    right: 15px;
    background: transparent;
    border: none;
    font-size: 1.5rem;
    cursor: pointer;
  }

  /* Styles for Action Icons within Day Cells */
  .action-icon {
    font-size: 1.2rem;
    cursor: pointer;
  }

  .action-icon:hover {
    opacity: 0.7;
  }

  .text-success {
    color: #198754 !important; /* Bootstrap success color */
  }

  .text-danger {
    color: #dc3545 !important; /* Bootstrap danger color */
  }

  /* Positioning the action icon within the table cell */
  .position-relative {
    position: relative;
  }

  /* Button color */
  .--basic-button {
    background-color: var(--basic-button-color, #007bff);
    color: white;
  }

  </style>
