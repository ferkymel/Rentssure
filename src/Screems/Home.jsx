import React from "react";
import img1 from "./img1.jpg";
import img2 from "./img2.png";
import img3 from "./img3.png";
const Home = () => {
    return <div>
         <main>
            <h1>YOUR CAR IS GOOD, YOUR LIFE IS ASSURE</h1>

            <section>
            Provide a convenient and reliable solution for vehicle 
            owners in need of repairs. Support local mechanics by 
            providing them with an additional source of financing 
            for their businesses. Improve accessibility and 
            transparency in the vehicle repair process.
            <img src={img1} />
            </section>
            <img src={img2} />
            <sectiona>
            
            </sectiona>
            <img src={img3} />
            Home

            <div>
                <form className='form'>
                    <input placeholder='Escribe aqui' />
                    <button type='submit'>Buscar</button>
                </form>
            </div>  
        </main>
    </div>;
};

export default Home;