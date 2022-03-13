"use strict";

module.exports = function (action) {
  return (req, res, next) => {
      try{
          if(req.user.actions.includes(action)){
              next();
          }
          else{
              next('access denied')
          }
      }catch(error){
          next(`access denied ${e}`)
      }
  };
};
