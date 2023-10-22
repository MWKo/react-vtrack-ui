export const bargs = (fn, ...args) =>           x => fn(x, ...args);
export const pipe = (...fns) =>                 arg => fns.reduce((prev, fn) => fn(prev), arg);
export const pipeWith = (arg, ...fns) =>        pipe(...fns)(arg);