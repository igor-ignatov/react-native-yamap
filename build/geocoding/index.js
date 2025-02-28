"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Geocoder = void 0;
var Query_1 = __importDefault(require("./Query"));
var GeocodingApiError_1 = require("./GeocodingApiError");
var Geocoder = /** @class */ (function () {
    function Geocoder() {
    }
    Geocoder.init = function (apiKey) {
        Geocoder.API_KEY = apiKey;
    };
    Geocoder.requestWithQuery = function (query) {
        return __awaiter(this, void 0, void 0, function () {
            var res;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, fetch('https://geocode-maps.yandex.ru/1.x?' + query.toQueryString(), {
                            method: 'get',
                            headers: {
                                'content-type': 'application/json',
                                accept: 'application/json',
                            },
                        })];
                    case 1:
                        res = _a.sent();
                        if (res.status !== 200) {
                            throw new GeocodingApiError_1.GeocodingApiError(res);
                        }
                        return [2 /*return*/, res.json()];
                }
            });
        });
    };
    Geocoder.getFirst = function (response) {
        // @ts-ignore
        return Object.values(response.GeoObjectCollection.featureMember[0])[0];
    };
    Geocoder.geocode = function (geocode, kind, results, skip, lang) {
        return __awaiter(this, void 0, void 0, function () {
            var query;
            return __generator(this, function (_a) {
                query = new Query_1.default({
                    apikey: Geocoder.API_KEY,
                    geocode: "".concat(geocode.lat, ",").concat(geocode.lon),
                    sco: 'latlong',
                    kind: kind,
                    format: 'json',
                    results: results,
                    skip: skip,
                    lang: lang,
                });
                return [2 /*return*/, Geocoder.requestWithQuery(query)];
            });
        });
    };
    Geocoder.reverseGeocode = function (geocode, kind, results, skip, lang, rspn, ll, spn, bbox) {
        var query = new Query_1.default({
            apikey: Geocoder.API_KEY,
            geocode: geocode,
            format: 'json',
            results: results,
            skip: skip,
            lang: lang,
            rspn: rspn,
            ll: ll ? "".concat(ll.lat, ",").concat(ll.lon) : undefined,
            spn: spn ? "".concat(spn[0], ",").concat(spn[1]) : undefined,
            bbox: bbox
                ? "".concat(bbox[0].lat, ",").concat(bbox[0].lon, "-").concat(bbox[1].lat, ",").concat(bbox[1].lon)
                : undefined,
        });
        return Geocoder.requestWithQuery(query);
    };
    Geocoder.addressToGeo = function (address) {
        return __awaiter(this, void 0, void 0, function () {
            var response, obj, _a, lon, lat;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0: return [4 /*yield*/, Geocoder.reverseGeocode(address)];
                    case 1:
                        response = (_b.sent()).response;
                        if (response.GeoObjectCollection
                            && response.GeoObjectCollection.featureMember
                            && response.GeoObjectCollection.featureMember.length > 0) {
                            obj = Geocoder.getFirst(response);
                            if (obj.Point) {
                                _a = obj.Point.pos.split(' ').map(Number), lon = _a[0], lat = _a[1];
                                return [2 /*return*/, { lon: lon, lat: lat }];
                            }
                        }
                        return [2 /*return*/, undefined];
                }
            });
        });
    };
    Geocoder.geoToAddress = function (geo) {
        return __awaiter(this, void 0, void 0, function () {
            var response, obj;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, Geocoder.geocode(geo)];
                    case 1:
                        response = (_a.sent()).response;
                        if (response.GeoObjectCollection
                            && response.GeoObjectCollection.featureMember
                            && response.GeoObjectCollection.featureMember.length > 0) {
                            obj = Geocoder.getFirst(response);
                            return [2 /*return*/, obj.metaDataProperty.GeocoderMetaData.Address];
                        }
                        return [2 /*return*/, undefined];
                }
            });
        });
    };
    Geocoder.API_KEY = '';
    return Geocoder;
}());
exports.Geocoder = Geocoder;
//# sourceMappingURL=index.js.map