# node-combine-result

# Usage
Combine a few call to a single result which it's returned by first call.

Consider you have a few requests to reads a same file that is very huge let's say it about 1GB and assume it's a fixed file; in that case, u don't want to read the file in each request, so let's combine those requests to read the file just once.
```shell
npm install --save combine-result
```
```javascript
const readFile = path => {
  return new Promise(resolve => {
    setTimeout(() => resolve('huge content'), 1000); // 1Gb file, read it cost 1000ms
  });
};

const combine = requrie('combine-result')();
const readFileCombined = path => {
  return combine(path, () => readFile(path));
}

// The following three will combine, read 'a.txt' and return it three times
readFileCombined('a.txt').then(val => console.log(val), err => console.log(err));
readFileCombined('a.txt').then(val => console.log(val), err => console.log(err));
readFileCombined('a.txt').then(val => console.log(val), err => console.log(err));

// The following two are combined
readFileCombined('b.txt').then(val => console.log(val), err => console.log(err));
readFileCombined('b.txt').then(val => console.log(val), err => console.log(err));

setTimeout(() => {
  // Reread 'a.txt' since lastest read 'a.txt' calls has returned.
  readFileCombined('a.txt').then(val => console.log(val), err => console.log(err));

  // The following three are combined
  readFileCombined('c.txt').then(val => console.log(val), err => console.log(err));
  readFileCombined('c.txt').then(val => console.log(val), err => console.log(err));
  readFileCombined('c.txt').then(val => console.log(val), err => console.log(err));
}, 1500);
```