<template>
  <div class="container">
    <div class="row">
      <div class="col-sm-10">
        <h1>Goods in Stock</h1>
        <hr><br><br>
        <button type="button" class="btn btn-success btn-sm" v-b-modal.price-modal>Add Price</button>
        <br><br>
        <table class="table table-hover">
          <thead>
            <tr>
              <th scope="col">Stock ID</th>
              <th scope="col">Good ID</th>
              <th scope="col">Price</th>
              <th scope="col">Value</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(price, index) in prices" :key="index">
              <td>{{ price.stockId }}</td>
              <td>{{ price.goodId }}</td>
              <td>{{ price.price }}</td>
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
  <b-form-group id="form-stockId-group"
                label="Stock ID:"
                label-for="form-stockId-input">
      <b-form-input id="form-stockId-input"
                    type="text"
                    v-model="addPriceForm.stockId"
                    required
                    placeholder="Enter Stock ID">
      </b-form-input>
    </b-form-group>
    <b-form-group id="form-goodId-group"
                  label="Good ID:"
                  label-for="form-goodId-input">
        <b-form-input id="form-goodId-input"
                      type="text"
                      v-model="addPriceForm.goodId"
                      required
                      placeholder="Enter Good ID">
        </b-form-input>
      </b-form-group>
      <b-form-group id="form-price-group"
                  label="Price:"
                  label-for="form-price-input">
        <b-form-input id="form-price-input"
                      type="text"
                      v-model="addPriceForm.price"
                      required
                      placeholder="Enter Price">
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
  <b-form-group id="form-stockId-edit-group"
                label="stock ID:"
                label-for="form-stockId-edit-input">
      <b-form-input id="form-stockId-edit-input"
                    type="text"
                    v-model="editForm.stockId"
                    required
                    placeholder="Enter Stock ID">
      </b-form-input>
    </b-form-group>
    <b-form-group id="form-goodId-edit-group"
                  label="goodId:"
                  label-for="form-goodId-edit-input">
        <b-form-input id="form-goodId-edit-input"
                      type="text"
                      v-model="editForm.goodId"
                      required
                      placeholder="Enter goodId">
        </b-form-input>
      </b-form-group>
      <b-form-group id="form-price-edit-group"
                  label="price:"
                  label-for="form-price-edit-input">
        <b-form-input id="form-price-edit-input"
                      type="text"
                      v-model="editForm.price"
                      required
                      placeholder="Enter price">
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
        stockId: '',
        goodId: '',
        price: '',
        value: '',
      },
	editForm: {
	  stockId: '',
    goodId: '',
    price: '',
    value: '',
	},
    };
  },
  methods: {
    getPrices() {
      const path = 'http://localhost:8081/api/goods_in_stock/all';
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
      const path = 'http://localhost:8081/api/goods_in_stock/create'; 
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
	  const path = `http://localhost:8081/api/goods_in_stock/update`; //доделать
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
      this.addPriceForm.stockId = '';
      this.addPriceForm.goodId = '';
      this.addPriceForm.price = '';
      this.addPriceForm.value = '';
	this.editForm.stockId = '';
  this.editForm.goodId = '';
  this.editForm.price = '';
  this.editForm.value = '';
    },
    onSubmit(evt) {
      evt.preventDefault();
      this.$refs.addPriceModal.hide();
      const payload = {
        stockId: this.addPriceForm.stockId,
        goodId: this.addPriceForm.goodId,
        price: this.addPriceForm.price,
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
	    stockId: this.editForm.stockId,
      goodId: this.editForm.goodId,
      price: this.editForm.price,
      value: this.editForm.value,
	    id: this.editForm.id
	  };
	  this.updatePrice(payload, this.editForm.id);
	},
	removePrice(priceID) {
	  const path = `http://localhost:8081/api/goods_in_stock/${priceID}/delete`;
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
