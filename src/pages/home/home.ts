import { Component } from '@angular/core';
// Importación de plugins
import { BarcodeScanner } from '@ionic-native/barcode-scanner';
import { ToastController, Platform } from 'ionic-angular';

// Servicios/Providers
import { HistorialProvider } from '../../providers/historial/historial';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  titleScan = `Realizar Scan`;

  constructor( private barcodeScanner: BarcodeScanner,
    private toastCtrl: ToastController,
    private platform: Platform,
    private _historialService:HistorialProvider ) {

  }


  // Función de escaneo
  scan() {
    console.log(`Realizando scan`);

    if( !this.platform.is('cordova')) {
      this._historialService.agregar_historial("MATMSG:TO:fernando.herrera85@gmail.com;SUB:Hola Mundo;BODY:Saludos Fernando;;");
      // this._historialService.agregar_historial("http://google.com");
      // this._historialService.agregar_historial("geo:40.4169473,-3.7035284999999476");
//       this._historialService.agregar_historial( `BEGIN:VCARD
// VERSION:2.1
// N:Kent;Clark
// FN:Clark Kent
// ORG:
// TEL;HOME;VOICE:12345
// TEL;TYPE=cell:67890
// ADR;TYPE=work:;;;
// EMAIL:clark@superman.com
// END:VCARD` );

      return ;
    }

    // Si lo hace todo bien y todo va OK!!
    // El catch si ha habido una pifia
    this.barcodeScanner.scan().then(barcodeData => {
      console.log(`Información del scan: ${barcodeData}`);
      console.log( "Result: " + barcodeData.text + "\n" );
      console.log( "Format: " + barcodeData.format + "\n");
      console.log( "We got a barcode\n" + "Cancelled: " + barcodeData.cancelled);

      // No se si barcodeData.cancelled es booleano o debe ser ==0
      if( barcodeData.cancelled = false && barcodeData.text != null) {
        this._historialService.agregar_historial( barcodeData.text );
      }

     }).catch(err => {
         console.error(`Información del error: ${err}`);
         this.mostrarError(`Error: ${err}`)
     });
  }

  // Función de mostrar error
  mostrarError( mensaje:string) {
    let toast = this.toastCtrl.create({
      message: `${mensaje}`,
      duration: 2500,
      position: 'top'
    });

    toast.onDidDismiss(() => {
      console.log(`Cerramos el mensaje de tipo Toast`);
    });

    toast.present();
  }

}
