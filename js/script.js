const app = (()=>{
    const txtNumber = document.getElementById('txt-number');
    const txtName = document.getElementById('txt-name');
    const txtDate = document.getElementById('txt-date');
    const txtCvc = document.getElementById('txt-cvc');
    const inptNumber = document.getElementById('inpt-number');
    const inptName = document.getElementById('inpt-name');
    const inptMonth = document.getElementById('inpt-month');
    const inptYear = document.getElementById('inpt-year');
    const inptCvc = document.getElementById('inpt-cvc');
    const btnConfirm = document.getElementById('btn-confirm');
    const btnContinue = document.getElementById('btn-continue');
    const form = document.getElementById('form');
    const succes = document.getElementById('succes');
    const excepName = document.getElementById('excep-name');
    const excepNumber = document.getElementById('excep-number');
    const excepMonth = document.getElementById('excep-month');
    const excepYear = document.getElementById('excep-year');
    const excepCvc = document.getElementById('excep-cvc');
    const excepSubmit = document.getElementById('excep-submit');

    function init(){
        inptName.valid = false;
        inptNumber.valid = false;
        inptMonth.valid = false;
        inptYear.valid = false;
        inptCvc.valid = false;
        initInptNumber(inptNumber);
        initInptName();
        initInptMonth();
        initInptYear();
        initInptCvc();
        initBtnConfirm();
        initBtnContinue()
    }
    
    function initInptName(){
        inptName.addEventListener('keydown', (e)=>{
            if(e.key.match(/[^A-zÁ-ú'Ä-ü. ]/i)){
                e.preventDefault();
            }
        })
        inptName.addEventListener('keyup', ()=>{
            if(inptName.value.length === 0){
                txtName.innerHTML = 'Jane ApleSeed';
            }else{
                txtName.innerHTML = inptName.value;
            }
        })
        inptName.addEventListener('blur', ()=>{
            if(inptName.value.length < 5){
                excepName.classList.remove('hide');
                inptName.classList.add('form__input--invalid');
                inptName.valid = false;
            }else{
                excepName.classList.add('hide');
                inptName.classList.remove('form__input--invalid');
                inptName.valid = true;
            }
        });
    }

    function initInptNumber(inpt){
        inpt.addEventListener('keydown', (e)=>{
            if(e.key.match(/[^0-9]/i)){
                if(e.key.length <= 1){
                    e.preventDefault();
                }
            }
        })
        inpt.addEventListener('keyup', (e)=>{
            inpt.caretPos = inpt.selectionStart;
            formatValue(inpt)
            controlCaretPosition(inpt,e.key);
            writeCardNumber();
        })
        inptNumber.addEventListener('change', ()=>{
            console.log('Cambió')
            if(inptNumber.value.length !== 19){
                if(inptNumber.value.length !== 0){
                    excepNumber.innerHTML = `The Number must contain 16 digits.`
                }
                excepNumber.classList.remove('hide');
            }
        })
        inptNumber.addEventListener('blur', ()=>{
            if(inptNumber.value.length !== 19){
                if(inptNumber.value.length !== 0){
                    excepNumber.innerHTML = `The Number must contain 16 digits.`
                }
                excepNumber.classList.remove('hide');
                inptNumber.classList.add('form__input--invalid');
                inptNumber.valid = false;
            }else{
                excepNumber.classList.add('hide');
                inptNumber.classList.remove('form__input--invalid');
                inptNumber.valid = true;
            }
        })
    }
    function formatValue(inpt){
        let str = inpt.value;
        str = str.replace(/\s/g, '');
        str = str.toString().replace(/\d{4}(?=.)/g, '$& ');
        if(str.length >16){
            str = str.substring(0,19);
        }
        inpt.spacesQuantity = str.split(' ').length - 1;
        inpt.value = str;
    }
    function controlCaretPosition(inpt, key){
        switch(key){
            case 'ArrowLeft':
                if(inpt.value[inpt.caretPos - 1] === ' '){
                    inpt.setSelectionRange(inpt.caretPos - 1, inpt.caretPos - 1);
                    inpt.caretPos = inpt.selectionStart
                }
                break
            case 'ArrowRight':
                if(inpt.value[inpt.caretPos] === ' '){
                    inpt.setSelectionRange(inpt.caretPos + 2, inpt.caretPos + 2);
                    inpt.caretPos = inpt.selectionStart
                }else if(inpt.value[inpt.caretPos - 1] === ' '){
                    inpt.setSelectionRange(inpt.caretPos + 1, inpt.caretPos + 1);
                    inpt.caretPos = inpt.selectionStart
                }
                break
            case 'Delete':
            case 'Backspace':
                inpt.setSelectionRange(inpt.caretPos, inpt.caretPos);
                if(inpt.value[inpt.caretPos - 1] === ' '){
                    inpt.setSelectionRange(inpt.caretPos - 1, inpt.caretPos - 1);
                    inpt.caretPos = inpt.selectionStart
                }
                break;
            default:
                if(inpt.isInEnd === true){
                    inpt.caretPos = inpt.value.length;
                }else{
                    inpt.setSelectionRange(inpt.caretPos,inpt.caretPos)
                }
                inpt.caretPos = inpt.selectionStart;
        }
        inpt.isInEnd = inpt.caretPos === inpt.value.length;
    }
    function writeCardNumber(){
        let initStr = 'XXXX XXXX XXXX XXXX'
        if (inptNumber.value.length === 0){
            txtNumber.innerHTML = initStr;
        }else{
            txtNumber.innerHTML = inptNumber.value + initStr.slice(inptNumber.value.length);
        }
    }

    function initInptMonth(){
        inptMonth.addEventListener('keydown', (e)=>{
            if(e.key == ' '){
                e.preventDefault()
            }
            if(inptMonth.value.length > 1 && e.key.match(/[0-9]/)){
                e.preventDefault();
            }
        })
        inptMonth.addEventListener('keyup', ()=>{
            let year = txtDate.innerHTML.slice(3);
            let initMonth = '00';
            if (inptMonth.value.length === 0){
                txtDate.innerHTML = initMonth + '/' + year;
            }else{
                txtDate.innerHTML = initMonth.slice(inptMonth.value.length) + inptMonth.value +  '/' + year;
            }
        })
        inptMonth.addEventListener('blur', ()=>{
            if(inptMonth.value.length === 0){
                excepMonth.classList.remove('hide');
                inptMonth.classList.add('form__input--invalid');
                inptMonth.valid = false;

            }else{
                if(inptMonth.value > 12){
                    excepMonth.innerHTML = 'Invalid month.'
                    excepMonth.classList.remove('hide');
                    inptMonth.classList.add('form__input--invalid');
                    inptMonth.valid = false;
                }else{
                    excepMonth.classList.add('hide');
                inptMonth.classList.remove('form__input--invalid');
                inptMonth.valid = true;
                }
            }
        })
    }

    function initInptYear(){
        inptYear.addEventListener('keydown', (e)=>{
            if(e.key == ' '){
                e.preventDefault()
            }
            if(inptYear.value.length > 1 && e.key.match(/[0-9]/)){
                e.preventDefault();
            }
        })
        inptYear.addEventListener('keyup', ()=>{
            let month = txtDate.innerHTML.slice(0,2);
            let initYear = '00';
            if (inptYear.value.length === 0){
                txtDate.innerHTML = month + '/' + initYear;
            }else{
                txtDate.innerHTML = month +  '/' + initYear.slice(inptYear.value.length) + inptYear.value;
            }
        })
        inptYear.addEventListener('blur', ()=>{
            if(inptYear.value.length === 0){
                excepYear.classList.remove('hide');
                inptYear.classList.add('form__input--invalid');
                inptYear.valid = false;
            }else{
                if(inptYear.value > 22 && inptYear.value < 88){
                    excepYear.innerHTML = 'Invalid year.'
                    excepYear.classList.remove('hide');
                    inptYear.classList.add('form__input--invalid');
                    inptYear.valid = false;
                }else{
                    excepYear.classList.add('hide');
                    inptYear.classList.remove('form__input--invalid');
                    inptYear.valid = true;
                }
            }
        })
    }

    function initInptCvc(){
        inptCvc.addEventListener('keydown', (e)=>{
            if(e.key == ' ' || e.key === '.' || e.key === ',' || e.key === '+' || e.key == '-'){
                e.preventDefault()
            }
            if(inptCvc.value.length > 2 && e.key.match(/[0-9]/)){
                e.preventDefault();
            }
        })
        inptCvc.addEventListener('keyup', ()=>{
            let initCvc = 'XXX'
            if(inptCvc.value.length === 0){
                txtCvc.innerHTML = initCvc;
            }else{
                txtCvc.innerHTML = inptCvc.value + initCvc.slice(inptCvc.value.length)
            }
        })
        inptCvc.addEventListener('blur', ()=>{
            if(inptCvc.value.length !== 3){
                if(inptCvc.value.length !== 0){
                    excepCvc.innerHTML = `The CVC must contain 3 digits.`;
                }
                excepCvc.classList.remove('hide');
                inptCvc.classList.add('form__input--invalid');
                inptCvc.valid = false;
            }else{
                excepCvc.classList.add('hide');
                inptCvc.classList.remove('form__input--invalid');
                inptCvc.valid = true;
            }
        })
    }

    function initBtnConfirm(){
        btnConfirm.addEventListener('click', (e)=>{
            e.preventDefault();
            let valid = inptCvc.valid && inptMonth.valid && inptYear.valid && inptName.valid && inptNumber.valid;
            if(valid){
                form.classList.add('hide');
                excepSubmit.classList.add('hide');
                succes.classList.remove('hide')
            }else{
                excepSubmit.classList.remove('hide');
            }
        })
    }
    function initBtnContinue(){
        btnContinue.addEventListener('click', (e)=>{
            e.preventDefault()
            form.classList.remove('hide');
            succes.classList.add('hide');
            inptName.value = ''
            txtName.innerHTML = 'Jane ApleSeed';
            inptNumber.value = ''
            txtNumber.innerHTML = 'XXXX XXXX XXXX XXXX';
            inptMonth.value = ''
            inptYear.value = ''
            txtDate.innerHTML = '00/00';
            inptCvc.value = ''
            txtCvc.innerHTML = 'XXX';
        })
    }


    


    init()
})()