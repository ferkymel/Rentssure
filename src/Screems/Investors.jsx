import React from "react";
import img1 from "./img1.jpg";
import img2 from "./img2.png";
import img3 from "./img3.png";
const Investors = () => {
    return <div>
        Investors
        <main>
            <h1>INVEST YOUR MONEY</h1>
            <section>
            Keep your money safe and secure for the long term.
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
            <section>
            <div>
                
            </div> 
            </section>
        </main>
    </div>
};

export default Investors;