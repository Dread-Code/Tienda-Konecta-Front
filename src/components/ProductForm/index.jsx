import React, { Component } from 'react';
import M from 'materialize-css';
import ProductsList from './ProductsList';

class ProductForm extends Component {

    constructor() {

        super();
        this.state = {
            _id: null,
            productTitle: '',
            ref: '',
            price: '',
            weight: '',
            category: '',
            stock: '',
            date: null
        }
        this.addProduct = this.addProduct.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    // evalua el id, si le pasa el id actualiza el producto y componente, si no crea un producto nuevo f

    addProduct = (e) => {
        const id = this.state._id
        if (id) {
            let url = `http://localhost:4000/v1/api/product/${id}`;
            fetch(url, {
                method: 'PATCH',
                body: JSON.stringify(this.state),
                headers: {
                    'Content-Type': 'application/json'
                }
            })
                .then(res => res.json())
                .then(data => {
                    console.log(data);
                    M.toast({ html: 'Producto Actualizado' });
                    this.setState({
                        _id: null,
                        productTitle: '',
                        ref: '',
                        price: '',
                        weight: '',
                        category: '',
                        date: new Date(),
                        stock: ''
                    });
                    this.child.getProducts();
                })
        } else {
            const url = 'http://localhost:4000/v1/api/product/create';

            fetch(url, {
                method: 'POST',
                body: JSON.stringify(this.state),
                headers: {
                    'Content-Type': 'application/json'
                }
            })
                .then(res => res.json())
                .then(data => {
                    console.log(data)
                    M.toast({ html: 'Producto Guardado' });
                    this.setState({
                        productTitle: '',
                        ref: '',
                        price: '',
                        weight: '',
                        category: '',
                        stock: '',
                        date: null
                    });
                    this.child.getProducts();
                }
                )
                .catch(err => console.log(err));
        }

        e.preventDefault();
    }

    selectedProduct = (data) =>{
        console.log(data);
        const {productTitle, ref, price, weight, category, stock, _id, date } = data;
        this.setState({
            productTitle, 
            ref, 
            price, 
            weight, 
            category, 
            stock, 
            _id, 
            date
        })
    }
    
    handleChange(e) {
        const { name, value } = e.target;
        this.setState({
            [name]: value
        })
    }
    

    render() {
        const {
            productTitle,
            ref,
            price,
            weight,
            category,
            stock } = this.state;

        return (
            <div>
                <div className="row">
                    <div className="col s5">
                        <div className="card">
                            <div className="card-content">
                                <form onSubmit={this.addProduct}>
                                    <div className="row">
                                        <div className="input-field col s12">
                                            <input value={productTitle} name="productTitle" type="text" placeholder="Product Title" onChange={this.handleChange}></input>
                                            <input value={ref} name="ref" type="text" placeholder="Ref" onChange={this.handleChange}></input>
                                            <input value={price} name="price" type="text" placeholder="Precio" onChange={this.handleChange}></input>
                                            <input value={weight} name="weight" type="text" placeholder="Peso" onChange={this.handleChange}></input>
                                            <input value={category} name="category" type="text" placeholder="Categoria" onChange={this.handleChange}></input>
                                            <input value={stock} name="stock" type="text" placeholder="Stock" onChange={this.handleChange}></input>
                                        </div>
                                        <button type="submit" className="btn light-blue darken-4">Send</button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                    <div className="col s7">
                        <ProductsList ref ={element => {this.child = element}} onSelectProduct ={this.selectedProduct} />
                    </div>
                </div>
                
            </div>

        );
    }
}

export default ProductForm;