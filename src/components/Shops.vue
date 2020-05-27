<template>
  <div class="container">
    <div class="row">
      <div class="col-sm-10">
        <h1>Shops</h1>
        <hr><br><br>
        <button type="button" class="btn btn-success btn-sm" v-b-modal.shop-modal>Add Shop</button>
        <br><br>
        <table class="table table-hover">
          <thead>
            <tr>
              <th scope="col">ID</th> 
              <th scope="col">Name</th>
              <th scope="col">Address</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(shop, index) in shops" :key="index">
              <td>{{ shop.id }}</td>
              <td>{{ shop.name }}</td>
              <td>{{ shop.address }}</td>
              <td>
                <button
			type="button"
			class="btn btn-warning btn-sm"
			v-b-modal.shop-update-modal
			@click="editShop(shop)">
		    Update
		</button>
                <button
			type="button"
			class="btn btn-danger btn-sm"
			@click="onDeleteShop(shop)">
		    Delete
		</button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
<b-modal ref="addShopModal"
         id="shop-modal"
         name="Add a new shop"
         hide-footer>
  <b-form @submit="onSubmit" @reset="onReset" class="w-100">
  <b-form-group id="form-name-group"
                label="Name:"
                label-for="form-name-input">
      <b-form-input id="form-name-input"
                    type="text"
                    v-model="addShopForm.name"
                    required
                    placeholder="Enter name">
      </b-form-input>
    </b-form-group>
    <b-form-group id="form-address-group"
                  label="Address:"
                  label-for="form-address-input">
        <b-form-input id="form-address-input"
                      type="text"
                      v-model="addShopForm.address"
                      required
                      placeholder="Enter address">
        </b-form-input>
      </b-form-group>
    <b-button type="submit" variant="primary">Submit</b-button>
    <b-button type="reset" variant="danger">Reset</b-button>
  </b-form>
</b-modal> 
<b-modal ref="editShopModal"
         id="shop-update-modal"
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
    <b-form-group id="form-address-edit-group"
                  label="address:"
                  label-for="form-address-edit-input">
        <b-form-input id="form-address-edit-input"
                      type="text"
                      v-model="editForm.address"
                      required
                      placeholder="Enter address">
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
      shops: [],
	addShopForm: {
        name: '',
        address: '',
      },
	editForm: {
	  name: '',
	  address: '',
	},
    };
  },
  methods: {
    getShops() {
      const path = 'http://localhost:8081/api/shop/all';
      axios.get(path)
        .then((res) => {
          this.shops = res.data;
        })
        .catch((error) => {
          // eslint-отключение следующей строки
          console.error(error);
        });
    },
  addShop(payload) {
      const path = 'http://localhost:8081/api/shop/create'; 
      axios.post(path, payload)
        .then(() => {
          this.getShops();
        })
        .catch((error) => {
          // eslint-отключение следующей строки
          console.log(error);
          this.getShops();
        });
    },
	updateShop(payload, shopID) {
	  const path = `http://localhost:8081/api/shop/update`; //доделать
	  axios.put(path, payload)
	    .then(() => {
	      this.getShops();
	    })
	    .catch((error) => {
	      // eslint-отключение следующей строки
	      console.error(error);
	      this.getShops();
	    });
	},
	onResetUpdate(evt) {
	  evt.preventDefault();
	  this.$refs.editShopModal.hide();
	  this.initForm();
	  this.getShops();
	},
    initForm() {
      this.addShopForm.name = '';
      this.addShopForm.address = '';
	this.editForm.name = '';
	this.editForm.address = '';
    },
    onSubmit(evt) {
      evt.preventDefault();
      this.$refs.addShopModal.hide();
      const payload = {
        name: this.addShopForm.name,
        address: this.addShopForm.address,
      };
      this.addShop(payload);
      this.initForm();
    },
    onReset(evt) {
      evt.preventDefault();
      this.$refs.addShopModal.hide();
      this.initForm();
    },
	editShop(shop) {
	  this.editForm = shop;
	},
	onSubmitUpdate(evt) {
	  evt.preventDefault();
	  this.$refs.editShopModal.hide();
	  const payload = {
	    name: this.editForm.name,
	    address: this.editForm.address,
	    read,
	  };
	  this.updateShop(payload, this.editForm.id);
	},
	removeShop(shopID) {
	  const path = `http://localhost:8081/api/shop/${shopID}/delete`;
	  axios.delete(path)
	    .then(() => {
	      this.getShops();
	    })
	    .catch((error) => {
	      // eslint-отключение следующей строки
	      console.error(error);
	      this.getShops();
	    });
	},
	onDeleteShop(shop) {
	  this.removeShop(shop.id);
	},
  },
  created() {
    this.getShops();
  },
};
</script>
