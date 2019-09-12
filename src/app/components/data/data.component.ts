import { Component, OnInit } from '@angular/core';
import { FormGroup,FormControl,Validators, FormArray } from '@angular/forms';
import { Observable } from 'rxjs';
import { promise } from 'protractor';



@Component({
  selector: 'app-data',
  templateUrl: './data.component.html',
  styles: []
})
export class DataComponent implements OnInit {

  forma:FormGroup;

  usuario:any = {
    nombreCompleto: {
        nombre: 'otniel',
        apellido: 'munoz'
    },
    correo: "otniel@g.com",
    //pasatiempos: ["Correr","Dormir","Comer"]
  }


  constructor() {

    console.log(this.usuario);
    


    this.forma = new FormGroup({

    'nombreCompleto': new FormGroup({

      'nombre': new FormControl('', [ //this.usuario.nombreCompleto.nombre
                                      Validators.required,
                                      Validators.minLength(2)
                                    ]),
      'apellido': new FormControl('', [
                                      Validators.required,
                                      Validators.minLength(2),
                                      this.noHerrera
                                    ])
    }),
      'correo': new FormControl('',  [
                                      Validators.required,
                                      Validators.email
                                     ]),
      'pasatiempos': new FormArray([
        new FormControl('Correr', Validators.required)
      ]),
      
      'username': new FormControl('',Validators.required,this.existeUsuario),
      'password1': new FormControl('',Validators.required),
      'password2': new FormControl()


    });

    
      // 'nombre': new FormControl('',  [
      //                                 Validators.required,
      //                                 Validators.minLength(2)
      //                               ]),
      // 'apellido': new FormControl('',[
      //                                 Validators.required,
      //                                 Validators.minLength(2)
      //                                ]),

     // this.forma.setValue(this.usuario); //carga todos los datos al input con el objeto

    
     this.forma.controls['password2'].setValidators([
       Validators.required,
       this.noIgual.bind(this.forma)
     ]);
    
      
     this.forma.controls['username'].valueChanges.subscribe( data=>{
       console.log(data);
       
     })

     this.forma.controls['username'].statusChanges.subscribe( data=>{
      console.log(data);
      
    })


   }

   agregarPasatiempo(){
     (<FormArray>this.forma.controls['pasatiempos']).push(
       new FormControl('Dormir',Validators.required)
     )
   }



   noHerrera(control:FormControl):{[s:string]:boolean}{
      if (control.value === "herrera") {
        return {
          noherrera:true
        }
      }
      return null;
   }

   existeUsuario(control:FormControl):Promise<any>|Observable<any>{
      
    let promesa = new Promise(
      (resolve,reject)=>{
        
        setTimeout(()=>{
          if (control.value === "strider") { //strider = ya esta tomado el usuario
            resolve({existe:true})
          }else{
            resolve(null)
          }
        },3000)

      }
    )
    return promesa;
   }


   noIgual(control:FormControl):{[s:string]:boolean}{
    console.log(this);
    
    let forma:any = this;


    if (control.value !== forma.controls['password1'].value) {
      return {
        noiguales:true
      }
    }
    return null;
 }

   guardarCambios(){
     console.log(this.forma.value);
     console.log(this.forma);
     
     //this.forma.reset(this.usuario); //reseatea el ngPristin
    //  this.forma.reset({
    //    nombreCompleto:{
    //      nombre: "",
    //      apellido:""
    //    },
    //    correo: ""
    //  });
     
   }


  ngOnInit() {
  }

}
