# ReQLHelper  
* A simple light-weight helper for RethinkDB that utilizes and manages pool connections  
## Example Usage  

```ts
import {ReQLHelper, r} from './lib/ReQLHelper/ReQLHelper';

const rql = new ReQLHelper('databasename', 'reqluser', 'reqlpassword', 'localhost', 28015)

// callback
rql.q(r.db('test').info(), function(err, result){
  if(err) {
    console.log(err)
  } else {
    console.log(JSON.stringify(result, null, 2))
  }
})

// promise
rql.promiseQ(r.db('test').info())
.catch(
  error=>{
    console.log(error)
  }
).then(
  result=>{
  console.log(JSON.stringify(result, null, 2))
  }
)
```