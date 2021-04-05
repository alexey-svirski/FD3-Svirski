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
var Scales = /** @class */ (function () {
    function Scales() {
        this.productsOnScales = [];
    }
    Scales.prototype.add = function (product) {
        this.productsOnScales.push(product);
    };
    Scales.prototype.getSumScale = function () {
        return this.productsOnScales.reduce(function (sum, element) { return sum + element.getScale(); }, 0);
    };
    Scales.prototype.getNameList = function () {
        var namesArr = [];
        for (var i = 0; i < this.productsOnScales.length; i++)
            namesArr[i] = this.productsOnScales[i].getName();
        return namesArr;
    };
    return Scales;
}());
var Product = /** @class */ (function () {
    function Product() {
    }
    Product.prototype.getName = function () {
        return this.name;
    };
    Product.prototype.getScale = function () {
        return this.scale;
    };
    return Product;
}());
var Apple = /** @class */ (function (_super) {
    __extends(Apple, _super);
    function Apple() {
        return _super.call(this) || this;
    }
    return Apple;
}(Product));
var Tomato = /** @class */ (function (_super) {
    __extends(Tomato, _super);
    function Tomato() {
        var _this = _super.call(this) || this;
        _this.color = "Красный";
        return _this;
    }
    return Tomato;
}(Product));
var ourScales = new Scales();
var apple1 = new Apple();
var apple2 = new Apple();
apple1.name = "Яблоко из Польши";
apple1.scale = 200;
apple2.name = "Яблоко из Беларуси";
apple2.scale = 300;
var tomato1 = new Tomato();
var tomato2 = new Tomato();
tomato1.name = "Помидор из Испании";
tomato1.scale = 50;
tomato2.name = "Помидор из России";
tomato2.scale = 75;
ourScales.add(apple1);
ourScales.add(tomato2);
console.log("Список продуктов на весах: " + ourScales.getNameList());
console.log("Масса продуктов на весах: " + ourScales.getSumScale() + " грамм");
