<template>
  <div class="container">
    <div class="row">
      <div class="col-sm-10">
        <h1>Prices</h1>
        <hr><br><br>
        <button type="button" class="btn btn-success btn-sm" v-b-modal.price-modal>Add Price</button>
        <br><br>
        <table class="table table-hover">
          <thead>
            <tr>
              <th scope="col">ID</th> 
              <th scope="col">Shop ID</th>
              <th scope="col">Value</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(price, index) in prices" :key="index">
              <td>{{ price.id }}</td>
              <td>{{ price.shopId }}</td>
              <td>{{ price.value }}</td>
              <td>
                <button
			type="button"
			class="btn btn-warning btn-sm"
			v-b-modal.price-update-modal
			@click="editPrice(price)">
		    Update
		</button>
                <button
			type="button"
			class="btn btn-danger btn-sm"
			@click="onDeletePrice(price)">
		    Delete
		</button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
<b-modal ref="addPriceModal"
         id="price-modal"
         name="Add a new price"
         hide-footer>
  <b-form @submit="onSubmit" @reset="onReset" class="w-100">
  <b-form-group id="form-shopId-group"
                label="Shop ID:"
                label-for="form-shopId-input">
      <b-form-input id="form-shopId-input"
                    type="text"
                    v-model="addPriceForm.shopId"
                    required
                    placeholder="Enter Shop ID">
      </b-form-input>
    </b-form-group>
    <b-form-group id="form-value-group"
                  label="Value:"
                  label-for="form-value-input">
        <b-form-input id="form-value-input"
                      type="text"
                      v-model="addPriceForm.value"
                      required
                      placeholder="Enter Value">
        </b-form-input>
      </b-form-group>
    <b-button type="submit" variant="primary">Submit</b-button>
    <b-button type="reset" variant="danger">Reset</b-button>
  </b-form>
</b-modal> 
<b-modal ref="editPriceModal"
         id="price-update-modal"
         name="Update"
         hide-footer>
  <b-form @submit="onSubmitUpdate" @reset="onResetUpdate" class="w-100">
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
    <b-form-group id="form-value-edit-group"
                  label="value:"
                  label-for="form-value-edit-input">
        <b-form-input id="form-value-edit-input"
                      type="text"
                      v-model="editForm.value"
                      required
                      placeholder="Enter value">
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
      prices: [],
	addPriceForm: {
        shopId: '',
        value: '',
      },
	editForm: {
	  shopId: '',
	  value: '',
	},
    };
  },
  methods: {
    getPrices() {
      const path = 'http://localhost:8081/api/price/all';
      axios.get(path)
        .then((res) => {
          this.prices = res.data;
        })
        .catch((error) => {
          // eslint-отключение следующей строки
          console.error(error);
        });
    },
  addPrice(payload) {
      const path = 'http://localhost:8081/api/price/create'; 
      axios.post(path, payload)
        .then(() => {
          this.getPrices();
        })
        .catch((error) => {
          // eslint-отключение следующей строки
          console.log(error);
          this.getPrices();
        });
    },
	updatePrice(payload, priceID) {
	  const path = `http://localhost:8081/api/price/update`; //доделать
	  axios.put(path, payload)
	    .then(() => {
	      this.getPrices();
	    })
	    .catch((error) => {
	      // eslint-отключение следующей строки
	      console.error(error);
	      this.getPrices();
	    });
	},
	onResetUpdate(evt) {
	  evt.preventDefault();
	  this.$refs.editPriceModal.hide();
	  this.initForm();
	  this.getPrices();
	},
    initForm() {
      this.addPriceForm.shopId = '';
      this.addPriceForm.value = '';
	this.editForm.shopId = '';
	this.editForm.value = '';
    },
    onSubmit(evt) {
      evt.preventDefault();
      this.$refs.addPriceModal.hide();
      const payload = {
        shopId: this.addPriceForm.shopId,
        value: this.addPriceForm.value,
      };
      this.addPrice(payload);
      this.initForm();
    },
    onReset(evt) {
      evt.preventDefault();
      this.$refs.addPriceModal.hide();
      this.initForm();
    },
	editPrice(price) {
	  this.editForm = price;
	},
	onSubmitUpdate(evt) {
	  evt.preventDefault();
	  this.$refs.editPriceModal.hide();
	  const payload = {
	    shopId: this.editForm.shopId,
	    value: this.editForm.value,
	    read,
	  };
	  this.updatePrice(payload, this.editForm.id);
	},
	removePrice(priceID) {
	  const path = `http://localhost:8081/api/price/${priceID}/delete`;
	  axios.delete(path)
	    .then(() => {
	      this.getPrices();
	    })
	    .catch((error) => {
	      // eslint-отключение следующей строки
	      console.error(error);
	      this.getPrices();
	    });
	},
	onDeletePrice(price) {
	  this.removePrice(price.id);
	},
  },
  created() {
    this.getPrices();
  },
};
</script>
