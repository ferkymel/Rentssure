import React from "react";
import img1 from "./img1.jpg";
import img2 from "./img2.png";
import img3 from "./img3.png";
const Driver = () => {
    return <div>
         <main>
            <h1>KEEP YOUR VEHICLE LIKE NEW</h1>
            <section>
            Keep your vehicle safe and running without financial worries.
            <img src={img1} />
            </section>
            <img src={img2} />
            <sectiona>
                <sectiona1>
                
                </sectiona1>    
                    <form className='form'>
                            Apellidos
                            <input placeholder='Escribe aqui' />
                            Nombre
                            <input placeholder='Escribe aqui' />
                            Direccion
                            <input placeholder='Escribe aqui' />
                            Fecha de Nacimiento
                            <input placeholder='Escribe aqui' />
                            <button type='submit'>Buscar</button>
                    </form>
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

export default Driver;