<template>
  <div class="container">
    <div class="row">
      <div class="col-sm-10">
        <h1>Goods</h1>
        <hr><br><br>
        <button type="button" class="btn btn-success btn-sm" v-b-modal.good-modal>Add Good</button>
        <br><br>
        <table class="table table-hover">
          <thead>
            <tr>
              <th scope="col">ID</th> 
              <th scope="col">Name</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(good, index) in goods" :key="index">
              <td>{{ good.id }}</td>
              <td>{{ good.name }}</td>
              <td>
                <button
			type="button"
			class="btn btn-warning btn-sm"
			v-b-modal.good-update-modal
			@click="editGood(good)">
		    Update
		</button>
                <button
			type="button"
			class="btn btn-danger btn-sm"
			@click="onDeleteGood(good)">
		    Delete
		</button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
<b-modal ref="addGoodModal"
         id="good-modal"
         name="Add a new good"
         hide-footer>
  <b-form @submit="onSubmit" @reset="onReset" class="w-100">
  <b-form-group id="form-name-group"
                label="Name:"
                label-for="form-name-input">
      <b-form-input id="form-name-input"
                    type="text"
                    v-model="addGoodForm.name"
                    required
                    placeholder="Enter Name">
      </b-form-input>
    </b-form-group>
    <b-button type="submit" variant="primary">Submit</b-button>
    <b-button type="reset" variant="danger">Reset</b-button>
  </b-form>
</b-modal> 
<b-modal ref="editGoodModal"
         id="good-update-modal"
         name="Update"
         hide-footer>
  <b-form @submit="onSubmitUpdate" @reset="onResetUpdate" class="w-100">
  <b-form-group id="form-name-edit-group"
                label="name:"
                label-for="form-name-edit-input">
      <b-form-input id="form-name-edit-input"
                    type="text"
                    v-model="editForm.name"
                    required
                    placeholder="Enter name">
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
      goods: [],
	addGoodForm: {
        name: '',
      },
	editForm: {
	    name: '',
	},
    };
  },
  methods: {
    getGoods() {
      const path = 'http://localhost:8081/api/good/all';
      axios.get(path)
        .then((res) => {
          this.goods = res.data;
        })
        .catch((error) => {
          // eslint-отключение следующей строки
          console.error(error);
        });
    },
  addGood(payload) {
      const path = 'http://localhost:8081/api/good/create'; 
      axios.post(path, payload)
        .then(() => {
          this.getGoods();
        })
        .catch((error) => {
          // eslint-отключение следующей строки
          console.log(error);
          this.getGoods();
        });
    },
	updateGood(payload, goodID) {
    const path = `http://localhost:8081/api/good/update`; //доделать
    console.log(payload)
	  axios.put(path, payload)
	    .then(() => {
	      this.getGoods();
	    })
	    .catch((error) => {
	      // eslint-отключение следующей строки
	      console.error(error);
	      this.getGoods();
	    });
	},
	onResetUpdate(evt) {
	  evt.preventDefault();
	  this.$refs.editGoodModal.hide();
	  this.initForm();
	  this.getGoods();
	},
  initForm() {
    this.addGoodForm.name = '';
	  this.editForm.name = '';
  },
  onSubmit(evt) {
    evt.preventDefault();
    this.$refs.addGoodModal.hide();
    const payload = {
      name: this.addGoodForm.name,
    };
    this.addGood(payload);
    this.initForm();
  },
  onReset(evt) {
    evt.preventDefault();
    this.$refs.addGoodModal.hide();
    this.initForm();
  },
	editGood(good) {
	  this.editForm = good;
	},
	onSubmitUpdate(evt) {
    console.log('edit');
	  evt.preventDefault();
	  this.$refs.editGoodModal.hide();
	  const payload = {
      name: this.editForm.name,
      id: this.editForm.id
	  };
	  this.updateGood(payload, this.editForm.id);
	},
	removeGood(goodID) {
	  const path = `http://localhost:8081/api/good/${goodID}/delete`;
	  axios.delete(path)
	    .then(() => {
	      this.getGoods();
	    })
	    .catch((error) => {
	      // eslint-отключение следующей строки
	      console.error(error);
	      this.getGoods();
	    });
	},
	onDeleteGood(good) {
	  this.removeGood(good.id);
	},
  },
  created() {
    this.getGoods();
  },
};
</script>
