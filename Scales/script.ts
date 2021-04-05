"use strict";
      class Scales {

        productsOnScales: Product[];

        constructor() {
          this.productsOnScales = [];
        }

        add(product: Product): void {
          this.productsOnScales.push(product);
        }
        getSumScale(): number {
          return this.productsOnScales.reduce(
            (sum, element) => sum + element.getScale(),
            0
          );
        }
        getNameList(): string[] {
          let namesArr = [];
          for (let i = 0; i < this.productsOnScales.length; i++)
            namesArr[i] = this.productsOnScales[i].getName();
          return namesArr;
        }
      }

      class Product {

          name: string;
          scale: number;

        constructor() {
        }

        getName() {
          return this.name;
        }
        getScale() {
          return this.scale;
        }
      }

      class Apple extends Product {
        constructor() {
          super();
        }
      }

      class Tomato extends Product {
          
          color: string;

        constructor() {
          super();
          this.color = "Красный";
        }
      }

      let ourScales = new Scales();
      let apple1 = new Apple();
      let apple2 = new Apple();
      apple1.name = "Яблоко из Польши";
      apple1.scale = 200;
      apple2.name = "Яблоко из Беларуси";
      apple2.scale = 300;

      let tomato1 = new Tomato();
      let tomato2 = new Tomato();
      tomato1.name = "Помидор из Испании";
      tomato1.scale = 50;
      tomato2.name = "Помидор из России";
      tomato2.scale = 75;

      ourScales.add(apple1);
      ourScales.add(tomato2);

      console.log("Список продуктов на весах: " + ourScales.getNameList());
      console.log(
        "Масса продуктов на весах: " + ourScales.getSumScale() + " грамм"
      );