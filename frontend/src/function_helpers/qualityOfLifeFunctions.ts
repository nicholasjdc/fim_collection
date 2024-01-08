import data from '../../data_test.json';
export function capitalizeFirstLetter(string:String) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }
export function firebaseJSONPump(){
    const parsedJSON = data
    return parsedJSON["entries"]
}