import circuit from '../rentssure/target/rentssure.json';

import { BarretenbergBackend } from '@noir-lang/backend_barretenberg';
import { Noir } from '@noir-lang/noir_js';



const setup = async () => {
    await Promise.all([
      import("@noir-lang/noirc_abi").then(module => 
        module.default(new URL("@noir-lang/noirc_abi/web/noirc_abi_wasm_bg.wasm", import.meta.url).toString())
      ),
      import("@noir-lang/acvm_js").then(module => 
        module.default(new URL("@noir-lang/acvm_js/web/acvm_js_bg.wasm", import.meta.url).toString())
      )
    ]);
  }
  
  function display(container, msg) {
    const c = document.getElementById(container);
    const p = document.createElement('p');
    p.textContent = msg;
    c.appendChild(p);
  }

  
  document.getElementById('submitGuess').addEventListener('click', async () => {
    try {
      // here's where love happens
      //const amount = parseInt(document.getElementById('amountInput').value);
      const guess_the_amount = parseInt(document.getElementById('guessAmountInput').value);
      //const amountHash = document.getElementById('amountHashInput').value;

      const input = { amount: 4000, guess_the_amount, amountHash: "0x0ac1051c01c00b4e8fb4e89e457547c038681f27c872b006f451acbb160e2e93"};
      // try {
        const backend = new BarretenbergBackend(circuit);
        const noir = new Noir(circuit, backend);

        await setup(); // let's squeeze our wasm inits here

        display('logs', 'Generating proof... ⌛');
        const proof = await noir.generateProof(input);
        display('logs', 'Generating proof... ✅');
        display('results', proof.proof);

        display('logs', 'Verifying proof... ⌛');
        const verification = await noir.verifyProof(proof);
        if (verification) display('logs', 'Verifying proof... ✅');
// }
    } catch(err) {
      display("logs", "Oh 💔 Wrong guess")
    }
  });
  