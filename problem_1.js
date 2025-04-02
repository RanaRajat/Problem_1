function giveNameWithIndex(str){
    str = str.toUpperCase();
   let strArr = str.split("");
    let obj = {};
    console.log(strArr);

    for(let i =0;i<strArr.length;i++){
        if(obj[strArr[i]]){
            obj[strArr[i]]++;
        }
        else{
            obj[strArr[i]]=1;
        }
    }
    console.log(obj);
    let AlphabetArr = Object.keys(obj);
    let countArr = Object.values(obj);
    for(let i =0;i<countArr.length;i++){
        if(AlphabetArr[i]!=" "){
        console.log(AlphabetArr[i],"-",countArr[i]);
        }
    }
}
let str = "Simran Kaur ";
giveNameWithIndex(str);