const { isObject } = require('mathjs');
const Parser = require('mathjs')
const equacoes = require('./equacoes.json');

 function calcEquation(type, params) {

    if(!isObject(params)) {
        throw new Error(`Parametros devem ser passado em um tipo Objeto`);
    }

    const paramsInput = (Object.keys(params));
    const expression = equacoes.find(eq => eq.short_name === type)

    if(!expression) {
        throw new Error(`Equação não encontrada`);
    }

    const parametersEquation = expression.parametros.split(',')


    parametersEquation.forEach(verifyParams)
    paramsInput.forEach(verifyParamsInput)
        
    function verifyParams(item) {
        const t = paramsInput.includes(item)
        if(!t) {
            throw new Error(`Parametro '${item}' inexistente`)
        } 
    }


    function verifyParamsInput(item) {
        const paramsIn = expression.parametros.includes(item)
        if(!paramsIn) {
            throw new Error(`Parametro '${item}' inconsistente`)
        } 
      }


    const densidade =  Parser.evaluate(expression.formula_densidade, params)
    const pctGordura =  Parser.evaluate(expression.formula_pct_gordura, {densidade})

    return {
        densidade: densidade.toFixed(2),
        pct: pctGordura.toFixed(2)
    };

}

const parametros = {
    triceps: 1,
    panturrilha: 2,
    subscapular: 3,
    idade: 25,
    supraIliaca: 5
};

console.log(calcEquation('petroski', parametros))