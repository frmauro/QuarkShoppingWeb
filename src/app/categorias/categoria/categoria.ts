import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { CategoriaService } from '../categoria-service';

@Component({
  selector: 'app-categoria',
  standalone: false,
  templateUrl: './categoria.html',
  styleUrl: './categoria.scss'
})
export class Categoria {
  camposForm!: FormGroup;

  constructor(private categoriaService: CategoriaService) {
    this.camposForm = new FormGroup({
      name: new FormControl('', Validators.required)
    });
   }

   salvar(): void {
    //this.camposForm.markAllAsTouched();

    if (this.camposForm.valid) {
      this.categoriaService.salvar(this.camposForm.value)
      .subscribe({
          next: (categoria) => {
            console.log('Categoria salva com sucesso!', categoria);
            this.camposForm.reset();
          },
          error: (error) => {
            console.error('Erro ao salvar a categoria:', error);
          }
      });
   }
  }

   isCampoInvalido(campo: string): boolean {
    const controle = this.camposForm.get(campo);
    return controle ? controle.invalid && (controle.dirty || controle.touched) : false;
   }

}
