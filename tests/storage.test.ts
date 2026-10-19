import {test} from 'node:test';
import assert from 'node:assert/strict';
import {parseBackup,readProgress,writeProgress,STORAGE_KEY} from '../src/storage.ts';
const sample={completed:['CS3301','CS3403'],peExtra:3};
function memory(){const data=new Map<string,string>();return {getItem:(k:string)=>data.get(k)??null,setItem:(k:string,v:string)=>{data.set(k,v)}}}
test('persists and reloads a completion ledger',()=>{const s=memory();assert.equal(readProgress(s),null);writeProgress(sample,s);assert.deepEqual(readProgress(s),sample)});
test('imports legacy exports and versioned backups',()=>{assert.deepEqual(parseBackup(JSON.stringify(sample)),sample);assert.deepEqual(parseBackup(JSON.stringify({version:1,...sample})),sample)});
test('rejects corrupt, unknown and out-of-range values',()=>{for(const data of ['{',JSON.stringify({completed:['unknown'],peExtra:0}),JSON.stringify({...sample,peExtra:-1}),JSON.stringify({...sample,peExtra:101}),JSON.stringify({...sample,peExtra:'3'}),JSON.stringify({version:9,...sample})])assert.throws(()=>parseBackup(data))});
test('invalid imports cannot overwrite existing data',()=>{const s=memory();writeProgress(sample,s);assert.throws(()=>writeProgress({completed:['unknown'],peExtra:0},s));assert.deepEqual(readProgress(s),sample)});
test('read preserves damaged storage instead of resetting',()=>{const s=memory();s.setItem(STORAGE_KEY,'damaged');assert.throws(()=>readProgress(s));assert.equal(s.getItem(STORAGE_KEY),'damaged')});
test('quota failure surfaces an error',()=>{assert.throws(()=>writeProgress(sample,{getItem:()=>null,setItem:()=>{throw Error('quota')}}),/Could not save/)});
test('deduplicates imported course codes',()=>{assert.deepEqual(parseBackup(JSON.stringify({completed:['CS3301','CS3301'],peExtra:0})),{completed:['CS3301'],peExtra:0})});
