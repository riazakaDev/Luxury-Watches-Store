import useFetch from "../hooks/useFetch";
import { Link } from "react-router-dom";
import Loader from "react-loader-spinner";



const Seiko = () => {
    const { loading, error, data} = useFetch('https://luxury-watches-store.herokuapp.com/products?title_contains=seiko')

    if (loading) return <h1 className='loading d-flex justify-content-center'>Loading... <Loader type="TailSpin" color="black" height={70} width={80}/></h1>
    if (error) return <h1 className='loading'>Error!!!! :(</h1>



    return ( 
            <div className="c2">
                <div>
                <div className="container products">
                    <div className='product row'>
                        {data.map(products => (
                            <div key={products.id} className='product-card col-lg-3'>
                                <Link to={`/products/${products.id}`}>
                                    <img src={products.image[0].name} alt="" className='img'/>
                                    <h6>{products.title}</h6>
                                    <small>{products.price} $</small> 
                                </Link>                 
                            </div>
                        ))}
                    </div>
                </div>
                </div>
            </div>
     );
}
 
export default Seiko;