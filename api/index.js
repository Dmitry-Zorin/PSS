var __create = Object.create;
var __defProp = Object.defineProperty, __defProps = Object.defineProperties, __getOwnPropDesc = Object.getOwnPropertyDescriptor, __getOwnPropDescs = Object.getOwnPropertyDescriptors, __getOwnPropNames = Object.getOwnPropertyNames, __getOwnPropSymbols = Object.getOwnPropertySymbols, __getProtoOf = Object.getPrototypeOf, __hasOwnProp = Object.prototype.hasOwnProperty, __propIsEnum = Object.prototype.propertyIsEnumerable;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: !0, configurable: !0, writable: !0, value }) : obj[key] = value, __spreadValues = (a, b) => {
  for (var prop in b || (b = {}))
    __hasOwnProp.call(b, prop) && __defNormalProp(a, prop, b[prop]);
  if (__getOwnPropSymbols)
    for (var prop of __getOwnPropSymbols(b))
      __propIsEnum.call(b, prop) && __defNormalProp(a, prop, b[prop]);
  return a;
}, __spreadProps = (a, b) => __defProps(a, __getOwnPropDescs(b)), __markAsModule = (target) => __defProp(target, "__esModule", { value: !0 });
var __objRest = (source, exclude) => {
  var target = {};
  for (var prop in source)
    __hasOwnProp.call(source, prop) && exclude.indexOf(prop) < 0 && (target[prop] = source[prop]);
  if (source != null && __getOwnPropSymbols)
    for (var prop of __getOwnPropSymbols(source))
      exclude.indexOf(prop) < 0 && __propIsEnum.call(source, prop) && (target[prop] = source[prop]);
  return target;
};
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: !0 });
}, __reExport = (target, module2, copyDefault, desc) => {
  if (module2 && typeof module2 == "object" || typeof module2 == "function")
    for (let key of __getOwnPropNames(module2))
      !__hasOwnProp.call(target, key) && (copyDefault || key !== "default") && __defProp(target, key, { get: () => module2[key], enumerable: !(desc = __getOwnPropDesc(module2, key)) || desc.enumerable });
  return target;
}, __toESM = (module2, isNodeMode) => __reExport(__markAsModule(__defProp(module2 != null ? __create(__getProtoOf(module2)) : {}, "default", !isNodeMode && module2 && module2.__esModule ? { get: () => module2.default, enumerable: !0 } : { value: module2, enumerable: !0 })), module2), __toCommonJS = /* @__PURE__ */ ((cache) => (module2, temp) => cache && cache.get(module2) || (temp = __reExport(__markAsModule({}), module2, 1), cache && cache.set(module2, temp), temp))(typeof WeakMap != "undefined" ? /* @__PURE__ */ new WeakMap() : 0);

// <stdin>
var stdin_exports = {};
__export(stdin_exports, {
  assets: () => assets_manifest_default,
  entry: () => entry,
  routes: () => routes
});

// node_modules/@remix-run/dev/dist/compiler/shims/react.ts
var React = __toESM(require("react"));

// app/entry.server.tsx
var entry_server_exports = {};
__export(entry_server_exports, {
  default: () => handleRequest
});
var import_react = require("@remix-run/react"), import_server = require("react-dom/server");
function handleRequest(request, responseStatusCode, responseHeaders, remixContext) {
  let markup = (0, import_server.renderToString)(/* @__PURE__ */ React.createElement(import_react.RemixServer, {
    context: remixContext,
    url: request.url
  }));
  return responseHeaders.set("Content-Type", "text/html"), new Response("<!DOCTYPE html>" + markup, {
    status: responseStatusCode,
    headers: responseHeaders
  });
}

// route:/Users/dima/GitHub/PSS/remix/app/root.tsx
var root_exports = {};
__export(root_exports, {
  default: () => root_default,
  links: () => links,
  meta: () => meta
});
var import_react2 = require("@remix-run/react");

// app/styles/global.css
var global_default = "/build/_assets/global-27QKC73K.css";

// route:/Users/dima/GitHub/PSS/remix/app/root.tsx
var meta = () => ({
  title: "PSS",
  charset: "utf-8",
  viewport: "width=device-width,initial-scale=1"
}), links = () => [
  {
    rel: "preload",
    href: "/fonts/Golos-Text/Golos-Text.woff2",
    as: "font",
    type: "font/woff2",
    crossOrigin: "anonymous"
  },
  { rel: "stylesheet", href: global_default }
], App = () => /* @__PURE__ */ React.createElement("html", {
  lang: "en"
}, /* @__PURE__ */ React.createElement("head", null, /* @__PURE__ */ React.createElement(import_react2.Meta, null), /* @__PURE__ */ React.createElement(import_react2.Links, null)), /* @__PURE__ */ React.createElement("body", null, /* @__PURE__ */ React.createElement(import_react2.Outlet, null), /* @__PURE__ */ React.createElement(import_react2.ScrollRestoration, null), /* @__PURE__ */ React.createElement(import_react2.Scripts, null), /* @__PURE__ */ React.createElement(import_react2.LiveReload, null))), root_default = App;

// route:/Users/dima/GitHub/PSS/remix/app/routes/index.tsx
var routes_exports = {};
__export(routes_exports, {
  default: () => routes_default
});

// app/requests.ts
var import_lodash = require("lodash"), import_react_admin = require("react-admin"), apiUrl = "/api";
function createFormData(payload) {
  return (0, import_lodash.reduce)(payload, (result, value, key) => (result.append(key, (value == null ? void 0 : value.rawFile) || value), result), new FormData());
}
function httpClient(url, _a = {}) {
  var _b = _a, { body } = _b, options = __objRest(_b, ["body"]);
  let token = getAuthToken();
  return import_react_admin.fetchUtils.fetchJson(url, __spreadProps(__spreadValues(__spreadValues({}, options), token && {
    user: {
      authenticated: !0,
      token: `Bearer ${token}`
    }
  }), {
    body: (body == null ? void 0 : body.file) ? createFormData(body) : JSON.stringify(body)
  }));
}
function fetchApi(url, options) {
  return httpClient(`${apiUrl}/${url}`, options);
}
function createUrlWithQueryParams(url, query) {
  let serializedQuery = (0, import_lodash.mapValues)(query, (e) => (0, import_lodash.isString)(e) ? e : JSON.stringify(e)), queryParams = new URLSearchParams(serializedQuery);
  return `${url}?${queryParams}`;
}
async function saveSettings(settings) {
  getAuthToken() && await fetchApi("auth/settings", {
    method: "put",
    body: settings
  });
}

// app/auth.provider.ts
function setAuthToken(token) {
  store.setItem("auth.token", token);
}
function getAuthToken() {
  return store.getItem("auth.token");
}
function fetchAuth(url, options) {
  return fetchApi(`auth/${url}`, options);
}
var authProvider = {
  async login({ username, password }) {
    let { json } = await fetchAuth("login", {
      method: "post",
      body: { username, password }
    });
    if (!json.token)
      throw null;
    setAuthToken(json.token);
  },
  async logout() {
  },
  async getIdentity() {
    let storedIdentity = store.getItem("identity");
    if (storedIdentity)
      return storedIdentity;
    if (!getAuthToken())
      return {
        id: -1,
        role: "guest"
      };
    let { json: identity } = await fetchAuth("identity");
    return store.setItem("identity", identity), identity;
  },
  async getPermissions() {
    let role = (await authProvider.getIdentity()).role;
    return {
      role,
      isGuest: role === "guest",
      isUser: role === "user",
      isAdmin: role === "admin"
    };
  },
  async checkAuth() {
    if (!getAuthToken())
      throw null;
  },
  async checkError({ status }) {
    if ([401, 403].includes(status))
      throw null;
  }
}, auth_provider_default = authProvider;

// app/layout/DarkModeSwitch.tsx
var import_web = require("@react-spring/web"), lightProperties = {
  circle: {
    r: 4
  },
  mask: {
    cx: "100%",
    cy: "0%"
  },
  svg: {
    rotate: -120
  },
  lines: {
    opacity: 1
  }
}, darkProperties = {
  circle: {
    r: 9
  },
  mask: {
    cx: "50%",
    cy: "23%"
  },
  svg: {
    rotate: 60
  },
  lines: {
    opacity: 0
  }
}, springConfig = {
  mass: 4,
  tension: 250,
  friction: 35
}, DarkModeSwitch = (_a) => {
  var _b = _a, {
    checked = !1,
    size = 24,
    moonColor = "#fff",
    sunColor = "#000",
    style
  } = _b, props = __objRest(_b, [
    "checked",
    "size",
    "moonColor",
    "sunColor",
    "style"
  ]);
  let { circle, svg, lines, mask } = checked ? darkProperties : lightProperties;
  return /* @__PURE__ */ React.createElement(import_web.animated.svg, __spreadValues({
    xmlns: "http://www.w3.org/2000/svg",
    width: size,
    height: size,
    viewBox: "0 0 24 24",
    color: checked ? moonColor : sunColor,
    fill: "none",
    strokeWidth: "2",
    strokeLinecap: "round",
    strokeLinejoin: "round",
    stroke: "currentColor",
    style: __spreadValues(__spreadValues({
      cursor: "pointer"
    }, (0, import_web.useSpring)(__spreadProps(__spreadValues({}, svg), {
      config: springConfig
    }))), style)
  }, props), /* @__PURE__ */ React.createElement("mask", {
    id: "mask"
  }, /* @__PURE__ */ React.createElement("rect", {
    x: "0",
    y: "0",
    width: "100%",
    height: "100%",
    fill: "white"
  }), /* @__PURE__ */ React.createElement(import_web.animated.circle, {
    style: (0, import_web.useSpring)(__spreadProps(__spreadValues({}, mask), {
      config: springConfig
    })),
    r: "9",
    fill: "black"
  })), /* @__PURE__ */ React.createElement(import_web.animated.circle, {
    cx: "12",
    cy: "12",
    fill: checked ? moonColor : sunColor,
    style: (0, import_web.useSpring)(__spreadProps(__spreadValues({}, circle), {
      config: springConfig
    })),
    mask: "url(#mask)"
  }), /* @__PURE__ */ React.createElement(import_web.animated.g, {
    stroke: "currentColor",
    style: (0, import_web.useSpring)(__spreadProps(__spreadValues({}, lines), {
      config: springConfig
    }))
  }, /* @__PURE__ */ React.createElement("line", {
    x1: "12",
    y1: "1",
    x2: "12",
    y2: "3"
  }), /* @__PURE__ */ React.createElement("line", {
    x1: "12",
    y1: "21",
    x2: "12",
    y2: "23"
  }), /* @__PURE__ */ React.createElement("line", {
    x1: "4.22",
    y1: "4.22",
    x2: "5.64",
    y2: "5.64"
  }), /* @__PURE__ */ React.createElement("line", {
    x1: "18.36",
    y1: "18.36",
    x2: "19.78",
    y2: "19.78"
  }), /* @__PURE__ */ React.createElement("line", {
    x1: "1",
    y1: "12",
    x2: "3",
    y2: "12"
  }), /* @__PURE__ */ React.createElement("line", {
    x1: "21",
    y1: "12",
    x2: "23",
    y2: "12"
  }), /* @__PURE__ */ React.createElement("line", {
    x1: "4.22",
    y1: "19.78",
    x2: "5.64",
    y2: "18.36"
  }), /* @__PURE__ */ React.createElement("line", {
    x1: "18.36",
    y1: "5.64",
    x2: "19.78",
    y2: "4.22"
  })));
}, DarkModeSwitch_default = DarkModeSwitch;

// app/layout/Layout.tsx
var import_material = require("@mui/material"), import_color = __toESM(require("color"));
var Layout = ({ children }) => /* @__PURE__ */ React.createElement(React.Fragment, null, /* @__PURE__ */ React.createElement(import_material.CssBaseline, {
  enableColorScheme: !0
}), /* @__PURE__ */ React.createElement(AppBar_default, null), /* @__PURE__ */ React.createElement(import_material.Box, {
  display: "flex",
  sx: {
    "*::selection": {
      bgcolor: (t) => (0, import_color.default)(t.palette.primary.main).alpha(0.6).string()
    }
  }
}, /* @__PURE__ */ React.createElement(Sidebar_default, null, /* @__PURE__ */ React.createElement(Menu_default, null)), /* @__PURE__ */ React.createElement(import_material.Box, {
  component: "main",
  flexGrow: 1
}, children, /* @__PURE__ */ React.createElement(ScrollTopButton_default, null)))), Layout_default = Layout;

// app/layout/LocaleMenu.tsx
var import_icons_material = require("@mui/icons-material"), import_material2 = require("@mui/material"), import_react3 = require("react"), import_react_admin2 = require("react-admin"), import_react_helmet = require("react-helmet");
var LocaleMenu = () => {
  let [anchorEl, setAnchorEl] = (0, import_react3.useState)(null), [locale, setLocale] = (0, import_react_admin2.useLocaleState)();
  function changeLocale(newLocale) {
    locale !== newLocale && (setLocale(newLocale), saveSettings({ locale: newLocale }).catch(null));
  }
  return /* @__PURE__ */ React.createElement(React.Fragment, null, /* @__PURE__ */ React.createElement(import_react_helmet.Helmet, null, /* @__PURE__ */ React.createElement("html", {
    lang: locale
  }), /* @__PURE__ */ React.createElement("title", {
    lang: locale
  })), /* @__PURE__ */ React.createElement(import_material2.IconButton, {
    size: "small",
    color: "inherit",
    onClick: (event) => {
      setAnchorEl(event.currentTarget);
    }
  }, /* @__PURE__ */ React.createElement(import_icons_material.Language, null)), /* @__PURE__ */ React.createElement(import_material2.Menu, {
    anchorEl,
    open: !!anchorEl,
    onClose: () => setAnchorEl(null),
    TransitionComponent: import_material2.Zoom
  }, /* @__PURE__ */ React.createElement(import_material2.MenuItem, {
    selected: locale === "en",
    onClick: () => changeLocale("en")
  }, "English"), /* @__PURE__ */ React.createElement(import_material2.MenuItem, {
    selected: locale === "ru",
    onClick: () => changeLocale("ru")
  }, "\u0420\u0443\u0441\u0441\u043A\u0438\u0439")));
}, LocaleMenu_default = LocaleMenu;

// app/layout/Logo.tsx
var import_material3 = require("@mui/material"), import_react_router_dom = require("react-router-dom"), Logo = () => /* @__PURE__ */ React.createElement(import_material3.Typography, {
  component: import_react_router_dom.Link,
  to: "/",
  variant: "h6",
  fontFamily: "unset",
  fontWeight: 600,
  color: "primary.main",
  p: 1,
  sx: { textDecoration: "none" }
}, "PSS"), Logo_default = Logo;

// app/layout/ScrollTopButton.tsx
var import_icons_material2 = require("@mui/icons-material"), import_material7 = require("@mui/material"), import_web5 = require("@react-spring/web"), import_react6 = require("react");

// app/components/Admin.tsx
var import_react_admin3 = require("react-admin"), Admin = ({ children }) => {
  let { permissions } = (0, import_react_admin3.usePermissions)();
  return (permissions == null ? void 0 : permissions.isAdmin) ? /* @__PURE__ */ React.createElement(React.Fragment, null, children) : null;
}, Admin_default = Admin;

// app/components/Collapse.tsx
var import_web2 = require("@react-spring/web");
var import_react4 = require("react"), Collapse = (_a) => {
  var _b = _a, {
    children,
    in: collapseIn,
    orientation = "vertical"
  } = _b, props = __objRest(_b, [
    "children",
    "in",
    "orientation"
  ]);
  var _a2, _b2;
  let ref = (0, import_react4.useRef)(null), orientations = {
    vertical: {
      height: collapseIn ? ((_a2 = ref.current) == null ? void 0 : _a2.offsetHeight) || void 0 : 0
    },
    horizontal: {
      width: collapseIn ? ((_b2 = ref.current) == null ? void 0 : _b2.offsetWidth) || void 0 : 0
    }
  };
  return /* @__PURE__ */ React.createElement(import_web2.animated.div, {
    style: (0, import_web2.useSpring)(__spreadValues(__spreadProps(__spreadValues({}, orientations[orientation]), {
      overflow: "hidden",
      config: gentleConfig
    }), props))
  }, /* @__PURE__ */ React.createElement("div", {
    ref
  }, children));
}, Collapse_default = Collapse;

// app/components/Drawer.tsx
var import_material4 = require("@mui/material");
var Drawer = (_a) => {
  var _b = _a, { children, open, sx } = _b, props = __objRest(_b, ["children", "open", "sx"]);
  return /* @__PURE__ */ React.createElement(import_material4.Modal, __spreadValues({
    open,
    closeAfterTransition: !0,
    keepMounted: !0
  }, props), /* @__PURE__ */ React.createElement(Slide_default, {
    in: open,
    from: "left"
  }, /* @__PURE__ */ React.createElement(AnimatedBox, {
    sx: [
      {
        position: "absolute",
        height: "100vh"
      },
      ...Array.isArray(sx) ? sx : [sx]
    ]
  }, children)));
}, Drawer_default = Drawer;

// app/components/MainArea.tsx
var import_material5 = require("@mui/material"), MainArea = (_a) => {
  var _b = _a, { children, title, rightMenu } = _b, props = __objRest(_b, ["children", "title", "rightMenu"]);
  return /* @__PURE__ */ React.createElement(import_material5.Box, {
    maxWidth: 1100,
    mx: "auto",
    pb: 8
  }, title && /* @__PURE__ */ React.createElement(import_material5.Box, {
    component: "header",
    pb: 4
  }, typeof title == "string" ? /* @__PURE__ */ React.createElement(import_material5.Typography, {
    component: "h1",
    variant: "h3"
  }, title) : title), /* @__PURE__ */ React.createElement(import_material5.Box, __spreadValues({
    display: "flex"
  }, props), /* @__PURE__ */ React.createElement(import_material5.Box, {
    component: "article",
    width: 1,
    maxWidth: 700,
    mx: "auto"
  }, children), /* @__PURE__ */ React.createElement(import_material5.Box, {
    component: "aside",
    flexGrow: 1,
    display: { xs: "none", xl: "block" }
  }, rightMenu)));
}, MainArea_default = MainArea;

// app/components/Slide.tsx
var import_web4 = require("@react-spring/web"), import_react5 = require("react");

// app/components/spring.tsx
var import_material6 = require("@mui/material"), import_web3 = require("@react-spring/web"), gentleConfig = __spreadProps(__spreadValues({}, import_web3.config.gentle), {
  mass: 0.5
}), stiffConfig = __spreadProps(__spreadValues({}, import_web3.config.stiff), {
  mass: 0.6
}), AnimatedBox = (0, import_web3.animated)(import_material6.Box);

// app/components/Slide.tsx
var Slide = (0, import_react5.forwardRef)((_a, ref) => {
  var _b = _a, {
    children,
    in: slideIn = !0,
    from,
    config: config4,
    delay,
    onStart,
    onRest,
    onEnter,
    onExited
  } = _b, props = __objRest(_b, [
    "children",
    "in",
    "from",
    "config",
    "delay",
    "onStart",
    "onRest",
    "onEnter",
    "onExited"
  ]);
  let childrenRef = (0, import_react5.useRef)(), [distance, setDistance] = (0, import_react5.useState)(0), [visibility, setVisibility] = (0, import_react5.useState)("hidden"), horizontal = ["left", "right"].includes(from), vertical = ["top", "bottom"].includes(from), param = horizontal ? "x" : "y";
  return (0, import_react5.useEffect)(() => {
    let el = childrenRef.current;
    if (!el)
      return;
    let rect = el.getBoundingClientRect();
    if (horizontal) {
      let offset = from === "left" ? rect.left : document.documentElement.clientWidth - rect.right;
      setDistance((-1) ** +(from === "left") * (rect.width + offset));
    }
    if (vertical) {
      let offset = from === "top" ? rect.top : document.documentElement.clientHeight - rect.bottom;
      setDistance((-1) ** +(from === "top") * (rect.height + offset));
    }
  }, [childrenRef, from, horizontal, vertical]), (0, import_react5.cloneElement)(children, __spreadValues({
    ref: (node) => {
      childrenRef.current = node, typeof ref == "function" ? ref(node) : ref && (ref.current = node);
    },
    style: __spreadValues(__spreadValues(__spreadValues({}, (0, import_web4.useSpring)({
      visibility,
      immediate: !0
    })), (0, import_web4.useSpring)({
      [param]: slideIn ? 0 : distance,
      from: {
        [param]: distance
      },
      config: config4 || gentleConfig,
      delay,
      onStart: () => {
        setVisibility("visible"), onStart == null || onStart(), slideIn && (onEnter == null || onEnter());
      },
      onRest: () => {
        onRest == null || onRest(), slideIn || onExited == null || onExited();
      }
    })), children.props.style)
  }, props));
}), Slide_default = Slide;

// app/components/Title.tsx
var import_react_admin4 = require("react-admin"), import_react_helmet2 = require("react-helmet"), Title = () => {
  let translate = (0, import_react_admin4.useTranslate)(), resource = (0, import_react_admin4.useResourceContext)();
  return /* @__PURE__ */ React.createElement(import_react_helmet2.Helmet, null, /* @__PURE__ */ React.createElement("title", null, translate(`resources.${resource}.name`, {
    smart_count: 2
  }), " | ", translate("metadata.title")));
}, Title_default = Title;

// app/layout/ScrollTopButton.tsx
var ScrollTopButton = () => {
  let [, scroll] = (0, import_web5.useSpring)(() => ({ y: 0 })), [showTooltip, setShowTooltip] = (0, import_react6.useState)(!1), trigger = (0, import_material7.useScrollTrigger)({
    disableHysteresis: !0,
    threshold: Math.max(0, document.documentElement.scrollHeight - document.documentElement.clientHeight - 1)
  }), button = /* @__PURE__ */ React.createElement(import_material7.Fab, {
    color: "neutral",
    size: "small",
    sx: { color: "background.default" },
    onClick: () => {
      setShowTooltip(!1), scroll.start({
        y: 0,
        from: { y: window.scrollY },
        config: stiffConfig,
        onChange: (_, controller) => {
          window.scroll(0, controller.get().y);
        }
      });
    }
  }, /* @__PURE__ */ React.createElement(import_icons_material2.KeyboardArrowUp, null));
  return /* @__PURE__ */ React.createElement(Slide_default, {
    in: trigger,
    from: "bottom",
    onStart: () => setShowTooltip(!1),
    onRest: () => setShowTooltip(!0)
  }, /* @__PURE__ */ React.createElement(AnimatedBox, {
    position: "fixed",
    right: 24,
    bottom: 24
  }, showTooltip ? /* @__PURE__ */ React.createElement(import_material7.Tooltip, {
    title: "Scroll to top",
    disableInteractive: !0
  }, button) : button));
}, ScrollTopButton_default = ScrollTopButton;

// app/layout/SettingsDial.tsx
var import_icons_material3 = require("@mui/icons-material"), import_material8 = require("@mui/material"), import_web6 = require("@react-spring/web"), import_react7 = require("react");
var AnimatedSettingsIcon = (0, import_web6.animated)(import_icons_material3.Settings), SettingsDial = ({ children }) => {
  let ref = (0, import_react7.useRef)(null), childRef = (0, import_react7.useRef)(null), [open, setOpen] = (0, import_react7.useState)(!1), [timeout, saveTimeout] = (0, import_react7.useState)();
  return /* @__PURE__ */ React.createElement(import_web6.animated.div, {
    style: (0, import_web6.useSpring)({
      rotate: 0,
      from: {
        rotate: -360
      },
      config: import_web6.config.molasses,
      delay: 600
    })
  }, /* @__PURE__ */ React.createElement(AnimatedBox, {
    display: "flex",
    justifyContent: "flex-end",
    borderRadius: 100,
    overflow: "hidden",
    style: (0, import_web6.useSpring)(__spreadValues({
      config: gentleConfig
    }, ref.current && childRef.current && {
      width: open ? ref.current.offsetWidth : childRef.current.offsetWidth
    })),
    onMouseEnter: () => {
      clearTimeout(timeout), setOpen(!0);
    },
    onMouseLeave: () => {
      saveTimeout(setTimeout(() => setOpen(!1), 200));
    }
  }, /* @__PURE__ */ React.createElement(AnimatedBox, {
    ref,
    display: "flex",
    flexDirection: "row-reverse",
    m: "auto",
    visibility: ref.current ? "visible" : "hidden"
  }, /* @__PURE__ */ React.createElement(import_material8.IconButton, {
    ref: childRef,
    color: "inherit",
    sx: {
      "&, :hover": {
        color: open ? "text.disabled" : void 0,
        bgcolor: "transparent",
        cursor: "default"
      }
    }
  }, /* @__PURE__ */ React.createElement(AnimatedSettingsIcon, {
    style: (0, import_web6.useSpring)({
      rotate: 30 * +open,
      config: gentleConfig
    })
  })), children)));
}, SettingsDial_default = SettingsDial;

// app/layout/ThemeSwitcher.tsx
var import_material9 = require("@mui/material"), import_react8 = require("react"), import_react_admin5 = require("react-admin"), import_react_helmet3 = require("react-helmet");

// app/themes/common.options.ts
var import_lodash2 = require("lodash"), hStyle = {
  fontWeight: 700
}, commonOptions = {
  shadows: (0, import_lodash2.range)(25).map(() => "none"),
  shape: {
    borderRadius: 10
  },
  typography: {
    fontFamily: "Golos Text, sans-serif",
    fontSize: 16,
    fontWeightRegular: 425,
    h1: hStyle,
    h2: hStyle,
    h3: __spreadProps(__spreadValues({}, hStyle), {
      fontSize: "3rem"
    }),
    h4: hStyle,
    h5: hStyle,
    h6: hStyle
  },
  components: {
    MuiPaper: {
      styleOverrides: {
        root: ({ theme }) => ({
          background: "none",
          backgroundColor: theme.palette.background.paper
        })
      }
    },
    MuiCard: {
      styleOverrides: {
        root: ({ theme }) => ({
          background: theme.palette.background.card
        })
      }
    },
    MuiButtonBase: {
      defaultProps: {
        disableRipple: !0
      }
    },
    MuiSvgIcon: {
      styleOverrides: {
        root: {
          fontSize: 24
        }
      }
    },
    MuiTableHead: {
      styleOverrides: {
        root: {
          height: 64
        }
      }
    },
    MuiTableRow: {
      styleOverrides: {
        root: {
          height: 50
        }
      }
    },
    MuiTableCell: {
      styleOverrides: {
        root: {
          padding: "8px 16px",
          "&.RaDatagrid-headerCell": {
            background: "transparent"
          }
        },
        head: ({ theme }) => ({
          borderColor: theme.palette.divider
        }),
        body: ({ theme }) => ({
          borderColor: theme.palette.divider
        })
      }
    },
    MuiIconButton: {
      styleOverrides: {
        root: {
          padding: 8
        },
        sizeSmall: {
          padding: 6
        }
      }
    },
    MuiTooltip: {
      styleOverrides: {
        tooltip: {
          fontSize: "0.75rem"
        }
      }
    },
    MuiToolbar: {
      styleOverrides: {
        root: {
          padding: "0px 16px",
          "&.RaToolbar-desktopToolbar": {
            background: "transparent"
          }
        }
      }
    }
  }
}, common_options_default = commonOptions;

// app/themes/dark.options.ts
var import_color2 = __toESM(require("color")), PRIMARY = (0, import_color2.default)("#f53d7a"), SECONDARY = (0, import_color2.default)("#4001FF"), BG_PRIMARY = (0, import_color2.default)("#1A202C"), TEXT_PRIMARY = (0, import_color2.default)("#FFFFFF"), darkOptions = {
  mode: "dark",
  primary: {
    main: PRIMARY.string()
  },
  secondary: {
    main: SECONDARY.string()
  },
  neutral: {
    main: TEXT_PRIMARY.darken(0.25).string()
  },
  text: {
    primary: TEXT_PRIMARY.string(),
    secondary: TEXT_PRIMARY.darken(0.2).string(),
    disabled: TEXT_PRIMARY.darken(0.4).string()
  },
  background: {
    default: BG_PRIMARY.string(),
    paper: BG_PRIMARY.string(),
    card: BG_PRIMARY.lighten(0.5).desaturate(0.3).string()
  },
  divider: TEXT_PRIMARY.alpha(0.1).string(),
  border: TEXT_PRIMARY.alpha(0.1).string()
}, dark_options_default = darkOptions;

// app/themes/light.options.ts
var import_color3 = __toESM(require("color")), PRIMARY2 = (0, import_color3.default)("#f53d7a"), SECONDARY2 = (0, import_color3.default)("#EA4C89"), BG_PRIMARY2 = (0, import_color3.default)("#1A202C"), TEXT_PRIMARY2 = (0, import_color3.default)("#1A202C"), lightOptions = {
  mode: "light",
  primary: {
    main: PRIMARY2.string()
  },
  secondary: {
    main: SECONDARY2.string()
  },
  neutral: {
    main: TEXT_PRIMARY2.lighten(2).string()
  },
  text: {
    primary: TEXT_PRIMARY2.string(),
    secondary: TEXT_PRIMARY2.lighten(1).string(),
    disabled: TEXT_PRIMARY2.lighten(2).string()
  },
  background: {
    default: "#FFFFFF",
    paper: "#FFFFFF",
    card: BG_PRIMARY2.lightness(95).string()
  },
  divider: TEXT_PRIMARY2.alpha(0.1).string(),
  border: TEXT_PRIMARY2.alpha(0.1).string()
}, light_options_default = lightOptions;

// app/themes/index.ts
function createTheme(paletteOptions) {
  return __spreadProps(__spreadValues({}, common_options_default), { palette: paletteOptions });
}
var themes = {
  light: createTheme(light_options_default),
  dark: createTheme(dark_options_default)
}, themes_default = themes;

// app/layout/ThemeSwitcher.tsx
var ThemeSwitcher = (props) => {
  let [theme, setTheme] = (0, import_react_admin5.useTheme)();
  if ((0, import_react8.useEffect)(() => {
    var _a;
    setTheme(themes_default[((_a = theme == null ? void 0 : theme.palette) == null ? void 0 : _a.mode) || "dark"]);
  }, [theme, setTheme]), !theme)
    return null;
  let palette = theme.palette, background = palette.background.default, color = palette.text.secondary, mode = palette.mode, isDark = mode === "dark";
  return document.body.style.background = background, /* @__PURE__ */ React.createElement(React.Fragment, null, /* @__PURE__ */ React.createElement(import_react_helmet3.Helmet, null, /* @__PURE__ */ React.createElement("meta", {
    name: "theme-color",
    content: background
  })), /* @__PURE__ */ React.createElement(import_material9.IconButton, __spreadValues({
    size: "small",
    onClick: () => {
      setTheme(themes_default[isDark ? "light" : "dark"]), saveSettings({ theme: mode }).catch(null);
    }
  }, props), /* @__PURE__ */ React.createElement(DarkModeSwitch_default, {
    checked: isDark,
    sunColor: color,
    moonColor: color
  })));
}, ThemeSwitcher_default = ThemeSwitcher;

// app/layout/app-bar/AppBar.tsx
var import_material10 = require("@mui/material"), import_react_admin6 = require("react-admin");
var AppBar = () => /* @__PURE__ */ React.createElement(import_material10.AppBar, {
  color: "inherit",
  position: "static",
  sx: {
    borderBottom: 1,
    borderColor: "border"
  }
}, /* @__PURE__ */ React.createElement(import_material10.Toolbar, {
  disableGutters: !0,
  sx: {
    color: "text.secondary",
    alignItems: "center"
  }
}, /* @__PURE__ */ React.createElement(MenuButton_default, null), /* @__PURE__ */ React.createElement(Logo_default, null), /* @__PURE__ */ React.createElement(import_material10.Box, {
  flexGrow: 1
}), /* @__PURE__ */ React.createElement(SettingsDial_default, null, /* @__PURE__ */ React.createElement(ThemeSwitcher_default, null), /* @__PURE__ */ React.createElement(LocaleMenu_default, null)), /* @__PURE__ */ React.createElement(import_react_admin6.UserMenu, null))), AppBar_default = AppBar;

// app/layout/app-bar/MenuButton.tsx
var import_icons_material4 = require("@mui/icons-material"), import_material11 = require("@mui/material"), import_react_admin7 = require("react-admin"), MenuButton = () => {
  let translate = (0, import_react_admin7.useTranslate)(), [isSidebarOpen, setSidebarOpen] = (0, import_react_admin7.useSidebarState)();
  return /* @__PURE__ */ React.createElement(import_material11.Tooltip, {
    title: translate(`ra.action.${isSidebarOpen ? "close" : "open"}_menu`)
  }, /* @__PURE__ */ React.createElement(import_material11.IconButton, {
    color: "inherit",
    onClick: () => setSidebarOpen(!isSidebarOpen)
  }, /* @__PURE__ */ React.createElement(import_icons_material4.Menu, null)));
}, MenuButton_default = MenuButton;

// app/layout/menu/Menu.tsx
var import_icons_material11 = require("@mui/icons-material"), import_material20 = require("@mui/material"), import_lodash7 = require("lodash"), import_react_admin23 = require("react-admin");

// app/resources/admin/characters/index.tsx
var import_icons_material6 = require("@mui/icons-material");

// app/resources/admin/characters/views.tsx
var import_react_admin15 = require("react-admin");

// app/contexts/CountContext.tsx
var import_lodash3 = require("lodash"), import_react9 = require("react"), import_react_query = require("react-query");
var CountContext = (0, import_react9.createContext)({
  getTotalCount: () => {
  },
  getResourceCount: () => {
  },
  setResourceCount: () => {
  }
});

// app/resources/components/ResourceCounter.tsx
var import_react10 = require("react"), import_react_admin8 = require("react-admin"), ResourceCounter = () => {
  let { data } = (0, import_react_admin8.useListContext)(), resource = (0, import_react_admin8.useResourceContext)(), { getResourceCount, setResourceCount } = (0, import_react10.useContext)(CountContext), count = getResourceCount(resource);
  return (0, import_react10.useEffect)(() => {
    data && count !== data.length && setResourceCount(resource, data.length);
  }, [count, data, resource, setResourceCount]), null;
}, ResourceCounter_default = ResourceCounter;

// app/resources/components/actions.tsx
var import_material12 = require("@mui/material"), import_react_admin9 = require("react-admin");
var ActionBreadcrumbs = ({ action }) => {
  let translate = (0, import_react_admin9.useTranslate)(), record = (0, import_react_admin9.useRecordContext)();
  return /* @__PURE__ */ React.createElement(import_material12.Toolbar, null, /* @__PURE__ */ React.createElement(import_material12.Breadcrumbs, {
    sx: { flexGrow: 1 }
  }, /* @__PURE__ */ React.createElement(import_material12.Typography, {
    color: "text.secondary"
  }, translate(`resources.${record == null ? void 0 : record.resource}.name`, { smart_count: 1 })), /* @__PURE__ */ React.createElement(import_material12.Typography, {
    color: "text.primary"
  }, translate(`ra.action.${action}`))));
}, CreateActions = () => /* @__PURE__ */ React.createElement(ActionBreadcrumbs, {
  action: "create"
}), EditActions = () => /* @__PURE__ */ React.createElement(React.Fragment, null, /* @__PURE__ */ React.createElement(ActionBreadcrumbs, {
  action: "edit"
}), /* @__PURE__ */ React.createElement(import_material12.Toolbar, null, /* @__PURE__ */ React.createElement(import_react_admin9.ListButton, null), /* @__PURE__ */ React.createElement(import_material12.Box, {
  flexGrow: 1
}))), ListActions = () => /* @__PURE__ */ React.createElement(import_material12.Toolbar, null, /* @__PURE__ */ React.createElement(import_react_admin9.FilterButton, null), /* @__PURE__ */ React.createElement(Admin_default, null, /* @__PURE__ */ React.createElement(import_react_admin9.CreateButton, null))), ShowActions = () => /* @__PURE__ */ React.createElement(import_material12.Toolbar, null, /* @__PURE__ */ React.createElement(import_react_admin9.ListButton, null), /* @__PURE__ */ React.createElement(import_material12.Box, {
  flexGrow: 1
}), /* @__PURE__ */ React.createElement(Admin_default, null, /* @__PURE__ */ React.createElement(import_react_admin9.EditButton, null)));

// app/resources/components/fields.tsx
var import_icons_material5 = require("@mui/icons-material"), import_material13 = require("@mui/material"), import_react_admin10 = require("react-admin"), ChipArrayField = (_a) => {
  var _b = _a, { fieldSource = "value" } = _b, props = __objRest(_b, ["fieldSource"]);
  return /* @__PURE__ */ React.createElement(import_react_admin10.ArrayField, __spreadValues({}, props), /* @__PURE__ */ React.createElement(import_react_admin10.SingleFieldList, {
    linkType: !1
  }, /* @__PURE__ */ React.createElement(import_react_admin10.TextField, {
    source: fieldSource
  })));
}, DownloadFileField = () => {
  let translate = (0, import_react_admin10.useTranslate)(), record = (0, import_react_admin10.useRecordContext)();
  return record.file ? /* @__PURE__ */ React.createElement(import_material13.Button, {
    variant: "contained",
    startIcon: /* @__PURE__ */ React.createElement(import_icons_material5.Download, null),
    href: record.file.url,
    target: "_blank"
  }, translate("actions.download")) : null;
};

// app/resources/publications/ListUI.tsx
var import_material14 = require("@mui/material"), import_lodash4 = require("lodash"), import_react_admin11 = require("react-admin"), ListUI = (props) => (0, import_material14.useMediaQuery)((theme) => theme.breakpoints.down("md")) ? /* @__PURE__ */ React.createElement(import_react_admin11.SimpleList, {
  linkType: "show",
  primaryText: (record) => record.title,
  secondaryText: (record) => (0, import_lodash4.truncate)(record.description, { length: 200 }),
  tertiaryText: (record) => record.publication.year
}) : /* @__PURE__ */ React.createElement(import_react_admin11.Datagrid, __spreadValues({
  rowClick: "show",
  optimized: !0
}, props)), ListUI_default = ListUI;

// app/resources/components/inputs.tsx
var import_react_admin12 = require("react-admin"), LargeTextInput = (props) => /* @__PURE__ */ React.createElement(import_react_admin12.TextInput, __spreadValues({
  label: `fields.${props.source}`,
  validate: props.required ? (0, import_react_admin12.required)() : void 0,
  fullWidth: !0,
  multiline: !0
}, props)), AddFileInput = () => /* @__PURE__ */ React.createElement(import_react_admin12.FileInput, {
  source: "file",
  label: "fields.file"
}, /* @__PURE__ */ React.createElement(import_react_admin12.FileField, {
  title: "filename"
})), ReplaceFileInput = () => /* @__PURE__ */ React.createElement(import_react_admin12.FileInput, {
  source: "file",
  label: "fields.file"
}, /* @__PURE__ */ React.createElement(import_react_admin12.FileField, {
  source: "url",
  title: "name"
}));

// app/resources/components/views.tsx
var import_react_admin13 = require("react-admin");
var Create = (_a) => {
  var _b = _a, {
    children
  } = _b, props = __objRest(_b, [
    "children"
  ]);
  return /* @__PURE__ */ React.createElement(import_react_admin13.CreateBase, __spreadValues({
    redirect: "show"
  }, props), /* @__PURE__ */ React.createElement(CreateActions, null), /* @__PURE__ */ React.createElement(MainArea_default, null, children));
}, Edit = (_a) => {
  var _b = _a, {
    children
  } = _b, props = __objRest(_b, [
    "children"
  ]);
  return /* @__PURE__ */ React.createElement(import_react_admin13.EditBase, __spreadValues({
    redirect: "show"
  }, props), /* @__PURE__ */ React.createElement(EditActions, null), /* @__PURE__ */ React.createElement(MainArea_default, null, children));
}, List = (_a) => {
  var _b = _a, {
    children,
    filters,
    actions = /* @__PURE__ */ React.createElement(ListActions, null)
  } = _b, props = __objRest(_b, [
    "children",
    "filters",
    "actions"
  ]);
  return /* @__PURE__ */ React.createElement(import_react_admin13.ListBase, __spreadValues({
    sort: { field: "createdAt", order: "desc" },
    disableAuthentication: !0
  }, props), /* @__PURE__ */ React.createElement(React.Fragment, null, /* @__PURE__ */ React.createElement(Title_default, null), /* @__PURE__ */ React.createElement(ResourceCounter_default, null), /* @__PURE__ */ React.createElement(import_react_admin13.ListToolbar, {
    filters,
    actions
  }), children, /* @__PURE__ */ React.createElement(import_react_admin13.Pagination, null)));
}, ShowContaner = ({ children }) => (0, import_react_admin13.useRecordContext)() ? /* @__PURE__ */ React.createElement(MainArea_default, {
  title: /* @__PURE__ */ React.createElement(import_react_admin13.TextField, {
    source: "title",
    component: "h1",
    variant: "h3"
  })
}, children) : null, Show = (_a) => {
  var _b = _a, {
    children
  } = _b, props = __objRest(_b, [
    "children"
  ]);
  return /* @__PURE__ */ React.createElement(import_react_admin13.ShowBase, __spreadValues({
    disableAuthentication: !0
  }, props), /* @__PURE__ */ React.createElement(React.Fragment, null, /* @__PURE__ */ React.createElement(ShowActions, null), /* @__PURE__ */ React.createElement(ShowContaner, null, children)));
};

// app/resources/admin/characters/ListUI.tsx
var import_react_admin14 = require("react-admin"), ListUI2 = (props) => /* @__PURE__ */ React.createElement(import_react_admin14.Datagrid, __spreadValues({
  rowClick: "edit",
  optimized: !0
}, props)), ListUI_default2 = ListUI2;

// app/resources/admin/characters/views.tsx
var CharacterCreate = () => /* @__PURE__ */ React.createElement(Create, null, /* @__PURE__ */ React.createElement(import_react_admin15.SimpleForm, null, /* @__PURE__ */ React.createElement(LargeTextInput, {
  source: "name",
  required: !0
}))), CharacterEdit = () => /* @__PURE__ */ React.createElement(Edit, {
  actions: !1
}, /* @__PURE__ */ React.createElement(import_react_admin15.SimpleForm, null, /* @__PURE__ */ React.createElement(LargeTextInput, {
  source: "name",
  required: !0
}))), CharacterList = () => /* @__PURE__ */ React.createElement(List, {
  filters: [/* @__PURE__ */ React.createElement(import_react_admin15.TextInput, {
    source: "name",
    label: "fields.name",
    alwaysOn: !0
  })],
  sort: { field: "name", order: "asc" }
}, /* @__PURE__ */ React.createElement(ListUI_default2, null, /* @__PURE__ */ React.createElement(import_react_admin15.TextField, {
  source: "name",
  label: "fields.name"
})));

// app/resources/admin/characters/index.tsx
var characters_default = {
  icon: import_icons_material6.Workspaces,
  create: CharacterCreate,
  edit: CharacterEdit,
  list: CharacterList
};

// app/resources/main/authors/index.tsx
var import_icons_material8 = require("@mui/icons-material");

// app/resources/main/authors/views.tsx
var import_material17 = require("@mui/material"), import_react_admin18 = require("react-admin");

// app/resources/main/authors/DownloadPublicationListButton.tsx
var import_icons_material7 = require("@mui/icons-material"), import_material15 = require("@mui/material"), import_file_saver = require("file-saver"), import_lodash6 = require("lodash"), import_react_admin16 = require("react-admin");

// app/resources/main/authors/docx.ts
var import_docx = require("docx");

// app/data.provider.ts
var import_lodash5 = require("lodash");
function fetchResources(url, options) {
  return fetchApi(`resources/${url}`, options);
}
function processInputData(data) {
  return (0, import_lodash5.transform)(data, (result, value, key) => {
    switch (key) {
      case "publication":
        result[key] = processInputData(value);
        break;
      case "coauthors":
        result[key] = value.map((e) => ({ name: e }));
        break;
      default:
        result[key] = value;
    }
  });
}
function processOutputData(data) {
  return (0, import_lodash5.transform)(data, (result, value, key) => {
    switch (key) {
      case "publication":
        result[key] = processOutputData(value);
        break;
      case "coauthors":
        result[key] = value.map((e) => e.name);
        break;
      default:
        result[key] = value;
    }
  });
}
var dataProvider = {
  async create(resource, { data }) {
    let { json } = await fetchResources(resource, {
      method: "post",
      body: processOutputData(data)
    });
    return {
      data: __spreadProps(__spreadValues({}, data), {
        id: json.id
      })
    };
  },
  async update(resource, { id, data }) {
    return await fetchResources(`${resource}/${id}`, {
      method: "put",
      body: processOutputData(data)
    }), { data: { id } };
  },
  updateMany() {
    throw new Error("Function not implemented.");
  },
  async getList(resource, { filter, sort, pagination }) {
    let { page, perPage } = pagination, url = createUrlWithQueryParams(resource, {
      filter,
      sort,
      skip: (page - 1) * perPage,
      take: perPage
    }), { headers, json } = await fetchResources(url);
    return {
      data: json.map(processInputData),
      total: +headers.get("Content-Range").split("/").pop()
    };
  },
  async getOne(resource, { id }) {
    let { json } = await fetchResources(`${resource}/${id}`);
    return json.file && (json.file.url = `${apiUrl}/resources/files/${resource}/${json.file.objectId}`), { data: processInputData(json) };
  },
  async getMany(resource, { ids }) {
    let url = createUrlWithQueryParams(resource, { ids }), { json } = await fetchResources(url);
    return { data: json.map(processInputData) };
  },
  getManyReference() {
    throw new Error("Function not implemented.");
  },
  async delete(resource, { id }) {
    return await fetchResources(`${resource}/${id}`, {
      method: "delete",
      headers: new Headers({
        "Content-Type": "text/plain"
      })
    }), { data: { id } };
  },
  async deleteMany(resource, { ids }) {
    let url = createUrlWithQueryParams(resource, { ids }), { json } = await fetchResources(url, {
      method: "delete",
      headers: new Headers({
        "Content-Type": "text/plain"
      })
    });
    return { data: json };
  }
}, data_provider_default = dataProvider;

// app/resources/main/authors/docx.ts
var CATEGORY_TITLES = {
  ["A" /* A */]: "a) \u043D\u0430\u0443\u0447\u043D\u044B\u0435 \u0440\u0430\u0431\u043E\u0442\u044B",
  ["B" /* B */]: "\u0431) \u0430\u0432\u0442\u043E\u0440\u0441\u043A\u0438\u0435 \u0441\u0432\u0438\u0434\u0435\u0442\u0435\u043B\u044C\u0441\u0442\u0432\u0430, \u0434\u0438\u043F\u043B\u043E\u043C\u044B, \u043F\u0430\u0442\u0435\u043D\u0442\u044B, \u043B\u0438\u0446\u0435\u043D\u0437\u0438\u0438, \u0438\u043D\u0444\u043E\u0440\u043C\u0430\u0446\u0438\u043E\u043D\u043D\u044B\u0435 \u043A\u0430\u0440\u0442\u044B, \u0430\u043B\u0433\u043E\u0440\u0438\u0442\u043C\u044B, \u043F\u0440\u043E\u0435\u043A\u0442\u044B",
  ["C" /* C */]: "\u0432) \u0443\u0447\u0435\u0431\u043D\u043E-\u043C\u0435\u0442\u043E\u0434\u0438\u0447\u0435\u0441\u043A\u0438\u0435 \u0440\u0430\u0431\u043E\u0442\u044B"
}, COLUMN_NAMES = [
  "\u2116 \u043F/\u043F",
  "\u041D\u0430\u0438\u043C\u0435\u043D\u043E\u0432\u0430\u043D\u0438\u0435 \u0443\u0447\u0435\u0431\u043D\u044B\u0445 \u0438\u0437\u0434\u0430\u043D\u0438\u0439, \u043D\u0430\u0443\u0447\u043D\u044B\u0445 \u0442\u0440\u0443\u0434\u043E\u0432 \u0438 \u043F\u0430\u0442\u0435\u043D\u0442\u043E\u0432 \u043D\u0430 \u0438\u0437\u043E\u0431\u0440\u0435\u0442\u0435\u043D\u0438\u044F \u0438 \u0438\u043D\u044B\u0435 \u043E\u0431\u044A\u0435\u043A\u0442\u044B \u0438\u043D\u0442\u0435\u043B\u043B\u0435\u043A\u0442\u0443\u0430\u043B\u044C\u043D\u043E\u0439 \u0441\u043E\u0431\u0441\u0442\u0432\u0435\u043D\u043D\u043E\u0441\u0442\u0438",
  "\u0424\u043E\u0440\u043C\u0430 \u0443\u0447\u0435\u0431\u043D\u044B\u0445 \u0438\u0437\u0434\u0430\u043D\u0438\u0439 \u0438 \u043D\u0430\u0443\u0447\u043D\u044B\u0445 \u0442\u0440\u0443\u0434\u043E\u0432",
  "\u0412\u044B\u0445\u043E\u0434\u043D\u044B\u0435 \u0434\u0430\u043D\u043D\u044B\u0435",
  "\u041E\u0431\u044A\u0451\u043C",
  "\u0421\u043E\u0430\u0432\u0442\u043E\u0440\u044B"
], P = import_docx.Paragraph, { CENTER, RIGHT } = import_docx.AlignmentType, { HEADING_1, HEADING_2, HEADING_3 } = import_docx.HeadingLevel;
async function createDocx(author) {
  let index = 1, { data: publications } = await data_provider_default.getMany("publications", { ids: [author.id] }), { json: categories } = await fetchApi("resources/categories"), authorName = getAuthorFullName(author);
  function createPublicationRow(publication) {
    var _a, _b;
    return new import_docx.TableRow({
      tableHeader: !0,
      children: [
        new import_docx.TableCell({
          children: [new P({ text: (index++).toString(), alignment: CENTER })]
        }),
        new import_docx.TableCell({
          children: [
            new P(`${publication.title}${publication.type ? ` (${publication.type})` : ""}`)
          ]
        }),
        new import_docx.TableCell({
          children: [
            new P({ text: publication.characterId, alignment: CENTER })
          ]
        }),
        new import_docx.TableCell({
          children: [
            new P(publication.outputData || `${publication.publicationPlace}, ${publication == null ? void 0 : publication.year}`)
          ]
        }),
        new import_docx.TableCell({
          children: [
            new P({ text: (_a = publication.volume) == null ? void 0 : _a.toString(), alignment: CENTER })
          ]
        }),
        new import_docx.TableCell({
          children: (_b = publication.coauthors) == null ? void 0 : _b.map((e) => new P(e))
        })
      ]
    });
  }
  function createCategoryRows(category, isRecent = !1) {
    let recentPostfix = ", \u043E\u043F\u0443\u0431\u043B\u0438\u043A\u043E\u0432\u0430\u043D\u043D\u044B\u0435 \u0437\u0430 \u043F\u043E\u0441\u043B\u0435\u0434\u043D\u0438\u0435 \u0442\u0440\u0438 \u0433\u043E\u0434\u0430", categoryPublications = categories[category].flatMap((resource) => publications.filter((e) => e.resourceItemId === resource));
    return categoryPublications.length ? [
      new import_docx.TableRow({
        children: [
          new import_docx.TableCell({
            columnSpan: 6,
            children: [
              new P({
                text: `${CATEGORY_TITLES[category]}${isRecent ? recentPostfix : ""}`,
                alignment: CENTER
              })
            ]
          })
        ]
      }),
      ...categoryPublications.map(createPublicationRow)
    ] : [];
  }
  function createTable() {
    return new import_docx.Table({
      width: { size: 100, type: import_docx.WidthType.PERCENTAGE },
      rows: [
        new import_docx.TableRow({
          children: COLUMN_NAMES.map((name) => new import_docx.TableCell({
            verticalAlign: import_docx.VerticalAlign.CENTER,
            width: { size: 1, type: import_docx.WidthType.DXA },
            children: [new P({ text: name, alignment: CENTER })]
          }))
        }),
        new import_docx.TableRow({
          children: COLUMN_NAMES.map((_, i) => new import_docx.TableCell({
            children: [
              new P({ text: (i + 1).toString(), alignment: CENTER })
            ]
          }))
        }),
        ...Object.keys(categories).flatMap((e) => createCategoryRows(e))
      ]
    });
  }
  function createDocument() {
    let heading1 = "\u0424\u043E\u0440\u043C\u0430 \u211616", heading2 = "\u0421\u041F\u0418\u0421\u041E\u041A", heading3 = "\u043D\u0430\u0443\u0447\u043D\u044B\u0445 \u0438 \u0443\u0447\u0435\u0431\u043D\u043E-\u043C\u0435\u0442\u043E\u0434\u0438\u0447\u0435\u0441\u043A\u0438\u0445 \u0440\u0430\u0431\u043E\u0442", heading4 = authorName, footing1 = authorName, footing2 = `\xAB__\xBB ________ ${new Date().getFullYear()} \u0433`;
    return new import_docx.Document({
      sections: [
        {
          children: [
            new P({ text: heading1, heading: HEADING_3, alignment: RIGHT }),
            new P({ text: heading2, heading: HEADING_1, alignment: CENTER }),
            new P({ text: heading3, heading: HEADING_2, alignment: CENTER }),
            new P({ text: heading4, heading: HEADING_2, alignment: CENTER }),
            createTable(),
            ...author.info.split(", ").map((e) => new P({ text: e, heading: HEADING_2 })),
            new P({ text: footing1, heading: HEADING_2, alignment: RIGHT }),
            new P({ text: footing2, heading: HEADING_2 })
          ]
        }
      ]
    });
  }
  return import_docx.Packer.toBlob(createDocument());
}

// app/resources/main/authors/DownloadPublicationListButton.tsx
var DownloadPublicationListButton = (props) => {
  let translate = (0, import_react_admin16.useTranslate)(), author = (0, import_react_admin16.useRecordContext)();
  return /* @__PURE__ */ React.createElement(import_material15.Button, __spreadValues({
    variant: "contained",
    startIcon: /* @__PURE__ */ React.createElement(import_icons_material7.Download, null),
    onClick: async () => {
      let docx = await createDocx(author);
      (0, import_file_saver.saveAs)(docx, `${(0, import_lodash6.kebabCase)(translate("publicationList.name"))}-${(0, import_lodash6.kebabCase)(getAuthorName(author))}`);
    }
  }, props), `${translate("actions.download")} ${translate("publicationList.name")}`);
}, DownloadPublicationListButton_default = DownloadPublicationListButton;

// app/resources/main/authors/ListUI.tsx
var import_material16 = require("@mui/material"), import_react_admin17 = require("react-admin"), ListUI3 = (props) => (0, import_material16.useMediaQuery)((theme) => theme.breakpoints.down("md")) ? /* @__PURE__ */ React.createElement(import_react_admin17.SimpleList, {
  linkType: "show",
  primaryText: ({ firstName, middleName, lastName }) => `${lastName} ${firstName} ${middleName}`
}) : /* @__PURE__ */ React.createElement(import_react_admin17.Datagrid, __spreadValues({
  rowClick: "show",
  optimized: !0
}, props)), ListUI_default3 = ListUI3;

// app/resources/main/authors/views.tsx
var AuthorCreate = () => /* @__PURE__ */ React.createElement(Create, null, /* @__PURE__ */ React.createElement(import_react_admin18.SimpleForm, null, /* @__PURE__ */ React.createElement(LargeTextInput, {
  source: "lastName",
  required: !0
}), /* @__PURE__ */ React.createElement(LargeTextInput, {
  source: "firstName",
  required: !0
}), /* @__PURE__ */ React.createElement(LargeTextInput, {
  source: "middleName"
}), /* @__PURE__ */ React.createElement(LargeTextInput, {
  source: "info"
}))), AuthorEdit = () => /* @__PURE__ */ React.createElement(Edit, {
  actions: !1
}, /* @__PURE__ */ React.createElement(import_react_admin18.SimpleForm, null, /* @__PURE__ */ React.createElement(LargeTextInput, {
  source: "lastName",
  required: !0
}), /* @__PURE__ */ React.createElement(LargeTextInput, {
  source: "firstName",
  required: !0
}), /* @__PURE__ */ React.createElement(LargeTextInput, {
  source: "middleName"
}), /* @__PURE__ */ React.createElement(LargeTextInput, {
  source: "info"
}))), AuthorList = () => /* @__PURE__ */ React.createElement(List, {
  filters: [
    /* @__PURE__ */ React.createElement(import_react_admin18.TextInput, {
      source: "lastName",
      label: "fields.lastName",
      alwaysOn: !0
    }),
    /* @__PURE__ */ React.createElement(import_react_admin18.TextInput, {
      source: "firstName",
      label: "fields.firstName"
    }),
    /* @__PURE__ */ React.createElement(import_react_admin18.TextInput, {
      source: "middleName",
      label: "fields.middleName"
    })
  ],
  sort: { field: "lastName", order: "asc" }
}, /* @__PURE__ */ React.createElement(ListUI_default3, null, /* @__PURE__ */ React.createElement(import_react_admin18.TextField, {
  source: "lastName",
  label: "fields.lastName"
}), /* @__PURE__ */ React.createElement(import_react_admin18.TextField, {
  source: "firstName",
  label: "fields.firstName"
}), /* @__PURE__ */ React.createElement(import_react_admin18.TextField, {
  source: "middleName",
  label: "fields.middleName"
})));
function getAuthorName(author) {
  return `${author.firstName} ${author.lastName}`;
}
function getAuthorFullName(author) {
  let { firstName, middleName, lastName } = author, isEnglishName = /\w/.test(firstName), fullEnglishName = `${firstName} ${middleName} ${lastName}`, fullRussianName = `${lastName} ${firstName} ${middleName}`;
  return middleName ? isEnglishName ? fullEnglishName : fullRussianName : getAuthorName(author);
}
var NameField = () => {
  let author = (0, import_react_admin18.useRecordContext)();
  return /* @__PURE__ */ React.createElement(import_material17.Typography, {
    variant: "h4",
    align: "center"
  }, getAuthorFullName(author));
}, LabeledCard = ({
  children,
  label
}) => {
  let translate = (0, import_react_admin18.useTranslate)();
  return /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement(import_material17.Typography, {
    variant: "body2",
    color: "text.secondary",
    mb: 1
  }, translate(label || children.props.label)), /* @__PURE__ */ React.createElement(import_material17.Box, {
    sx: {
      "*": {
        fontSize: "1.1rem !important"
      }
    }
  }, children));
}, AuthorShow = () => /* @__PURE__ */ React.createElement(Show, null, /* @__PURE__ */ React.createElement(import_material17.Card, {
  sx: { px: 3, py: 5 }
}, /* @__PURE__ */ React.createElement(import_material17.Stack, {
  spacing: 5
}, /* @__PURE__ */ React.createElement(NameField, null), /* @__PURE__ */ React.createElement(import_material17.Divider, null), /* @__PURE__ */ React.createElement(LabeledCard, null, /* @__PURE__ */ React.createElement(import_react_admin18.TextField, {
  source: "info",
  label: "fields.info",
  emptyText: "-"
})), /* @__PURE__ */ React.createElement(import_material17.Box, {
  display: "flex",
  justifyContent: "center",
  pt: 5
}, /* @__PURE__ */ React.createElement(DownloadPublicationListButton_default, null)))));

// app/resources/main/authors/index.tsx
var authors_default = {
  icon: import_icons_material8.PeopleAlt,
  create: AuthorCreate,
  edit: AuthorEdit,
  list: AuthorList,
  show: AuthorShow
};

// app/resources/main/timeline/index.tsx
var import_Timeline = __toESM(require("@mui/icons-material/Timeline"));

// app/resources/main/timeline/Timeline.tsx
var import_icons_material9 = require("@mui/icons-material"), import_material18 = require("@mui/material"), import_react11 = require("react"), import_react_admin19 = require("react-admin"), import_react_router_dom2 = require("react-router-dom");
var ListItemCard = ({ record }) => {
  let translate = (0, import_react_admin19.useTranslate)(), [locale] = (0, import_react_admin19.useLocaleState)(), resource = record.resource, resources = (0, import_react_admin19.useResourceDefinitions)(), [showViewButton, setShowViewButton] = (0, import_react11.useState)(!1);
  return /* @__PURE__ */ React.createElement(import_material18.Card, {
    sx: { width: 1 }
  }, /* @__PURE__ */ React.createElement(import_material18.CardActionArea, {
    component: import_react_router_dom2.Link,
    to: `/${resource}/${record.id}/show`,
    onMouseOver: () => setShowViewButton(!0),
    onMouseLeave: () => setShowViewButton(!1)
  }, /* @__PURE__ */ React.createElement(import_material18.CardHeader, {
    avatar: /* @__PURE__ */ React.createElement(import_material18.Avatar, {
      variant: "rounded",
      sx: {
        bgcolor: "primary.main"
      }
    }, (0, import_react11.createElement)(resources[resource].icon)),
    title: translate(`resources.${resource}.name`, { smart_count: 1 }),
    subheader: new Date(record.createdAt).toLocaleString(locale, {
      day: "numeric",
      month: "long",
      year: "numeric"
    }),
    action: /* @__PURE__ */ React.createElement(import_material18.Fade, {
      in: showViewButton,
      timeout: 300
    }, /* @__PURE__ */ React.createElement(import_material18.Button, {
      startIcon: /* @__PURE__ */ React.createElement(import_icons_material9.Visibility, null),
      disabled: !0
    }, translate("ra.action.show")))
  }), /* @__PURE__ */ React.createElement(import_material18.CardContent, {
    sx: { pt: 0 }
  }, /* @__PURE__ */ React.createElement(import_material18.Typography, null, record.title))));
}, TimelineList = () => {
  let { data, page, perPage, total, setPage } = (0, import_react_admin19.useListContext)(), translate = (0, import_react_admin19.useTranslate)();
  return /* @__PURE__ */ React.createElement(React.Fragment, null, total ? /* @__PURE__ */ React.createElement(React.Fragment, null, /* @__PURE__ */ React.createElement(import_material18.List, {
    disablePadding: !0,
    sx: { pt: 2 }
  }, data.map((e) => /* @__PURE__ */ React.createElement(import_material18.ListItem, {
    key: e.id,
    disablePadding: !0,
    sx: {
      py: {
        sm: 1,
        md: 1.5
      }
    }
  }, /* @__PURE__ */ React.createElement(ListItemCard, {
    record: e
  })))), total > perPage && /* @__PURE__ */ React.createElement(import_material18.Pagination, {
    variant: "outlined",
    color: "primary",
    page,
    count: Math.ceil(total / perPage),
    sx: {
      mt: 4,
      ul: {
        justifyContent: "center"
      }
    },
    onChange: (_, value) => setPage(value)
  })) : /* @__PURE__ */ React.createElement(import_material18.Typography, null, translate("ra.navigation.no_results")));
}, Timeline = () => /* @__PURE__ */ React.createElement(import_react_admin19.ListBase, {
  perPage: 10,
  disableAuthentication: !0
}, /* @__PURE__ */ React.createElement(MainArea_default, null, /* @__PURE__ */ React.createElement(Title_default, null), /* @__PURE__ */ React.createElement(TimelineList, null))), Timeline_default = Timeline;

// app/resources/main/timeline/index.tsx
var timeline_default = {
  icon: import_Timeline.default,
  list: Timeline_default
};

// app/resources/publications/index.tsx
var import_icons_material10 = require("@mui/icons-material");

// app/resources/publications/views.tsx
var import_material19 = require("@mui/material"), import_react_admin22 = require("react-admin");

// app/resources/publications/fields.tsx
var import_react_admin20 = require("react-admin");
var AuthorsField = (props) => /* @__PURE__ */ React.createElement(import_react_admin20.ReferenceArrayField, __spreadValues({
  source: "publication.authorIds",
  label: "fields.authors",
  reference: "authors"
}, props), /* @__PURE__ */ React.createElement(import_react_admin20.SingleFieldList, {
  linkType: !1,
  sx: { justifyContent: "center" }
}, /* @__PURE__ */ React.createElement(import_react_admin20.FunctionField, {
  label: "fields.authors",
  render: getAuthorName,
  whiteSpace: "nowrap",
  width: 1
}))), CharacterField = () => /* @__PURE__ */ React.createElement(import_react_admin20.ReferenceField, {
  source: "publication.characterId",
  label: "fields.character",
  reference: "characters",
  link: "list",
  emptyText: "-"
}, /* @__PURE__ */ React.createElement(import_react_admin20.TextField, {
  source: "name"
}));

// app/resources/publications/inputs.tsx
var import_react_admin21 = require("react-admin"), TypeInput = () => {
  let resource = (0, import_react_admin21.useResourceContext)(), defaultValue = (0, import_react_admin21.useTranslate)()(`resources.${resource}.name`, {
    smart_count: 1
  });
  return /* @__PURE__ */ React.createElement(import_react_admin21.TextInput, {
    source: "publication.type",
    label: "fields.type",
    validate: (0, import_react_admin21.required)(),
    defaultValue
  });
}, YearInput = () => {
  let max = new Date().getFullYear(), min = max - 50;
  return /* @__PURE__ */ React.createElement(import_react_admin21.NumberInput, {
    source: "publication.year",
    label: "fields.year",
    min,
    max,
    defaultValue: max,
    validate: [(0, import_react_admin21.minValue)(min), (0, import_react_admin21.maxValue)(max)]
  });
}, AuthorsInput = () => /* @__PURE__ */ React.createElement(import_react_admin21.ReferenceArrayInput, {
  source: "publication.authorIds",
  reference: "authors"
}, /* @__PURE__ */ React.createElement(import_react_admin21.SelectArrayInput, {
  label: "fields.authors",
  optionText: (record) => `${record.lastName} ${record.firstName} ${record.middleName || ""}`
})), CoauthorsInput = () => /* @__PURE__ */ React.createElement(import_react_admin21.ArrayInput, {
  source: "publication.coauthors",
  label: "fields.coauthors"
}, /* @__PURE__ */ React.createElement(import_react_admin21.SimpleFormIterator, null, /* @__PURE__ */ React.createElement(import_react_admin21.TextInput, {
  source: "name",
  label: "fields.coauthor"
}))), CharacterInput = () => /* @__PURE__ */ React.createElement(import_react_admin21.ReferenceInput, {
  source: "publication.characterId",
  reference: "characters"
}, /* @__PURE__ */ React.createElement(import_react_admin21.SelectInput, {
  label: "fields.character",
  optionText: "name"
}));

// app/resources/publications/views.tsx
var CreateUpdateInputs = () => /* @__PURE__ */ React.createElement(React.Fragment, null, /* @__PURE__ */ React.createElement(LargeTextInput, {
  source: "title",
  required: !0
}), /* @__PURE__ */ React.createElement(LargeTextInput, {
  source: "description"
}), /* @__PURE__ */ React.createElement(TypeInput, null), /* @__PURE__ */ React.createElement(YearInput, null), /* @__PURE__ */ React.createElement(import_react_admin22.NumberInput, {
  source: "publication.volume",
  label: "fields.volume"
}), /* @__PURE__ */ React.createElement(AuthorsInput, null), /* @__PURE__ */ React.createElement(CoauthorsInput, null), /* @__PURE__ */ React.createElement(CharacterInput, null), /* @__PURE__ */ React.createElement(LargeTextInput, {
  source: "publication.outputData",
  label: "fields.outputData"
})), PublicationCreate = ({ children }) => /* @__PURE__ */ React.createElement(Create, null, /* @__PURE__ */ React.createElement(import_react_admin22.SimpleForm, {
  px: 1
}, /* @__PURE__ */ React.createElement(CreateUpdateInputs, null), children, /* @__PURE__ */ React.createElement(AddFileInput, null))), PublicationEdit = ({ children }) => /* @__PURE__ */ React.createElement(Edit, null, /* @__PURE__ */ React.createElement(import_react_admin22.SimpleForm, {
  px: 1
}, /* @__PURE__ */ React.createElement(CreateUpdateInputs, null), children, /* @__PURE__ */ React.createElement(ReplaceFileInput, null))), PublicationList = () => /* @__PURE__ */ React.createElement(List, {
  filters: [
    /* @__PURE__ */ React.createElement(import_react_admin22.TextInput, {
      source: "title",
      label: "fields.search",
      sx: { ml: 2 },
      alwaysOn: !0
    }),
    /* @__PURE__ */ React.createElement(import_react_admin22.TextInput, {
      source: "description",
      label: "fields.description"
    }),
    /* @__PURE__ */ React.createElement(import_react_admin22.NumberInput, {
      source: "publication.year",
      label: "fields.year"
    }),
    /* @__PURE__ */ React.createElement(import_react_admin22.TextInput, {
      source: "publication.authors.author",
      label: "fields.author"
    }),
    /* @__PURE__ */ React.createElement(import_react_admin22.TextInput, {
      source: "publication.outputData",
      label: "fields.outputData"
    })
  ]
}, /* @__PURE__ */ React.createElement(ListUI_default, null, /* @__PURE__ */ React.createElement(import_react_admin22.TextField, {
  source: "title",
  label: "fields.title"
}), /* @__PURE__ */ React.createElement(AuthorsField, {
  label: "fields.authors"
}), /* @__PURE__ */ React.createElement(import_react_admin22.TextField, {
  source: "publication.year",
  label: "fields.year",
  emptyText: "-"
}))), LabeledCard2 = ({
  children,
  label
}) => {
  let translate = (0, import_react_admin22.useTranslate)();
  return /* @__PURE__ */ React.createElement(React.Fragment, null, /* @__PURE__ */ React.createElement(import_material19.Typography, {
    variant: "body2",
    color: "text.secondary",
    mb: 1
  }, translate(label || children.props.label)), /* @__PURE__ */ React.createElement(import_material19.Box, {
    sx: {
      "*": {
        fontSize: "1.1rem !important",
        fontWeight: "500 !important"
      }
    }
  }, children));
}, PublicationShow = ({ children }) => /* @__PURE__ */ React.createElement(Show, null, /* @__PURE__ */ React.createElement(import_react_admin22.TextField, {
  source: "description",
  variant: "body1"
}), /* @__PURE__ */ React.createElement(import_material19.Grid, {
  container: !0,
  spacing: 6,
  mt: 3
}, /* @__PURE__ */ React.createElement(import_material19.Grid, {
  item: !0,
  xs: 12,
  sm: 6
}, /* @__PURE__ */ React.createElement(LabeledCard2, null, /* @__PURE__ */ React.createElement(import_react_admin22.TextField, {
  source: "publication.type",
  label: "fields.type",
  emptyText: "-"
}))), /* @__PURE__ */ React.createElement(import_material19.Grid, {
  item: !0,
  xs: 12,
  sm: 6
}, /* @__PURE__ */ React.createElement(LabeledCard2, null, /* @__PURE__ */ React.createElement(import_react_admin22.TextField, {
  source: "publication.year",
  label: "fields.year",
  emptyText: "-"
}))), /* @__PURE__ */ React.createElement(import_material19.Grid, {
  item: !0,
  xs: 12,
  sm: 6
}, /* @__PURE__ */ React.createElement(LabeledCard2, {
  label: "fields.character"
}, /* @__PURE__ */ React.createElement(CharacterField, null))), /* @__PURE__ */ React.createElement(import_material19.Grid, {
  item: !0,
  xs: 12,
  sm: 6
}, /* @__PURE__ */ React.createElement(LabeledCard2, null, /* @__PURE__ */ React.createElement(import_react_admin22.TextField, {
  source: "publication.volume",
  label: "fields.volume",
  emptyText: "-"
}))), /* @__PURE__ */ React.createElement(import_material19.Grid, {
  item: !0,
  xs: 12,
  sm: 6
}, /* @__PURE__ */ React.createElement(LabeledCard2, {
  label: "fields.authors"
}, /* @__PURE__ */ React.createElement(AuthorsField, null))), /* @__PURE__ */ React.createElement(import_material19.Grid, {
  item: !0,
  xs: 12,
  sm: 6
}, /* @__PURE__ */ React.createElement(LabeledCard2, null, /* @__PURE__ */ React.createElement(ChipArrayField, {
  source: "publication.coauthors",
  fieldSource: "name",
  label: "fields.coauthors"
})))), /* @__PURE__ */ React.createElement(import_react_admin22.FunctionField, {
  render: (record) => record.publication.outputData && /* @__PURE__ */ React.createElement(import_material19.Grid, {
    item: !0,
    xs: 12
  }, /* @__PURE__ */ React.createElement(LabeledCard2, null, /* @__PURE__ */ React.createElement(import_react_admin22.TextField, {
    source: "publication.outputData",
    label: "fields.outputData"
  })))
}), children, /* @__PURE__ */ React.createElement(import_material19.Toolbar, {
  disableGutters: !0
}, /* @__PURE__ */ React.createElement(DownloadFileField, null)));

// app/resources/publications/index.tsx
var publicationViews = {
  create: PublicationCreate,
  edit: PublicationEdit,
  list: PublicationList,
  show: PublicationShow
}, articles = __spreadValues({
  icon: import_icons_material10.Newspaper
}, publicationViews), abstracts = __spreadValues({
  icon: import_icons_material10.Description
}, publicationViews), dissertations = __spreadValues({
  icon: import_icons_material10.Grading
}, publicationViews), monographs = __spreadValues({
  icon: import_icons_material10.FindInPage
}, publicationViews), patents = __spreadValues({
  icon: import_icons_material10.Verified
}, publicationViews), reports = __spreadValues({
  icon: import_icons_material10.Equalizer
}, publicationViews), programs = __spreadValues({
  icon: import_icons_material10.Code
}, publicationViews), textbooks = __spreadValues({
  icon: import_icons_material10.MenuBook
}, publicationViews);

// app/resources/index.ts
var resources_default = {
  main: {
    timeline: timeline_default,
    authors: authors_default
  },
  publications: {
    articles,
    abstracts,
    dissertations,
    monographs,
    patents,
    reports,
    programs,
    textbooks
  },
  admin: {
    characters: characters_default
  }
};

// app/layout/menu/Menu.tsx
var Menu3 = () => {
  let { permissions } = (0, import_react_admin23.usePermissions)(), getMenuItems = (resources) => Object.keys(resources).map((e) => /* @__PURE__ */ React.createElement(ResourceMenuItem_default, {
    key: e,
    name: (0, import_lodash7.kebabCase)(e)
  }));
  return /* @__PURE__ */ React.createElement(import_material20.List, {
    disablePadding: !0,
    sx: { pt: 1, pl: 1 }
  }, /* @__PURE__ */ React.createElement(MenuItem_default, {
    to: "/about",
    icon: /* @__PURE__ */ React.createElement(import_icons_material11.Info, null),
    text: "pages.about.name"
  }), getMenuItems(resources_default.main), /* @__PURE__ */ React.createElement(SubMenu_default, {
    name: "menu.groups.publications"
  }, getMenuItems(resources_default.publications)), (permissions == null ? void 0 : permissions.isAdmin) && /* @__PURE__ */ React.createElement(SubMenu_default, {
    name: "menu.groups.admin"
  }, getMenuItems(resources_default.admin)));
}, Menu_default = Menu3;

// app/layout/menu/MenuItem.tsx
var import_material21 = require("@mui/material"), import_react_admin24 = require("react-admin"), import_react_router_dom3 = require("react-router-dom"), MenuItem2 = (_a) => {
  var _b = _a, {
    children,
    to,
    icon,
    text,
    sx
  } = _b, props = __objRest(_b, [
    "children",
    "to",
    "icon",
    "text",
    "sx"
  ]);
  let translate = (0, import_react_admin24.useTranslate)(), [isSidebarOpen, setSidebarOpen] = (0, import_react_admin24.useSidebarState)(), isActive = (0, import_react_router_dom3.useMatch)(`${to}/*`), isSmall = (0, import_material21.useMediaQuery)((theme) => theme.breakpoints.down("sm"));
  return text = translate(text, { smart_count: 2 }), /* @__PURE__ */ React.createElement("li", null, /* @__PURE__ */ React.createElement(import_material21.ListItem, {
    component: import_react_router_dom3.Link,
    to,
    disablePadding: !0
  }, /* @__PURE__ */ React.createElement(import_material21.Tooltip, {
    title: isSidebarOpen ? "" : text,
    placement: "right"
  }, /* @__PURE__ */ React.createElement(import_material21.ListItemButton, __spreadValues({
    sx: [
      __spreadValues({
        height: 44,
        color: "text.secondary",
        ":hover": {
          color: "text.primary",
          bgcolor: "transparent"
        }
      }, isActive && {
        "&, :hover": {
          color: "primary.main",
          textDecoration: "none"
        }
      }),
      ...Array.isArray(sx) ? sx : [sx]
    ],
    onClick: () => isSmall && setSidebarOpen(!1)
  }, props), /* @__PURE__ */ React.createElement(import_material21.ListItemIcon, {
    sx: {
      color: "inherit",
      minWidth: 44
    }
  }, icon), /* @__PURE__ */ React.createElement(import_material21.ListItemText, {
    primary: text,
    sx: {
      flexShrink: 0,
      mr: 2
    },
    primaryTypographyProps: {
      variant: "body2"
    }
  }), children))));
}, MenuItem_default = MenuItem2;

// app/layout/menu/ResourceMenuItem.tsx
var import_react_admin25 = require("react-admin");
var ResourceMenuItem = (_a) => {
  var _b = _a, { name } = _b, props = __objRest(_b, ["name"]);
  let resource = (0, import_react_admin25.useResourceDefinitions)()[name];
  if (!resource)
    return null;
  let { icon: Icon } = resource;
  return /* @__PURE__ */ React.createElement(MenuItem_default, __spreadValues({
    to: `/${name}`,
    icon: /* @__PURE__ */ React.createElement(Icon, null),
    text: `resources.${name}.name`
  }, props));
}, ResourceMenuItem_default = ResourceMenuItem;

// app/layout/menu/SubMenu.tsx
var import_material22 = require("@mui/material"), import_web7 = require("@react-spring/web"), import_react12 = require("react"), import_react_admin26 = require("react-admin");
var SubMenu = ({ name, children }) => {
  let [isOpen, setIsOpen] = (0, import_react12.useState)(!0), [isSidebarOpen] = (0, import_react_admin26.useSidebarState)();
  return /* @__PURE__ */ React.createElement(React.Fragment, null, /* @__PURE__ */ React.createElement(SubMenuItem_default, {
    text: name,
    open: isOpen,
    onClick: () => setIsOpen((e) => !e)
  }), /* @__PURE__ */ React.createElement(import_web7.animated.div, {
    style: (0, import_web7.useSpring)({
      paddingLeft: isSidebarOpen ? 44 : 0,
      config: gentleConfig
    })
  }, /* @__PURE__ */ React.createElement(Collapse_default, {
    in: isOpen
  }, /* @__PURE__ */ React.createElement(import_material22.List, {
    disablePadding: !0
  }, children))));
}, SubMenu_default = SubMenu;

// app/layout/menu/SubMenuItem.tsx
var import_icons_material12 = require("@mui/icons-material"), import_material23 = require("@mui/material"), import_web8 = require("@react-spring/web"), import_react_admin27 = require("react-admin");
var AnimatedAccordionIcon = (0, import_web8.animated)(import_icons_material12.ExpandMore), SubMenuItem = (_a) => {
  var _b = _a, { children, text, open } = _b, props = __objRest(_b, ["children", "text", "open"]);
  let translate = (0, import_react_admin27.useTranslate)(), [isSidebarOpen] = (0, import_react_admin27.useSidebarState)();
  return text = translate(text, { smart_count: 2 }).toUpperCase(), /* @__PURE__ */ React.createElement(import_material23.ListItem, {
    disablePadding: !0,
    sx: { pt: 1 }
  }, /* @__PURE__ */ React.createElement(import_material23.Tooltip, {
    placement: "right",
    title: isSidebarOpen ? "" : text
  }, /* @__PURE__ */ React.createElement(import_material23.ListItemButton, __spreadValues({
    sx: [
      {
        height: 42,
        color: "text.disabled",
        borderRadius: 1,
        ":hover": {
          color: "text.primary",
          bgcolor: "transparent"
        }
      }
    ]
  }, props), /* @__PURE__ */ React.createElement(import_material23.ListItemIcon, {
    sx: { color: "inherit", minWidth: 44 }
  }, /* @__PURE__ */ React.createElement(AnimatedAccordionIcon, {
    style: (0, import_web8.useSpring)({
      rotate: open ? 0 : -90,
      config: gentleConfig
    })
  })), /* @__PURE__ */ React.createElement(import_material23.ListItemText, {
    primary: text,
    primaryTypographyProps: {
      variant: "overline"
    }
  }), children)));
}, SubMenuItem_default = SubMenuItem;

// app/layout/sidebar/Sidebar.tsx
var import_material24 = require("@mui/material"), import_web9 = require("@react-spring/web"), import_react_admin28 = require("react-admin");
var SIDEBAR_WIDTH = 290, SIDEBAR_CLOSED_WIDTH = 68, Sidebar = ({ children }) => {
  let isSmall = (0, import_material24.useMediaQuery)((theme) => theme.breakpoints.down("sm")), [isSidebarOpen, setSidebarOpen] = (0, import_react_admin28.useSidebarState)(), content = /* @__PURE__ */ React.createElement(import_material24.Box, {
    height: "100vh",
    borderRight: 1,
    borderColor: "border",
    sx: {
      overflowX: "hidden",
      overflowY: "auto",
      "::-webkit-scrollbar": {
        display: "none"
      }
    }
  }, children, /* @__PURE__ */ React.createElement(SidebarFooter_default, null));
  return isSmall ? /* @__PURE__ */ React.createElement(Drawer_default, {
    open: isSidebarOpen,
    onClose: () => setSidebarOpen(!1),
    sx: { bgcolor: "background.sidebar" }
  }, content) : /* @__PURE__ */ React.createElement(import_web9.Spring, {
    to: { width: isSidebarOpen ? SIDEBAR_WIDTH : SIDEBAR_CLOSED_WIDTH },
    config: gentleConfig
  }, (style) => /* @__PURE__ */ React.createElement(AnimatedBox, {
    component: "nav",
    position: "sticky",
    top: 0,
    height: "100vh",
    flexShrink: 0,
    style
  }, /* @__PURE__ */ React.createElement(Slide_default, {
    from: "left",
    config: import_web9.config.slow
  }, /* @__PURE__ */ React.createElement(AnimatedBox, null, content))));
}, Sidebar_default = Sidebar;

// app/layout/sidebar/SidebarFooter.tsx
var import_material25 = require("@mui/material"), SidebarFooter = () => /* @__PURE__ */ React.createElement(import_material25.Toolbar, null), SidebarFooter_default = SidebarFooter;

// app/i18n/i18n.provider.ts
var import_ra_i18n_polyglot = __toESM(require("ra-i18n-polyglot"));

// app/i18n/messages/english.messages.ts
var import_ra_language_english = __toESM(require("ra-language-english")), englishMessages = __spreadProps(__spreadValues({}, import_ra_language_english.default), {
  ra: __spreadProps(__spreadValues({}, import_ra_language_english.default.ra), {
    action: __spreadProps(__spreadValues({}, import_ra_language_english.default.ra.action), {
      show: "View"
    })
  }),
  metadata: {
    title: "Publication Storage System",
    description: "		This is a demo project showing what a storage system for scientific publications may look like.		Timeline. Here you can see all the recently added publications in their chronological order. 		Authors. Here you can find the information about the authors and also download a list of all the publications for a specific author in the .docx format. 			"
  },
  actions: {
    download: "Download"
  },
  menu: {
    groups: {
      publications: "Publications",
      admin: "Administration"
    }
  },
  fields: {
    title: "Title",
    description: "Description",
    type: "Type",
    year: "Written in (year)",
    volume: "Volume (pages)",
    authors: "Authors",
    coauthors: "Coauthors",
    coauthor: "Coauthor",
    character: "Character",
    outputData: "Output data",
    file: "File",
    search: "Search",
    name: "Name",
    firstName: "First Name",
    lastName: "Last name",
    middleName: "Middle name",
    info: "Info"
  },
  resources: {
    timeline: {
      name: "Timeline"
    },
    articles: {
      name: "Article |||| Articles"
    },
    abstracts: {
      name: "Abstract |||| Abstracts"
    },
    monographs: {
      name: "Monograph |||| Monographs"
    },
    dissertations: {
      name: "Dissertation |||| Dissertations"
    },
    patents: {
      name: "Patent |||| Patents"
    },
    reports: {
      name: "Report |||| Reports"
    },
    programs: {
      name: "Program |||| Programs"
    },
    textbooks: {
      name: "Textbook |||| Textbooks"
    },
    authors: {
      name: "Author |||| Authors"
    },
    characters: {
      name: "Character |||| Characters"
    }
  },
  pages: {
    about: {
      name: "About"
    }
  },
  publicationList: {
    name: "Publication list"
  }
}), english_messages_default = englishMessages;

// app/i18n/messages/russian.messages.ts
var import_ra_language_russian = __toESM(require("ra-language-russian")), russianMessages = __spreadProps(__spreadValues({}, import_ra_language_russian.default), {
  metadata: {
    title: "\u0421\u0438\u0441\u0442\u0435\u043Ca \u0445\u0440\u0430\u043D\u0435\u043D\u0438\u044F \u043F\u0443\u0431\u043B\u0438\u043A\u0430\u0446\u0438\u0439",
    description: "		\u0414\u0430\u043D\u043D\u044B\u0439 \u043F\u0440\u043E\u0435\u043A\u0442 \u044F\u0432\u043B\u044F\u0435\u0442\u0441\u044F \u0434\u0435\u043C\u043E\u043D\u0441\u0442\u0440\u0430\u0446\u0438\u0435\u0439 \u0442\u043E\u0433\u043E, \u043A\u0430\u043A \u043C\u043E\u0436\u0435\u0442 \u0432\u044B\u0433\u043B\u044F\u0434\u0435\u0441\u0442\u044C \u0441\u0438\u0441\u0442\u0435\u043C\u0430 \u0434\u043B\u044F \u0445\u0440\u0430\u043D\u0435\u043D\u0438\u044F \u043D\u0430\u0443\u0447\u043D\u044B\u0445 \u043F\u0443\u0431\u043B\u0438\u043A\u0430\u0446\u0438\u0439.		\u0421\u043E\u0431\u044B\u0442\u0438\u044F. \u0412 \u044D\u0442\u043E\u043C \u0440\u0430\u0437\u0434\u0435\u043B\u0435 \u043C\u043E\u0436\u043D\u043E \u0443\u0432\u0438\u0434\u0435\u0442\u044C \u0432\u0441\u0435 \u043D\u0435\u0434\u0430\u0432\u043D\u043E \u0434\u043E\u0431\u0430\u0432\u043B\u0435\u043D\u043D\u044B\u0435 \u043F\u0443\u0431\u043B\u0438\u043A\u0430\u0446\u0438\u0438 \u0432 \u0438\u0445 \u0445\u0440\u043E\u043D\u043E\u043B\u043E\u0433\u0438\u0447\u0435\u0441\u043A\u043E\u043C \u043F\u043E\u0440\u044F\u0434\u043A\u0435. 		\u0410\u0432\u0442\u043E\u0440\u044B. \u0417\u0434\u0435\u0441\u044C \u043C\u043E\u0436\u043D\u043E \u043D\u0430\u0439\u0442\u0438 \u0438\u043D\u0444\u043E\u0440\u043C\u0430\u0446\u0438\u044E \u043E\u0431 \u0430\u0432\u0442\u043E\u0440\u0430\u0445, \u0430 \u0442\u0430\u043A\u0436\u0435 \u0441\u043A\u0430\u0447\u0430\u0442\u044C \u0441\u043F\u0438\u0441\u043E\u043A \u0432\u0441\u0435\u0445 \u043F\u0443\u0431\u043B\u0438\u043A\u0430\u0446\u0438\u0439 \u043A\u043E\u043D\u043A\u0440\u0435\u0442\u043D\u043E\u0433\u043E \u0430\u0432\u0442\u043E\u0440\u0430 \u0432 .docx \u0444\u043E\u0440\u043C\u0430\u0442\u0435. 			"
  },
  actions: {
    download: "\u0421\u043A\u0430\u0447\u0430\u0442\u044C"
  },
  menu: {
    groups: {
      publications: "\u041F\u0443\u0431\u043B\u0438\u043A\u0430\u0446\u0438\u0438",
      admin: "\u0410\u0434\u043C\u0438\u043D\u0438\u0441\u0442\u0440\u0438\u0440\u043E\u0432\u0430\u043D\u0438\u0435"
    }
  },
  fields: {
    title: "\u041D\u0430\u0437\u0432\u0430\u043D\u0438\u0435",
    description: "\u041E\u043F\u0438\u0441\u0430\u043D\u0438\u0435",
    type: "\u0422\u0438\u043F \u0440\u0430\u0431\u043E\u0442\u044B",
    year: "\u0413\u043E\u0434 \u0441\u043E\u0437\u0434\u0430\u043D\u0438\u044F",
    volume: "\u041E\u0431\u044A\u0435\u043C (\u0441\u0442\u0440\u0430\u043D\u0438\u0446\u044B)",
    authors: "\u0410\u0432\u0442\u043E\u0440\u044B",
    coauthors: "\u0421\u043E\u0430\u0432\u0442\u043E\u0440\u044B",
    coauthor: "\u0421\u043E\u0430\u0432\u0442\u043E\u0440",
    character: "\u0425\u0430\u0440\u0430\u043A\u0442\u0435\u0440 \u0440\u0430\u0431\u043E\u0442\u044B",
    outputData: "\u0412\u044B\u0445\u043E\u0434\u043D\u044B\u0435 \u0434\u0430\u043D\u043D\u044B\u0435",
    file: "\u0424\u0430\u0439\u043B",
    search: "\u041F\u043E\u0438\u0441\u043A",
    name: "\u041D\u0430\u0437\u0432\u0430\u043D\u0438\u0435",
    firstName: "\u0418\u043C\u044F",
    lastName: "\u0424\u0430\u043C\u0438\u043B\u0438\u044F",
    middleName: "\u041E\u0442\u0447\u0435\u0441\u0442\u0432\u043E",
    info: "\u0414\u043E\u043F\u043E\u043B\u043D\u0438\u0442\u0435\u043B\u044C\u043D\u0430\u044F \u0438\u043D\u0444\u043E\u0440\u043C\u0430\u0446\u0438\u044F"
  },
  resources: {
    timeline: {
      name: "\u0421\u043E\u0431\u044B\u0442\u0438\u044F"
    },
    articles: {
      name: "\u0421\u0442\u0430\u0442\u044C\u044F |||| \u0421\u0442\u0430\u0442\u044C\u0438"
    },
    abstracts: {
      name: "\u0410\u0432\u0442\u043E\u0440\u0435\u0444\u0435\u0440\u0430\u0442 |||| \u0410\u0432\u0442\u043E\u0440\u0435\u0444\u0435\u0440\u0430\u0442\u044B"
    },
    monographs: {
      name: "\u041C\u043E\u043D\u043E\u0433\u0440\u0430\u0444\u0438\u044F |||| \u041C\u043E\u043D\u043E\u0433\u0440\u0430\u0444\u0438\u0438"
    },
    dissertations: {
      name: "\u0414\u0438\u0441\u0441\u0435\u0440\u0442\u0430\u0446\u0438\u044F |||| \u0414\u0438\u0441\u0441\u0435\u0440\u0442\u0430\u0446\u0438\u0438"
    },
    patents: {
      name: "\u041F\u0430\u0442\u0435\u043D\u0442 |||| \u041F\u0430\u0442\u0435\u043D\u0442\u044B"
    },
    reports: {
      name: "\u041E\u0442\u0447\u0435\u0442 |||| \u041E\u0442\u0447\u0435\u0442\u044B"
    },
    programs: {
      name: "\u041F\u0440\u043E\u0433\u0440\u0430\u043C\u043C\u0430 |||| \u041F\u0440\u043E\u0433\u0440\u0430\u043C\u043C\u044B"
    },
    textbooks: {
      name: "\u0423\u0447\u0435\u0431\u043D\u0438\u043A |||| \u0423\u0447\u0435\u0431\u043D\u0438\u043A\u0438"
    },
    authors: {
      name: "\u0410\u0432\u0442\u043E\u0440 |||| \u0410\u0432\u0442\u043E\u0440\u044B"
    },
    characters: {
      name: "\u0425\u0430\u0440\u0430\u043A\u0442\u0435\u0440 \u0440\u0430\u0431\u043E\u0442\u044B |||| \u0425\u0430\u0440\u0430\u043A\u0442\u0435\u0440\u044B \u0440\u0430\u0431\u043E\u0442\u044B"
    }
  },
  pages: {
    about: {
      name: "\u041E \u0441\u0438\u0441\u0442\u0435\u043C\u0435"
    }
  },
  publicationList: {
    name: "\u0421\u043F\u0438\u0441\u043E\u043A \u043F\u0443\u0431\u043B\u0438\u043A\u0430\u0446\u0438\u0439"
  }
}), russian_messages_default = russianMessages;

// app/i18n/messages/index.ts
var messages = {
  en: english_messages_default,
  ru: russian_messages_default
}, messages_default = messages;

// app/i18n/i18n.provider.ts
var i18nProvider = (0, import_ra_i18n_polyglot.default)((locale) => messages_default[locale in messages_default ? locale : "en"]), i18n_provider_default = i18nProvider;

// app/components/App.tsx
var import_lodash8 = require("lodash");

// app/pages/About.tsx
var import_material26 = require("@mui/material"), import_react_admin29 = require("react-admin");
var About = () => {
  let translate = (0, import_react_admin29.useTranslate)();
  return /* @__PURE__ */ React.createElement(React.Fragment, null, /* @__PURE__ */ React.createElement(MainArea_default, {
    title: translate("metadata.title")
  }, /* @__PURE__ */ React.createElement(import_material26.Typography, {
    variant: "body1"
  }, translate("metadata.description"))));
}, About_default = About;

// app/pages/Dashboard.tsx
var Dashboard = () => null, Dashboard_default = Dashboard;

// app/components/App.tsx
var import_react_admin30 = require("react-admin"), import_react_query2 = require("react-query"), import_react_router = require("react-router");
function getResources(resources, isAdmin = !1) {
  return (0, import_lodash8.entries)(resources).map(([name, props]) => {
    let _a = props, { create, edit } = _a, otherProps = __objRest(_a, ["create", "edit"]);
    return /* @__PURE__ */ React.createElement(import_react_admin30.Resource, __spreadValues(__spreadValues({
      name
    }, isAdmin && {
      create,
      edit
    }), otherProps));
  });
}
var queryClient = new import_react_query2.QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 60 * 1e3
    }
  }
}), store = (0, import_react_admin30.localStorageStore)(), App2 = () => /* @__PURE__ */ React.createElement(import_react_admin30.Admin, {
  store,
  theme: themes_default.dark,
  layout: Layout_default,
  queryClient,
  authProvider: auth_provider_default,
  dataProvider: data_provider_default,
  i18nProvider: i18n_provider_default
}, ({ isAdmin }) => [
  /* @__PURE__ */ React.createElement(import_react_admin30.CustomRoutes, null, /* @__PURE__ */ React.createElement(import_react_router.Route, {
    path: "/dashboard",
    element: /* @__PURE__ */ React.createElement(Dashboard_default, null)
  }), /* @__PURE__ */ React.createElement(import_react_router.Route, {
    path: "/about",
    element: /* @__PURE__ */ React.createElement(About_default, null)
  })),
  ...getResources(resources_default.main),
  ...getResources(resources_default.publications, isAdmin),
  ...isAdmin ? getResources(resources_default.admin, !0) : []
]), App_default = App2;

// route:/Users/dima/GitHub/PSS/remix/app/routes/index.tsx
var routes_default = App_default;

// route:/Users/dima/GitHub/PSS/remix/app/routes/$.tsx
var __exports = {};
__export(__exports, {
  default: () => __default
});
var __default = App_default;

// server-assets-manifest:@remix-run/dev/assets-manifest
var assets_manifest_default = { version: "926901a1", entry: { module: "/build/entry.client-BH3KANQX.js", imports: ["/build/_shared/chunk-FRBYDVPK.js", "/build/_shared/chunk-OAHIFN6Q.js", "/build/_shared/chunk-OYL3CQEX.js"] }, routes: { root: { id: "root", parentId: void 0, path: "", index: void 0, caseSensitive: void 0, module: "/build/root-YLH4KWBV.js", imports: void 0, hasAction: !1, hasLoader: !1, hasCatchBoundary: !1, hasErrorBoundary: !1 }, "routes/$": { id: "routes/$", parentId: "root", path: "*", index: void 0, caseSensitive: void 0, module: "/build/routes/$-SCQHX6WI.js", imports: ["/build/_shared/chunk-65Y677JP.js"], hasAction: !1, hasLoader: !1, hasCatchBoundary: !1, hasErrorBoundary: !1 }, "routes/index": { id: "routes/index", parentId: "root", path: void 0, index: !0, caseSensitive: void 0, module: "/build/routes/index-FLHHEKY7.js", imports: ["/build/_shared/chunk-65Y677JP.js"], hasAction: !1, hasLoader: !1, hasCatchBoundary: !1, hasErrorBoundary: !1 } }, url: "/build/manifest-926901A1.js" };

// server-entry-module:@remix-run/dev/server-build
var entry = { module: entry_server_exports }, routes = {
  root: {
    id: "root",
    parentId: void 0,
    path: "",
    index: void 0,
    caseSensitive: void 0,
    module: root_exports
  },
  "routes/index": {
    id: "routes/index",
    parentId: "root",
    path: void 0,
    index: !0,
    caseSensitive: void 0,
    module: routes_exports
  },
  "routes/$": {
    id: "routes/$",
    parentId: "root",
    path: "*",
    index: void 0,
    caseSensitive: void 0,
    module: __exports
  }
};
module.exports = __toCommonJS(stdin_exports);
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  assets,
  entry,
  routes
});
//# sourceMappingURL=index.js.map
