import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { NotificacaoService } from '../notificacao.service';

@Component({
  selector: 'app-contato',
  templateUrl: './contato.component.html',
  styleUrls: ['./contato.component.css']
})

export class ContatoComponent {
  formContato = this.fb.group({
    nome: ["", [
      Validators.minLength(4),
      Validators.required
    ]],
    assunto: ["", [
      Validators.minLength(10),
      Validators.required
    ]],
    telefone: ["", [
      Validators.minLength(11),
      Validators.required
    ]],
    email: ["", [
      Validators.email,
      Validators.required
    ]],
    mensagem: ["", [
      Validators.minLength(20),
      Validators.required
    ]]
  });

  constructor (
    private fb: FormBuilder,
    private notificacaoService: NotificacaoService
  ) { }

    enviarFormulario() {
      this.notificacaoService.notificar("A mensagem foi enviada!");
      this.formContato.reset();
    }
}
