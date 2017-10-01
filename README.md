# WCF-MASK
Mascara para projetos Angular 2

## LINKEDIN
https://www.linkedin.com/in/wcfps/

## SUPORTE
CPF, CNPJ, TELEFONE, CELULAR, MONETÁRIO e PERCENTUAL.

## GET STARTED

Copie o arquivo <b>wcf-mask.directive.ts</b> para a pasta de diretivas do seu projeto. Para que a diretiva seja vista pelo projeto é necessário importar e declarar no .module.ts.

Uma vez importada a diretiva, basta adicionar ao HTML o selector <b>wcfMask</b> e informar o tipo de mascara que deseja aplicar. Ela será refletida tanto no campo quando no ngModel.


### EXEMPLO
app.module.ts
```typescript

import { WcfMaskDirective } from './directives/wcf-mask.directive';


@NgModule({
  declarations: [
    AppComponent,
    WcfMaskDirective
  ],
  imports: [
   
  ],
  providers: [
  
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  bootstrap: [AppComponent]
})
export class AppModule { }
```
pagina.html
```html
<div>
    <label>PHONE/CEL:</label>
    <input type="text" [(ngModel)]="phone" wcfMask="PHONE">
</div>
<div>
    <label>CEL:</label>
    <input type="text" [(ngModel)]="cel" wcfMask="CEL">
</div>
<div>
    <label>DATE</label>
    <input type="text" [(ngModel)]="data" wcfMask="DATE">
</div>
<div>
    <label>MOEDA</label>
    <input type="text" [(ngModel)]="valor" wcfMask="MONEY">
</div>
<div>
    <label>PERCENTUAL</label>
    <input type="text" [(ngModel)]="percentual" wcfMask="PERC">
</div>
<div>
    <label>CPF</label>
    <input type="text" [(ngModel)]="cpf" wcfMask="CPF">
</div>
<div>
    <label>CNPJ</label>
    <input type="text" [(ngModel)]="cnpj" wcfMask="CNPJ">
</div>
```
