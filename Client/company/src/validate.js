export function floatValidate(price){
    if(price==""){return false}
    var regexp = /^\d+(\.\d{1,2})?$/;
    return regexp.test(price)
}
export function textValiDate(text){
    if(text==""){return false}
    var regexp = /[`!#$%^&*()_+\-=\[\]{};':"\\|,<>\/?~]/;
    return !regexp.test(text)
}
export function noSpaceTextValidate(text){
    if(text==""){return false}
    var regexp = /[`!#$%^&*()_+\-=\[\]{};':"\\|,<>\/?~ ]/;
    return !regexp.test(text)
}