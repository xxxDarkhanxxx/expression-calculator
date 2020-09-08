function eval() {
    // Do not use eval!!!
    return;
}

function expressionCalculator(expr) {
   let expr_copy_without_space = [];
   let test_brackets = [0,0];
   for(let i=0;i < expr.length;i++)
   {
        if(expr[i] == ' ') continue;
        else expr_copy_without_space.push(expr[i]);
        if(expr[i] == '(') test_brackets[0] +=1;
        else if(expr[i] == ')') test_brackets[1] +=1;
   }
   if(test_brackets[0] != test_brackets[1]) throw new Error('ExpressionError: Brackets must be paired');
   for(let i = 0; i < expr_copy_without_space.length-1;i++)
   {
   if(expr_copy_without_space[i] == '/' && expr_copy_without_space[i+1] == '0' ) throw new Error("TypeError: Division by zero.");
   }
   let array_number_operation = [];
   let number_string = 0; 
   //console.log(expr_copy_without_space);
   for(let i = 0 ;i<expr_copy_without_space.length;i++)
   {
    if((i == expr_copy_without_space.length - 1) && (expr_copy_without_space[i] !=')')) {
        number_string +=expr_copy_without_space[i];
        array_number_operation.push(Number(number_string));
        number_string = 0;
    }
    else if(expr_copy_without_space[i].charCodeAt() > 47 && expr_copy_without_space[i].charCodeAt() < 58) {
        number_string +=expr_copy_without_space[i];
    }
    else {
        if(array_number_operation[i-1] === '-' || array_number_operation[i-1] === '+' || array_number_operation[i-1] === '/' || array_number_operation[i-1] === '*'  ) {
            array_number_operation.push(expr_copy_without_space[i]);}
        else {
        array_number_operation.push(Number(number_string));
        array_number_operation.push(expr_copy_without_space[i]);
        number_string = 0;
    }}
   }
   for(let i = 0; i < array_number_operation.length ; i++)
   {
       if(array_number_operation[i] === Number(0)) {
           array_number_operation.splice(i,1);
       }
   }
  // //console.log(array_number_operation);
   return result(array_number_operation);


   function result(array_number_operation) {
           let start_bracket_position;
           let end_bracket_position;
           let sub_array_number_operation = [];
           let copy_array = [];
            for(let i = 0; i < array_number_operation.length; i++)
            {   
                for(let j = 0;j < array_number_operation.length ;j++)
                {
                copy_array[j] = array_number_operation[j];
                }
                if(array_number_operation[i] == '(') start_bracket_position = i;
                else if(array_number_operation[i] == ')') {
                    test_brackets[1] -=1;
                    end_bracket_position = i;
                    sub_array_number_operation = array_number_operation.slice(start_bracket_position+1,end_bracket_position);
                    array_number_operation.splice(start_bracket_position,array_number_operation.length);
                    array_number_operation.push(sub_result(sub_array_number_operation));
                    console.log(array_number_operation);
                    for(let i = end_bracket_position+1; i < copy_array.length ;i++){
                        array_number_operation.push(copy_array[i]);
                    }               
                    i = 0;
                    copy_array.splice(0,array_number_operation.length);
                    console.log(array_number_operation);
                    // вставить sub_result(sub_array_number_operation) в середину строки 
                    //const expr = "77+79/25*(64*63-89*14)*49";
                } 
                else if(test_brackets[1] == 0) {
                    return Number(sub_result(array_number_operation));
                }
            }
       }
    
        function sub_result (sub_array_number_operation) {
             for(let i = 1; i < sub_array_number_operation.length; i+=2)
            {
  
                if(sub_array_number_operation[i] == '*') {
                    console.log(sub_array_number_operation);
                    sub_array_number_operation[i-1] = (Number(Number(sub_array_number_operation[i-1]) * Number(sub_array_number_operation[i+1])));
                    sub_array_number_operation.splice(i,2);
                    i-=2;
                    console.log(sub_array_number_operation);
                }
                else if(sub_array_number_operation[i] == '/') {
                    console.log(sub_array_number_operation);
                    sub_array_number_operation[i-1] = (Number(Number(sub_array_number_operation[i-1]) / Number(sub_array_number_operation[i+1])));
                    sub_array_number_operation.splice(i,2);
                    i-=2;
                    console.log(sub_array_number_operation);
                }
            }
        for(let i = 1; i < sub_array_number_operation.length; i+=2)
        {
            if(sub_array_number_operation[i] == '+') {
                console.log(sub_array_number_operation);
                sub_array_number_operation[i-1] = (Number(Number(sub_array_number_operation[i-1]) + Number(sub_array_number_operation[i+1])));
                sub_array_number_operation.splice(i,2);
                i-=2;
                console.log(sub_array_number_operation);
            }
            else if(sub_array_number_operation[i] == '-') {
                console.log(sub_array_number_operation);
                sub_array_number_operation[i-1] = (Number(Number(sub_array_number_operation[i-1]) - Number(sub_array_number_operation[i+1])));
                sub_array_number_operation.splice(i,2);
                i-=2;
                console.log(sub_array_number_operation);
            }
        }        
        return sub_array_number_operation[0];
     }
}
module.exports = {
    expressionCalculator
}
