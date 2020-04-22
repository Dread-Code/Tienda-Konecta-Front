import React, { Component } from 'react';

import ProductCard from './ProductCard';

class ProductsList extends Component {

    constructor(props){
        super(props)
        this.state = {
            products:[]
        }
    }
    
    componentDidMount = () => {
        this.getProducts()
    }



    // get products 

    getProducts = () => {
        let url = 'http://localhost:4000/v1/api/product'
        fetch(url)
            .then(res => res.json())
            .then(data => {
                console.log(data)
                this.setState({ products: data })
            })
    }

    handleProductOnClick = (data) =>{
        console.log('get it ' + data );
        this.props.onSelectProduct(data)
    }

    render() {
        const {products} = this.state;
        
        return (
            <ProductCard products = {products} onProductEditClick = {this.handleProductOnClick} onProductDelete = {this.getProducts}/>
        );
    }
}

export default ProductsList;