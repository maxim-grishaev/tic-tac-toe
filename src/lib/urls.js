// @flow
const insertToTmpl = (tmpl: string, vars: Object): string =>
  Object.keys(vars).reduce((tmpl, k) => tmpl.split(`:${k}`).join(vars[k]), tmpl);

export const createPath = (url: string): Function => vars => (vars ? insertToTmpl(url, vars) : url);

export const urls = {
  opponent: createPath('/opponent/:player'),
  main: () => '/'
};
