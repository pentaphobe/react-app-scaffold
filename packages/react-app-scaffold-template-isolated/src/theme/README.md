# Themes

Currently themes exist as a folder with at least a single `index.js` entry point

eg. The initial setup contains two basic themes
```
src/theme
    ├── default
    │   └── index.js
    ├── alternative
    │   └── index.js
    ├── index.js
    └── utils.js
```


## Adding a theme

- create a folder containing your entry point `index.js`
- `import` your new module to `src/theme/index.js`
- add your import to the `themeDictionary` which is exported from `src/theme/index.js`