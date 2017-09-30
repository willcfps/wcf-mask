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

import { InputMaskDirective } from './directives/input-mask.directive';


@NgModule({
  declarations: [
    AppComponent,
    InputMaskDirective
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
<div >
    <label for="usr">PHONE/CEL:</label>
    <input type="text" class="form-control" wcfMask="PHONE">
</div>
<div >
    <label for="usr">CEL:</label>
    <input type="text" class="form-control" wcfMask="CEL">
</div>
<div >
    <label for="pwd">DATE</label>
    <input type="text" class="form-control" wcfMask="DATE">
</div>
<div >
    <label for="pwd">MOEDA</label>
    <input type="text" class="form-control" wcfMask="MONEY">
</div>
<div >
    <label for="pwd">PERCENTUAL</label>
    <input type="text" class="form-control" wcfMask="PERC">
</div>
<div >
    <label for="pwd">CPF</label>
    <input type="text" class="form-control" wcfMask="CPF">
</div>
<div >
    <label for="pwd">CNPJ</label>
    <input type="text" class="form-control" wcfMask="CNPJ">
</div>
```
