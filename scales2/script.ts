"use strict";

interface IScalable {
  getScale(): number;
  getName(): string;
}
class Scales {
  productsOnScales: IScalable[];

  constructor() {
    this.productsOnScales = [];
  }

  add(product: IScalable): void {
    this.productsOnScales.push(product);
  }
  getSumScale(): number {
    return this.productsOnScales.reduce(
      (sum: number, element: IScalable) => sum + element.getScale(),
      0
    );
  }
  getNameList(): string[] {
    let namesArr = [];
    for (let i: number = 0; i < this.productsOnScales.length; i++)
      namesArr[i] = this.productsOnScales[i].getName();
    return namesArr;
  }
}

class Apple implements IScalable {
  name: string;
  scale: number;

  getName():string {
    return this.name;
  }

  getScale():number {
    return this.scale;
  }

}

class Tomato implements IScalable {
  name: string;
  scale: number;

  getName():string {
    return this.name;
  }

  getScale():number {
    return this.scale;
  }
  
}

let ourScales: Scales = new Scales();
let apple1: Apple = new Apple();
let apple2: Apple = new Apple();
apple1.name = "Яблоко из Польши";
apple1.scale = 200;
apple2.name = "Яблоко из Беларуси";
apple2.scale = 300;

let tomato1: Tomato = new Tomato();
let tomato2: Tomato = new Tomato();
tomato1.name = "Помидор из Испании";
tomato1.scale = 50;
tomato2.name = "Помидор из России";
tomato2.scale = 75;

ourScales.add(apple1);
ourScales.add(tomato2);

console.log(apple1.getName());
console.log(apple1.getScale());
console.log(tomato1.getName());
console.log(tomato1.getScale());
console.log("Список продуктов на весах: " + ourScales.getNameList());
console.log("Масса продуктов на весах: " + ourScales.getSumScale() + " грамм");
