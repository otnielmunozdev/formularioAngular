import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';



@Component({
  selector: 'app-template',
  templateUrl: './template.component.html',
  styles: [`
    .ng-invalid.ng-touched:not(form){
      border: 1px solid red;
    }
  `]
})
export class TemplateComponent implements OnInit {

  usuario:Object = {
    nombre: null,
    apellido: null,
    correo: null,
    pais: "",
    sexo: "hombre",
    acepta: false
  }

  paises = [{
    codigo: "MX",
    nombre: "Mexico"
  },
  {
    codigo: "ESP",
    nombre: "Espana"
  }]  

  sexos:string[] = ["Hombre","Mujer","sin definir"];

  constructor() { }

  ngOnInit() {
  }

  guardar(forma:NgForm){
    console.log("formulario posteado");
    console.log("ngForm",forma);
    console.log("valor",forma.value);
    console.log("Usuario", this.usuario);
    
    
    
    
  }

}
