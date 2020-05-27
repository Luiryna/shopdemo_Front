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
              <th scope="col">Type</th>
              <th scope="col">Shop ID</th>
              <th scope="col">Quantity</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(good, index) in goods" :key="index">
              <td>{{ good.id }}</td>
              <td>{{ good.type }}</td>
              <td>{{ good.shopId }}</td>
              <td>{{ good.quantity }}</td>
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
  <b-form-group id="form-type-group"
                label="Type:"
                label-for="form-type-input">
      <b-form-input id="form-type-input"
                    type="text"
                    v-model="addGoodForm.type"
                    required
                    placeholder="Enter Type">
      </b-form-input>
    </b-form-group>
    <b-form-group id="form-shopId-group"
                  label="Shop ID:"
                  label-for="form-shopId-input">
        <b-form-input id="form-shopId-input"
                      type="text"
                      v-model="addGoodForm.shopId"
                      required
                      placeholder="Enter Shop ID">
        </b-form-input>
      </b-form-group>
      <b-form-group id="form-quantity-group"
                  label="Quantity:"
                  label-for="form-quantity-input">
        <b-form-input id="form-quantity-input"
                      type="text"
                      v-model="addGoodForm.quantity"
                      required
                      placeholder="Enter Quantity">
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
  <b-form-group id="form-type-edit-group"
                label="type:"
                label-for="form-type-edit-input">
      <b-form-input id="form-type-edit-input"
                    type="text"
                    v-model="editForm.type"
                    required
                    placeholder="Enter Type">
      </b-form-input>
    </b-form-group>
    <b-form-group id="form-shopId-edit-group"
                  label="shop ID:"
                  label-for="form-shopId-edit-input">
        <b-form-input id="form-shopId-edit-input"
                      type="text"
                      v-model="editForm.shopId"
                      required
                      placeholder="Enter Shop ID">
        </b-form-input>
      </b-form-group>
      <b-form-group id="form-quantity-edit-group"
                  label="quantity:"
                  label-for="form-quantity-edit-input">
        <b-form-input id="form-quantity-edit-input"
                      type="text"
                      v-model="editForm.quantity"
                      required
                      placeholder="Enter Quantity">
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
        type: '',
        shopId: '',
        quantity: '',
      },
	editForm: {
	  type: '',
      shopId: '',
      quantity: '',
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
      this.addGoodForm.type = '';
      this.addGoodForm.shopId = '';
      this.addGoodForm.quantity = '';
	this.editForm.type = '';
    this.editForm.shopId = '';
    this.editForm.quantity = '';
    },
    onSubmit(evt) {
      evt.preventDefault();
      this.$refs.addGoodModal.hide();
      const payload = {
        type: this.addGoodForm.type,
        shopId: this.addGoodForm.shopId,
        quantity: this.addGoodForm.quantity,
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
	  evt.preventDefault();
	  this.$refs.editGoodModal.hide();
	  const payload = {
	    type: this.editForm.type,
        shopId: this.editForm.shopId,
        quantity: this.editForm.quantity,
	    read,
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
