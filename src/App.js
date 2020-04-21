import React, {Component} from 'react';
import moment from 'moment';
import './App.css';
import M from 'materialize-css';

class App extends Component {

  constructor(){
    super();
    this.state = {
      _id:null,
      productTitle:'',
      ref:'',
      price:'',
      weight:'',
      category:'',
      stock: '',
      date:null,
      products: []
    }
    this.addProduct = this.addProduct.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  // evalua el id, si le pasa el id actualiza el producto y componente, si no crea un producto nuevo f

  addProduct = (e) => {
    const id = this.state._id
    if (id) {
      let url = `http://localhost:4000/v1/api/product/${id}`;
      fetch(url,{
        method: 'PATCH',
        body: JSON.stringify(this.state),
        headers:{
          'Content-Type': 'application/json'
        }
      })
      .then( res => res.json())
      .then( data => {
        console.log(data);
        M.toast({html: 'Producto Actualizado'});
        this.setState({
          _id:null,
          productTitle:'',
          ref:'',
          price:'',
          weight:'',
          category:'',
          date: new Date(),
          stock: ''
        });
        this.getProducts();
      })
    } else {
    const url ='http://localhost:4000/v1/api/product/create';

    fetch(url,{
      method: 'POST',
      body: JSON.stringify(this.state),
      headers:{
        'Content-Type': 'application/json'
      }
    })
    .then(res => res.json())
    .then(data => {
      console.log(data)
      M.toast({html: 'Producto Guardado'});
      this.setState({
        productTitle:'',
        ref:'',
        price:'',
        weight:'',
        category:'',
        stock: '',
        date:null
      });
      this.getProducts();
    }
    )
    .catch(err => console.log(err));
    }

    e.preventDefault();
  }

  componentDidMount = () =>{
    this.getProducts()
  }

  // get products 

  getProducts = () => {
    let url ='http://localhost:4000/v1/api/product'
    fetch(url)
    .then(res => res.json())
    .then(data => {
      console.log(data)
      this.setState({products: data})
    })
  }

  // delete product

  deleteProduct = (id) =>{
      const url = `http://localhost:4000/v1/api/product/${id}`
      fetch(url,{
        method: 'DELETE',
        headers:{
          'Content-Type': 'application/json'
        }
      })
      .then(res => res.json())
      .then(data => {
        console.log(data);
        M.toast({html: 'Producto Eliminado'});
        this.getProducts();
      })
  }
  // edit producto buttom para pasar el id a la funcion add product
  editProduct = (id) =>{
      const url = `http://localhost:4000/v1/api/product/${id}`;
      fetch(url)
      .then(res => res.json())
      .then(data => {
        const {
          _id,
          productTitle,
          ref,
          price,
          weight,
          category,
          stock} = data;
        console.log(data)
        this.setState({
          _id,
          productTitle,
          ref,
          price,
          weight,
          category,
          stock
        })
      })
  }

  handleChange(e){
    const { name, value } = e.target;
    this.setState({ 
      [name]:value
    })
  }

  render(){
    const {productTitle,
            ref,
            price,
            weight,
            category,
            stock,
            products} = this.state
  return (
    <div className=" App">
      {/* NAVIGATION*/}
        <nav className= "light-blue darken-4">
          <div className =  "container">
            <a className="brand-logo" href="/">
              Tienda Konecta
              </a>            
          </div>
        </nav>
        <div className= "container">
            <div className = "row">
              <div className ="col s5">
                <div className= "card">
                  <div className = "card-content">
                      <form onSubmit = {this.addProduct}>
                        <div className = "row">
                          <div className="input-field col s12">
                            <input value = {productTitle}name="productTitle" type= "text" placeholder = "Product Title" onChange = {this.handleChange}></input>
                            <input value = {ref}name="ref" type= "text" placeholder = "Ref" onChange = {this.handleChange}></input>
                            <input value = {price}name="price" type= "text" placeholder = "Precio" onChange = {this.handleChange}></input>
                            <input value = {weight}name="weight" type= "text" placeholder = "Peso" onChange = {this.handleChange}></input>
                            <input value = {category}name="category" type= "text" placeholder = "Categoria" onChange = {this.handleChange}></input>
                            <input value = {stock}name="stock" type= "text" placeholder = "Stock" onChange = {this.handleChange}></input>
                          </div>
                          <button type= "submit" className="btn light-blue darken-4">Send</button>
                        </div>
                      </form>
                  </div>

                </div>

              </div>
              <div className ="col s7">
                  
                      {
                        products.map(product =>{
                          const { productTitle,ref,price,weight,category,stock,_id,date} = product;
                          return(
                            <div key= {_id}className = "card">
                              <div className = "card-content">
                                <h6>{productTitle}</h6>
                                <div className ="col s4">
                                  <span>Ref: {ref}<br/></span>
                                  <span>Precio: {price} <br/></span>
                                  <span>Peso: {weight}</span>
                                </div>
                                <div className = "col s4">
                                  <span>Categoria:{category}<br/></span>
                                  <span>Stock: {stock}<br/></span>
                                  <span>Fecha: {moment(date).subtract(10, 'days').calendar()}</span>
                                </div>
                                <div className = "col s4">
                                  <button onClick = {() => this.editProduct(_id)} className="btn light-blue darken-4" style = {{margin: '0.3em'}}>
                                    <i className = "material-icons">edit</i>
                                  </button>
                                  <button onClick={()=>this.deleteProduct(_id)} className="btn light-blue darken-4" style = {{margin: '0.3em'}}>
                                    <i className = "material-icons" >delete</i>
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
             

            </div>
        </div>
    </div>
  );
  }
}

export default App;
