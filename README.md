# FOS Face User Study Page
<div align="center">

<!-- 📜 [Paper]() |  -->
📃 [ArXiv](http://arxiv.org/abs/2404.19500) | 🏰 [HomePage](https://ziyannchen.github.io/projects/VFRxBenchmark/)
| 🚀 [Playground](https://ziyannchen.github.io/fos_user_study_page)
</div>

This user study page is used in [Towards Real-world Video Face Restoration: A New Benchmark](https://ziyannchen.github.io/projects/VFRxBenchmark/) to support relatively large-scale user studies.

### Features
- Server-end data loading
- User-friendly interface

## 🚀 Getting Started

```shell
npm install
npm start
```



For error like `code: 'ERR_OSSL_EVP_UNSUPPORTED'`, try fix with 
```shell
export NODE_OPTIONS=--openssl-legacy-provider
npm start
```


## Deploy custom web pages
- **Data**. Prepare your own data in a public avaiavle server and .json file like the [image template](src/pages/eval/js/fos_real_aligned_pairs.json)/[video template](src/pages/eval/js/fos_v_h264_pairs.json). Remember to modify variables including `server_src`(and the `json` and `json_test` paths) in [Constant.tsx](src/pages/eval/js/Constant.tsx).
- Replace your webpage url with `homepage` in [package.json](package.json). Run deploy command:
```
npm run deploy
```

## Tech Stack
This page is currently a front-end only SPA(single page application) developed on
- [React](https://react.dev/)
- [UmiJS](https://umijs.org/en-US)
- [AntDesign](https://ant.design/)