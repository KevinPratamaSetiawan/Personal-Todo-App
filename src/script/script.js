const listReplaceChar = ['<i class="fa-solid fa-minus todo-list-dash todo-list-indent-one"></i>', '<i class="fa-solid fa-minus todo-list-dash todo-list-indent-two"></i>', '<i class="fa-solid fa-minus todo-list-dash todo-list-indent-three"></i>'];
const checkedListReplaceChar = ['<i class="fa-solid fa-plus todo-list-dash todo-list-indent-one"></i>', '<i class="fa-solid fa-plus todo-list-dash todo-list-indent-two"></i>', '<i class="fa-solid fa-plus todo-list-dash todo-list-indent-three"></i>'];
const dotReplaceChar = ['<i class="fa-regular fa-circle todo-list-circle todo-list-indent-one"></i>', '<i class="fa-regular fa-circle todo-list-circle todo-list-indent-two"></i>', '<i class="fa-regular fa-circle todo-list-circle todo-list-indent-three"></i>'];
const checkedDotReplaceChar = ['<i class="fa-solid fa-circle-xmark todo-list-circle todo-list-indent-one"></i>', '<i class="fa-solid fa-circle-xmark todo-list-circle todo-list-indent-two"></i>', '<i class="fa-solid fa-circle-xmark todo-list-circle todo-list-indent-three"></i>'];
const chekcboxReplaceChar = ['<i class="fa-regular fa-square todo-list-checkbox todo-list-indent-one"></i>', '<i class="fa-regular fa-square todo-list-checkbox todo-list-indent-two"></i>', '<i class="fa-regular fa-square todo-list-checkbox todo-list-indent-three"></i>'];
const checkedChekcboxReplaceChar = ['<i class="fa-solid fa-square-check todo-list-checkbox todo-list-indent-one"></i>', '<i class="fa-solid fa-square-check todo-list-checkbox todo-list-indent-two"></i>', '<i class="fa-solid fa-square-check todo-list-checkbox todo-list-indent-three"></i>'];
const breakReplaceChar = '.<br>';
const colonReplaceChar = ':<br>';

function convertBreak(text) {
    if(text.includes('<br>')){
        text = text.replace(new RegExp(`\\s*${colonReplaceChar}\\s*`, 'g'), ":.");
        text = text.replace(new RegExp(`\\s*${breakReplaceChar}\\s*`, 'g'), "..");
    }else {
        text = text.replace(/\:\./g, colonReplaceChar);
        text = text.replace(/\.\./g, breakReplaceChar);
    }

    return text;
}

function listStyling(text){
    if(text.includes('</i>')){
        text = text.replace(new RegExp(`\\s*${listReplaceChar[2]}\\s*`, 'g'), "-...");
        text = text.replace(new RegExp(`\\s*${checkedListReplaceChar[2]}\\s*`, 'g'), "+...");
        text = text.replace(new RegExp(`\\s*${dotReplaceChar[2]}\\s*`, 'g'), "*...");
        text = text.replace(new RegExp(`\\s*${checkedDotReplaceChar[2]}\\s*`, 'g'), "@...");
        text = text.replace(new RegExp(`\\s*${chekcboxReplaceChar[2]}\\s*`, 'g'), "=...");
        text = text.replace(new RegExp(`\\s*${checkedChekcboxReplaceChar[2]}\\s*`, 'g'), "%...");

        text = text.replace(new RegExp(`\\s*${listReplaceChar[1]}\\s*`, 'g'), "-..");
        text = text.replace(new RegExp(`\\s*${checkedListReplaceChar[1]}\\s*`, 'g'), "+..");
        text = text.replace(new RegExp(`\\s*${dotReplaceChar[1]}\\s*`, 'g'), "*..");
        text = text.replace(new RegExp(`\\s*${checkedDotReplaceChar[1]}\\s*`, 'g'), "@..");
        text = text.replace(new RegExp(`\\s*${chekcboxReplaceChar[1]}\\s*`, 'g'), "=..");
        text = text.replace(new RegExp(`\\s*${checkedChekcboxReplaceChar[1]}\\s*`, 'g'), "%..");

        text = text.replace(new RegExp(`\\s*${listReplaceChar[0]}\\s*`, 'g'), "-.");
        text = text.replace(new RegExp(`\\s*${checkedListReplaceChar[0]}\\s*`, 'g'), "+.");
        text = text.replace(new RegExp(`\\s*${dotReplaceChar[0]}\\s*`, 'g'), "*.");
        text = text.replace(new RegExp(`\\s*${checkedDotReplaceChar[0]}\\s*`, 'g'), "@.");
        text = text.replace(new RegExp(`\\s*${chekcboxReplaceChar[0]}\\s*`, 'g'), "=.");
        text = text.replace(new RegExp(`\\s*${checkedChekcboxReplaceChar[0]}\\s*`, 'g'), "%.");
    }else {
        text = text.replace(/\s*-\.\.\.\s*/g, listReplaceChar[2]);
        text = text.replace(/\s*\+\.\.\.\s*/g, checkedListReplaceChar[2]);
        text = text.replace(/\s*\*\.\.\.\s*/g, dotReplaceChar[2]);
        text = text.replace(/\s*\@\.\.\.\s*/g, checkedDotReplaceChar[2]);
        text = text.replace(/\s*=\.\.\.\s*/g, chekcboxReplaceChar[2]);
        text = text.replace(/\s*%\.\.\.\s*/g, checkedChekcboxReplaceChar[2]);

        text = text.replace(/\s*-\.\.\s*/g, listReplaceChar[1]);
        text = text.replace(/\s*\+\.\.\s*/g, checkedListReplaceChar[1]);
        text = text.replace(/\s*\*\.\.\s*/g, dotReplaceChar[1]);
        text = text.replace(/\s*\@\.\.\s*/g, checkedDotReplaceChar[1]);
        text = text.replace(/\s*=\.\.\s*/g, chekcboxReplaceChar[1]);
        text = text.replace(/\s*%\.\.\s*/g, checkedChekcboxReplaceChar[1]);

        text = text.replace(/\s*-\.\s*/g, listReplaceChar[0]);
        text = text.replace(/\s*\+\.\s*/g, checkedListReplaceChar[0]);
        text = text.replace(/\s*\*\.\s*/g, dotReplaceChar[0]);
        text = text.replace(/\s*\@\.\s*/g, checkedDotReplaceChar[0]);
        text = text.replace(/\s*=\.\s*/g, chekcboxReplaceChar[0]);
        text = text.replace(/\s*%\.\s*/g, checkedChekcboxReplaceChar[0]);
    }

    return convertBreak(text);
}