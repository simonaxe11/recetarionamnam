import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams , LoadingController} from 'ionic-angular';
import { AngularFireDatabase , AngularFireList } from 'angularfire2/database';
import { Observable } from 'rxjs/Observable';
import { HomePage } from '../home/home';
import * as firebase from 'firebase' ;
import { environment} from '../../environments/environment'
import { Camera, CameraOptions } from '@ionic-native/camera';

/**
 * Generated class for the AnadirrecetaPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-anadirreceta',
  templateUrl: 'anadirreceta.html',
})
export default class AnadirrecetaPage {

  recetass: AngularFireList<any>;

  selectedPhoto;
  loading;
  currentImage;
  imageName;
  camera: any;

  constructor(public navCtrl: NavController,
     public navParams: NavParams,
     public af : AngularFireDatabase,
     public loadingCtrl:LoadingController,
     
     ) {
    this.recetass = af.list('/recetas');
  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad AnadirrecetaPage');
  }

  anadirrecetas(nombre,ingredientes,pasoapaso){
    this.imageName = name;
    this.upload()
    this.recetass.push({

      nombre : nombre,
      ingredientes : ingredientes,
      pasoapaso : pasoapaso,
      image : this.imageName

    }).then(nuevaReceta =>{
      this.navCtrl.push(HomePage);
    })
  }

  upload(){
    if(this.selectedPhoto){
      var uploadTask =  firebase.storage().ref().child('images/'+this.imageName+'.jpg').put(this.selectedPhoto);
      uploadTask.then(this.onError);
    }
  }

  onError = (error) => {
    console.log(error);
    this.loading.dismiss();
  }

  takePhoto(){

    const options : CameraOptions = {
    
      quality:100,
      targetHeight:200,
      targetWidth:200,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType:this.camera.MediaType.PICTURE
    }
    
    this.camera.getPicture(options).then((ImageData)=>{
      this.loading = this.loadingCtrl.create({
        content: 'Taking photo :) '
      });
    
      this.loading.present();
      this.selectedPhoto = this.dataURLtoBlob('data:image/jpeg;base64,'+ImageData);
      this.loading.dismiss();
      this.currentImage = 'data:image/jpeg;base64,'+ImageData;
    
    },(err)=>{
      console.log(err);
    }) ;
    }

    dataURLtoBlob(dataURL){
      let binary = atob(dataURL.split(',')[1]);
      let array = [];
      for (let index = 0; index < binary.length; index++) {
        array.push(binary.charCodeAt(index));
      
      }
      return new Blob([new Uint8Array(array)],{type:'image/jpeg'});
      }
}
