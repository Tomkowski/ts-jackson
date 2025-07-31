"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var index_1 = require("../../../../index");
var SerializableEntity_1 = __importDefault(require("../../../SerializableEntity"));
var image_1 = require("../image");
var PlaylistPreview = /** @class */ (function (_super) {
    __extends(PlaylistPreview, _super);
    function PlaylistPreview() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    __decorate([
        (0, index_1.JsonProperty)({ required: true }),
        __metadata("design:type", String)
    ], PlaylistPreview.prototype, "id", void 0);
    __decorate([
        (0, index_1.JsonProperty)(),
        __metadata("design:type", String)
    ], PlaylistPreview.prototype, "name", void 0);
    __decorate([
        (0, index_1.JsonProperty)(),
        __metadata("design:type", String)
    ], PlaylistPreview.prototype, "description", void 0);
    __decorate([
        (0, index_1.JsonProperty)('images[0]'),
        __metadata("design:type", image_1.Image)
    ], PlaylistPreview.prototype, "backgroundImage", void 0);
    __decorate([
        (0, index_1.JsonProperty)(),
        __metadata("design:type", String)
    ], PlaylistPreview.prototype, "href", void 0);
    __decorate([
        (0, index_1.JsonProperty)({ required: true }),
        __metadata("design:type", Object)
    ], PlaylistPreview.prototype, "tracks", void 0);
    return PlaylistPreview;
}(SerializableEntity_1.default));
exports.default = PlaylistPreview;
