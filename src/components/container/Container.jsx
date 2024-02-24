import React from 'react';

//container properties accept krta hai as a children
//box hota hai jiske andar hum styling properties define krte hai
function Container({children}) {
  return <div className=' w-full max-w-7xl mx-auto px-4'>
      {children}</div>;
}

export default Container;
