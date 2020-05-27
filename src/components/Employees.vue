<template>
  <div class="container">
    <div class="row">
      <div class="col-sm-10">
        <h1>Employees</h1>
        <hr><br><br>
        <button type="button" class="btn btn-success btn-sm" v-b-modal.employee-modal>Add Employee</button>
        <br><br>
        <table class="table table-hover">
          <thead>
            <tr>
              <th scope="col">ID</th> 
              <th scope="col">Full Name</th>
              <th scope="col">Shop Name</th>
              <th scope="col">Post</th>
              <th scope="col">Number</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(employee, index) in employees" :key="index">
              <td>{{ employee.id }}</td>
              <td>{{ employee.fullName }}</td>
              <td>{{ employee.shopName }}</td>
              <td>{{ employee.post }}</td>
              <td>{{ employee.number }}</td>
              <td>
                <button
			type="button"
			class="btn btn-warning btn-sm"
			v-b-modal.employee-update-modal
			@click="editEmployee(employee)">
		    Update
		</button>
                <button
			type="button"
			class="btn btn-danger btn-sm"
			@click="onDeleteEmployee(employee)">
		    Delete
		</button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
<b-modal ref="addEmployeeModal"
         id="employee-modal"
         name="Add a new employee"
         hide-footer>
  <b-form @submit="onSubmit" @reset="onReset" class="w-100">
  <b-form-group id="form-fullName-group"
                label="Full Name:"
                label-for="form-fullName-input">
      <b-form-input id="form-fullName-input"
                    type="text"
                    v-model="addEmployeeForm.fullName"
                    required
                    placeholder="Enter Full Name">
      </b-form-input>
    </b-form-group>
    <b-form-group id="form-shopName-group"
                  label="Shop Name:"
                  label-for="form-shopName-input">
        <b-form-input id="form-shopName-input"
                      type="text"
                      v-model="addEmployeeForm.shopName"
                      required
                      placeholder="Enter Shop Name">
        </b-form-input>
      </b-form-group>
      <b-form-group id="form-post-group"
                  label="Post:"
                  label-for="form-post-input">
        <b-form-input id="form-post-input"
                      type="text"
                      v-model="addEmployeeForm.post"
                      required
                      placeholder="Enter Post">
        </b-form-input>
      </b-form-group>
      <b-form-group id="form-number-group"
                  label="Number:"
                  label-for="form-number-input">
        <b-form-input id="form-number-input"
                      type="text"
                      v-model="addEmployeeForm.number"
                      required
                      placeholder="Enter Number">
        </b-form-input>
      </b-form-group>
    <b-button type="submit" variant="primary">Submit</b-button>
    <b-button type="reset" variant="danger">Reset</b-button>
  </b-form>
</b-modal> 
<b-modal ref="editEmployeeModal"
         id="employee-update-modal"
         name="Update"
         hide-footer>
  <b-form @submit="onSubmitUpdate" @reset="onResetUpdate" class="w-100">
  <b-form-group id="form-fullName-edit-group"
                label="Full Name:"
                label-for="form-fullName-edit-input">
      <b-form-input id="form-fullName-edit-input"
                    type="text"
                    v-model="editForm.fullName"
                    required
                    placeholder="Enter Full Name">
      </b-form-input>
    </b-form-group>
    <b-form-group id="form-shopName-edit-group"
                  label="Shop Name:"
                  label-for="form-shopName-edit-input">
        <b-form-input id="form-shopName-edit-input"
                      type="text"
                      v-model="editForm.shopName"
                      required
                      placeholder="Enter Shop Name">
        </b-form-input>
      </b-form-group>
      <b-form-group id="form-post-edit-group"
                  label="Post:"
                  label-for="form-post-edit-input">
        <b-form-input id="form-post-edit-input"
                      type="text"
                      v-model="editForm.post"
                      required
                      placeholder="Enter Post">
        </b-form-input>
      </b-form-group>
      <b-form-group id="form-number-edit-group"
                  label="Number:"
                  label-for="form-number-edit-input">
        <b-form-input id="form-number-edit-input"
                      type="text"
                      v-model="editForm.number"
                      required
                      placeholder="Enter Number">
        </b-form-input>
      </b-form-group>
    <b-button type="submit" variant="primary">Update</b-button>
    <b-button type="reset" variant="danger">Cancel</b-button>
  </b-form>
</b-modal> 
</div>
</template>

<script>

import axios from 'axios';

export default {
  data() {
    return {
      employees: [],
	addEmployeeForm: {
        fullName: '',
        shopName: '',
        post: '',
        number: '',
      },
	editForm: {
	  fullName: '',
    shopName: '',
    post: '',
    number: '',
	},
    };
  },
  methods: {
    getEmployees() {
      const path = 'http://localhost:8081/api/employee/all';
      axios.get(path)
        .then((res) => {
          this.employees = res.data;
        })
        .catch((error) => {
          // eslint-отключение следующей строки
          console.error(error);
        });
    },
  addEmployee(payload) {
      const path = 'http://localhost:8081/api/employee/create'; 
      axios.post(path, payload)
        .then(() => {
          this.getEmployees();
        })
        .catch((error) => {
          // eslint-отключение следующей строки
          console.log(error);
          this.getEmployees();
        });
    },
	updateEmployee(payload, employeeID) {
	  const path = `http://localhost:8081/api/employee/update`; //доделать
	  axios.put(path, payload)
	    .then(() => {
	      this.getEmployees();
	    })
	    .catch((error) => {
	      // eslint-отключение следующей строки
	      console.error(error);
	      this.getEmployees();
	    });
	},
	onResetUpdate(evt) {
	  evt.preventDefault();
	  this.$refs.editEmployeeModal.hide();
	  this.initForm();
	  this.getEmployees();
	},
    initForm() {
      this.addEmployeeForm.fullName = '';
      this.addEmployeeForm.shopName = '';
      this.addEmployeeForm.post = '';
      this.addEmployeeForm.number= '';
	this.editForm.fullName = '';
  this.editForm.shopName = '';
  this.editForm.post = '';
  this.editForm.number = '';
    },
    onSubmit(evt) {
      evt.preventDefault();
      this.$refs.addEmployeeModal.hide();
      const payload = {
        fullName: this.addEmployeeForm.fullName,
        shopName: this.addEmployeeForm.shopName,
        post: this.addEmployeeForm.post,
        number: this.addEmployeeForm.number,
      };
      this.addEmployee(payload);
      this.initForm();
    },
    onReset(evt) {
      evt.preventDefault();
      this.$refs.addEmployeeModal.hide();
      this.initForm();
    },
	editEmployee(employee) {
	  this.editForm = employee;
	},
	onSubmitUpdate(evt) {
	  evt.preventDefault();
	  this.$refs.editEmployeeModal.hide();
	  const payload = {
	    fullName: this.editForm.fullName,
      shopName: this.editForm.shopName,
      post: this.editForm.post,
      number: this.editForm.number,
	    read,
	  };
	  this.updateEmployee(payload, this.editForm.id);
	},
	removeEmployee(employeeID) {
	  const path = `http://localhost:8081/api/employee/${employeeID}/delete`;
	  axios.delete(path)
	    .then(() => {
	      this.getEmployees();
	    })
	    .catch((error) => {
	      // eslint-отключение следующей строки
	      console.error(error);
	      this.getEmployees();
	    });
	},
	onDeleteEmployee(employee) {
	  this.removeEmployee(employee.id);
	},
  },
  created() {
    this.getEmployees();
  },
};
</script>
