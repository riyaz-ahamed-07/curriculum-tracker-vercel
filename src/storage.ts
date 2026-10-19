import courses from './courses.json' with {type:'json'};
export type Progress={completed:string[];peExtra:number};
export const STORAGE_KEY='riyaz-aiml-progress-v1';
const codes=new Set(courses.map(c=>c.code));
type Store=Pick<Storage,'getItem'|'setItem'>;
export function parseBackup(raw:string):Progress{
 let data:unknown;try{data=JSON.parse(raw)}catch{throw Error('Invalid JSON. Choose an exported tracker backup.');}
 if(!data||typeof data!=='object')throw Error('Invalid tracker backup.');
 const value=data as Record<string,unknown>;
 if(value.version!==undefined&&value.version!==1)throw Error('Unsupported backup version.');
 if(!Array.isArray(value.completed)||value.completed.length>courses.length||value.completed.some(c=>typeof c!=='string'||!codes.has(c))||typeof value.peExtra!=='number'||!Number.isFinite(value.peExtra)||value.peExtra<0||value.peExtra>100)throw Error('Backup contains invalid courses or PE credits. Nothing has been changed.');
 return {completed:[...new Set(value.completed)] as string[],peExtra:value.peExtra};
}
export function readProgress(storage:Store=window.localStorage):Progress|null{
 let raw:string|null;try{raw=storage.getItem(STORAGE_KEY)}catch{throw Error('Browser storage is unavailable. Enable site storage, then reload. Your preloaded courses remain available.');}
 if(raw===null)return null;
 try{return parseBackup(raw)}catch{throw Error('Saved data could not be read. It has not been overwritten. Import a valid backup to recover.');}
}
export function writeProgress(value:Progress,storage:Store=window.localStorage){
 const clean=parseBackup(JSON.stringify(value));
 try{storage.setItem(STORAGE_KEY,JSON.stringify({version:1,...clean,updatedAt:new Date().toISOString()}))}catch{throw Error('Could not save to this browser. Check site storage permissions or available space, then try again.');}
}
