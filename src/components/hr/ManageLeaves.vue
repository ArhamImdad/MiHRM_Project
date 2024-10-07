<template>
    <div class="leaves-dashboard">
        <!-- Dashboard Stats -->
        <div class="dashboard-stats">
            <div class="stat-box" v-for="(stat, index) in stats" :key="index">
                <h3>{{ stat.title }}</h3>
                <p>{{ stat.value }}</p>
            </div>
        </div>

        <!-- Filters -->
        <div class="filter-section">
            <input type="text" v-model="filters.employeeName" placeholder="Search Employee Name" class="input-field" />
            <select v-model="filters.leaveType" class="input-select">
                <option value="">Select Leave Type</option>
                <option v-for="type in leaveTypes" :key="type">{{ type }}</option>
            </select>
            <select v-model="filters.leaveStatus" class="input-select">
                <option value="">Select Leave Status</option>
                <option v-for="status in leaveStatuses" :key="status">{{ status }}</option>
            </select>
            <input type="date" v-model="filters.fromDate" class="input-field" />
            <input type="date" v-model="filters.toDate" class="input-field" />
            <button @click="searchLeaves" class="btn-search">Search</button>
        </div>

        <!-- Leave Table -->
        <div class="leave-table-wrapper">
            <table class="leave-table">
                <thead>
                    <tr>
                        <th>Employee</th>
                        <th>Leave Type</th>
                        <th>From</th>
                        <th>To</th>
                        <th>No. of Days</th>
                        <th>Reason</th>
                        <th>Status</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="leave in leaves" :key="leave.id" class="leave-row">
                        <td>{{ leave.employee }}</td>
                        <td>{{ leave.leaveType }}</td>
                        <td>{{ leave.fromDate }}</td>
                        <td>{{ leave.toDate }}</td>
                        <td>{{ leave.noOfDays }}</td>
                        <td>{{ leave.reason }}</td>
                        <td>
                            <select v-model="leave.status" @change="updateLeaveStatus(leave)" class="status-select">
                                <option v-for="status in leaveStatuses" :key="status" :value="status">{{ status }}
                                </option>
                            </select>
                        </td>
                        <td>
                            <div class="action-dropdown">
                                <button class="btn-actions" @click="toggleDropdown(leave)">
                                    &#8942;
                                </button>
                                <ul v-if="leave.showActions" class="action-menu">
                                    <li @click="editLeave(leave)"><i class="fas fa-pencil-alt"></i>Edit</li>
                                    <li @click="deleteLeave(leave)"><i class="fas fa-trash-alt"></i>Delete</li>
                                </ul>
                            </div>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>

        <!-- Add Leave Button -->
        <button @click="openModal" class="btn-add-leave">+ Add Leave</button>

        <!-- Modal for Add Leave -->
        <div v-if="isModalOpen" class="modal-overlay">
            <div class="modal">
                <button @click="closeModal" class="close-button">X</button>
                <h2>Add Leave</h2>

                <form @submit.prevent="submitLeave">
                    <label>
                        Leave Type *
                        <select v-model="leaveForm.leaveType" required>
                            <option disabled value="">Select Leave Type</option>
                            <option v-for="type in leaveTypes" :key="type" :value="type">{{ type }}</option>
                        </select>
                    </label>

                    <label>
                        From *
                        <input type="date" v-model="leaveForm.fromDate" required />
                    </label>

                    <label>
                        To *
                        <input type="date" v-model="leaveForm.toDate" required />
                    </label>

                    <label>
                        Number of days *
                        <input type="number" v-model="leaveForm.noOfDays" readonly />
                    </label>

                    <label>
                        Remaining Leaves *
                        <input type="number" v-model="leaveForm.remainingLeaves" readonly />
                    </label>

                    <label>
                        Leave Reason *
                        <textarea v-model="leaveForm.reason" required></textarea>
                    </label>

                    <button type="submit" class="btn-submit">Submit</button>
                </form>
            </div>
        </div>
    </div>
</template>
<script setup>
import { reactive, ref, onMounted, onBeforeUnmount } from 'vue';

// Dummy data (replace with API call)
const leaves = reactive([
    { id: 1, employee: 'Mujaid Nawaz', leaveType: 'Medical Leave', fromDate: '2024-01-01', toDate: '2024-01-02', noOfDays: 1, reason: 'Sick', status: 'Approved', showActions: false },
    { id: 2, employee: 'Qasim Ikram', leaveType: 'Casual Leave', fromDate: '2024-02-01', toDate: '2024-02-02', noOfDays: 2, reason: 'Vacation', status: 'Pending', showActions: false },
    // Add more leaves...
]);

const leaveTypes = ref(['Medical Leave', 'Casual Leave', 'Paternity Leave', 'Maternity Leave']);
const leaveStatuses = ref(['New', 'Pending', 'Approved', 'Declined']);

const filters = reactive({
    employeeName: '',
    leaveType: '',
    leaveStatus: '',
    fromDate: '',
    toDate: '',
});

const stats = ref([
    { title: 'Today Presents', value: '12 / 60' },
    { title: 'Planned Leaves', value: '8 Today' },
    { title: 'Unplanned Leaves', value: '0 Today' },
    { title: 'Pending Requests', value: '12' },
]);

// Modal control
const isModalOpen = ref(false);
const leaveForm = reactive({
    leaveType: '',
    fromDate: '',
    toDate: '',
    noOfDays: 0,
    remainingLeaves: 12,
    reason: '',
});

const openModal = () => {
    isModalOpen.value = true;
};

const closeModal = () => {
    isModalOpen.value = false;
};

const submitLeave = () => {
    alert(`
        Leave Type: ${leaveForm.leaveType}
        From: ${leaveForm.fromDate}
        To: ${leaveForm.toDate}
        No. of Days: ${leaveForm.noOfDays}
        Reason: ${leaveForm.reason}
    `);
    closeModal();
};

const searchLeaves = () => {
    console.log('Search leaves with filters:', filters);
};

const updateLeaveStatus = (leave) => {
    console.log('Update status for leave:', leave);
};

// Track the currently opened dropdown
const openDropdown = ref(null);

const toggleDropdown = (leave) => {
    leaves.forEach((l) => (l.showActions = false)); // Close all other dropdowns
    leave.showActions = !leave.showActions; // Toggle the current one
    openDropdown.value = leave.showActions ? leave : null; // Track the open dropdown
};

// Close the dropdown when clicking outside
const handleClickOutside = (event) => {
    if (openDropdown.value && !event.target.closest('.action-dropdown')) {
        openDropdown.value.showActions = false;
        openDropdown.value = null;
    }
};

// Add a click event listener on mount, and remove it on unmount
onMounted(() => {
    document.addEventListener('click', handleClickOutside);
});

onBeforeUnmount(() => {
    document.removeEventListener('click', handleClickOutside);
});

const editLeave = (leave) => {
    console.log('Editing leave:', leave);
};

const deleteLeave = (leave) => {
    console.log('Deleting leave:', leave);
};
</script>
<style scoped>
.leaves-dashboard {
    padding: 20px;
    font-family: 'Inter', sans-serif;
}

/* Dashboard Stats */
.dashboard-stats {
    display: flex;
    justify-content: space-between;
    margin-bottom: 30px;
}

.stat-box {
    background-color: #f5f8fa;
    padding: 20px;
    border-radius: 8px;
    text-align: center;
    width: 20%;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.stat-box h3 {
    font-size: 16px;
    color: #666;
}

.stat-box p {
    font-size: 20px;
    color: #333;
    font-weight: bold;
}

/* Filters */
.filter-section {
    display: flex;
    justify-content: space-between;
    margin-bottom: 20px;
}

.input-field,
.input-select {
    padding: 10px;
    border: 1px solid #ddd;
    border-radius: 6px;
    width: 18%;
}

.input-field:focus,
.input-select:focus {
    outline: none;
    border-color: #ff5e62;
}

.btn-search {
    background-color: #ff5e62;
    color: white;
    padding: 10px 20px;
    border-radius: 6px;
    cursor: pointer;
    transition: background-color 0.3s ease;
}

.btn-search:hover {
    background-color: #ff2e50;
}

/* Leave Table */
.leave-table-wrapper {
    overflow-x: auto;
}

.leave-table {
    width: 100%;
    border-collapse: collapse;
    background-color: white;
    border-radius: 8px;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
}

.leave-table th,
.leave-table td {
    padding: 15px;
    text-align: left;
    border-bottom: 1px solid #ddd;
}

.leave-row:hover {
    background-color: #f9f9f9;
}

.status-select {
    padding: 8px;
    border: 1px solid #ddd;
    border-radius: 4px;
}

/* Add Leave Button */
.btn-add-leave {
    background-color: #ff5e62;
    color: white;
    padding: 12px 24px;
    border-radius: 6px;
    cursor: pointer;
    margin-top: 20px;
    transition: background-color 0.3s ease;
}

.btn-add-leave:hover {
    background-color: #ff2e50;
}

/* Actions Dropdown */
.action-dropdown {
    position: relative;
}

.btn-actions {
    background: none;
    border: none;
    cursor: pointer;
    font-size: 18px;
}

.action-menu {
    position: absolute;
    right: 0;
    top: 25px;
    background-color: white;
    border: 1px solid #ddd;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
    list-style: none;
    padding: 0;
    margin: 0;
    z-index: 10;
    width: 120px;
}

.action-menu li {
    padding: 10px;
    display: flex;
    align-items: center;
    cursor: pointer;
    transition: background-color 0.3s ease;
}

.action-menu li:hover {
    background-color: #f5f5f5;
}

.action-menu li i {
    margin-right: 8px;
    color: #666;
}
.modal-overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    background: rgba(0, 0, 0, 0.5);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 1000;
}

.modal {
    background-color: white;
    padding: 20px;
    border-radius: 8px;
    width: 400px;
    position: relative;
}

.close-button {
    position: absolute;
    top: 10px;
    right: 10px;
    background: none;
    border: none;
    font-size: 16px;
    cursor: pointer;
}

.btn-add-leave {
    background-color: #4CAF50;
    color: white;
    padding: 10px 20px;
    border: none;
    border-radius: 5px;
    cursor: pointer;
}

.btn-submit {
    background-color: #4CAF50;
    color: white;
    padding: 10px 20px;
    border: none;
    border-radius: 5px;
    cursor: pointer;
}
</style>
