import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-categoria',
  standalone: false,
  templateUrl: './categoria.html',
  styleUrl: './categoria.scss'
})
export class Categoria {
  camposForm!: FormGroup;

  constructor() {
    this.camposForm = new FormGroup({
      name: new FormControl('', Validators.required)
    });
   }

   salvar(): void {
    //this.camposForm.markAllAsTouched();

    if (this.camposForm.valid) {
      console.log('Categoria salva com sucesso!', this.camposForm.value);
    } else {
      console.log('Formulário inválido. Por favor, preencha todos os campos obrigatórios.');
    }
   }

   isCampoInvalido(campo: string): boolean {
    const controle = this.camposForm.get(campo);
    return controle ? controle.invalid && (controle.dirty || controle.touched) : false;
   }

}
