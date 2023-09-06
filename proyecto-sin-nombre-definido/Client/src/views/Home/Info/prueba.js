const array = [50,2,10, 5,1, 220]

function grande (arr){
   let res = 0
   for (let i = 0; i < arr.length; i++) {
    if(arr[i] > res){
        res = arr[i]
    }
}
console.log(res)
}
grande(array)