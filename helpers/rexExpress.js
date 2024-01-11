function trimAndSplitString(input) {
   


    //>Trim the Input String
    let editedInput = input.trim();const inputString = "ROPA INTERIOR $ 5.00";

    // Split the string when a "$" sign appears
    let [description, price] = input.split(/\s*\$\s*/);
    //price = "$" + price;
    const arr = [description, price];
    return arr;
    
    
    console.log("Description:", description);
    console.log("Price:", price);
    

    
  }
  
  
  export default trimAndSplitString;
  