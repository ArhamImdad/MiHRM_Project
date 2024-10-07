<template>
    <div class="attendance-info">
      <div class="timesheet-info">
        <h2>Attendance Info</h2>
        <div class="timesheet">
          <h3>Timesheet <span>{{ timesheetDate }}</span></h3>
          <div class="checkin-out">
            <div class="checkin">
              <p>Punch In at</p>
              <span>{{ punchInTime }}</span>
            </div>
            <div class="hours-worked">
              <span>{{ totalHours }} hrs</span>
            </div>
            <div class="checkout">
              <p>Punch Out at</p>
              <span>{{ punchOutTime }}</span>
            </div>
          </div>
          <div class="extra-info">
            <div class="break">
              <p>Break</p>
              <span>{{ breakTime }} hrs</span>
            </div>
            <div class="overtime">
              <p>Overtime</p>
              <span>{{ overtime }} hrs</span>
            </div>
          </div>
        </div>
      </div>

      <div class="activity-info">
        <h3>Activity</h3>
        <ul class="activity-list">
          <li v-for="activity in activities" :key="activity.id">
            <p>{{ activity.label }} <span>{{ activity.time }}</span></p>
          </li>
        </ul>
      </div>
    </div>
  </template>

  <script>
  export default {
    data() {
      return {
        timesheetDate: '11 Mar 2019',
        punchInTime: 'Wed, 11th Mar 2019 10:00 AM',
        punchOutTime: 'Wed, 20th Feb 2019 9:00 PM',
        totalHours: 3.45,
        breakTime: 1.21,
        overtime: 3,
        activities: [
          { id: 1, label: 'Punch In at', time: '10:00 AM' },
          { id: 2, label: 'Punch Out at', time: '11:00 AM' },
          { id: 3, label: 'Punch In at', time: '11:15 AM' },
          { id: 4, label: 'Punch Out at', time: '1:30 PM' },
          { id: 5, label: 'Punch In at', time: '2:00 PM' },
          { id: 6, label: 'Punch Out at', time: '7:30 PM' },
        ],
      };
    },
  };
  </script>

  <style scoped>
  .attendance-info h2 {
  color: #2c3e50; /* Set the desired color for the <h2> element */
}

.attendance-info h3 {
  color: #3498db; /* Set the desired color for the <h3> elements */
}

p,span{
    color: black;
}
  .attendance-info {
    display: flex;
    justify-content: space-between;
    padding: 20px;
    background-color: #fff;
    border-radius: 10px;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  }

  .timesheet-info,
  .activity-info {
    flex: 1;
  }

  .timesheet-info {
    padding-right: 20px;
    border-right: 1px solid #ddd;
  }

  .timesheet h3 {
    font-size: 1.2rem;
    margin-bottom: 20px;
  }

  .checkin-out,
  .extra-info {
    display: flex;
    justify-content: space-between;
    margin-bottom: 20px;
  }

  .checkin-out div,
  .extra-info div {
    width: 45%;
    padding: 10px;
    background-color: #f5f5f5;
    border-radius: 8px;
    text-align: center;
  }

  .hours-worked {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 50px;
    height: 50px;
    border: 2px solid #ddd;
    border-radius: 50%;
    margin: 0 auto;
    font-size: 1.5rem;
  }

  .activity-info {
    padding-left: 20px;
  }

  .activity-list {
    list-style: none;
    padding: 0;
  }

  .activity-list li {
    display: flex;
    justify-content: space-between;
    padding: 10px 0;
    border-bottom: 1px solid #ddd;
  }
  </style>
