const { raw } = require('body-parser');
const fs= require('fs');

const readFile = (fileName, type) => {
    return new Promise((resolve, reject) => {
      fs.readFile(fileName, type, (err, data) => {
        if (!err) {
          resolve(data);
        } else {
          reject('No such File');
        }
      });
    });
  };

    async function getData() {
try{
    const data = await readFile('./data.json','utf-8') ;
    // console.log(data);
    if(data.length==0) return {};
     return JSON.parse(data);
}
catch(e){
    return e;
}    
};

async function getDataById(userid) {
    const data = await getData();
    console.log(data);
    if(JSON.stringify(data)==='{}') return  "No data available";
      else{
     const id= await data.list.find(c=>c.id== userid);
      if(!id) return null;
       return id;
    }
}

async function adddata(rawdata) {
  const data = await  getData();
  if(JSON.stringify(data)==='{}'){
  const adddata={ 
    id:parseInt(rawdata.id),
    name:rawdata.name
 };
 
   var list={
       list:[adddata]
   }
   await fs.writeFile('data.json', JSON.stringify(list), function (err) {
       if (err) return err;
       console.log('Replaced!');
     });
       return await getData();
    }
  else{
    console.log(data);
const adddata={ 
   id:parseInt(rawdata.id),
   name:rawdata.name
};
data.list.push(adddata);

  // var list={
  //     list:data
  // }
  await fs.writeFile('data.json', JSON.stringify(data), function (err) {
      if (err) return err;
      console.log('Replaced!');
    });
      return await getData();
}
}


async function  deleteById(index) {
  const data= await getData();
  if(JSON.stringify(data)==='{}') return  "No data available";
  else{
  const id= await data.list.find(c=>c.id== index);
  if(!id) return null;
  const getIndex= data.list.indexOf(id);
 data.list.splice(getIndex,1);

//  var list={
//   list:data
// }
await fs.writeFile('data.json', JSON.stringify(data), function (err) {
  if (err) return err;
  console.log('Replaced!');
});
return data;
}
}

async function  updateById(index,newdata) {
  const data= await getData();
  if(JSON.stringify(data)==='{}') return  "No data available";
  else{
  const id= await data.list.find(c=>c.id==index);
  if(!id) return null;
    const getIndex= data.list.indexOf(id);
 data.list[getIndex]={
  id:parseInt(newdata.id),
  name:newdata.name
};
//  var list={
//   list:data
// }
await fs.writeFile('data.json', JSON.stringify(data), function (err) {
  if (err) return err;
  console.log('Replaced!');
});

return data;
}
}

module.exports= {getData,adddata,getDataById,deleteById,updateById};