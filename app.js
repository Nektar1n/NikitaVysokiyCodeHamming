document.getElementById('input_mes').onkeypress = function (e){
    e = e || event;

    if (e.ctrlKey || e.altKey || e.metaKey){
        return;
    }

    var char = getChar(e);

    if (char == null){
        return;
    }

    if (char < '0' || char > '1'){
        return false;
    }
}

document.getElementById('code_mes').onkeypress = function(e) {
    e = e || event;

    if (e.ctrlKey || e.altKey || e.metaKey){
        return;
    }

    var char = getChar(e);

    if (char == null){
        return;
    }

    if (char < '0' || char > '1'){
        return false;
    }
}

document.getElementById('decode_mes').onkeypress = function(e){
    return false;
}

function getChar(event) {
    if (event.which == null){
        if (event.keyCode < 32){
            return null;
        }

        return String.fromCharCode(event.keyCode);
    }

    if (event.which != 0 && event.charCode != 0){
        if (event.which < 32){
            return null;
        }

        return String.fromCharCode(event.which);
    }

    return null;
}

function bits(str){
    var mas = str.split('');

    for (var i = 0; i < mas.length; i++){
        mas[i] = Number(mas[i]);
    }

    mas[4] = 0;
    mas[5] = 0;
    mas[6] = 0;
    mas[4] = (mas[4] + mas[0] + mas[2] + mas[3])%2;
    mas[5] = (mas[5] + mas[0] + mas[1] + mas[3])%2;
    mas[6] = (mas[6] + mas[1] + mas[2] + mas[3])%2;

    return mas;
}

function code() {
    str = document.getElementById('input_mes').value;

    if (str.length < 4){
        alert('Пожайлуста, введите 4 бита информаций, чтобы продолжить');
        return;
    }

    document.getElementById('code_mes').value = bits(str).join('');
}

function decode() {
    var str = document.getElementById('code_mes').value;
    var mas = bits(str);

    var sum = str.split('');
    var sum1 = str.split('');

    if (str.length < 7){
        alert('Пожайлуста, верните количество символов до 7 знаков');
        return;
    }

    for (var i = 0; i < sum.length; i++){
        sum[i] = Number(sum[i]);
    }

    if (mas[4] !== sum[4] && mas[5] !== sum[5] && mas[6] !== sum[6]){
        sum[3] = (sum[3] + 1)%2;
    }
    else if (mas[4] !== sum[4] && mas[5] !== sum[5]){
        sum[0] = (sum[0] + 1)%2;
    }
    else if (mas[5] !== sum[5] && mas[6] !== sum[6]){
        sum[1] = (sum[1] + 1)%2;
    }
    else if (mas[4] !== sum[4] && mas[6] !== sum[6]){
        sum[2] = (sum[2] + 1)%2;
    }

    str = '';

    for (var i = 0; i < 4; i++){
        str += sum[i].toString();
    }

    document.getElementById('mistake').value = mistakes(sum, sum1, mas);

    document.getElementById('decode_mes').value = str;
}

function mistakes(mas, mas1, sum){
    for (var i = 0; i < mas1.length; i++){
        if (mas[i] != mas1[i]){
            i++;
            return 'Ошибка на ' + i + ' бите';
        }
    }

    if (mas[4] != sum[4]){
        return 'Ошибка на ' + 5 + ' бите';
    }
    else if (mas[5] != sum[5]){
        return 'Ошибка на ' + 6 + ' бите';
    }
    else if (mas[6] != sum[6]){
        return 'Ошибка на ' + 7 + ' бите';
    }
    else{
        return 'Ошибки не найдены';
    }
}
