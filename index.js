'use strict';

module.exports = function() {
  const _tasks = new Map();
  return (key, task) => {
    let ctx = _tasks.get(key);
    if (ctx) {
      if (!ctx.subseq) {
        ctx.subseq = [];
      }
      return new Promise((...args) => {
        ctx.subseq.push(args)
      });
    }
    _tasks.set(key, ctx = Object.create(null));
    const fn = val => {
      return _tasks.delete(key), val;
    }
    const p = typeof task == 'function' ? task() : task;
    return p.then(val => {
      if (ctx.subseq)
        ctx.subseq.forEach(e => e[0](val));
      return val;
    }, err => {
      if (ctx.subseq)
        ctx.subseq.forEach(e => e[1](err));
      return err;
    }).then(fn, fn);
  }
}