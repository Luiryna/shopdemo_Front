<template>
  <div class="container">
    <div class="row">
      <div class="col-sm-10">
        <h1>Stocks</h1>
        <hr><br><br>
        <button type="button" class="btn btn-success btn-sm" v-b-modal.stock-modal>Add Stock</button>
        <br><br>
        <table class="table table-hover">
          <thead>
            <tr>
              <th scope="col">ID</th> 
              <th scope="col">Shop ID</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(stock, index) in stocks" :key="index">
              <td>{{ stock.id }}</td>
              <td>{{ stock.shopId }}</td>
              <td>
                <button
			type="button"
			class="btn btn-warning btn-sm"
			v-b-modal.stock-update-modal
			@click="editStock(stock)">
		    Update
		</button>
                <button
			type="button"
			class="btn btn-danger btn-sm"
			@click="onDeleteStock(stock)">
		    Delete
		</button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
<b-modal ref="addStockModal"
         id="stock-modal"
         name="Add a new stock"
         hide-footer>
  <b-form @submit="onSubmit" @reset="onReset" class="w-100">
  <b-form-group id="form-shopId-group"
                label="Full Name:"
                label-for="form-shopId-input">
      <b-form-input id="form-shopId-input"
                    type="text"
                    v-model="addStockForm.shopId"
                    required
                    placeholder="Enter Shop ID">
      </b-form-input>
    </b-form-group>
    <b-button type="submit" variant="primary">Submit</b-button>
    <b-button type="reset" variant="danger">Reset</b-button>
  </b-form>
</b-modal> 
<b-modal ref="editStockModal"
         id="stock-update-modal"
         name="Update"
         hide-footer>
  <b-form @submit="onSubmitUpdate" @reset="onResetUpdate" class="w-100">
  <b-form-group id="form-shopId-edit-group"
                label="Full Name:"
                label-for="form-shopId-edit-input">
      <b-form-input id="form-shopId-edit-input"
                    type="text"
                    v-model="editForm.shopId"
                    required
                    placeholder="Enter Shop ID">
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
      stocks: [],
	addStockForm: {
        shopId: '',
      },
	editForm: {
	  shopId: '',
	},
    };
  },
  methods: {
    getStocks() {
      const path = 'http://localhost:8081/api/stock/all';
      axios.get(path)
        .then((res) => {
          this.stocks = res.data;
        })
        .catch((error) => {
          // eslint-отключение следующей строки
          console.error(error);
        });
    },
  addStock(payload) {
      const path = 'http://localhost:8081/api/stock/create'; 
      axios.post(path, payload)
        .then(() => {
          this.getStocks();
        })
        .catch((error) => {
          // eslint-отключение следующей строки
          console.log(error);
          this.getStocks();
        });
    },
	updateStock(payload, stockID) {
	  const path = `http://localhost:8081/api/stock/update`; //доделать
	  axios.put(path, payload)
	    .then(() => {
	      this.getStocks();
	    })
	    .catch((error) => {
	      // eslint-отключение следующей строки
	      console.error(error);
	      this.getStocks();
	    });
	},
	onResetUpdate(evt) {
	  evt.preventDefault();
	  this.$refs.editStockModal.hide();
	  this.initForm();
	  this.getStocks();
	},
    initForm() {
      this.addStockForm.shopId = '';
	this.editForm.shopId = '';
    },
    onSubmit(evt) {
      evt.preventDefault();
      this.$refs.addStockModal.hide();
      const payload = {
        shopId: this.addStockForm.shopId,
      };
      this.addStock(payload);
      this.initForm();
    },
    onReset(evt) {
      evt.preventDefault();
      this.$refs.addStockModal.hide();
      this.initForm();
    },
	editStock(stock) {
	  this.editForm = stock;
	},
	onSubmitUpdate(evt) {
	  evt.preventDefault();
	  this.$refs.editStockModal.hide();
	  const payload = {
	    shopId: this.editForm.shopId,
	    id: this.editForm.id
	  };
	  this.updateStock(payload, this.editForm.id);
	},
	removeStock(stockID) {
	  const path = `http://localhost:8081/api/stock/${stockID}/delete`;
	  axios.delete(path)
	    .then(() => {
	      this.getStocks();
	    })
	    .catch((error) => {
	      // eslint-отключение следующей строки
	      console.error(error);
	      this.getStocks();
	    });
	},
	onDeleteStock(stock) {
	  this.removeStock(stock.id);
	},
  },
  created() {
    this.getStocks();
  },
};
</script>
