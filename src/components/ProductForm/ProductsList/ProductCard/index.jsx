import React, { Component } from 'react';
import moment from 'moment';
import M from 'materialize-css';

class ProductCard extends Component {

    constructor(props){
        super(props);
    }

     // delete product

     deleteProduct = (id) => {
        const url = `http://localhost:4000/v1/api/product/${id}`
        fetch(url, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then(res => res.json())
            .then(data => {
                console.log(data);
                M.toast({ html: 'Producto Eliminado' });
                this.props.onProductDelete()
            })
    }
    // edit producto buttom para pasar el id a la funcion add product
    editProduct = (id) => {
        const url = `http://localhost:4000/v1/api/product/${id}`;
        fetch(url)
            .then(res => res.json())
            .then(data => {
                console.log(data)
                this.props.onProductEditClick(data)
                
            })
    }

    

    render() {
        const {products} = this.props;
        return (
            <div>

                {
                    products.map(product => {
                        const { productTitle, ref, price, weight, category, stock, _id, date } = product ;
                        return (
                            <div key={_id} className="card">
                                <div className="card-content">
                                    <h6>{productTitle}</h6>
                                    <div className="col s4">
                                        <span>Ref: {ref}<br /></span>
                                        <span>Precio: {price} <br /></span>
                                        <span>Peso: {weight}</span>
                                    </div>
                                    <div className="col s4">
                                        <span>Categoria:{category}<br /></span>
                                        <span>Stock: {stock}<br /></span>
                                        <span>Fecha: {moment(date).subtract(10, 'days').calendar()}</span>
                                    </div>
                                    <div className="col s4">
                                        <button onClick={() => this.editProduct(_id)} className="btn light-blue darken-4" style={{ margin: '0.3em' }}>
                                            <i className="material-icons">edit</i>
                                        </button>
                                        <button onClick={() => this.deleteProduct(_id)} className="btn light-blue darken-4" style={{ margin: '0.3em' }}>
                                            <i className="material-icons" >delete</i>
                                        </button>
                                    </div>
                                    <br></br>
                                    <br></br>
                                    <br></br>
                                    <br></br>
                                </div>
                            </div>

                        )
                    })
                }
            </div>
        );
    }
}

export default ProductCard;
