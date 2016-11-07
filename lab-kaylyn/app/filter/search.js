'use strict';

module.exports = function(){
  return function(items, searchTermName, searchTermDesc){

    let filterArray = [];
    let fuzzyRegex = generateFuzzyRegex(searchTermDesc);
    filterArray =  items.filter(item => {
      return fuzzyRegex.test(item.desc.toUpperCase());
    });

    fuzzyRegex = generateFuzzyRegex(searchTermName);
    filterArray = filterArray.filter(item => {
      return fuzzyRegex.test(item.name.toUpperCase());
    });

    return filterArray;
  };
};

function generateFuzzyRegex(input){
  if (!input) return /.*/;
  let fuzzyString = '.*' + input.toUpperCase().split('').join('.*') + '.*';
  return new RegExp(fuzzyString);
}
