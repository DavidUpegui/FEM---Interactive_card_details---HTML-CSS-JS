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

    function init(){
        inptNumber.txtElement = txtNumber;
        inptNumber.key = null;
        inptName.txtElement = txtName;
        inptMonth.txtElement = txtDate;
        inptYear.txtElement = txtDate;
        inptCvc.txtElement = txtCvc;7
        initInptNumber(inptNumber);
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
        if (inptNumber.value.length === 0){
            inptNumber.txtElement.innerHTML = '0000 0000 0000 0000'
        }else{
            inptNumber.txtElement.innerHTML = inptNumber.value;
        }
    }


    init()
})()