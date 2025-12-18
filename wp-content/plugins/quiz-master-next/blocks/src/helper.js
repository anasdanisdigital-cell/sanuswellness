export const qsmIsEmpty=(data)=>('undefined'===typeof data||null===data||''===data);export const qsmUniqueArray=(arr)=>{if(qsmIsEmpty(arr)||!Array.isArray(arr)){return arr;}
return arr.filter((val,index,arr)=>arr.indexOf(val)===index);}
export const qsmMatchingValueKeyArray=(values,obj)=>{if(qsmIsEmpty(obj)||!Array.isArray(values)){return values;}
return values.map((val)=>Object.keys(obj).find(key=>obj[key]==val));}
export const qsmDecodeHtml=(html)=>{var txt=document.createElement("textarea");txt.innerHTML=html;return txt.value;}
export const qsmSanitizeName=(name)=>{if(qsmIsEmpty(name)){name='';}else{name=name.toLowerCase().replace(/ /g,'_');name=name.replace(/\W/g,'');}
return name;}
export const qsmStripTags=(text)=>{let div=document.createElement("div");div.innerHTML=qsmDecodeHtml(text);return div.innerText;}
export const qsmFormData=(obj=false)=>{let newData=new FormData();newData.append('qsm_block_api_call','1');if(false!==obj){for(let k in obj){if(obj.hasOwnProperty(k)){newData.append(k,obj[k]);}}}
return newData;}
export const qsmAddObjToFormData=(formKey,valueObj,data=new FormData())=>{if(qsmIsEmpty(formKey)||qsmIsEmpty(valueObj)||'object'!==typeof valueObj){return data;}
for(let key in valueObj){if(valueObj.hasOwnProperty(key)){let value=valueObj[key];if('object'===value){qsmAddObjToFormData(formKey+'['+key+']',value,data);}else{data.append(formKey+'['+key+']',valueObj[key]);}}}
return data;}
export const qsmGenerateRandomKey=(length)=>{const charset="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";let key="";const values=new Uint8Array(length);window.crypto.getRandomValues(values);for(let i=0;i<length;i++){key+=charset[values[i]%charset.length];}
return key;}
export const qsmUniqid=(prefix="",random=false)=>{const id=qsmGenerateRandomKey(8);return`${prefix}${id}${random ? `.${qsmGenerateRandomKey(7)}`:""}`;};export const qsmValueOrDefault=(data,defaultValue='')=>qsmIsEmpty(data)?defaultValue:data;