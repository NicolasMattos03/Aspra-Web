import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ContactoService } from 'src/app/services/contacto.service';

@Component({
  selector: 'app-contacto',
  templateUrl: './contacto.component.html',
  styleUrls: ['./contacto.component.css'],
})
export class ContactoComponent {
  forma!: FormGroup;
  datos: any;
  elemento: any;

  constructor(
    private formbuilder: FormBuilder,
    private listContact: ContactoService
  ) {
    this.crearFormulario();
  }

  ngOnInit(): void {
    this.verContact();
  }

  verContact(): void {
    this.listContact.getContacto().subscribe((Response) => {
      this.datos = Response;
      console.log(this.datos);
    });
  }

  get nombreNoValido() {
    return (
      this.forma.get('nombre')?.invalid && this.forma.get('nombre')?.touched
    );
  }
  get emailNoValido() {
    return this.forma.get('email')?.invalid && this.forma.get('email')?.touched;
  }
  get textoNoValido() {
    return this.forma.get('texto')?.invalid && this.forma.get('texto')?.touched;
  }

  crearFormulario() {
    this.forma = this.formbuilder.group({
      nombre: ['', [Validators.required, Validators.minLength(6)]],
      email: [
        '',
        [
          Validators.required,
          Validators.email,
          Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$'),
        ],
      ],
      texto: ['', [Validators.required, Validators.minLength(20)]],
    });
  }

  enviar() {
    if (this.forma.invalid) {
      return Object.values(this.forma.controls).forEach((control) => {
        control.markAllAsTouched();
      });
    }
  }
}
