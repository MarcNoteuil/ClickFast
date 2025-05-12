const { handleClick } = require('./script')


describe("Test du bouton clic", () => {
    beforeEach(() => {
      document.body.innerHTML = `
      <div id="score">0</div>
      <div id="timer">5</div>
      <button id="click-button">Click me!</button>
      <button id="button-reset">Reset</button>
    `;
    
    })

    
    test(`Cliquer 5 fois augmente le score de 5`, () => {

    let clicks = 0;
       
    clicks = handleClick(clicks);
    clicks = handleClick(clicks);
    clicks = handleClick(clicks);
    clicks = handleClick(clicks);
    clicks = handleClick(clicks);
    
   
      console.log(clicks)
      expect(clicks).toBe(5);
      localStorage.clear();
    })
})