// const removeAaary = (_arr, _obj) => {
//     let length = _arr.length;
//     for (var i = 0; i < length; i++) {
//         if (_arr[i] == _obj) {
//             if (i == 0) {
//                 _arr.shift(); //删除并返回数组的第一个元素
//                 return _arr;
//             }
//             else if (i == length - 1) {
//                 _arr.pop();  //删除并返回数组的最后一个元素
//                 return _arr;
//             }
//             else {
//                 _arr.splice(i, 1); //删除下标为i的元素
//                 return _arr;
//             }
//         }
//     }
// }
// export {
//     removeAaary
// }