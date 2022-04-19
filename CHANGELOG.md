# Changelog

All notable changes to this project will be documented in this file. See [standard-version](https://github.com/conventional-changelog/standard-version) for commit guidelines.

### [0.0.8](https://gitlab.com/eDonec/tools/boilerplate/compare/v0.0.7...v0.0.8) (2022-04-19)


### Features

* **app:** refactor all packages to be either in browser or in node ([7d1d755](https://gitlab.com/eDonec/tools/boilerplate/commit/7d1d75591853ca83ec7b2e9787d5333369f0284b))
* **apps:** dockerize both client and dashboard apps an create a compose file for them ([8c9563e](https://gitlab.com/eDonec/tools/boilerplate/commit/8c9563e65a72105fe933ceb24512104146a4d5e3))
* **dockerizer:** standard dockerfile for next app ([a0c18bd](https://gitlab.com/eDonec/tools/boilerplate/commit/a0c18bdb20b1a68e05081b08135461a409a899b4))
* **forms/checkbox:** add checkbox form to forms ([88d6824](https://gitlab.com/eDonec/tools/boilerplate/commit/88d68248bb72eb874800168ffd932d58bc6dec07))
* **forms/Select:** add docs for select input docs ([28d685b](https://gitlab.com/eDonec/tools/boilerplate/commit/28d685bb21014961b4e1e48e415c0a1330314a9c))
* **forms/Select:** Create Select input and RawSelect input ([b511a7b](https://gitlab.com/eDonec/tools/boilerplate/commit/b511a7b53e7f6a905e52da9294b440c77821df9d))
* server sdk types && third party auth account merge ([e6c4e54](https://gitlab.com/eDonec/tools/boilerplate/commit/e6c4e5472ca01e38cff507be1a77918161a746ec))
* server sdks ([911e914](https://gitlab.com/eDonec/tools/boilerplate/commit/911e91424b78d6ca9cf260c96cc0ced4f9bcd25b))


### Bug Fixes

* **app:** standardize tsconfigs to have an output folder as build ([59ceba1](https://gitlab.com/eDonec/tools/boilerplate/commit/59ceba18e0a545def1cf09937964bd36087f5289))
* **forms/checkbox:** fix checkbox style and  checkbox name ([bf2b60c](https://gitlab.com/eDonec/tools/boilerplate/commit/bf2b60c6ef46326dbba2f1919c7fe6336d5e146e))
* **forms/checkbox:** fix clsx ([ccf2c70](https://gitlab.com/eDonec/tools/boilerplate/commit/ccf2c70be8e23d76733fb05c4426d5ce212a4b51))
* **forms/checkbox:** remobe trailing spaces from classNames ([60e6899](https://gitlab.com/eDonec/tools/boilerplate/commit/60e6899b6fd269fce68c70e0b4e1325b7a2b7efc))
* **main:** fix casing ([2ec1a0e](https://gitlab.com/eDonec/tools/boilerplate/commit/2ec1a0e181558d0e4ca5b040a2d188c025370d49))
* type import ([eb63d6a](https://gitlab.com/eDonec/tools/boilerplate/commit/eb63d6a066bfcd044d6f0c7367cdffdff61626ca))

### [0.0.7](https://gitlab.com/eDonec/tools/boilerplate/compare/v0.0.6...v0.0.7) (2022-04-08)


### Features

* add remote cache support through custom server and S3 bucket ([64d1cf0](https://gitlab.com/eDonec/tools/boilerplate/commit/64d1cf091b4b2dd9b8f5008780ce90562209ca5b))
* update react to version 18! ([74cacd1](https://gitlab.com/eDonec/tools/boilerplate/commit/74cacd183b61392d0ebfee009f8422d3420b7987))


### Bug Fixes

* **server-auth:** currentAuth populate role before putting in res.locals ([56eb401](https://gitlab.com/eDonec/tools/boilerplate/commit/56eb4016d725958dde033630bc7ef748bc3fb7fd))

### [0.0.6](https://gitlab.com/eDonec/tools/boilerplate/compare/v0.0.5...v0.0.6) (2022-04-06)


### Features

* add dark mode support cross apps through a DarkModeProvider ([fa0938f](https://gitlab.com/eDonec/tools/boilerplate/commit/fa0938fac3138466d7d76d4dd8f059136f8444ed))
* create form package and start with input form ([1701f87](https://gitlab.com/eDonec/tools/boilerplate/commit/1701f87bf335e1540cfd9ed407199b792ff1872d))
* **dashboard:** add a translation option ([c0a2867](https://gitlab.com/eDonec/tools/boilerplate/commit/c0a2867f878e6c2244fd8ccb2bee08b9cd2bf045))
* **server-auth:** add check authorization to classic sign-in ([b625ba1](https://gitlab.com/eDonec/tools/boilerplate/commit/b625ba186dfccb41460ae275f6081d0117ef0f99))
* **server-auth:** add check authorization to classic sign-in ([75f06b8](https://gitlab.com/eDonec/tools/boilerplate/commit/75f06b81c46c99ee79f13e4bda27f169903ee000))
* **server-auth:** add database seeder as well as default role for new sign-ups of public ([d566f0f](https://gitlab.com/eDonec/tools/boilerplate/commit/d566f0f0ed91487c97f66efedd101ddbfaacdc8b))
* **server-auth:** add meta attributes to access ([6cd1107](https://gitlab.com/eDonec/tools/boilerplate/commit/6cd11072b7204d754d4a0ddf9be33afca84372f2))


### Bug Fixes

* **server-auth:** change access attribute in Role schema to be array of access ([bbff180](https://gitlab.com/eDonec/tools/boilerplate/commit/bbff1803437932de2bdaec0ca28d440fe5b9ca9e))
* **server-auth:** fix error stack in authz validation ([78e840a](https://gitlab.com/eDonec/tools/boilerplate/commit/78e840a11f3c6850ea3515e31d31de0364977923))
* **server-auth:** remove AuthZ Validator export from authN file ([80d70e1](https://gitlab.com/eDonec/tools/boilerplate/commit/80d70e1f019f501a5c90caa5fd59e1f8d7419b8c))
* **server-auth:** remove trailing slash in sign-in classic route ([d85b748](https://gitlab.com/eDonec/tools/boilerplate/commit/d85b748b0e269e9b3d7299d9282ad3839b2c9385))
* **server-auth:** update authZValidator import ([38629b6](https://gitlab.com/eDonec/tools/boilerplate/commit/38629b60669112cc62011057a9661fe1c7ff09ad))

### [0.0.5](https://gitlab.com/eDonec/tools/boilerplate/compare/v0.0.4...v0.0.5) (2022-03-28)


### Features

* add classic sign-in to server-auth ([45ce565](https://gitlab.com/eDonec/tools/boilerplate/commit/45ce5655b520ac727887ef4af9e77e69a2fa6434))
* add signup to server-auth ([5ca1df9](https://gitlab.com/eDonec/tools/boilerplate/commit/5ca1df9d612e3e99e8b363f8dcf4c74a0907c2f7))
* add string validation Class and custom error handeling for it ([394b56d](https://gitlab.com/eDonec/tools/boilerplate/commit/394b56d7c193d84ce5ff2e2e9256cbaaa8ddd376))
* add translation to client app ([99230c6](https://gitlab.com/eDonec/tools/boilerplate/commit/99230c6a7f9ab19b9d7164c6d10b31e68f32632b))
* classic auth back-end baseUrl /auth/n/classic routes /sign-up /sign-in /refresh-token /logout ([dc7fa6b](https://gitlab.com/eDonec/tools/boilerplate/commit/dc7fa6bd26949ca66dfd6ec7fd5b336935eefd07))
* merge master into branch ([b25c5ff](https://gitlab.com/eDonec/tools/boilerplate/commit/b25c5ff43d97dea3782bb12ebd555276e5d77fca))


### Bug Fixes

* express generator package.json name ([7960553](https://gitlab.com/eDonec/tools/boilerplate/commit/796055312085f122c8076412039d9848fe4e1dee))

### [0.0.4](https://gitlab.com/eDonec/tools/boilerplate/compare/v0.0.3...v0.0.4) (2022-03-24)


### Features

* update express generator & bump egen version & and update error handeling ([d16970b](https://gitlab.com/eDonec/tools/boilerplate/commit/d16970b71a96368f1dad402e4b91e328c16d7714))


### Bug Fixes

* rename cra app in apps to dashboard ([bfed6c5](https://gitlab.com/eDonec/tools/boilerplate/commit/bfed6c57007beca00df5c457759e871a5a9624f5))

### [0.0.3](https://gitlab.com/eDonec/tools/boilerplate/compare/v0.0.2...v0.0.3) (2022-03-24)


### Features

* add generator scripts with port selection as well as base url selection in apps ([c477f73](https://gitlab.com/eDonec/tools/boilerplate/commit/c477f73feca578f3ce7b7e52aeac90bc8c259c9a))
* add jest and eslint configs ([29508f4](https://gitlab.com/eDonec/tools/boilerplate/commit/29508f4b147f606fdfc4ee8a800b466ac3ebc5f1))
* server tests and packages test ([decebaa](https://gitlab.com/eDonec/tools/boilerplate/commit/decebaa2fb347dd17097c4425c6e9836d8f8a252))


### Bug Fixes

* coverage file location on next app test ([9286e9e](https://gitlab.com/eDonec/tools/boilerplate/commit/9286e9ec136867cade51a59f2fe26f45320167e1))
* lint staged scripts ([a0a1845](https://gitlab.com/eDonec/tools/boilerplate/commit/a0a1845c7d5daa09363956e9e054aac9576e4769))

### 0.0.2 (2022-03-23)

### Features

- (unstable) reverse proxy setup remaining work in comment proxy/src/app.ts ([5ea5003](https://gitlab.com/eDonec/tools/boilerplate/commit/5ea500367a99fb52c27c4578b552f2417712d2ca))
- add CRA generator ([ad7d1b5](https://gitlab.com/eDonec/tools/boilerplate/commit/ad7d1b59eafede4d9a2d2b247714b00e8feec2b5))
- add express app generator ([8cc7d33](https://gitlab.com/eDonec/tools/boilerplate/commit/8cc7d336f089000c3c6c691f59d9a30f2080b0de))
- add next app generator ([91f1b1b](https://gitlab.com/eDonec/tools/boilerplate/commit/91f1b1ba28f2c048f328d1f9e5262df2e79bccdd))
- add turborepo to the repo ([f7718da](https://gitlab.com/eDonec/tools/boilerplate/commit/f7718da99ac33da76efdcdc4edae255887484bd3))
- cleaning up redux toolkit & fixing types / setting up shared packages ([ef4a5ae](https://gitlab.com/eDonec/tools/boilerplate/commit/ef4a5ae6306ae67d35ac02b1d19a39f9f68ba870))
- setting up pages ([dcad7fb](https://gitlab.com/eDonec/tools/boilerplate/commit/dcad7fbe6baa3fdec1ebfeca8ed6527a10ce3e88))
- setting up redux toolkit ([1022ff2](https://gitlab.com/eDonec/tools/boilerplate/commit/1022ff272eb9d5336451a6461aaf2201e8ed9fed))
- setting up turborepo ([2509768](https://gitlab.com/eDonec/tools/boilerplate/commit/250976818d4e5c2dd06722d981921407670744a7))
- setting up turborepo ([19a285d](https://gitlab.com/eDonec/tools/boilerplate/commit/19a285dc63da65e1ff17933a921f60d0dcb18b24))

### Bug Fixes

- add postbuild script in turbo.json ([d96b64e](https://gitlab.com/eDonec/tools/boilerplate/commit/d96b64eacfdfe26db151d195fdcfccf52052c020))
- button link type ([b12a575](https://gitlab.com/eDonec/tools/boilerplate/commit/b12a5757ba50e8e1c7754d8b38008a49c0232752))
- cra router and better stability on proxy ([b4d8f8b](https://gitlab.com/eDonec/tools/boilerplate/commit/b4d8f8bddb7826a9888f4b754a37e10e71080d4f))
- createAsyncThunk type in CRA ([d08ed25](https://gitlab.com/eDonec/tools/boilerplate/commit/d08ed2526ef862601a3dbc9d94c1b3bde94073cf))
- merge ([95705ef](https://gitlab.com/eDonec/tools/boilerplate/commit/95705eff9541dc58a807a6bf1de9c2f70f695eab))
- Merge ([d304033](https://gitlab.com/eDonec/tools/boilerplate/commit/d304033ec2d6eb9ad083e71c0c64b47d39cab281))
- remove bg dark from home page ([57dca25](https://gitlab.com/eDonec/tools/boilerplate/commit/57dca258ec41499552314c3f88ec6f5cd236c36b))
- select transition to dark mode ([1dd0e42](https://gitlab.com/eDonec/tools/boilerplate/commit/1dd0e428f500301b9fa3fc726d228bb8ef8781a7))
- settings.json ([36d58eb](https://gitlab.com/eDonec/tools/boilerplate/commit/36d58ebd7e185d0bcf1806f8079b8138bcd9854f))
- settings.json ([3313e11](https://gitlab.com/eDonec/tools/boilerplate/commit/3313e110706b7b27cabbbfd90858df7a9a6c39c9))
- swap standard-version to monorepo level(for now) ([7e010d7](https://gitlab.com/eDonec/tools/boilerplate/commit/7e010d7fbe95b74e85ce204723c5ebefa2e7c56d))
- tailwindcss dependency ([083a7d8](https://gitlab.com/eDonec/tools/boilerplate/commit/083a7d82418fdc91074623ce546c4875eef5d51e))
