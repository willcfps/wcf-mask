import { Directive, HostListener, Input, Renderer2, ElementRef } from '@angular/core';
import {
    NG_VALUE_ACCESSOR, ControlValueAccessor
} from '@angular/forms';

@Directive({
    selector: '[wcfMask]',
    providers: [{
        provide: NG_VALUE_ACCESSOR,
        useExisting: WcfMaskDirective,
        multi: true
    }]
})

export class WcfMaskDirective implements ControlValueAccessor {

    private REGEXP = /\-|\.|\/|\(|\)|\,|\%|\"|\'|\s| /g;
    private masks = this.getMapTypes();
    private separadorDecimal = ',';
    private SeparadorMilesimo = '.';
    private strCheck = '0123456789';

    onTouched: any;
    onChange: any;

    @Input('wcfMask') inputMask: string;

    constructor(private _renderer: Renderer2, private _elementRef: ElementRef) {

    }

    writeValue(value: any): void {
        value = this.maskByInputValue(value, this.inputMask);
        this._renderer.setProperty(this._elementRef.nativeElement, 'value', value);
    }

    registerOnChange(fn: any): void {
        this.onChange = fn;
    }

    registerOnTouched(fn: any): void {
        this.onTouched = fn;
    }

    @HostListener('keyup', ['$event'])
    onKeyup($event: any) {
        this.maskByEvent($event, this.inputMask);
    }

    @HostListener('blur', ['$event'])
    onBlur($event: any) {
        let value = $event.target.value;
        if (value) {
            this.maskByEvent($event, this.inputMask);
        }

        this.onChange($event.target.value);
    }

    @HostListener('keypress', ['$event'])
    onKeypress($event: any) {
        let whichCode = ($event.event) ? $event.which : $event.keyCode;

        if (this.acceptSpecialKeyCode($event, whichCode)) {
            return true;
        }

        if (this.preventAlphanumericKeyCode($event, whichCode)) {
            $event.cancelBubble = true;
            return false;
        }

        if (this.inputMask.toUpperCase() === 'MONEY' || this.inputMask.toUpperCase() === 'PERC') {
            return true;
        }

        return this.acceptInputPhone($event);;
    }

    private acceptInputPhone($event: any) {
        let value: string = $event.target.value;
        value = value.replace(this.REGEXP, '');
        let mask: MaskTypeDef = this.refineMask(value + $event.key, this.inputMask.toUpperCase());

        if (mask) {
            if (!(value.length < mask.length)) {
                $event.cancelBubble = true;
                return false;
            }
        } else {
            $event.cancelBubble = true;
            return false;
        }

        return true;
    }

    private refineMask(value: any, maskType: string) {
        let mask: MaskTypeDef = this.masks.get(maskType.toUpperCase());
        value = value.replace(this.REGEXP, '');
        if (maskType.toUpperCase() === 'PHONE') {
            if (value) {
                if (value.length > mask.length) {
                    mask = this.masks.get('CEL');
                }
            }
        }

        return mask;
    }

    private maskDecimal(value: any, maskType: string) {
        value = this.decimalMask(value);
        if (maskType.toUpperCase() === 'PERC') {
            value += '%';
            let position = value.length - 1;
        }

        
        return value;
    }

    private maskByInputValue(value: string, maskType: string) {
        if (!value || value === 'undefined' || value === 'null') {
            return '';
        }

        value = value.replace(this.REGEXP, '');
        if (maskType.toUpperCase() === 'MONEY' || maskType.toUpperCase() === 'PERC') {
            return this.maskDecimal(value, maskType);
        }

        let mask: MaskTypeDef = this.refineMask(value, maskType);
        if (mask) {
            value = this.mask(value, mask.mask, mask.length);
            this.onChange(value);
            return value;
        }

        return value;
    }

    private maskByEvent(event: any, maskType: string) {

        let whichCode = (event.event) ? event.which : event.keyCode;
        if (this.acceptSpecialKeyCode(event, whichCode)) {
            this.onChange(event.target.value);
            return;
        }

        let value = event.target.value;
        value = value.replace(this.REGEXP, '');
        if (!value) {
            return;
        }

        if (maskType.toUpperCase() === 'MONEY' || maskType.toUpperCase() === 'PERC') {
            value = this.maskDecimal(event.target.value, maskType);
            event.target.value = value;
            this.onChange(value);
            if (maskType.toUpperCase() === 'PERC') {
                let position = event.target.value.length - 1;
                event.target.selectionStart = position;
                event.target.selectionEnd = position;
            }
            return;
        }

        let mask: MaskTypeDef = this.refineMask(value, maskType);
        if (mask) {
            value = this.mask(value, mask.mask, mask.length);
            event.target.value = value;
            this.onChange(value);
            return;
        }
    }

    private mask(value: string, mascara: string, length: number) {
        let boleanoMascara;
        let campoSoNumeros = value.toString().replace(this.REGEXP, '');
        let posicaoCampo = 0;
        let novoValorCampo = '';
        let tamanhoMascara = campoSoNumeros.length;

        if (campoSoNumeros.length > length) {
            campoSoNumeros = campoSoNumeros.substring(0, length);
        }

        for (let i = 0; i <= tamanhoMascara; i++) {

            boleanoMascara = ((mascara.charAt(i) === '-') || (mascara.charAt(i) === '.') || (mascara.charAt(i) === '/'));
            boleanoMascara = boleanoMascara || ((mascara.charAt(i) === '(') || (mascara.charAt(i) === ')') || (mascara.charAt(i) === ' '));

            if (boleanoMascara) {
                novoValorCampo += mascara.charAt(i);
                tamanhoMascara++;
            } else {
                novoValorCampo += campoSoNumeros.charAt(posicaoCampo);
                posicaoCampo++;
            }
        }
        return novoValorCampo;
    }

    private decimalMask(value: string) {
        let len = value.length;
        let i = 0;
        let aux = '';
        let aux2 = '';

        for (i = 0; i < len; i++) {
            if ((value.charAt(i) !== '0') && (value.charAt(i) !== this.separadorDecimal)) {
                break;
            }
        }

        for (; i < len; i++) {
            if (this.strCheck.indexOf(value.charAt(i)) !== -1) {
                aux += value.charAt(i);
            }
        }

        len = aux.length;

        if (len === 0) {
            value = '0,00';
            return value;
        }

        if (len === 1) {
            value = '0' + this.separadorDecimal + '0' + aux;
            return value;
        }

        if (len === 2) {
            value = '0' + this.separadorDecimal + aux;
            return value;
        }

        if (len > 2) {
            let j = 0;
            aux2 = '';
            for (j = 0, i = len - 3; i >= 0; i--) {
                if (j === 3) {
                    aux2 += this.SeparadorMilesimo;
                    j = 0;
                }
                aux2 += aux.charAt(i);
                j++;
            }
            value = '';
            let len2 = aux2.length;
            for (i = len2 - 1; i >= 0; i--) {
                value += aux2.charAt(i);
            }
            value += this.separadorDecimal + aux.substr(len - 2, len);
        }

        return value;
    }

    private acceptSpecialKeyCode(event, whichCode) {
        if (whichCode === 8) {
            let valueAux: string = event.target.value;
            valueAux = valueAux.replace(this.REGEXP, '');
            event.target.value = valueAux;
            this.onChange(valueAux);
            return true;
        }

        if (whichCode === 13) {
            return true;
        }

        return false;
    }

    private preventAlphanumericKeyCode(event, whichCode): boolean {
        if (!(whichCode >= 48 && whichCode <= 57)) {
            return true;
        }
        return false;
    }

    private getMapTypes(): Map<string, MaskTypeDef> {
        let masks = new Map<string, MaskTypeDef>();
        masks.set('CEP', new MaskTypeDef('00000-000', 8));
        masks.set('DATE', new MaskTypeDef('00/00/0000', 8));
        masks.set('PHONE', new MaskTypeDef('(00) 0000-0000', 10));
        masks.set('CEL', new MaskTypeDef('(00) 00000-0000', 11));
        masks.set('CPF', new MaskTypeDef('000.000.000-00', 11));
        masks.set('CNPJ', new MaskTypeDef('00.000.000/0000-00', 14));

        return masks;
    }
}

export class MaskTypeDef {
    mask: string;
    length: number;
    constructor(mask: string, length: number) {
        this.mask = mask;
        this.length = length;
    }
}
