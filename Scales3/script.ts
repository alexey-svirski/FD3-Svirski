"use strict";

function uniFactory<objtype>(classRef: { new (): objtype }): objtype {
  return new classRef();
}

interface IStorageEngine {
  addItem(product: Product): void;
  getItem(index: number): Product;
  getCount(): number;
}
class Scales<StorageEngine extends IStorageEngine> {
  productsOnScales: StorageEngine;

  add(_storageEngine: StorageEngine): void {
    this.productsOnScales = _storageEngine;
  }
  getSumScale(): number {
    let sum: number = 0;
    for (let i: number = 0; i < this.productsOnScales.getCount(); i++) {
      sum += this.productsOnScales.getItem(i).getScale();
    }
    return sum;
  }
  getNameList(): string[] {
    let namesArr: string[] = [];
    for (let i: number = 0; i < this.productsOnScales.getCount(); i++)
      namesArr[i] = this.productsOnScales.getItem(i).getName();
    return namesArr;
  }
}

class ScalesStorageEngineArray {
  products: Product[] = [];

  addItem(product: Product): void {
    this.products.push(product);
  }
  getItem(index: number): Product {
    return this.products[index];
  }
  getCount(): number {
    return this.products.length;
  }
}

class ScalesStorageEngineLocalStorage {
  lsKey = "product";

  addItem(product: Product): void {
    if (!localStorage.lsKey) {
      localStorage.lsKey = "[]";
    }
    let arr: any[] = JSON.parse(localStorage.lsKey);
    arr.push(product);
    localStorage.lsKey = JSON.stringify(arr);
  }
  getItem(index: number): Product {
    let arr: any = JSON.parse(localStorage.lsKey);
    return new Product(arr[index].name, arr[index].scale);
  }
  getCount(): number {
    let arr: any[] = JSON.parse(localStorage.lsKey);
    return arr.length;
  }
}

class Product {
  private name: string;
  private scale: number;

  constructor(_name: string, _scale: number) {
    this.name = _name;
    this.scale = _scale;
  }

  public getName(): string {
    return this.name;
  }

  public getScale(): number {
    return this.scale;
  }
}

let arrScales = new Scales();
let lsScales = new Scales();

let se1: ScalesStorageEngineArray = uniFactory(ScalesStorageEngineArray);
localStorage.clear();
let se2: ScalesStorageEngineLocalStorage = uniFactory(
  ScalesStorageEngineLocalStorage
);

let product1 = new Product("Яблоко", 50);
let product2 = new Product("Груша", 70);
let product3 = new Product("Помидор", 40);
let product4 = new Product("Лимон", 30);

se1.addItem(product1);
se1.addItem(product2);
se1.addItem(product3);

se2.addItem(product3);
se2.addItem(product1);

console.log(se1.getItem(0));
console.log(se1.getItem(1));
console.log(se1.getItem(2));
console.log(se2.getItem(0));

arrScales.add(se1);
lsScales.add(se2);

console.log("Список продуктов на весах (arr): " + arrScales.getNameList());
console.log("Список продуктов на весах (ls): " + lsScales.getNameList());

console.log(
  "Масса продуктов на весах (arr): " + arrScales.getSumScale() + " грамм"
);
console.log(
  "Масса продуктов на весах (LS): " + lsScales.getSumScale() + " грамм"
);