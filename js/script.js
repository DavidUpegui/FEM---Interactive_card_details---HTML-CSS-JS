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

    function init(){
        inptNumber.txtElement = txtNumber;
        inptName.txtElement = txtName;
        inptMonth.txtElement = txtDate;
        inptYear.txtElement = txtDate;
        inptCvc.txtElement = txtCvc;
        initInptNumber(inptNumber);
        initInptName();
        initInptMonth();
        initInptYear();
        initInptCvc();
        initBtnConfirm();
        initBtnContinue()

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
            inptNumber.txtElement.innerHTML = initStr;
        }else{
            inptNumber.txtElement.innerHTML = inptNumber.value + initStr.slice(inptNumber.value.length);
        }
    }

    function initInptName(){
        inptName.addEventListener('keydown', (e)=>{
            if(e.key.match(/[^A-zÁ-ú'Ä-ü. ]/i)){
                e.preventDefault();
            }
        })
        inptName.addEventListener('keyup', ()=>{
            txtName.innerHTML = inptName.value;
        })
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
            if(inptMonth.value > 12){
                console.log('Error')
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
            let initCvc = '000'
            if(inptCvc.value.length === 0){
                txtCvc.innerHTML = initCvc;
            }else{
                txtCvc.innerHTML = initCvc.slice(inptCvc.value.length) + inptCvc.value
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
            if(inptYear.value > 22 && inptYear.value < 92){
                console.log('Error')
            }
        })
    }

    function initBtnConfirm(){
        btnConfirm.addEventListener('click', (e)=>{
            e.preventDefault();
            form.classList.add('hide');
            succes.classList.remove('hide');
        })
    }
    function initBtnContinue(){
        btnContinue.addEventListener('click', (e)=>{
            e.preventDefault()
            form.classList.remove('hide');
            succes.classList.add('hide');
        })
    }


    


    init()
})()